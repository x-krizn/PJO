import React, { useEffect, useRef, useState } from 'react';
import { GameState, Player, Enemy, Projectile, Vector2, ReloadMode, ActionType, BurstPayload } from '../types';
import { 
  CANVAS_WIDTH, 
  CANVAS_HEIGHT, 
  PLAYER_MAX_HEALTH, 
  PLAYER_MAX_ENERGY, 
  PLAYER_MAX_HEAT,
  COLORS,
  PLAYER_SPEED,
  PROJECTILE_SPEED,
  PROJECTILE_LIFETIME,
  ENEMY_SPAWN_RATE,
  TileType,
  TILE_SIZE,
  MAP_WIDTH,
  MAP_HEIGHT,
  ENEMY_STATS,
  AUTO_LOCK_RANGE,
  AUTO_LOCK_CONE,
  GLADIUS,
  WEAPON_SWAP_DURATION,
  VISION_RANGE,
  FOG_COLOR,
  BOG_MAP
} from '../constants';

const centerX = Math.floor(MAP_WIDTH / 2);
const centerY = Math.floor(MAP_HEIGHT / 2);

const createPlayer = (): Player => ({
  id: 'player',
  position: { x: centerX * TILE_SIZE, y: centerY * TILE_SIZE },
  velocity: { x: 0, y: 0 },
  rotation: 0,
  movementRotation: 0,
  aimRotation: 0,
  radius: 18,
  health: PLAYER_MAX_HEALTH,
  maxHealth: PLAYER_MAX_HEALTH,
  energy: PLAYER_MAX_ENERGY,
  maxEnergy: PLAYER_MAX_ENERGY,
  heat: 0,
  maxHeat: PLAYER_MAX_HEAT,
  shields: 0,
  maxShields: 100,
  conditions: [],
  weapons: [GLADIUS],
  activeWeaponIndex: 0,
  ammo: GLADIUS.reload_cooldown.max_shots,
  cooldowns: {},
  activeSkill: null,
  weaponSwapCooldown: 0,
});

const createEnemy = (id: string, playerPos: Vector2): Enemy => {
  const types: ('warrior' | 'scout' | 'wurm')[] = ['warrior', 'scout', 'wurm'];
  const type = types[Math.floor(Math.random() * types.length)];
  const stats = type === 'warrior' ? ENEMY_STATS.WARRIOR : type === 'scout' ? ENEMY_STATS.SCOUT : ENEMY_STATS.WURM;

  let x = 0, y = 0;
  let validPos = false;
  let attempts = 0;
  while (!validPos && attempts < 50) {
    attempts++;
    const angle = Math.random() * Math.PI * 2;
    const dist = 800 + Math.random() * 1000;
    x = playerPos.x + Math.cos(angle) * dist;
    y = playerPos.y + Math.sin(angle) * dist;
    const tx = Math.floor(x / TILE_SIZE);
    const ty = Math.floor(y / TILE_SIZE);
    if (tx >= 0 && tx < MAP_WIDTH && ty >= 0 && ty < MAP_HEIGHT && BOG_MAP[ty]?.[tx] === TileType.GROUND) {
      validPos = true;
    }
  }

  return {
    id,
    position: { x, y },
    velocity: { x: 0, y: 0 },
    rotation: 0,
    radius: stats.radius,
    health: stats.hp,
    maxHealth: stats.hp,
    type,
    state: 'chase',
    stateTimer: 0,
  };
};

const checkCollision = (x: number, y: number, radius: number) => {
  const tx = Math.floor(x / TILE_SIZE);
  const ty = Math.floor(y / TILE_SIZE);
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const ctx = tx + dx;
      const cty = ty + dy;
      if (ctx < 0 || ctx >= MAP_WIDTH || cty < 0 || cty >= MAP_HEIGHT) continue;
      const tile = BOG_MAP[cty][ctx];
      if (tile === TileType.WALL || tile === TileType.TREE) {
        const tileX = ctx * TILE_SIZE + TILE_SIZE / 2;
        const tileY = cty * TILE_SIZE + TILE_SIZE / 2;
        const dist = Math.hypot(x - tileX, y - tileY);
        if (dist < radius + TILE_SIZE / 2) return true;
      }
    }
  }
  return false;
};

