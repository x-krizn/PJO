# PROJECT ORION — TECHNICAL TODO
*Last Updated: 2026-02-22*
*Version: 004.0 — Full Build Audit + Pre-Alpha Roadmap*

---

## BUILD AUDIT SUMMARY

This document reflects a line-by-line audit of all source files conducted on 2026-02-22.
Sources audited: `types.ts`, `constants.ts`, `App.tsx`, `GameCanvas.tsx`, `HUD.tsx`,
`Radar.tsx`, `Joystick.tsx`, `FireButton.tsx`, `mechanics-v1.md`.

Evidence tier for all items below: **Tier 1 — source code or official project docs**.
No claims are inferred from prior todo documents without independent verification.

---

## COMPLETED (INHERITED FROM todo-003)

- [x] Fixed `package.json` syntax error
- [x] Removed dead dependencies (`babylonjs`, `idb`)
- [x] Fixed `vite.config.ts` — Tailwind v4 plugin
- [x] Fixed service worker double registration
- [x] Fixed `public/manifest.json` icon paths
- [x] Fixed canvas scaling — `ResizeObserver` + CSS `scale()`
- [x] Fixed SW generation — `injectManifest` strategy
- [x] Fixed mouse coordinate calculation for CSS scale
- [x] Wired `AUTO_LOCK_CONE` — was defined, never applied
- [x] Wired `FOG_COLOR` — now used correctly
- [x] Wired firing cooldown and ammo decrement
- [x] Deployed to GitHub Pages as installable PWA
- [x] Fixed PWA orientation (`landscape` → `any`)
- [x] Deleted `codebase-dump.txt`, `server.ts`, `metadata.json`
- [x] Updated README.md
- [x] Added `.gitignore` entry for `*.txt` dumps

---

## VERIFIED WORKING

| System | Status | Verified In |
|---|---|---|
| GitHub Pages deploy (Actions) | ✅ | deploy.yml |
| PWA install (Android + Desktop) | ✅ | manifest.json + sw.ts |
| Service worker / offline cache | ✅ | vite.config.ts injectManifest |
| Tailwind v4 styling | ✅ | vite.config.ts |
| Canvas rendering + viewport culling | ✅ | GameCanvas.tsx draw() |
| Fog of war (LOS raycasting) | ✅ | GameCanvas.tsx hasLOS() |
| Radar component | ✅ | Radar.tsx |
| Mobile dual joystick | ✅ | Joystick.tsx |
| Desktop WASD + mouse aim | ✅ | GameCanvas.tsx keysRef |
| Enemy spawn + basic chase AI | ✅ | GameCanvas.tsx createEnemy() |
| Projectile collision | ✅ | GameCanvas.tsx update() |
| Screen shake | ✅ | GameCanvas.tsx shakeRef |
| HUD health bar | ✅ | HUD.tsx |
| Ammo pips + reload progress bar | ✅ | HUD.tsx |
| Overheat speed penalty (reads heat) | ✅ | GameCanvas.tsx speedMult |
| Cooldown system (tick + expiry) | ✅ | GameCanvas.tsx cooldowns loop |
| Per-shot reload trigger on ammo=0 | ✅ | GameCanvas.tsx fire handler |
| Ammo restore on reload expiry | ✅ | GameCanvas.tsx cooldowns loop |

---

## AUDIT FINDINGS — BUGS NOT IN PRIOR TODO

These were discovered during the 2026-02-22 source audit and were not documented in todo-003.

### F-01 — `shot_count` from BurstPayload is ignored
**File:** `GameCanvas.tsx` — fire handler
**Detail:** `burst_1` defines `payload: { shot_count: 3 }`. The fire handler spawns exactly
one projectile per trigger. `BurstPayload` is imported but `payload.shot_count` is never
read. The combat loop is silently single-shot, not a 3-round burst as designed.
**Impact:** Core weapon behavior is wrong. GLADIUS plays like a single-fire pistol.

