import React, { useEffect, useRef, useState } from 'react';
import {
  GameState, Vector2, ActionType, BurstPayload,
  TargetLockMode, ActionBarMode,
} from '../types';
import {
  CANVAS_WIDTH, CANVAS_HEIGHT,
  PLAYER_MAX_HEALTH, PLAYER_MAX_ENERGY, PLAYER_MAX_HEAT,
  COLORS, PLAYER_SPEED, PROJECTILE_SPEED, PROJECTILE_LIFETIME,
  ENEMY_SPAWN_RATE, TileType, TILE_SIZE, MAP_WIDTH, MAP_HEIGHT,
  ENEMY_STATS, AUTO_LOCK_RANGE, AUTO_LOCK_CONE,
  GLADIUS, VISION_RANGE, FOG_COLOR, BOG_MAP,
} from '../constants';

// ── Helpers ──────────────────────────────────────────────────────────────────

const CENTER_X = Math.floor(MAP_WIDTH  / 2);
const CENTER_Y = Math.floor(MAP_HEIGHT / 2);

const createPlayer = () => ({
  id: 'player',
  position: { x: CENTER_X * TILE_SIZE, y: CENTER_Y * TILE_SIZE },
  velocity:  { x: 0, y: 0 },
  rotation: 0, movementRotation: 0, aimRotation: 0,
  radius: 18,
  health: PLAYER_MAX_HEALTH, maxHealth: PLAYER_MAX_HEALTH,
  energy: PLAYER_MAX_ENERGY, maxEnergy: PLAYER_MAX_ENERGY,
  heat: 0,   maxHeat: PLAYER_MAX_HEAT,
  shields: 0, maxShields: 100,
  conditions: [],
  weapons: [GLADIUS], activeWeaponIndex: 0,
  ammo: GLADIUS.reload_cooldown.max_shots,
  cooldowns: {}, activeSkill: null, weaponSwapCooldown: 0,
});

const createEnemy = (id: string, playerPos: Vector2) => {
  const types = ['warrior', 'scout', 'wurm'] as const;
  const type  = types[Math.floor(Math.random() * types.length)];
  const stats = ENEMY_STATS[type.toUpperCase() as 'WARRIOR' | 'SCOUT' | 'WURM'];

  let x = 0, y = 0, validPos = false;
  for (let attempts = 0; attempts < 50 && !validPos; attempts++) {
    const angle = Math.random() * Math.PI * 2;
    const dist  = 800 + Math.random() * 1000;
    x = playerPos.x + Math.cos(angle) * dist;
    y = playerPos.y + Math.sin(angle) * dist;
    const tx = Math.floor(x / TILE_SIZE), ty = Math.floor(y / TILE_SIZE);
    if (tx >= 0 && tx < MAP_WIDTH && ty >= 0 && ty < MAP_HEIGHT &&
        BOG_MAP[ty]?.[tx] === TileType.GROUND) validPos = true;
  }

  return {
    id, position: { x, y }, velocity: { x: 0, y: 0 }, rotation: 0,
    radius: stats.radius, health: stats.hp, maxHealth: stats.hp,
    type, state: 'chase' as const, stateTimer: 0,
  };
};

const checkCollision = (x: number, y: number, radius: number) => {
  const tx = Math.floor(x / TILE_SIZE), ty = Math.floor(y / TILE_SIZE);
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const cx = tx + dx, cy = ty + dy;
    if (cx < 0 || cx >= MAP_WIDTH || cy < 0 || cy >= MAP_HEIGHT) continue;
    const tile = BOG_MAP[cy][cx];
    if (tile === TileType.WALL || tile === TileType.TREE) {
      const dist = Math.hypot(x - (cx * TILE_SIZE + TILE_SIZE / 2),
                              y - (cy * TILE_SIZE + TILE_SIZE / 2));
      if (dist < radius + TILE_SIZE / 2) return true;
    }
  }
  return false;
};

// ── Chain state type ─────────────────────────────────────────────────────────
interface ChainState {
  active:          boolean;
  stepIndex:       number;   // index into skill.sequence
  phaseTimer:      number;   // seconds remaining in current action
  burstShotsFired: number;   // projectiles already spawned in current burst step
  waitingForTap:   boolean;  // TRIGGER mode: chain paused between burst steps
}

// ── Component ────────────────────────────────────────────────────────────────

