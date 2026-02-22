# MECHANICS — V1
### Project Orion | Combat Systems Reference

---

## TABLE OF CONTENTS

1. [Core Concepts](#1-core-concepts)
2. [Action System](#2-action-system)
3. [Skill System](#3-skill-system)
4. [Reload System](#4-reload-system)
5. [Weapon Swap](#5-weapon-swap)
6. [Cooldown System](#6-cooldown-system)
7. [Weapon Definition Schema](#7-weapon-definition-schema)
8. [Reference Example — Gladius (Rifle)](#8-reference-example--gladius-rifle)

---

## 1. CORE CONCEPTS

### Action
The atomic unit of a moveset. An action has a base duration and a typed payload (hit, burst, effect, etc.). Actions are not modified at the definition level — modifications are applied at the skill slot reference level, leaving the source action unchanged.

### Action Modifier
Applied to a skill slot's action reference, not the action definition itself. Controls duration override, repeat count, and timing split. The source action is always preserved.

### Library
An optional pool of swappable action variants scoped to a weapon. Used when a skill needs dynamic or replaceable actions (e.g. burst patterns that change with mods). If no library is referenced, actions in the skill sequence are inline and fixed.

### Skill
One of five slots per weapon, indexed `[0..4]`.
- **Skill 0** — Auto-attack. Single or multi-action chain. Repeatable.
- **Skills 1–4** — Unique, weapon-specific. Variable type and behavior.

### Moveset
The complete set of five skills for a weapon. A full moveset defines the weapon's combat identity. Skills can be altered by weapon modifications.

### Cooldown
A timed lockout on a specific slot, state, or system. Governed by a strict isolation rule — see [Section 6](#6-cooldown-system).

---

## 2. ACTION SYSTEM

### Action Definition

```
action {
  id:             string
  type:           enum [strike, burst, beam, special]
  base_duration:  float (sec)
  payload:        type-specific (see below)
}
```

### Payload Types

```
// Strike — melee
strike_payload {
  anim_tag:     string     // animation identifier e.g. "swing_1"
  hit_count:    int        // hits per execution (default: 1)
  damage_mult:  float
}

// Burst — ranged
burst_payload {
  shot_count:   int
  damage_mult:  float
}
```

### Action Slot Reference
Actions are referenced inside skill sequences via an `action_ref`. This is where per-slot modifications are applied.

```
action_ref {
  action_id:          string
  repeat:             int     // default: 1
  duration_override:  float | null
    // null + repeat > 1: auto = base_duration / repeat
    // explicit value: overrides base for this execution only
}
```

### Double Strike Pattern
When a modifier makes an action a double strike, the action is referenced twice in the same slot at half duration each. This preserves total slot time and creates two independent interrupt windows instead of one longer uninterruptable animation.

```
// Base — no modifier
{ action_id: "swing_1", repeat: 1 }
// → 1 hit at 0.5 sec | 1 interrupt window

// With double-strike modifier
{ action_id: "swing_1", repeat: 2, duration_override: null }
// → 2 hits at 0.25 sec each | 2 interrupt windows
// → total time unchanged: 0.5 sec
// → same animation at 2× speed — no new asset required
// → no hyper armor or i-frames unless explicitly defined
```

**Rule:** `duration_override: null` with `repeat > 1` always auto-divides base duration equally across repetitions, preserving total slot time. If a modifier is intended to add a hit *and* extend total time, an explicit `duration_override` must be set.

---

## 3. SKILL SYSTEM

### Skill Definition

```
skill {
  index:     int [0..4]
  type:      enum [chain, single, held, cooldown]
  sequence:  action_ref[]       // ordered execution list
  cooldown:  float | null       // null for skill_0 (auto-attack)
  library:   library_id | null  // null = all actions are inline
}
```

### Library Definition

```
actions_library {
  id:       string
  actions:  action[]
}
```

Libraries are scoped to a weapon. A skill references a library only when its actions need to be dynamic or swappable via modifications. Most skills use inline fixed actions and do not require a library.

---

## 4. RELOAD SYSTEM

Reload is an automated cooldown state. It is **not** a skill slot and does not consume any of the five moveset slots.

### Trigger
- **Auto** — fires when ammo reaches zero
- **Manual** — player-activated (default keybind: `R`)
- **Both** — default behavior

### Duration Calculation

**Mode: `per_shot` (default)**
```
reload_duration = shots_fired_since_last_reload × scalar
```
Partial chains cost partial reload. Only actual shots fired are counted.

**Mode: `forced_full` (balance flag)**
```
reload_duration = max_shots × scalar
```
Always costs the full magazine reload regardless of shots fired. Applied to specific weapons as a balance decision. Punishes partial chain use and rewards committing to a full sequence before reloading or swapping.

### Reload Cooldown Definition

```
reload_cooldown {
  id:            "reload_{weapon_id}"
  type:          cooldown
  mode:          enum [per_shot, forced_full]
  scalar:        float              // sec per shot
  max_shots:     int                // required for forced_full mode
  trigger:       enum [auto, manual, both]
  keybind:       string             // default "R"
}
```

---

## 5. WEAPON SWAP

Weapon swap is a global player action that switches between equipped weapon sets.

```
weapon_swap_cooldown {
  id:             "weapon_swap"
  type:           cooldown
  base_duration:  5.0 sec
  scope:          global
    // one shared timer — not per-weapon
    // modifiable by cooldown effects (see Section 6)
}
```

### Persistence Rule
Cooldowns are bound to the **weapon**, not the active equipment slot. When a weapon is swapped out:
- All cooldowns on that weapon continue decrementing
- Cooldowns do not reset
- Cooldowns do not pause

When the weapon is re-equipped, its cooldowns reflect actual elapsed time. Weapon swap cannot be used to circumvent or reset reload cooldowns.

---

## 6. COOLDOWN SYSTEM

### Isolation Rule
Cooldowns are independent of all other game systems. They cannot be paused, interrupted, reset, or altered by any effect except those explicitly typed in the **modifier whitelist** below.

The following effect categories have **no interaction** with cooldowns:
- Crowd control (stun, stagger, freeze, silence, root, etc.)
- Damage effects
- Status effects
- Skill effects (unless explicitly cooldown-typed)

### Modifier Whitelist

Only two effect types may modify a cooldown:

```
cooldown_modifier {
  type:     enum [reduction, increase]
    // 'reset' does not exist as an effect type

  value:    float (0.0 – 1.0)
    // 0.50 = 50% reduction or increase
    // 1.00 = 100% (rare — see note below)
    // values > 1.0 are illegal

  window: {
    duration:  float (sec)    // how long this modifier is active
    trigger:   string         // activation condition
  }

  target:   string            // specific cooldown_id, or "all" (rare)
  stacking: multiplicative    // always — no exceptions
}
```

### Stacking Formula
All cooldown modifiers stack **multiplicatively**. Each reduction applies to the remaining value after prior reductions, not to the base. This enforces diminishing returns by construction — no special cap logic required.

```
effective_cooldown = base × (1 - r1) × (1 - r2) × (1 - r3) ...
```

### Stacking Reference Table

| Reductions Active | Value Each | Result on 3.0 sec base | Absolute Gain |
|---|---|---|---|
| 1× 50% | 0.50 | 1.500 sec | −1.500 sec |
| 2× 50% | 0.50 | 0.750 sec | −0.750 sec |
| 3× 50% | 0.50 | 0.375 sec | −0.375 sec |
| 4× 50% | 0.50 | 0.188 sec | −0.188 sec |
| 1× 100% | 1.00 | 0.000 sec | −3.000 sec |
| 50% + 100% | — | 0.000 sec | 100% dominates |

Each additional reduction of the same value yields less absolute benefit than the last. Stacking never reaches zero unless an explicit `value: 1.0` effect is applied.

### Implementation Note
Additive stacking (combining percentages before applying) is explicitly **not supported**. Two 50% reductions must be applied sequentially — `base × 0.5 × 0.5` — never combined as `base × (1 - 1.0)`. This must be enforced at the system level, not assumed from design intent alone.

### Design Notes
- **100% reduction** effects exist but are rare, niche, and situationally specific. The exploit vector is `window.duration`, not `value` — a 100% reduction for 10 seconds on a short cooldown is significantly stronger than the same value for 0.5 seconds.
- **`target: "all"`** modifier scope is substantially stronger than targeted reduction and should be restricted to high-tier feats or items (Tier IV minimum recommended).
- `window.duration` is the primary balance lever for cooldown reduction effects. It is distinct from `value` and should be tuned independently.

---

## 7. WEAPON DEFINITION SCHEMA

Full schema combining all systems above.

```
weapon {
  name:             string
  class:            string         // Rifle, Melee, Launcher, etc.

  library:          actions_library | null

  reload_cooldown: {
    id:             "reload_{weapon_id}"
    type:           cooldown
    mode:           enum [per_shot, forced_full]
    scalar:         float
    max_shots:      int | null     // required if mode: forced_full
    trigger:        enum [auto, manual, both]
    keybind:        string
  }

  moveset: {
    skill_0:  skill    // auto-attack chain
    skill_1:  skill
    skill_2:  skill
    skill_3:  skill
    skill_4:  skill
  }
}
```

---

## 8. REFERENCE EXAMPLE — GLADIUS (RIFLE)

```
weapon {
  name:   "Gladius"
  class:  Rifle

  library: {
    id: "gladius_burst_lib"
    actions: [
      { id: "burst_1", type: burst, base_duration: 0.5, payload: { shot_count: 3 } },
      { id: "burst_2", type: burst, base_duration: 0.5, payload: { shot_count: 2 } },
      { id: "burst_3", type: burst, base_duration: 0.5, payload: { shot_count: 4 } },
    ]
  }

  reload_cooldown: {
    id:        "reload_gladius"
    type:      cooldown
    mode:      per_shot
    scalar:    0.35           // sec per shot fired
    trigger:   both
    keybind:   "R"
    // forced_full: false
  }

  moveset: {

    skill_0: {
      type:     chain
      library:  "gladius_burst_lib"
      sequence: [
        { action_id: "burst_1" },    // 0.5 sec | 3 shots
        { action_id: "burst_1" },    // 0.5 sec | 3 shots
        { action_id: "burst_1" },    // 0.5 sec | 3 shots
      ]
      cooldown: null
      // full chain: 1.5 sec | 9 shots
      // reload (full chain): 9 × 0.35 = 3.15 sec
      // reload (1 burst only): 3 × 0.35 = 1.05 sec
      // reload continues on Gladius if weapon is swapped mid-cooldown
    }

    skill_1: UNDEFINED
    skill_2: UNDEFINED
    skill_3: UNDEFINED
    skill_4: UNDEFINED
  }
}
```

---

*mechanics-v1.md | Project Orion internal documentation*