### F-02 — Reload mode is effectively FORCED_FULL despite PER_SHOT definition
**File:** `GameCanvas.tsx` — fire handler
**Detail:** `reloadTime = weapon.reload_cooldown.max_shots * weapon.reload_cooldown.scalar`
always uses `max_shots` (9), ignoring shots actually fired. The weapon is defined as
`ReloadMode.PER_SHOT` in `constants.ts`. A `shots_fired_since_last_reload` counter does
not exist. Partial chains always cost a full 9-shot reload (3.15 sec).
**Impact:** `mechanics-v1.md` PER_SHOT spec is not implemented.

### F-03 — Manual reload (R key) not wired
**File:** `GameCanvas.tsx` — update()
**Detail:** `ReloadCooldown.keybind` is defined as `'R'` in the GLADIUS definition.
`keysRef` is never checked for `'KeyR'`. Manual reload cannot be triggered.

### F-04 — Health display in HUD shows raw number, not percentage
**File:** `HUD.tsx` — both compact and full modes
**Detail:** `{Math.ceil(player.health)}%` outputs `"500%"` at full health (max is 500).
Should be `{Math.ceil((player.health / player.maxHealth) * 100)}%`.
**Impact:** Cosmetic but misleading.

### F-05 — FireButton has no mouse event handlers
**File:** `FireButton.tsx`
**Detail:** Only `onTouchStart`/`onTouchEnd` are handled. The button is inert on desktop.
Desktop fire works via `Mouse0` on the `window` listener so gameplay is unaffected, but
the button provides no visual feedback on desktop click.
**Impact:** Minor — cosmetic dead button on desktop.

### F-06 — External CDN texture dependency
**File:** `App.tsx`
**Detail:** `https://www.transparenttextures.com/patterns/carbon-fibre.png` is fetched
at runtime as a background texture. If the external CDN is unavailable the request fails
silently. Network request fires on every session start.
**Fragility:** FRAGILE — external runtime dependency in a PWA.
**Fix:** Download texture to `public/` and reference locally.

### F-07 — `Joystick.tsx` stale-closure risk in `resetTrigger` useEffect
**File:** `Joystick.tsx`
**Detail:** `useEffect` for `resetTrigger` omits `onMove` and `onEnd` from its dependency
array. If callback identity changes between renders, the effect uses stale versions.
Currently OK because both callbacks are stable, but technically incorrect.
**Impact:** Low — ESLint warning, latent risk.

### F-08 — `Radar.tsx` uses `ctx.createConicGradient`
**File:** `Radar.tsx`
**Detail:** `createConicGradient` requires Chrome 99+, Firefox 112+, Safari 16.4+.
Acceptable for a modern mobile PWA but worth noting for any older device support.
**Fragility:** Low risk for current targets.

---

## CRITICAL — OPEN BUGS (INHERITED + VERIFIED)

These were in todo-003 and confirmed present in the audit.

- [ ] **F-A — Game reset is `window.location.reload()`** — confirmed in App.tsx, two
  locations: mobile game-over overlay and desktop game-over overlay. No `resetGame()`
  function exists anywhere in the codebase.

- [ ] **F-B — Map generation is unseeded `Math.random()` at module import time** —
  confirmed in `constants.ts`. `BOG_MAP` is generated at module scope. Every import
  and every HMR reload in dev produces a different map. Cannot reproduce layouts.
  `src/utils/` directory does not yet exist.

- [ ] **F-C — Energy system is dead** — `player.energy` initializes to 100 and is never
  decremented or regenerated. HUD energy bar renders correctly but shows a static value.
  The `speedMult` overheat penalty reads `heat`, not `energy` — energy has no game
  effect whatsoever.

- [ ] **F-D — Heat system is dead** — `player.heat` initializes to 0 and is never
  incremented. The overheat speed penalty (`speedMult = 0.3 if heat >= maxHeat`) is
  wired to read heat — this logic is correct — but heat never increases, so the penalty
  is unreachable.

