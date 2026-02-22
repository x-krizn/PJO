import { ActionType, SkillType, ReloadMode, Weapon } from './types';
import { seededRandom } from './utils/seededRandom';

export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 800;

export const PLAYER_SPEED = 2.2;
export const PLAYER_ROTATION_SPEED = 0.05;
export const PLAYER_MAX_HEALTH = 500;
export const PLAYER_MAX_ENERGY = 100;
export const PLAYER_MAX_HEAT = 100;

export const VISION_RANGE = 350;
export const FOG_COLOR = 'rgba(0, 5, 2, 0.95)';

export const WEAPON_SWAP_DURATION = 5.0;

export const GLADIUS: Weapon = {
  id: 'gladius',
  name: 'Gladius',
  class: 'Rifle',
  library: {
    id: 'gladius_burst_lib',
    actions: [
      {
        id: 'burst_1',
        type: ActionType.BURST,
        base_duration: 0.5,
        payload: { shot_count: 3, damage_mult: 1.0 }
      }
    ]
  },
  reload_cooldown: {
    id: 'reload_gladius',
    mode: ReloadMode.PER_SHOT,
    scalar: 0.35,
    max_shots: 9,
    trigger: 'both',
    keybind: 'R'
  },
  moveset: {
    skill_0: {
      index: 0,
      type: SkillType.CHAIN,
      library: 'gladius_burst_lib',
      sequence: [
        { action_id: 'burst_1', repeat: 1, duration_override: null },
        { action_id: 'burst_1', repeat: 1, duration_override: null },
        { action_id: 'burst_1', repeat: 1, duration_override: null },
      ],
      cooldown: null
    }
  }
};

export const PROJECTILE_SPEED = 6;
export const PROJECTILE_LIFETIME = 180;

export const ENEMY_SPAWN_RATE = 600;
export const AUTO_LOCK_RANGE = 280;
export const AUTO_LOCK_CONE = Math.PI / 8;

export const TILE_SIZE = 64;
export const MAP_WIDTH = 60;
export const MAP_HEIGHT = 60;

export enum TileType {
  GROUND = 0,
  WATER = 1,
  WALL = 2,
  RUIN = 3,
  TREE = 4,
}

export const ENEMY_STATS = {
  WARRIOR: { hp: 800, speed: 1.8, damage: 40, radius: 18, attackRange: 45, attackCooldown: 90 },
  SCOUT:   { hp: 500, speed: 2.5, damage: 25, radius: 14, attackRange: 250, attackCooldown: 120 },
  WURM:    { hp: 1200, speed: 1.2, damage: 60, radius: 22, attackRange: 60, attackCooldown: 180 },
};

export const COLORS = {
  BG: '#080c08',
  PLAYER: '#00ff00',
  ENEMY_WARRIOR: '#ff4400',
  ENEMY_SCOUT: '#ffaa00',
  ENEMY_WURM: '#44ff88',
  PROJECTILE: '#ffff00',
  UI_ACCENT: '#00ff00',
  UI_BG: 'rgba(0, 20, 0, 0.8)',
  GRID: 'rgba(0, 255, 0, 0.05)',
  WATER: 'rgba(13, 58, 34, 0.6)',
  WALL: '#2c2520',
  RUIN: '#201c18',
  TREE: '#0a120a',
};

// ─── Map Seed ────────────────────────────────────────────────────────────────
// Change to any positive integer to get a different map layout.
// P0-B note: resetGame(seed?) will call generateBogMap(seed ?? MAP_SEED)
// to regenerate in-place without a page reload.
export const MAP_SEED = 20260222;

// ─── Map Generator ───────────────────────────────────────────────────────────
// Pure function — rng is scoped to each call so the sequence is always
// fresh regardless of how many times this is called per session.
export function generateBogMap(seed: number): number[][] {
  const rng = seededRandom(seed);
  const map: number[][] = Array(MAP_HEIGHT)
    .fill(0)
    .map(() => Array(MAP_WIDTH).fill(TileType.GROUND));

  // Border walls + sparse cluster pass
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
        map[y][x] = TileType.TREE;
      } else {
        const noise = rng();
        if (noise > 0.96) {
          const size = Math.floor(rng() * 3) + 1;
          const type = rng() > 0.4 ? TileType.TREE : TileType.WATER;
          for (let dy = -size; dy <= size; dy++) {
            for (let dx = -size; dx <= size; dx++) {
              const ny = y + dy;
              const nx = x + dx;
              if (ny > 0 && ny < MAP_HEIGHT - 1 && nx > 0 && nx < MAP_WIDTH - 1) {
                if (rng() > 0.3) map[ny][nx] = type;
              }
            }
          }
        }
      }
    }
  }

  // Central hub / Safe Zone ruins — deterministic, no rng needed
  const centerX = Math.floor(MAP_WIDTH / 2);
  const centerY = Math.floor(MAP_HEIGHT / 2);
  for (let dy = -5; dy <= 5; dy++) {
    for (let dx = -5; dx <= 5; dx++) {
      const y = centerY + dy;
      const x = centerX + dx;
      if (y >= 0 && y < MAP_HEIGHT && x >= 0 && x < MAP_WIDTH) {
        map[y][x] = Math.abs(dx) === 5 || Math.abs(dy) === 5
          ? TileType.WALL
          : TileType.RUIN;
      }
    }
  }
  // Doorways
  map[centerY + 5][centerX] = TileType.RUIN;
  map[centerY - 5][centerX] = TileType.RUIN;

  return map;
}

// ─── Static Map for M00-THE-BOG ──────────────────────────────────────────────
// Generated once at module load. Identical on every reload while MAP_SEED
// is unchanged. P0-B will regenerate this via generateBogMap when needed.
export const BOG_MAP: number[][] = generateBogMap(MAP_SEED);