export const GameCanvas: React.FC<{
  onStateUpdate: (state: GameState) => void;
  moveVector?:     Vector2;
  aimVector?:      Vector2;
  isFiring?:       boolean;
  isMobile?:       boolean;
  // Combat settings — passed from App menu
  targetLockMode?: TargetLockMode;
  autoLockNext?:   boolean;
  actionBarMode?:  ActionBarMode;
  autoAction?:     boolean;
  // Skill button signal — App increments this each time skill 0 is pressed
  skillTrigger?:   number;
}> = ({
  onStateUpdate,
  moveVector, aimVector, isFiring,
  isMobile       = false,
  targetLockMode = TargetLockMode.AUTO,
  autoLockNext   = true,
  actionBarMode  = ActionBarMode.CHAIN,
  autoAction     = false,
  skillTrigger   = 0,
}) => {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Prop mirrors — updated every render, read inside RAF
  const moveVectorRef    = useRef(moveVector);
  const aimVectorRef     = useRef(aimVector);
  const isFiringRef      = useRef(isFiring);
  const targetLockRef    = useRef(targetLockMode);
  const autoLockNextRef  = useRef(autoLockNext);
  const actionBarModeRef = useRef(actionBarMode);
  const autoActionRef    = useRef(autoAction);
  const skillTriggerRef  = useRef(skillTrigger);

  useEffect(() => { moveVectorRef.current    = moveVector;     }, [moveVector]);
  useEffect(() => { aimVectorRef.current     = aimVector;      }, [aimVector]);
  useEffect(() => { isFiringRef.current      = isFiring;       }, [isFiring]);
  useEffect(() => { targetLockRef.current    = targetLockMode; }, [targetLockMode]);
  useEffect(() => { autoLockNextRef.current  = autoLockNext;   }, [autoLockNext]);
  useEffect(() => { actionBarModeRef.current = actionBarMode;  }, [actionBarMode]);
  useEffect(() => { autoActionRef.current    = autoAction;     }, [autoAction]);
  useEffect(() => { skillTriggerRef.current  = skillTrigger;   }, [skillTrigger]);

  // Resize observer — CSS scale to fill container without changing internal resolution
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setScale(Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT));
      }
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  const gameStateRef = useRef<GameState>({
    player: createPlayer(),
    enemies: [], projectiles: [],
    score: 0, targetId: null,
    isGameOver: false, isPaused: false,
    exploredTiles: new Set(), visibleTiles: new Set(),
  });

  const keysRef        = useRef<Set<string>>(new Set());
  const mousePosRef    = useRef<Vector2>({ x: 0, y: 0 });
  const frameCountRef  = useRef(0);
  const shakeRef       = useRef(0);
  const cameraRef      = useRef<Vector2>({ x: 0, y: 0 });
  const shotsFiredRef  = useRef(0);   // for PER_SHOT reload time

  // ── Chain execution state ──────────────────────────────────────────────────
  const chainRef = useRef<ChainState>({
    active: false, stepIndex: 0, phaseTimer: 0,
    burstShotsFired: 0, waitingForTap: false,
  });
  // Detects new skill button presses by comparing to previous value
  const prevSkillTriggerRef = useRef(0);

  // hasLOS — straight-line sight check between two world points
  const hasLOS = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1, dy = y2 - y1;
    const dist  = Math.hypot(dx, dy);
    const steps = Math.ceil(dist / (TILE_SIZE / 4));
    const ttx = Math.floor(x2 / TILE_SIZE), tty = Math.floor(y2 / TILE_SIZE);
    for (let i = 1; i < steps; i++) {
      const tx = Math.floor((x1 + dx * i / steps) / TILE_SIZE);
      const ty = Math.floor((y1 + dy * i / steps) / TILE_SIZE);
      if (tx === ttx && ty === tty) return true;
      if (BOG_MAP[ty]?.[tx] === TileType.WALL || BOG_MAP[ty]?.[tx] === TileType.TREE) return false;
    }
    return true;
  };

  useEffect(() => {
    // ── Keyboard ──────────────────────────────────────────────────────────────
    const handleKeyDown = (e: KeyboardEvent) => keysRef.current.add(e.code);
    const handleKeyUp   = (e: KeyboardEvent) => keysRef.current.delete(e.code);

    // ── Mouse (desktop only) ──────────────────────────────────────────────────
    // Skipped on mobile — browsers synthesize mouse events from touch, which
    // would set Mouse0 in keysRef and trigger the fire handler unintentionally.
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mousePosRef.current = {
        x: (e.clientX - rect.left) / scale + cameraRef.current.x,
        y: (e.clientY - rect.top)  / scale + cameraRef.current.y,
      };
    };
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      keysRef.current.add('Mouse0');
      // Manual target selection on click
      const state = gameStateRef.current;
      const wp    = mousePosRef.current;
      const hit   = state.enemies.find(en =>
        Math.hypot(en.position.x - wp.x, en.position.y - wp.y) < en.radius + 15
      );
      if (hit) state.targetId = hit.id;
    };
    const handleMouseUp = () => keysRef.current.delete('Mouse0');

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup',   handleKeyUp);
    if (!isMobile) {
      window.addEventListener('mousemove',  handleMouseMove);
      window.addEventListener('mousedown',  handleMouseDown);
      window.addEventListener('mouseup',    handleMouseUp);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // ════════════════════════════════════════════════════════════════════════
    //  UPDATE
    // ════════════════════════════════════════════════════════════════════════
    const update = () => {
      const state = gameStateRef.current;
      if (state.isGameOver || state.isPaused) return;

      const dt = 1 / 60;
      frameCountRef.current++;
      if (shakeRef.current > 0) shakeRef.current -= 0.5;

      const weapon     = state.player.weapons[state.player.activeWeaponIndex];
      const reloadId   = weapon.reload_cooldown.id;
      const isReloading = !!state.player.cooldowns[reloadId];

      // ── Cooldown tick ──────────────────────────────────────────────────────
      for (const id of Object.keys(state.player.cooldowns)) {
        const cd = state.player.cooldowns[id];
        cd.remaining -= dt;
        if (cd.remaining <= 0) {
          delete state.player.cooldowns[id];
          if (id.startsWith('reload_')) {
            state.player.ammo = weapon.reload_cooldown.max_shots;
            shotsFiredRef.current = 0;
            // Auto-action: restart chain after reload if enabled
            if (autoActionRef.current && !chainRef.current.active) {
              startChain();
            }
          }
        }
      }
      if (state.player.weaponSwapCooldown > 0) state.player.weaponSwapCooldown -= dt;

      // ── P2-A: energy regen (+2/sec) ───────────────────────────────────────
      state.player.energy = Math.min(state.player.maxEnergy, state.player.energy + 2 * dt);
      // ── P2-B: heat cooling (−5/sec) ───────────────────────────────────────
      state.player.heat   = Math.max(0, state.player.heat - 5 * dt);

      // ── Movement ──────────────────────────────────────────────────────────
      let moveX = (keysRef.current.has('KeyD') ? 1 : 0) - (keysRef.current.has('KeyA') ? 1 : 0);
      let moveY = (keysRef.current.has('KeyS') ? 1 : 0) - (keysRef.current.has('KeyW') ? 1 : 0);
      const mv = moveVectorRef.current;
      if (mv && (Math.abs(mv.x) > 0.1 || Math.abs(mv.y) > 0.1)) { moveX = mv.x; moveY = mv.y; }

      const speedMult = state.player.heat >= state.player.maxHeat ? 0.3 : 1.0;
      state.player.velocity.x += (moveX * PLAYER_SPEED * speedMult - state.player.velocity.x) * 0.1;
      state.player.velocity.y += (moveY * PLAYER_SPEED * speedMult - state.player.velocity.y) * 0.1;

      if (Math.abs(state.player.velocity.x) > 0.1 || Math.abs(state.player.velocity.y) > 0.1)
        state.player.movementRotation = Math.atan2(state.player.velocity.y, state.player.velocity.x);

      const nx = state.player.position.x + state.player.velocity.x;
      const ny = state.player.position.y + state.player.velocity.y;
      if (!checkCollision(nx, state.player.position.y, state.player.radius)) state.player.position.x = nx;
      else state.player.velocity.x = 0;
      if (!checkCollision(state.player.position.x, ny, state.player.radius)) state.player.position.y = ny;
      else state.player.velocity.y = 0;

      cameraRef.current.x = state.player.position.x - CANVAS_WIDTH  / 2;
      cameraRef.current.y = state.player.position.y - CANVAS_HEIGHT / 2;

      // ── Fog of war ─────────────────────────────────────────────────────────
      state.visibleTiles.clear();
      const ptx   = Math.floor(state.player.position.x / TILE_SIZE);
      const pty   = Math.floor(state.player.position.y / TILE_SIZE);
      const vRange = Math.ceil(VISION_RANGE / TILE_SIZE) + 1;
      for (let dy = -vRange; dy <= vRange; dy++) for (let dx = -vRange; dx <= vRange; dx++) {
        const tx = ptx + dx, ty = pty + dy;
        if (tx < 0 || tx >= MAP_WIDTH || ty < 0 || ty >= MAP_HEIGHT) continue;
        const wx = tx * TILE_SIZE + TILE_SIZE / 2, wy = ty * TILE_SIZE + TILE_SIZE / 2;
        if (Math.hypot(wx - state.player.position.x, wy - state.player.position.y) <= VISION_RANGE + TILE_SIZE) {
          if (hasLOS(state.player.position.x, state.player.position.y, wx, wy)) {
            const key = `${tx},${ty}`;
            state.visibleTiles.add(key); state.exploredTiles.add(key);
          }
        }
      }

      // ── Aim ────────────────────────────────────────────────────────────────
      const av = aimVectorRef.current;
      if (av && (Math.abs(av.x) > 0.1 || Math.abs(av.y) > 0.1)) {
        state.player.aimRotation = Math.atan2(av.y, av.x);
      } else if (!isMobile) {
        state.player.aimRotation = Math.atan2(
          mousePosRef.current.y - state.player.position.y,
          mousePosRef.current.x - state.player.position.x,
        );
      }

      // ── Target lock ────────────────────────────────────────────────────────
      // AUTO  — nearest enemy in range, no facing requirement
      // SEMI  — nearest enemy in range AND within aim cone
      // MANUAL — never auto-select; only changed via click/tap (handled in mousedown)
      const lockMode = targetLockRef.current;

      if (lockMode !== TargetLockMode.MANUAL) {
        // Verify current target still exists and is in range + LOS
        if (state.targetId) {
          const tgt = state.enemies.find(e => e.id === state.targetId);
          if (!tgt) {
            state.targetId = null;
          } else {
            const d = Math.hypot(tgt.position.x - state.player.position.x,
                                 tgt.position.y - state.player.position.y);
            if (d > AUTO_LOCK_RANGE || !hasLOS(state.player.position.x, state.player.position.y,
                                                tgt.position.x, tgt.position.y)) {
              state.targetId = null;
            }
          }
        }

        // Scan for best target if none locked
        if (!state.targetId) {
          let best: string | null = null;
          let bestDist = AUTO_LOCK_RANGE;
          for (const e of state.enemies) {
            const d = Math.hypot(e.position.x - state.player.position.x,
                                 e.position.y - state.player.position.y);
            if (d >= bestDist) continue;
            if (!hasLOS(state.player.position.x, state.player.position.y,
                        e.position.x, e.position.y)) continue;
            if (lockMode === TargetLockMode.SEMI) {
              const angle     = Math.atan2(e.position.y - state.player.position.y,
                                           e.position.x - state.player.position.x);
              const angleDiff = Math.abs(
                ((angle - state.player.aimRotation) + Math.PI * 3) % (Math.PI * 2) - Math.PI
              );
              if (angleDiff > AUTO_LOCK_CONE) continue;
            }
            bestDist = d; best = e.id;
          }
          state.targetId = best;
        }
      } else {
        // MANUAL: only validate existing target (remove if dead/gone, don't pick new)
        if (state.targetId && !state.enemies.find(e => e.id === state.targetId)) {
          state.targetId = null;
        }
      }

      // ── P1-C: Manual reload (R key) ────────────────────────────────────────
      if (keysRef.current.has('KeyR')) {
        if (!state.player.cooldowns['_rProcessed']) {
          state.player.cooldowns['_rProcessed'] = { id: '_rProcessed', remaining: 9999, total: 9999 };
          if (!isReloading && state.player.ammo < weapon.reload_cooldown.max_shots) {
            const shots    = shotsFiredRef.current > 0 ? shotsFiredRef.current : weapon.reload_cooldown.max_shots;
            const reloadMs = shots * weapon.reload_cooldown.scalar;
            state.player.cooldowns[reloadId] = { id: reloadId, remaining: reloadMs, total: reloadMs };
            chainRef.current = { active: false, stepIndex: 0, phaseTimer: 0, burstShotsFired: 0, waitingForTap: false };
          }
        }
      } else {
        delete state.player.cooldowns['_rProcessed'];
      }

      // ── Chain executor ─────────────────────────────────────────────────────
      //
      // Skill 0 (GLADIUS):
      //   sequence = [burst, recoil, burst, recoil, burst, recoil, burst, recoil, burst]
      //
      // CHAIN mode:  one trigger → auto-executes all steps in order
      // TRIGGER mode: each trigger advances one burst step; recoil is auto-played
      //
      // Fire button (isFiring / Mouse0 / Space) also starts the chain in CHAIN mode.
      // In TRIGGER mode the fire button is treated as one tap.
      //
      const skill     = weapon.moveset.skill_0;
      const library   = weapon.library;
      const chain     = chainRef.current;
      const newTrigger = skillTriggerRef.current !== prevSkillTriggerRef.current;

      // Also treat fire input as a trigger signal
      const fireInput = isFiringRef.current
        || (!isMobile && keysRef.current.has('Mouse0'))
        || keysRef.current.has('Space');

      // Determine if a trigger event occurred this frame
      // (fire input only triggers once per press — track with a ref)
      const fireWasPressedRef = (update as any)._fireWasPressed ?? false;
      const fireJustPressed   = fireInput && !fireWasPressedRef;
      (update as any)._fireWasPressed = fireInput;

      const triggered = newTrigger || fireJustPressed;
      if (newTrigger) prevSkillTriggerRef.current = skillTriggerRef.current;

      if (!isReloading && state.player.ammo > 0) {
        if (!chain.active && triggered) {
          startChain();
        } else if (chain.active && chain.waitingForTap && triggered) {
          // TRIGGER mode: player tapped — advance to next burst step
          advanceChain(state, dt);
        }
      }

      // Run active chain
      if (chain.active && !isReloading) {
        tickChain(state, dt);
      }

      // Helper: spawn a single player projectile at given angle
      function spawnProjectile(angle: number) {
        const spread = 0;    // individual shot spread within a burst — can add later
        const a = angle + spread;
        state.projectiles.push({
          id:       `proj-${Date.now()}-${Math.random()}`,
          position: { ...state.player.position },
          velocity: { x: Math.cos(a) * PROJECTILE_SPEED, y: Math.sin(a) * PROJECTILE_SPEED },
          damage:   50,
          ownerId:  'player',
          lifeTime: PROJECTILE_LIFETIME,
        });
        state.player.ammo--;
        shotsFiredRef.current++;
        state.player.energy = Math.max(0, state.player.energy - 5);
        state.player.heat   = Math.min(state.player.maxHeat, state.player.heat + 8);
        shakeRef.current    = 3;
      }

      function startChain() {
        if (!library || !skill.sequence.length) return;
        chainRef.current = {
          active: true, stepIndex: 0,
          phaseTimer: getStepDuration(0),
          burstShotsFired: 0, waitingForTap: false,
        };
      }

      function getStepDuration(index: number): number {
        if (!library) return 0;
        const ref    = skill.sequence[index];
        const action = library.actions.find(a => a.id === ref.action_id);
        return ref.duration_override ?? action?.base_duration ?? 0;
      }

      function getStepAction(index: number) {
        if (!library) return null;
        const ref = skill.sequence[index];
        return library.actions.find(a => a.id === ref.action_id) ?? null;
      }

      function advanceChain(s: GameState, _dt: number) {
        const next = chainRef.current.stepIndex + 1;
        if (next >= skill.sequence.length) { endChain(s); return; }
        chainRef.current.stepIndex       = next;
        chainRef.current.phaseTimer      = getStepDuration(next);
        chainRef.current.burstShotsFired = 0;
        chainRef.current.waitingForTap   = false;
      }

      function endChain(s: GameState) {
        chainRef.current.active      = false;
        chainRef.current.waitingForTap = false;
        // Trigger PER_SHOT reload
        const shots     = shotsFiredRef.current > 0 ? shotsFiredRef.current : weapon.reload_cooldown.max_shots;
        const reloadTime = shots * weapon.reload_cooldown.scalar;
        s.player.cooldowns[reloadId] = { id: reloadId, remaining: reloadTime, total: reloadTime };
      }

      function tickChain(s: GameState, tickDt: number) {
        const ch     = chainRef.current;
        const action = getStepAction(ch.stepIndex);
        if (!action) { endChain(s); return; }

        const prevTimer  = ch.phaseTimer;
        ch.phaseTimer   -= tickDt;
        const elapsed    = getStepDuration(ch.stepIndex) - Math.max(0, ch.phaseTimer);

        if (action.type === ActionType.BURST) {
          const payload    = action.payload as BurstPayload;
          const shotCount  = payload.shot_count;
          const duration   = action.base_duration;
          // Distribute shots evenly across the burst window
          // Shot i fires at elapsed ≥ (i / shotCount) * duration
          for (let i = ch.burstShotsFired; i < shotCount; i++) {
            const shotTime = (i / shotCount) * duration;
            if (elapsed >= shotTime && s.player.ammo > 0) {
              spawnProjectile(s.player.aimRotation);
              ch.burstShotsFired++;
            }
          }

          if (ch.phaseTimer <= 0) {
            // Burst step complete
            const nextIndex = ch.stepIndex + 1;
            if (nextIndex >= skill.sequence.length) {
              endChain(s);
            } else {
              const nextAction = getStepAction(nextIndex);
              if (nextAction?.type === ActionType.RECOIL) {
                // Auto-advance through recoil regardless of mode
                ch.stepIndex       = nextIndex;
                ch.phaseTimer      = getStepDuration(nextIndex);
                ch.burstShotsFired = 0;
                ch.waitingForTap   = false;
              } else {
                if (actionBarModeRef.current === ActionBarMode.TRIGGER) {
                  // Pause at end of this burst — wait for next player tap
                  ch.phaseTimer    = 0;
                  ch.waitingForTap = true;
                } else {
                  // Chain mode: auto-advance
                  ch.stepIndex       = nextIndex;
                  ch.phaseTimer      = getStepDuration(nextIndex);
                  ch.burstShotsFired = 0;
                }
              }
            }
          }
        } else if (action.type === ActionType.RECOIL) {
          if (ch.phaseTimer <= 0) {
            const nextIndex = ch.stepIndex + 1;
            if (nextIndex >= skill.sequence.length) {
              endChain(s);
            } else {
              if (actionBarModeRef.current === ActionBarMode.TRIGGER) {
                // After recoil in TRIGGER mode: wait for player tap
                ch.phaseTimer    = 0;
                ch.waitingForTap = true;
              } else {
                ch.stepIndex       = nextIndex;
                ch.phaseTimer      = getStepDuration(nextIndex);
                ch.burstShotsFired = 0;
              }
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

      // ── Enemy AI ───────────────────────────────────────────────────────────
      state.enemies.forEach(enemy => {
        if (enemy.stateTimer && enemy.stateTimer > 0) enemy.stateTimer--;
        const stats = ENEMY_STATS[enemy.type.toUpperCase() as 'WARRIOR' | 'SCOUT' | 'WURM'];
        const distToPlayer = Math.hypot(enemy.position.x - state.player.position.x,
                                        enemy.position.y - state.player.position.y);
        const canSee = distToPlayer < VISION_RANGE &&
                       hasLOS(enemy.position.x, enemy.position.y,
                              state.player.position.x, state.player.position.y);

        if (enemy.state === 'chase' && !canSee) enemy.state = 'idle';
        else if (enemy.state === 'idle' && canSee) enemy.state = 'chase';

        const angle = Math.atan2(state.player.position.y - enemy.position.y,
                                 state.player.position.x - enemy.position.x);
        enemy.rotation = angle;

        if (enemy.state === 'chase') {
          const ex = enemy.position.x + Math.cos(angle) * stats.speed;
          const ey = enemy.position.y + Math.sin(angle) * stats.speed;
          if (!checkCollision(ex, enemy.position.y, enemy.radius)) enemy.position.x = ex;
          if (!checkCollision(enemy.position.x, ey, enemy.radius)) enemy.position.y = ey;
        }

        if (enemy.state === 'attack' || (enemy.type === 'warrior' && distToPlayer < stats.attackRange)) {
          if (!enemy.stateTimer || enemy.stateTimer <= 0) {
            if (enemy.type === 'scout') {
              state.projectiles.push({
                id: `en-${Date.now()}-${enemy.id}`, position: { ...enemy.position },
                velocity: { x: Math.cos(angle) * PROJECTILE_SPEED * 0.8,
                            y: Math.sin(angle) * PROJECTILE_SPEED * 0.8 },
                damage: stats.damage, ownerId: enemy.id, lifeTime: PROJECTILE_LIFETIME,
              });
            } else if (distToPlayer < enemy.radius + state.player.radius + 5) {
              state.player.health -= stats.damage;
              shakeRef.current = 10;
            }
            enemy.stateTimer = stats.attackCooldown;
          }
        }
        if (state.player.health <= 0) state.isGameOver = true;
      });

      // ── Projectile collision + auto-lock-next ──────────────────────────────
      state.projectiles = state.projectiles.filter(p => {
        if (p.ownerId !== 'player') {
          const d = Math.hypot(p.position.x - state.player.position.x,
                               p.position.y - state.player.position.y);
          if (d < state.player.radius + 5) {
            state.player.health -= p.damage; shakeRef.current = 5; return false;
          }
          return true;
        }

        let hit = false;
        state.enemies = state.enemies.filter(e => {
          const d = Math.hypot(p.position.x - e.position.x, p.position.y - e.position.y);
          if (d >= e.radius + 5) return true;

          // ── Auto-lock-next ───────────────────────────────────────────────
          // When a shot connects: if autoLockNext is on and this enemy is a
          // viable target (range + LOS), promote it to locked target.
          if (autoLockNextRef.current && targetLockRef.current !== TargetLockMode.MANUAL) {
            const distToPlayer = Math.hypot(e.position.x - state.player.position.x,
                                            e.position.y - state.player.position.y);
            if (distToPlayer <= AUTO_LOCK_RANGE &&
                hasLOS(state.player.position.x, state.player.position.y, e.position.x, e.position.y)) {
              state.targetId = e.id;
            }
          }

          if (e.state === 'submerged') { e.state = 'emerging'; e.stateTimer = 30; }
          e.health -= p.damage;
          hit = true;
          if (e.health <= 0) {
            state.score += 100;
            if (state.targetId === e.id) state.targetId = null;
            return false;
          }
          return true;
        });
        return !hit;
      });

      onStateUpdate({ ...state });
    }; // end update

    // ════════════════════════════════════════════════════════════════════════
    //  DRAW
    // ════════════════════════════════════════════════════════════════════════
    const draw = () => {
      const state = gameStateRef.current;
      ctx.save();
      if (shakeRef.current > 0)
        ctx.translate((Math.random() - 0.5) * shakeRef.current,
                      (Math.random() - 0.5) * shakeRef.current);

      ctx.translate(-cameraRef.current.x, -cameraRef.current.y);
      ctx.fillStyle = COLORS.BG;
      ctx.fillRect(cameraRef.current.x, cameraRef.current.y, CANVAS_WIDTH, CANVAS_HEIGHT);

      const startX = Math.max(0, Math.floor(cameraRef.current.x / TILE_SIZE));
      const endX   = Math.min(MAP_WIDTH, Math.ceil((cameraRef.current.x + CANVAS_WIDTH) / TILE_SIZE));
      const startY = Math.max(0, Math.floor(cameraRef.current.y / TILE_SIZE));
      const endY   = Math.min(MAP_HEIGHT, Math.ceil((cameraRef.current.y + CANVAS_HEIGHT) / TILE_SIZE));

      for (let y = startY; y < endY; y++) for (let x = startX; x < endX; x++) {
        const key = `${x},${y}`;
        if (!state.exploredTiles.has(key)) continue;
        const isVisible = state.visibleTiles.has(key);
        const tile = BOG_MAP[y][x];

        if (tile === TileType.GROUND) {
          if (isVisible) { ctx.fillStyle = 'rgba(255,255,255,0.02)'; ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE); }
          continue;
        }
        ctx.fillStyle =
          tile === TileType.WATER ? COLORS.WATER :
          tile === TileType.WALL  ? COLORS.WALL  :
          tile === TileType.RUIN  ? COLORS.RUIN  : COLORS.TREE;

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

      // Target indicator + lock ring
      if (state.targetId) {
        const tgt = state.enemies.find(e => e.id === state.targetId);
        if (tgt && hasLOS(state.player.position.x, state.player.position.y, tgt.position.x, tgt.position.y)) {
          // Pulsing outer ring
          const pulse = 0.5 + 0.5 * Math.sin(frameCountRef.current * 0.1);
          ctx.strokeStyle = `rgba(255,${Math.floor(50 + pulse * 50)},0,${0.6 + pulse * 0.4})`;
          ctx.lineWidth   = 1.5;
          ctx.beginPath(); ctx.arc(tgt.position.x, tgt.position.y, tgt.radius + 10 + pulse * 3, 0, Math.PI * 2); ctx.stroke();
          // Crosshair
          ctx.strokeStyle = '#ff3300'; ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(tgt.position.x - 14, tgt.position.y); ctx.lineTo(tgt.position.x + 14, tgt.position.y);
          ctx.moveTo(tgt.position.x, tgt.position.y - 14); ctx.lineTo(tgt.position.x, tgt.position.y + 14);
          ctx.stroke();
        }
      }

      // Projectiles
      state.projectiles.forEach(p => {
        if (!hasLOS(state.player.position.x, state.player.position.y, p.position.x, p.position.y)) return;
        ctx.fillStyle = p.ownerId === 'player' ? COLORS.PROJECTILE : '#ff6666';
        ctx.beginPath(); ctx.arc(p.position.x, p.position.y, 3, 0, Math.PI * 2); ctx.fill();
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
        ctx.fillStyle = e.type === 'warrior' ? COLORS.ENEMY_WARRIOR :
                        e.type === 'scout'   ? COLORS.ENEMY_SCOUT   : COLORS.ENEMY_WURM;
        if (e.type === 'wurm') {
          for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(-i * 10, 0, e.radius - i * 2, 0, Math.PI * 2); ctx.fill(); }
        } else {
          ctx.beginPath(); ctx.moveTo(e.radius, 0); ctx.lineTo(-e.radius, -e.radius); ctx.lineTo(-e.radius, e.radius); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        const hp = e.health / e.maxHealth;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(e.position.x - e.radius, e.position.y - e.radius - 8, e.radius * 2, 4);
        ctx.fillStyle = hp > 0.5 ? '#44ff88' : hp > 0.25 ? '#ffaa00' : '#ff4400';
        ctx.fillRect(e.position.x - e.radius, e.position.y - e.radius - 8, e.radius * 2 * hp, 4);
      });

      // Player
      ctx.save();
      ctx.translate(state.player.position.x, state.player.position.y);
      ctx.rotate(state.player.movementRotation);
      ctx.fillStyle = COLORS.PLAYER; ctx.shadowBlur = 15; ctx.shadowColor = COLORS.PLAYER;
      ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-12, -12); ctx.lineTo(-8, 0); ctx.lineTo(-12, 12); ctx.closePath(); ctx.fill();
      ctx.restore();

      // Aim line — color indicates chain phase
      const chain = chainRef.current;
      const aimColor = chain.active && !chain.waitingForTap
        ? 'rgba(255,200,0,0.5)'   // firing — amber
        : chain.waitingForTap
          ? 'rgba(0,150,255,0.4)' // waiting for tap — blue
          : 'rgba(0,255,0,0.25)'; // idle — green
      ctx.save();
      ctx.translate(state.player.position.x, state.player.position.y);
      ctx.rotate(state.player.aimRotation);
      ctx.strokeStyle = aimColor; ctx.lineWidth = 1; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(200, 0); ctx.stroke();
      ctx.restore();

      // Fog of war
      ctx.save();
      ctx.globalCompositeOperation = 'multiply';
      const grad = ctx.createRadialGradient(
        state.player.position.x - cameraRef.current.x, state.player.position.y - cameraRef.current.y, VISION_RANGE * 0.2,
        state.player.position.x - cameraRef.current.x, state.player.position.y - cameraRef.current.y, VISION_RANGE
      );
      grad.addColorStop(0,   'rgba(255,255,255,1)');
      grad.addColorStop(0.7, 'rgba(255,255,255,0.4)');
      grad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = FOG_COLOR;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(state.player.position.x - cameraRef.current.x,
              state.player.position.y - cameraRef.current.y, VISION_RANGE, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
    };

    const renderLoop = () => { update(); draw(); animationFrameId = requestAnimationFrame(renderLoop); };
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup',   handleKeyUp);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup',   handleMouseUp);
      }
    };
  }, [onStateUpdate, scale, isMobile]);

  return (
    <div ref={wrapperRef} style={{
      width: '100%', height: '100%', overflow: 'hidden', background: '#080c08',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
        style={{ transform: `scale(${scale})`, transformOrigin: 'center center', imageRendering: 'pixelated' }}
      />
    </div>
  );
};