- [ ] **F-E — GLADIUS skill chain is bypassed** — `player.activeSkill` is initialized
  to `null` and never set. The fire handler reads `ammo` and `cooldowns['shot_cooldown']`
  directly, completely bypassing the 3-step skill_0 chain defined in `GLADIUS.moveset`.

- [ ] **F-F — Enemy routing deadlocks against walls** — Enemies use axis-separated
  collision (`checkCollision` on each axis independently). They do not clip through walls,
  but they have no pathfinding and deadlock against any wall obstacle they approach
  head-on. Concave wall arrangements permanently trap enemies.
  *(Note: todo-003 described this as "enemies walk through walls" — that is imprecise.
  The actual bug is absence of routing, not absence of collision.)*

- [ ] **F-G — Wurm always spawns in `state: 'chase'`** — `createEnemy()` hardcodes
  `state: 'chase'`. The `'submerged'` / `'emerging'` states are defined in types and
  partially handled in the draw loop, but never initialized by spawn logic.

- [ ] **F-H — Score is not persisted** — `gameState.score` resets on reload. No
  `localStorage` high score exists.

- [ ] **F-I — Settings and Info buttons are inert** — App.tsx has `<button>` elements
  for Settings and Info in the main menu with no `onClick` handlers.

---

## PRE-ALPHA ROADMAP

Alpha is defined as: all core loops connected and functional. Start, play, die, reset
without page reload. Combat loop is real (energy costs, heat builds, burst fires correctly,
reload reflects shots fired). Enemies route around walls. Map is reproducible.

---

### PHASE 0 — GROUND FLOOR
*Nothing can be reliably tested until these are done. All other phases depend on them.*

#### P0-A — Seeded map generation + `src/utils/seededRandom.ts`
- Create `src/utils/seededRandom.ts` — mulberry32 or sfc32 PRNG, seeded by a `number`
- Replace all `Math.random()` calls in `constants.ts` map generation with the seeded PRNG
- Expose the seed value (store in `GameState` or a module-level constant for now)
- **Audit target:** every `Math.random()` call in `constants.ts` — there are multiple
  (cluster placement, cluster size, cluster type, per-tile noise)
- **Risk:** ROBUST if all call sites are replaced. FRAGILE if any are missed — one
  missed call makes the map non-reproducible.

#### P0-B — `resetGame()` function
- Extract all state initialization from `GameCanvas.tsx` into a `resetGame(seed?)` function
- `resetGame()` must reinitialize: player, enemies, projectiles, score, targetId,
  isGameOver, exploredTiles, visibleTiles, all cooldowns, frameCount, shakeRef
- Replace both `window.location.reload()` calls in `App.tsx` game-over screens
- **Dependency:** P0-A must be done first — `resetGame()` needs to call the seeded
  map generator or reuse a stored seed

---

### PHASE 1 — FIRE LOOP CORRECTNESS
*Fix the existing fire handler to match mechanics-v1.md before adding new systems.*

#### P1-A — Fix burst: spawn `shot_count` projectiles per trigger
- Read `(action.payload as BurstPayload).shot_count` in the fire handler
- Spawn N projectiles with slight angular spread (or tight group — design decision)
- Decrement ammo by `shot_count` per burst, not by 1
- **Dependency:** None — self-contained change to fire handler

#### P1-B — Fix reload: implement PER_SHOT mode
- Add `shotsFiredSinceReload: number` to `Player` type (or track inline in GameCanvas)
- Increment counter on each shot
- On reload trigger: `reloadTime = shotsFiredSinceReload * weapon.reload_cooldown.scalar`
- Reset counter to 0 when reload completes (in the cooldown expiry handler)
- **Dependency:** P1-A should precede this so shot counting reflects burst size

#### P1-C — Wire manual reload (R key)
- In `update()`, check `keysRef.current.has('KeyR')`
- On R press: if not already reloading and ammo < max, trigger reload cooldown
- **Dependency:** P1-B must exist so there is a correct reload duration to apply

