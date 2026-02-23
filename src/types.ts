export interface Vector2 {
  x: number;
  y: number;
}

export interface Entity {
  id: string;
  position: Vector2;
  velocity: Vector2;
  rotation: number;
  radius: number;
  health: number;
  maxHealth: number;
}

export enum ActionType {
  STRIKE  = 'strike',
  BURST   = 'burst',
  BEAM    = 'beam',
  SPECIAL = 'special',
  RECOIL  = 'recoil',  // Pause between burst steps — no projectiles, just wait
}

export interface StrikePayload {
  anim_tag: string;
  hit_count: number;
  damage_mult: number;
}

export interface BurstPayload {
  shot_count: number;
  damage_mult: number;
}

export interface Action {
  id: string;
  type: ActionType;
  base_duration: number; // seconds
  payload: StrikePayload | BurstPayload | Record<string, never>;
}

export interface ActionRef {
  action_id: string;
  repeat: number;
  duration_override: number | null;
}

export interface ActionLibrary {
  id: string;
  actions: Action[];
}

export enum SkillType {
  CHAIN    = 'chain',
  SINGLE   = 'single',
  HELD     = 'held',
  COOLDOWN = 'cooldown',
}

export interface Skill {
  index: number;
  type: SkillType;
  sequence: ActionRef[];
  cooldown: number | null;
  library: string | null;
}

export enum ReloadMode {
  PER_SHOT    = 'per_shot',
  FORCED_FULL = 'forced_full',
}

export interface ReloadCooldown {
  id: string;
  mode: ReloadMode;
  scalar: number;   // seconds per shot
  max_shots: number;
  trigger: 'auto' | 'manual' | 'both';
  keybind: string;
}

export interface Weapon {
  id: string;
  name: string;
  class: string;
  library: ActionLibrary | null;
  reload_cooldown: ReloadCooldown;
  moveset: {
    skill_0: Skill;
    skill_1?: Skill;
    skill_2?: Skill;
    skill_3?: Skill;
    skill_4?: Skill;
  };
}

export interface CooldownState {
  id: string;
  remaining: number;
  total: number;
}

export interface ActiveSkillState {
  skillIndex: number;
  actionIndex: number;  // index into skill.sequence
  repeatIndex: number;
  timer: number;        // seconds remaining in current action
  totalActionTime: number;
}

export interface Condition {
  id: string;
  type: 'positive' | 'negative';
  label: string;
  icon?: string;
  duration?: number;
}

// ── Combat settings enums ───────────────────────────────────────────────────

export enum TargetLockMode {
  // Nearest enemy in AUTO_LOCK_RANGE — no facing requirement
  AUTO   = 'auto',
  // Nearest enemy in range AND within AUTO_LOCK_CONE of aim direction
  SEMI   = 'semi',
  // No auto-selection — targets must be tapped/clicked manually
  MANUAL = 'manual',
}

export enum ActionBarMode {
  // One tap per burst step — player must tap skill 5× to complete chain
  TRIGGER = 'trigger',
  // One tap executes the full chain automatically
  CHAIN   = 'chain',
}

export interface Player extends Entity {
  movementRotation: number;
  aimRotation: number;
  energy: number;
  maxEnergy: number;
  heat: number;
  maxHeat: number;
  shields: number;
  maxShields: number;
  conditions: Condition[];

  weapons: Weapon[];
  activeWeaponIndex: number;
  ammo: number;
  cooldowns: Record<string, CooldownState>;
  activeSkill: ActiveSkillState | null;
  weaponSwapCooldown: number;
}

export interface Enemy extends Entity {
  type: 'scout' | 'warrior' | 'wurm' | 'boss';
  targetId?: string;
  state?: 'idle' | 'chase' | 'attack' | 'submerged' | 'emerging';
  stateTimer?: number;
}

export interface Projectile {
  id: string;
  position: Vector2;
  velocity: Vector2;
  damage: number;
  ownerId: string;
  lifeTime: number;
}

export interface GameState {
  player: Player;
  enemies: Enemy[];
  projectiles: Projectile[];
  score: number;
  targetId: string | null;
  isGameOver: boolean;
  isPaused: boolean;
  exploredTiles: Set<string>;
  visibleTiles: Set<string>;
}