export const GameCanvas: React.FC<{ 
  onStateUpdate: (state: GameState) => void,
  moveVector?: Vector2,
  aimVector?: Vector2,
  isFiring?: boolean
}> = ({ onStateUpdate, moveVector, aimVector, isFiring }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const moveVectorRef = useRef<Vector2 | undefined>(moveVector);
  const aimVectorRef = useRef<Vector2 | undefined>(aimVector);
  const isFiringRef = useRef<boolean | undefined>(isFiring);
  const [scale, setScale] = useState(1);

  useEffect(() => { moveVectorRef.current = moveVector; }, [moveVector]);
  useEffect(() => { aimVectorRef.current = aimVector; }, [aimVector]);
  useEffect(() => { isFiringRef.current = isFiring; }, [isFiring]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const scaleX = width / CANVAS_WIDTH;
        const scaleY = height / CANVAS_HEIGHT;
        setScale(Math.min(scaleX, scaleY));
      }
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  const gameStateRef = useRef<GameState>({
    player: createPlayer(),
    enemies: [],
    projectiles: [],
    score: 0,
    targetId: null,
    isGameOver: false,
    isPaused: false,
    exploredTiles: new Set<string>(),
    visibleTiles: new Set<string>(),
  });

  const keysRef = useRef<Set<string>>(new Set());
  const mousePosRef = useRef<Vector2>({ x: 0, y: 0 });
  const frameCountRef = useRef(0);
  const shakeRef = useRef(0);
  const cameraRef = useRef<Vector2>({ x: 0, y: 0 });

  // P1-B: tracks projectiles fired since last reload for PER_SHOT reload time calculation.
  // Inline ref — avoids adding to Player type before P3-A skill chain is implemented.
  // Reset to 0 on reload completion and on session reset (remount clears all refs).
  const shotsFiredRef = useRef(0);

  // P1-C: prevents a held R key from re-triggering reload every frame.
  // Set true when reload is triggered, cleared when KeyR leaves keysRef.
  const rKeyProcessedRef = useRef(false);

  const hasLOS = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    const steps = Math.ceil(dist / (TILE_SIZE / 4));
    const targetTx = Math.floor(x2 / TILE_SIZE);
    const targetTy = Math.floor(y2 / TILE_SIZE);
    for (let i = 1; i < steps; i++) {
      const px = x1 + (dx * i) / steps;
      const py = y1 + (dy * i) / steps;
      const tx = Math.floor(px / TILE_SIZE);
      const ty = Math.floor(py / TILE_SIZE);
      if (tx === targetTx && ty === targetTy) return true;
      if (BOG_MAP[ty]?.[tx] === TileType.WALL || BOG_MAP[ty]?.[tx] === TileType.TREE) return false;
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.code);
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.code);
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: (e.clientX - rect.left) / scale + cameraRef.current.x,
        y: (e.clientY - rect.top) / scale + cameraRef.current.y,
      };
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        keysRef.current.add('Mouse0');
        const state = gameStateRef.current;
        const worldPos = mousePosRef.current;
        const clickedEnemy = state.enemies.find(en =>
          Math.hypot(en.position.x - worldPos.x, en.position.y - worldPos.y) < en.radius + 15
        );
        if (clickedEnemy) state.targetId = clickedEnemy.id;
      }
    };
    const handleMouseUp = () => keysRef.current.delete('Mouse0');

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const update = () => {
      const state = gameStateRef.current;
      if (state.isGameOver || state.isPaused) return;

      const dt = 1 / 60;
      frameCountRef.current++;
      if (shakeRef.current > 0) shakeRef.current -= 0.5;

      // ── Cooldown tick ──────────────────────────────────────────────────────
      Object.keys(state.player.cooldowns).forEach(id => {
        const cd = state.player.cooldowns[id];
        cd.remaining -= dt;
        if (cd.remaining <= 0) {
          delete state.player.cooldowns[id];
          if (id.startsWith('reload_')) {
            state.player.ammo = state.player.weapons[state.player.activeWeaponIndex].reload_cooldown.max_shots;
            // P1-B: reset shot counter when reload completes
            shotsFiredRef.current = 0;
          }
        }
      });

      if (state.player.weaponSwapCooldown > 0) state.player.weaponSwapCooldown -= dt;

      // ── P2-A: Passive energy regen ─────────────────────────────────────────
      // +2 energy/sec. Tunable constant.
      state.player.energy = Math.min(
        state.player.maxEnergy,
        state.player.energy + 2 * dt
      );

      // ── P2-B: Passive heat cooling ─────────────────────────────────────────
      // −5 heat/sec. Applied every frame — fire events add heat to oppose this.
      // Tunable constant.
      state.player.heat = Math.max(0, state.player.heat - 5 * dt);

      // ── Movement ───────────────────────────────────────────────────────────
      let moveX = (keysRef.current.has('KeyD') ? 1 : 0) - (keysRef.current.has('KeyA') ? 1 : 0);
      let moveY = (keysRef.current.has('KeyS') ? 1 : 0) - (keysRef.current.has('KeyW') ? 1 : 0);
      const speedMult = state.player.heat >= state.player.maxHeat ? 0.3 : 1.0;

      if (moveVectorRef.current && (Math.abs(moveVectorRef.current.x) > 0.1 || Math.abs(moveVectorRef.current.y) > 0.1)) {
        moveX = moveVectorRef.current.x;
        moveY = moveVectorRef.current.y;
      }

      const targetVelX = moveX * PLAYER_SPEED * speedMult;
      const targetVelY = moveY * PLAYER_SPEED * speedMult;
      state.player.velocity.x += (targetVelX - state.player.velocity.x) * 0.1;
      state.player.velocity.y += (targetVelY - state.player.velocity.y) * 0.1;

      if (Math.abs(state.player.velocity.x) > 0.1 || Math.abs(state.player.velocity.y) > 0.1) {
        state.player.movementRotation = Math.atan2(state.player.velocity.y, state.player.velocity.x);
      }

      const nextX = state.player.position.x + state.player.velocity.x;
      const nextY = state.player.position.y + state.player.velocity.y;
      if (!checkCollision(nextX, state.player.position.y, state.player.radius)) {
        state.player.position.x = nextX;
      } else { state.player.velocity.x = 0; }
      if (!checkCollision(state.player.position.x, nextY, state.player.radius)) {
        state.player.position.y = nextY;
      } else { state.player.velocity.y = 0; }

      cameraRef.current.x = state.player.position.x - CANVAS_WIDTH / 2;
      cameraRef.current.y = state.player.position.y - CANVAS_HEIGHT / 2;

      // ── Fog of war update ──────────────────────────────────────────────────
      state.visibleTiles.clear();
      const ptx = Math.floor(state.player.position.x / TILE_SIZE);
      const pty = Math.floor(state.player.position.y / TILE_SIZE);
      const range = Math.ceil(VISION_RANGE / TILE_SIZE) + 1;

      for (let dy = -range; dy <= range; dy++) {
        for (let dx = -range; dx <= range; dx++) {
          const tx = ptx + dx;
          const ty = pty + dy;
          if (tx < 0 || tx >= MAP_WIDTH || ty < 0 || ty >= MAP_HEIGHT) continue;
          const worldX = tx * TILE_SIZE + TILE_SIZE / 2;
          const worldY = ty * TILE_SIZE + TILE_SIZE / 2;
          const dist = Math.hypot(worldX - state.player.position.x, worldY - state.player.position.y);
          if (dist <= VISION_RANGE + TILE_SIZE) {
            if (hasLOS(state.player.position.x, state.player.position.y, worldX, worldY)) {
              const key = `${tx},${ty}`;
              state.visibleTiles.add(key);
              state.exploredTiles.add(key);
            }
          }
        }
      }

      // ── Aim ────────────────────────────────────────────────────────────────
      if (aimVectorRef.current && (Math.abs(aimVectorRef.current.x) > 0.1 || Math.abs(aimVectorRef.current.y) > 0.1)) {
        state.player.aimRotation = Math.atan2(aimVectorRef.current.y, aimVectorRef.current.x);
      } else {
        state.player.aimRotation = Math.atan2(
          mousePosRef.current.y - state.player.position.y,
          mousePosRef.current.x - state.player.position.x
        );
      }

      // ── Auto-lock ──────────────────────────────────────────────────────────
      if (!state.targetId) {
        let closestDist = AUTO_LOCK_RANGE;
        let closestId: string | null = null;
        state.enemies.forEach(e => {
          const dist = Math.hypot(e.position.x - state.player.position.x, e.position.y - state.player.position.y);
          const angle = Math.atan2(e.position.y - state.player.position.y, e.position.x - state.player.position.x);
          const angleDiff = Math.abs(angle - state.player.aimRotation);
          if (dist < closestDist && angleDiff < AUTO_LOCK_CONE) {
            closestDist = dist;
            closestId = e.id;
          }
        });
        state.targetId = closestId;
      } else {
        const target = state.enemies.find(e => e.id === state.targetId);
        if (!target) state.targetId = null;
      }

      // ── P1-C: Manual reload (R key) ────────────────────────────────────────
      // One-shot per keypress — rKeyProcessedRef prevents re-trigger on hold.
      // PER_SHOT mode: reload time scales with shots fired since last reload.
      // Falls back to full reload time if shotsFiredRef is 0 (shouldn't happen
      // if ammo < max, but guards against edge cases).
      const weapon = state.player.weapons[state.player.activeWeaponIndex];
      if (keysRef.current.has('KeyR')) {
        if (!rKeyProcessedRef.current) {
          rKeyProcessedRef.current = true;
          const alreadyReloading = !!state.player.cooldowns[weapon.reload_cooldown.id];
          const needsReload = state.player.ammo < weapon.reload_cooldown.max_shots;
          if (!alreadyReloading && needsReload) {
            const shots = shotsFiredRef.current > 0
              ? shotsFiredRef.current
              : weapon.reload_cooldown.max_shots;
            const reloadTime = shots * weapon.reload_cooldown.scalar;
            state.player.cooldowns[weapon.reload_cooldown.id] = {
              id: weapon.reload_cooldown.id, remaining: reloadTime, total: reloadTime
            };
          }
        }
      } else {
        // Key released — clear guard so next press is processed
        rKeyProcessedRef.current = false;
      }

      // ── P1-A / P1-B / P2-A / P2-B: Fire handler ───────────────────────────
      // Reads shot_count from weapon library payload (fixes F-01).
      // Spawns N projectiles with angular spread.
      // Decrements ammo by shot_count.
      // Reload time scales with shots fired (fixes F-02, PER_SHOT mode).
      // Energy and heat updated per projectile (connects F-C and F-D systems).
      const isFiringNow = isFiringRef.current || keysRef.current.has('Mouse0') || keysRef.current.has('Space');

      if (isFiringNow && !state.player.cooldowns[weapon.reload_cooldown.id]) {
        const shotCooldownId = 'shot_cooldown';
        if (!state.player.cooldowns[shotCooldownId]) {

          // P1-A: resolve shot_count from the active weapon's burst action
          const burstAction = weapon.library?.actions.find(a => a.type === ActionType.BURST);
          const shotCount = burstAction
            ? (burstAction.payload as BurstPayload).shot_count
            : 1;

          // Gate: require sufficient ammo for a full burst — prevents partial spawns
          // and keeps ammo always a clean multiple of shot_count.
          // P2-A: gate on energy — cannot fire with 0 energy
          const canFire = state.player.ammo >= shotCount && state.player.energy > 0;

          if (canFire) {
            const aimAngle = state.player.aimRotation;
            // P1-A: angular spread across N shots.
            // spread = 0.08 rad (~4.6°) total arc, evenly divided.
            // Tunable: increase for wider scatter, 0 for tight group.
            const spreadTotal = 0.08;
            const spreadStep = shotCount > 1 ? spreadTotal / (shotCount - 1) : 0;
            const spreadOffset = shotCount > 1 ? -spreadTotal / 2 : 0;

            for (let s = 0; s < shotCount; s++) {
              const angle = aimAngle + spreadOffset + s * spreadStep;
              state.projectiles.push({
                id: `proj-${Date.now()}-${s}`,
                position: { ...state.player.position },
                velocity: {
                  x: Math.cos(angle) * PROJECTILE_SPEED,
                  y: Math.sin(angle) * PROJECTILE_SPEED,
                },
                damage: 50,
                ownerId: 'player',
                lifeTime: PROJECTILE_LIFETIME,
              });

              // P2-A: −5 energy per projectile. Tunable constant.
              state.player.energy = Math.max(0, state.player.energy - 5);

              // P2-B: +8 heat per projectile. Tunable constant.
              // Overheat speed penalty (heat >= maxHeat → speedMult 0.3) already
              // wired in movement section above — will now activate correctly.
              state.player.heat = Math.min(state.player.maxHeat, state.player.heat + 8);
            }

            // P1-A: decrement by full burst count
            state.player.ammo -= shotCount;

            // P1-B: track shots fired for PER_SHOT reload time
            shotsFiredRef.current += shotCount;

            // Shot cooldown — controls burst repeat rate (unchanged: 0.15s)
            state.player.cooldowns[shotCooldownId] = {
              id: shotCooldownId, remaining: 0.15, total: 0.15
            };

            // P1-B: auto-reload on empty mag using PER_SHOT time
            if (state.player.ammo <= 0) {
              const reloadTime = shotsFiredRef.current * weapon.reload_cooldown.scalar;
              state.player.cooldowns[weapon.reload_cooldown.id] = {
                id: weapon.reload_cooldown.id, remaining: reloadTime, total: reloadTime
              };
            }
          }
        }
      }

      // ── Projectile movement ────────────────────────────────────────────────
      state.projectiles = state.projectiles.filter(p => {
        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;
        p.lifeTime--;
        const tx = Math.floor(p.position.x / TILE_SIZE);
        const ty = Math.floor(p.position.y / TILE_SIZE);
        if (BOG_MAP[ty]?.[tx] === TileType.WALL || BOG_MAP[ty]?.[tx] === TileType.TREE) return false;
        return p.lifeTime > 0;
      });

      // ── Enemy spawn ────────────────────────────────────────────────────────
      if (frameCountRef.current % ENEMY_SPAWN_RATE === 0 && state.enemies.length < 10) {
        state.enemies.push(createEnemy(`enemy-${Date.now()}`, state.player.position));
      }

      // ── Enemy update ───────────────────────────────────────────────────────
      state.enemies.forEach(enemy => {
        if (enemy.stateTimer && enemy.stateTimer > 0) enemy.stateTimer--;
        const stats = enemy.type === 'warrior' ? ENEMY_STATS.WARRIOR : enemy.type === 'scout' ? ENEMY_STATS.SCOUT : ENEMY_STATS.WURM;
        const distToPlayer = Math.hypot(enemy.position.x - state.player.position.x, enemy.position.y - state.player.position.y);
        const canSeePlayer = distToPlayer < VISION_RANGE && hasLOS(enemy.position.x, enemy.position.y, state.player.position.x, state.player.position.y);

        if (enemy.state === 'chase' && !canSeePlayer) enemy.state = 'idle';
        else if (enemy.state === 'idle' && canSeePlayer) enemy.state = 'chase';

        const angle = Math.atan2(state.player.position.y - enemy.position.y, state.player.position.x - enemy.position.x);
        enemy.rotation = angle;

        if (enemy.state === 'chase') {
          const nextEx = enemy.position.x + Math.cos(angle) * stats.speed;
          const nextEy = enemy.position.y + Math.sin(angle) * stats.speed;
          if (!checkCollision(nextEx, enemy.position.y, enemy.radius)) enemy.position.x = nextEx;
          if (!checkCollision(enemy.position.x, nextEy, enemy.radius)) enemy.position.y = nextEy;
        }

        if (enemy.state === 'attack' || (enemy.type === 'warrior' && distToPlayer < stats.attackRange)) {
          if (!enemy.stateTimer || enemy.stateTimer <= 0) {
            if (enemy.type === 'scout') {
              state.projectiles.push({
                id: `en-proj-${Date.now()}-${enemy.id}`,
                position: { ...enemy.position },
                velocity: { x: Math.cos(angle) * (PROJECTILE_SPEED * 0.8), y: Math.sin(angle) * (PROJECTILE_SPEED * 0.8) },
                damage: stats.damage,
                ownerId: enemy.id,
                lifeTime: PROJECTILE_LIFETIME,
              });
            } else {
              if (distToPlayer < enemy.radius + state.player.radius + 5) {
                state.player.health -= stats.damage;
                shakeRef.current = 10;
              }
            }
            enemy.stateTimer = stats.attackCooldown;
          }
        }
        if (state.player.health <= 0) state.isGameOver = true;
      });

      // ── Projectile collision ───────────────────────────────────────────────
      state.projectiles = state.projectiles.filter(p => {
        if (p.ownerId === 'player') {
          let hit = false;
          state.enemies = state.enemies.filter(e => {
            const dist = Math.hypot(p.position.x - e.position.x, p.position.y - e.position.y);
            if (dist < e.radius + 5) {
              if (e.state === 'submerged') { e.state = 'emerging'; e.stateTimer = 30; state.targetId = e.id; }
              e.health -= p.damage;
              hit = true;
              if (e.health <= 0) { state.score += 100; if (state.targetId === e.id) state.targetId = null; return false; }
            }
            return true;
          });
          return !hit;
        } else {
          const dist = Math.hypot(p.position.x - state.player.position.x, p.position.y - state.player.position.y);
          if (dist < state.player.radius + 5) { state.player.health -= p.damage; shakeRef.current = 5; return false; }
          return true;
        }
      });

      onStateUpdate({ ...state });
    };

    const draw = () => {
      const state = gameStateRef.current;
      ctx.save();

      if (shakeRef.current > 0) {
        ctx.translate((Math.random() - 0.5) * shakeRef.current, (Math.random() - 0.5) * shakeRef.current);
      }

      ctx.translate(-cameraRef.current.x, -cameraRef.current.y);
      ctx.fillStyle = COLORS.BG;
      ctx.fillRect(cameraRef.current.x, cameraRef.current.y, CANVAS_WIDTH, CANVAS_HEIGHT);

      const startX = Math.max(0, Math.floor(cameraRef.current.x / TILE_SIZE));
      const endX = Math.min(MAP_WIDTH, Math.ceil((cameraRef.current.x + CANVAS_WIDTH) / TILE_SIZE));
      const startY = Math.max(0, Math.floor(cameraRef.current.y / TILE_SIZE));
      const endY = Math.min(MAP_HEIGHT, Math.ceil((cameraRef.current.y + CANVAS_HEIGHT) / TILE_SIZE));

      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          const key = `${x},${y}`;
          const isVisible = state.visibleTiles.has(key);
          const isExplored = state.exploredTiles.has(key);
          if (!isExplored) continue;
          const tile = BOG_MAP[y][x];
          if (tile === TileType.GROUND) {
            if (isVisible) { ctx.fillStyle = 'rgba(255,255,255,0.02)'; ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE); }
            continue;
          }
          if (tile === TileType.WATER) ctx.fillStyle = COLORS.WATER;
          else if (tile === TileType.WALL) ctx.fillStyle = COLORS.WALL;
          else if (tile === TileType.RUIN) ctx.fillStyle = COLORS.RUIN;
          else if (tile === TileType.TREE) ctx.fillStyle = COLORS.TREE;
          if (!isVisible) {
            ctx.save(); ctx.globalAlpha = 0.2;
            ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.restore();
          } else {
            ctx.fillRect(x * TILE_SIZE - 0.5, y * TILE_SIZE - 0.5, TILE_SIZE + 1, TILE_SIZE + 1);
          }
          ctx.strokeStyle = isVisible ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.01)';
          ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }

      // Target indicator
      if (state.targetId) {
        const target = state.enemies.find(e => e.id === state.targetId);
        if (target && hasLOS(state.player.position.x, state.player.position.y, target.position.x, target.position.y)) {
          ctx.strokeStyle = '#ff0000'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(target.position.x, target.position.y, target.radius + 10, 0, Math.PI * 2); ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(target.position.x - 15, target.position.y); ctx.lineTo(target.position.x + 15, target.position.y);
          ctx.moveTo(target.position.x, target.position.y - 15); ctx.lineTo(target.position.x, target.position.y + 15);
          ctx.stroke();
        }
      }

      // Projectiles
      state.projectiles.forEach(p => {
        if (hasLOS(state.player.position.x, state.player.position.y, p.position.x, p.position.y)) {
          ctx.fillStyle = COLORS.PROJECTILE;
          ctx.beginPath(); ctx.arc(p.position.x, p.position.y, 3, 0, Math.PI * 2); ctx.fill();
        }
      });

      // Enemies
      state.enemies.forEach(e => {
        if (!hasLOS(state.player.position.x, state.player.position.y, e.position.x, e.position.y)) return;
        if (e.state === 'submerged') {
          ctx.strokeStyle = 'rgba(68,255,136,0.3)';
          ctx.beginPath(); ctx.arc(e.position.x, e.position.y, 10 + (frameCountRef.current % 20), 0, Math.PI * 2); ctx.stroke();
          return;
        }
        ctx.save(); ctx.translate(e.position.x, e.position.y); ctx.rotate(e.rotation);
        ctx.fillStyle = e.type === 'warrior' ? COLORS.ENEMY_WARRIOR : e.type === 'scout' ? COLORS.ENEMY_SCOUT : COLORS.ENEMY_WURM;
        if (e.type === 'wurm') {
          for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-i * 10, 0, e.radius - i * 2, 0, Math.PI * 2); ctx.fill(); }
        } else {
          ctx.beginPath(); ctx.moveTo(e.radius, 0); ctx.lineTo(-e.radius, -e.radius); ctx.lineTo(-e.radius, e.radius); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        const healthPct = e.health / e.maxHealth;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(e.position.x - e.radius, e.position.y - e.radius - 8, e.radius * 2, 4);
        ctx.fillStyle = healthPct > 0.5 ? '#44ff88' : healthPct > 0.25 ? '#ffaa00' : '#ff4400';
        ctx.fillRect(e.position.x - e.radius, e.position.y - e.radius - 8, e.radius * 2 * healthPct, 4);
      });

      // Player
      ctx.save();
      ctx.translate(state.player.position.x, state.player.position.y);
      ctx.rotate(state.player.movementRotation);
      ctx.fillStyle = COLORS.PLAYER;
      ctx.shadowBlur = 15; ctx.shadowColor = COLORS.PLAYER;
      ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-12, -12); ctx.lineTo(-8, 0); ctx.lineTo(-12, 12); ctx.closePath(); ctx.fill();
      ctx.restore();

      // Aim line
      ctx.save();
      ctx.translate(state.player.position.x, state.player.position.y);
      ctx.rotate(state.player.aimRotation);
      ctx.strokeStyle = 'rgba(0,255,0,0.3)'; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(200, 0); ctx.stroke();
      ctx.restore();

      // Fog of war
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      const gradient = ctx.createRadialGradient(
        state.player.position.x - cameraRef.current.x, state.player.position.y - cameraRef.current.y, VISION_RANGE * 0.2,
        state.player.position.x - cameraRef.current.x, state.player.position.y - cameraRef.current.y, VISION_RANGE
      );
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.7, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = FOG_COLOR;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(state.player.position.x - cameraRef.current.x, state.player.position.y - cameraRef.current.y, VISION_RANGE, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    };

    const renderLoop = () => { update(); draw(); animationFrameId = requestAnimationFrame(renderLoop); };
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onStateUpdate, scale]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', overflow: 'hidden', background: '#080c08', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};