---

### PHASE 2 — RESOURCE SYSTEMS
*Connect energy and heat to combat so the HUD becomes meaningful.*

#### P2-A — Energy: decrement on fire, regen over time
- Each shot costs energy (suggest: `5` per shot — tunable)
- Passive regen: `+2 per second` (tunable)
- Block firing if `energy <= 0`
- HUD energy bar already renders `player.energy / player.maxEnergy` — will update
  automatically once values change
- **Dependency:** P1-A (fire loop correct)

#### P2-B — Heat: increment on fire, cool down over time
- Each shot adds heat (suggest: `8` per shot — tunable)
- Passive cooling: `−5 per second` when not firing
- Overheat speed penalty already reads `heat >= maxHeat` — will activate automatically
- HUD heat bar already renders `player.heat / player.maxHeat` — will update automatically
- **Dependency:** P1-A

#### P2-C — Fix HUD health display (F-04)
- Change `{Math.ceil(player.health)}%` to `{Math.ceil((player.health / player.maxHealth) * 100)}%`
- Apply to both compact and full HUD modes
- **Dependency:** None — 2-line fix

---

### PHASE 3 — SKILL CHAIN (GLADIUS skill_0)
*Wire the 3-step chain system so burst sequences execute through the defined moveset.*

#### P3-A — Implement `ActiveSkillState` execution loop
- On fire trigger: if `player.activeSkill === null`, start skill_0 by setting `activeSkill`
  to `{ skillIndex: 0, actionIndex: 0, repeatIndex: 0, timer: action.base_duration, totalActionTime: action.base_duration }`
- Each frame: decrement `activeSkill.timer`; when it reaches 0, advance to next
  `ActionRef` in the sequence; when sequence ends, clear `activeSkill`
- Fire N projectiles (`shot_count`) when each action activates, not on each frame
- Interrupting the chain (e.g. stop pressing fire mid-sequence) — design decision needed:
  **(a)** chain completes regardless (committed fire), or
  **(b)** chain stops at current action boundary
  Recommend option (b) for alpha — simpler, cancellable
- **Dependency:** P1-A, P1-B, P2-A, P2-B (all resource systems live before wiring chain)

#### P3-B — Wire reload to chain completion
- Under PER_SHOT mode, reload timer should reflect shots fired across the partial or
  full chain, not just a single burst
- `shotsFiredSinceReload` already established in P1-B — chain execution increments it
  correctly if P3-A fires projectiles per action-step
- **Dependency:** P3-A, P1-B

---

### PHASE 4 — ENEMY ROUTING
*Enemies become navigable agents, not wall-magnets.*

#### P4-A — Pathfinding algorithm decision (REQUIRED BEFORE IMPLEMENTATION)
Three options — pick one:

| Option | Approach | Complexity | Stability |
|---|---|---|---|
| A | A\* on tile grid | Medium | ROBUST — fully documented algorithm |
| B | Steering + wall-normal repulsion | Low | FRAGILE — empirical tuning required |
| C | Flow field (precomputed per frame toward player) | Medium-High | ROBUST for dense enemies |

Recommendation: **Option A (A\*)** — the tile grid is already established (`BOG_MAP`,
`TILE_SIZE`, `MAP_WIDTH/HEIGHT`). A\* on a 60×60 grid with recompute-on-demand per enemy
is tractable. Path can be cached per enemy for N frames to reduce per-frame cost.

#### P4-B — Implement chosen pathfinding
- Enemies navigate toward player using path waypoints rather than direct vector
- Existing `checkCollision` remains as a safety layer for edge cases
- **Dependency:** P0-A (seeded map so pathfinding can be tested reproducibly), P4-A decision

#### P4-C — Wurm submerged spawn
- In `createEnemy()`, for `type === 'wurm'`: set `state: 'submerged'`, `stateTimer: 120`
  (2 seconds at 60fps — tunable)
- After stateTimer expires: transition to `'emerging'` then `'chase'`
- Draw loop already handles `'submerged'` rendering (ripple effect)
- **Dependency:** P4-B recommended first

---

### PHASE 5 — PERSISTENCE + MINOR FIXES
*Sessions become meaningful. No blocking dependencies.*

#### P5-A — Score persistence (localStorage high score)
- On game over: compare `score` to `localStorage.getItem('orion_highscore')`
- Store higher value. Display on game-over screen.
- **Dependency:** P0-B (reset must exist so score lifecycle is defined)

#### P5-B — Fix external CDN texture (F-06)
- Download `carbon-fibre.png` to `public/textures/carbon-fibre.png`
- Update `App.tsx` background URL to `/textures/carbon-fibre.png`
- **Dependency:** None

#### P5-C — FireButton mouse events (F-05)
- Add `onMouseDown`/`onMouseUp` handlers to `FireButton.tsx` alongside existing touch
  handlers
- **Dependency:** None

#### P5-D — Fix Joystick deps array (F-07)
- Add `onMove` and `onEnd` to `resetTrigger` useEffect dependency array in `Joystick.tsx`
- **Dependency:** None

---

### PHASE 6 — MOBILE FIRE INTEGRATION
*Reduce three-input requirement to two.*

#### P6-A — Aim joystick auto-fire threshold
- If `aimVector` magnitude > threshold (suggest `0.85` — tunable), set `isFiring = true`
  without requiring the dedicated FireButton
- Auto-fire off when magnitude drops below threshold
- **Dependency:** Phase 3 (skill chain) should exist so auto-fire triggers real burst
  behavior, not the legacy single-shot handler

---

## ALPHA MILESTONE DEFINITION

**Alpha = Phases 0 through 4 complete.**

Checklist:
- [ ] Seeded map — same seed produces same map on reset and reload
- [ ] `resetGame()` — full session restart without page reload
- [ ] GLADIUS fires 3-round bursts (`shot_count: 3`)
- [ ] Reload reflects shots fired (PER_SHOT mode)
- [ ] Manual reload (R key) works
- [ ] Energy decrements on fire, regenerates
- [ ] Heat builds on fire, dissipates — overheat penalty reachable
- [ ] GLADIUS skill_0 chain executes in sequence (3 bursts before reload)
- [ ] Enemies route around walls (no deadlocking)
- [ ] Wurm initializes in submerged state
- [ ] Multiple sessions per browser visit work correctly
- [ ] HUD health display shows correct percentage

Phase 5 (persistence + minor fixes) and Phase 6 (mobile threshold) are
not blocking for alpha but should ship with or shortly after.

---

## OUT OF SCOPE FOR ALPHA

Do not allow these to creep into the alpha milestone:

- Second weapon / weapon swap
- Zone M01-ORC-ENCAMPMENT / zone transitions
- Trait line selection
- NPC / quest / reputation / crafting / inventory systems
- Boss encounters (Percival, Tristan, Bors)
- Map fragment / Waygate systems
- Sound effects
- Particle effects (projectile impacts, death)
- Animated player sprite
- Main menu Settings / Info functionality
- PWA update prompt
- Desktop control hints overlay

---

## DEPENDENCY GRAPH (ALPHA PATH)

```
P0-A (seeded map)
  └── P0-B (resetGame)
        └── P5-A (score persistence)

P1-A (burst shot_count)
  └── P1-B (PER_SHOT reload)
        └── P1-C (R key reload)
  └── P2-A (energy)
  └── P2-B (heat)
        └── P3-A (skill chain)
              └── P3-B (chain reload)

P0-A
  └── P4-B (pathfinding)
        └── P4-C (wurm submerged)
```

P2-C, P5-B, P5-C, P5-D — no dependencies, can be done anytime.

---

*todo-004.md | Project Orion internal documentation*
