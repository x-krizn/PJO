# PROJECT ORION — TECHNICAL TODO
*Last Updated: 2026-02-22*
*Version: 004.1 — Session 1 Complete*

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

## COMPLETED (SESSION 1 — 2026-02-22)

- [x] **P0-A** — `src/utils/seededRandom.ts` created (mulberry32 PRNG). All four
  `Math.random()` calls in `constants.ts` map generation replaced with `rng()`.
  `generateBogMap(seed)` extracted as a pure exported function. `MAP_SEED = 20260222`
  exported as the default seed. `BOG_MAP` generated at module load via
  `generateBogMap(MAP_SEED)`.

- [x] **P0-B** — `window.location.reload()` eliminated. `App.tsx` now holds
  `sessionKey` state. Both game-over RESTART buttons call `handleRestart()` which
  clears `gameState` and increments `sessionKey`. `<GameCanvas key={sessionKey} />`
  remounts cleanly, reinitializing all refs without a page reload.

- [x] **P2-C / F-04** — HUD health display fixed in both compact and full modes.
  `{Math.ceil(player.health)}%` → `{Math.ceil((player.health / player.maxHealth) * 100)}%`.
  Same fix applied to energy and heat labels for consistency.
  Also corrected `shields` label which had the same issue.

- [x] **P5-B / F-06** — CDN texture dependency eliminated in code.
  `App.tsx` now references `/textures/carbon-fibre.png` (local).
  **Manual step still required:** download
  `https://www.transparenttextures.com/patterns/carbon-fibre.png`
  and save to `public/textures/carbon-fibre.png`.

- [x] **P5-C / F-05** — `FireButton.tsx`: added `onMouseDown`, `onMouseUp`, and
  `onMouseLeave` handlers alongside existing touch handlers. Desktop button now
  provides visual active-state feedback. `onMouseLeave` guards against held-fire
  persisting when cursor exits the button.

- [x] **P5-D / F-07** — `Joystick.tsx`: stale closure risk resolved. `onMove` and
  `onEnd` wrapped in `useCallback`. `resetTrigger` effect and touch event effect
  now include all relevant dependencies. `handleEnd` extracted as a `useCallback`
  so it can be added to the touch effect deps without causing infinite loops.

- [x] **F-J — Mobile viewport cutoff (new bug, found + fixed)** — Root container
  used `h-screen` (`100vh`). On Android Chrome, `100vh` includes the address bar
  height in its measurement, but the address bar visually covers content, causing
  bottom controls to be clipped. Fixed with `style={{ height: '100dvh' }}` (dynamic
  viewport height, excludes browser chrome). Supported: Chrome 108+, Safari 15.4+,
  Firefox 101+.

- [x] **F-K — Mobile landscape layout unusable (new bug, found + fixed)** — The
  mobile game branch used `flex-col` stacking: top panel (`h-[18%]`) + canvas
  (flex-grow) + controls (`~188px`). On a landscape phone (~360px tall), the canvas
  received near-zero height. Fixed by adding a distinct `mobileLandscapeGame` branch
  in `App.tsx` that uses `position: absolute` overlays on a full-screen canvas.
  `isLandscape` state (`window.innerWidth > window.innerHeight`) is set on `resize`
  and `orientationchange` (100ms delay for Android repaint). Portrait branch also
  moved to fixed pixel heights for top/bottom zones to prevent `%`-based collapse.

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
| Seeded map generation | ✅ | constants.ts + seededRandom.ts |
| Session reset without page reload | ✅ | App.tsx sessionKey pattern |
| HUD stat % display (health/energy/heat) | ✅ | HUD.tsx |
| Mobile portrait layout (100dvh) | ✅ | App.tsx |
| Mobile landscape layout (overlay) | ✅ | App.tsx |
| FireButton desktop click feedback | ✅ | FireButton.tsx |

---

## AUDIT FINDINGS — BUGS NOT IN PRIOR TODO

These were discovered during the 2026-02-22 source audit.

### F-01 — `shot_count` from BurstPayload is ignored
**File:** `GameCanvas.tsx` — fire handler
**Status:** OPEN — tracked as P1-A
**Detail:** `burst_1` defines `payload: { shot_count: 3 }`. The fire handler spawns exactly
one projectile per trigger. `BurstPayload` is imported but `payload.shot_count` is never
read. The combat loop is silently single-shot, not a 3-round burst as designed.
**Impact:** Core weapon behavior is wrong. GLADIUS plays like a single-fire pistol.

### F-02 — Reload mode is effectively FORCED_FULL despite PER_SHOT definition
**File:** `GameCanvas.tsx` — fire handler
**Status:** OPEN — tracked as P1-B
**Detail:** `reloadTime = weapon.reload_cooldown.max_shots * weapon.reload_cooldown.scalar`
always uses `max_shots` (9), ignoring shots actually fired. The weapon is defined as
`ReloadMode.PER_SHOT` in `constants.ts`. A `shots_fired_since_last_reload` counter does
not exist. Partial chains always cost a full 9-shot reload (3.15 sec).
**Impact:** `mechanics-v1.md` PER_SHOT spec is not implemented.

### F-03 — Manual reload (R key) not wired
**File:** `GameCanvas.tsx` — update()
**Status:** OPEN — tracked as P1-C
**Detail:** `ReloadCooldown.keybind` is defined as `'R'` in the GLADIUS definition.
`keysRef` is never checked for `'KeyR'`. Manual reload cannot be triggered.

### ~~F-04 — Health display in HUD shows raw number, not percentage~~ FIXED (P2-C)
**Fixed in:** `HUD.tsx` — both compact and full modes, plus energy and heat labels.

### ~~F-05 — FireButton has no mouse event handlers~~ FIXED (P5-C)
**Fixed in:** `FireButton.tsx` — added `onMouseDown`, `onMouseUp`, `onMouseLeave`.

### ~~F-06 — External CDN texture dependency~~ FIXED in code (P5-B)
**Fixed in:** `App.tsx` — URL changed to `/textures/carbon-fibre.png`.
**Pending:** Manual download of PNG to `public/textures/carbon-fibre.png`.

### ~~F-07 — `Joystick.tsx` stale-closure risk in `resetTrigger` useEffect~~ FIXED (P5-D)
**Fixed in:** `Joystick.tsx` — `useCallback` wrappers + complete dependency arrays.

### F-08 — `Radar.tsx` uses `ctx.createConicGradient`
**File:** `Radar.tsx`
**Status:** OPEN — low priority
**Detail:** `createConicGradient` requires Chrome 99+, Firefox 112+, Safari 16.4+.
Acceptable for a modern mobile PWA but worth noting for any older device support.
**Fragility:** Low risk for current targets.

### ~~F-J — Mobile viewport cutoff (`100vh`)~~ FIXED (Session 1)
**Fixed in:** `App.tsx` — root container changed to `style={{ height: '100dvh' }}`.

### ~~F-K — Mobile landscape layout unusable~~ FIXED (Session 1)
**Fixed in:** `App.tsx` — `mobileLandscapeGame` branch added with full-screen canvas
and absolute-positioned overlay controls. `isLandscape` state tracks orientation.

---

## CRITICAL — OPEN BUGS

- [ ] **F-C — Energy system is dead** — `player.energy` initializes to 100 and is never
  decremented or regenerated. HUD energy bar renders correctly but shows a static value.
  The `speedMult` overheat penalty reads `heat`, not `energy` — energy has no game
  effect whatsoever. **Tracked as P2-A.**

- [ ] **F-D — Heat system is dead** — `player.heat` initializes to 0 and is never
  incremented. The overheat speed penalty (`speedMult = 0.3 if heat >= maxHeat`) is
  wired to read heat — this logic is correct — but heat never increases, so the penalty
  is unreachable. **Tracked as P2-B.**

- [ ] **F-E — GLADIUS skill chain is bypassed** — `player.activeSkill` is initialized
  to `null` and never set. The fire handler reads `ammo` and `cooldowns['shot_cooldown']`
  directly, completely bypassing the 3-step skill_0 chain defined in `GLADIUS.moveset`.
  **Tracked as P3-A.**

- [ ] **F-F — Enemy routing deadlocks against walls** — Enemies use axis-separated
  collision (`checkCollision` on each axis independently). They do not clip through walls,
  but they have no pathfinding and deadlock against any wall obstacle they approach
  head-on. Concave wall arrangements permanently trap enemies.
  **Tracked as P4-A/P4-B.**

- [ ] **F-G — Wurm always spawns in `state: 'chase'`** — `createEnemy()` hardcodes
  `state: 'chase'`. The `'submerged'` / `'emerging'` states are defined in types and
  partially handled in the draw loop, but never initialized by spawn logic.
  **Tracked as P4-C.**

- [ ] **F-H — Score is not persisted** — `gameState.score` resets on session restart.
  No `localStorage` high score exists. **Tracked as P5-A.**

- [ ] **F-I — Settings and Info buttons are inert** — App.tsx has `<button>` elements
  for Settings and Info in the main menu with no `onClick` handlers. Out of scope for
  alpha.

- [ ] **F-L — FireButton oversized in portrait action bar** — `FireButton.tsx` has
  `w-24 h-24` (96px) hardcoded. In the portrait layout action bar the wrapper is
  `40×40` — the button overflows visually. Functionally tappable but cosmetically wrong.
  **Fix:** Add a `size` prop to `FireButton.tsx` (`'sm' | 'lg'`), pass `size="sm"` in
  the portrait action bar. Low priority — does not affect gameplay.

---

## PRE-ALPHA ROADMAP

Alpha is defined as: all core loops connected and functional. Start, play, die, reset
without page reload. Combat loop is real (energy costs, heat builds, burst fires correctly,
reload reflects shots fired). Enemies route around walls. Map is reproducible.

---

### PHASE 0 — GROUND FLOOR ✅ COMPLETE

#### ~~P0-A — Seeded map generation + `src/utils/seededRandom.ts`~~ ✅
- `src/utils/seededRandom.ts` created — mulberry32, `seededRandom(seed) => () => number`
- `generateBogMap(seed)` exported from `constants.ts` — pure function, rng scoped per call
- All four `Math.random()` calls replaced with `rng()`
- `MAP_SEED = 20260222` exported — change to get different layout
- `BOG_MAP` generated at module load via `generateBogMap(MAP_SEED)`

#### ~~P0-B — `resetGame()` function~~ ✅
- Implemented via React `key` prop pattern — no changes to `GameCanvas.tsx` required
- `sessionKey` state in `App.tsx` incremented by `handleRestart()`
- `<GameCanvas key={sessionKey} />` remounts, reinitializing all refs from their defaults
- Both game-over RESTART buttons wired to `handleRestart()`

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

#### ~~P2-C — Fix HUD health display (F-04)~~ ✅
- Fixed in `HUD.tsx` — both compact and full modes
- Energy and heat labels corrected for consistency in the same pass

---

### PHASE 3 — SKILL CHAIN (GLADIUS skill_0)
*Wire the 3-step chain system so burst sequences execute through the defined moveset.*

#### P3-A — Implement `ActiveSkillState` execution loop
- On fire trigger: if `player.activeSkill === null`, start skill_0 by setting `activeSkill`
  to `{ skillIndex: 0, actionIndex: 0, repeatIndex: 0, timer: action.base_duration, totalActionTime: action.base_duration }`
- Each frame: decrement `activeSkill.timer`; when it reaches 0, advance to next
  `ActionRef` in the sequence; when sequence ends, clear `activeSkill`
- Fire N projectiles (`shot_count`) when each action activates, not on each frame
- Interrupting the chain — design decision: recommend option (b) chain stops at current
  action boundary for alpha — simpler, cancellable
- **Dependency:** P1-A, P1-B, P2-A, P2-B

#### P3-B — Wire reload to chain completion
- `shotsFiredSinceReload` established in P1-B increments correctly if P3-A fires
  projectiles per action-step
- **Dependency:** P3-A, P1-B

---

### PHASE 4 — ENEMY ROUTING
*Enemies become navigable agents, not wall-magnets.*

#### P4-A — Pathfinding algorithm decision (REQUIRED BEFORE IMPLEMENTATION)

| Option | Approach | Complexity | Stability |
|---|---|---|---|
| A | A\* on tile grid | Medium | ROBUST — fully documented algorithm |
| B | Steering + wall-normal repulsion | Low | FRAGILE — empirical tuning required |
| C | Flow field (precomputed per frame toward player) | Medium-High | ROBUST for dense enemies |

Recommendation: **Option A (A\*)** — tile grid already established, 60×60 is tractable.
Path cached per enemy for N frames to limit per-frame cost.

#### P4-B — Implement chosen pathfinding
- Enemies navigate toward player using path waypoints rather than direct vector
- Existing `checkCollision` remains as safety layer
- **Dependency:** P0-A ✅, P4-A decision

#### P4-C — Wurm submerged spawn
- In `createEnemy()`, for `type === 'wurm'`: set `state: 'submerged'`, `stateTimer: 120`
- Draw loop already handles `'submerged'` rendering
- **Dependency:** P4-B recommended first

---

### PHASE 5 — PERSISTENCE + MINOR FIXES

#### P5-A — Score persistence (localStorage high score)
- On game over: compare `score` to `localStorage.getItem('orion_highscore')`
- Store higher value. Display on game-over screen.
- **Dependency:** P0-B ✅

#### ~~P5-B — Fix external CDN texture (F-06)~~ ✅ (code complete, manual step pending)
- `App.tsx` updated — references `/textures/carbon-fibre.png`
- **Still required:** download PNG to `public/textures/carbon-fibre.png`

#### ~~P5-C — FireButton mouse events (F-05)~~ ✅
- `onMouseDown`, `onMouseUp`, `onMouseLeave` added to `FireButton.tsx`

#### ~~P5-D — Fix Joystick deps array (F-07)~~ ✅
- `useCallback` wrappers + complete dependency arrays in `Joystick.tsx`

#### P5-E — FireButton size prop (F-L)
- Add `size?: 'sm' | 'lg'` prop to `FireButton.tsx`
- `'lg'` = current `w-24 h-24` (default, used in landscape and desktop)
- `'sm'` = `w-10 h-10`, used in portrait action bar
- **Dependency:** None

---

### PHASE 6 — MOBILE FIRE INTEGRATION

#### P6-A — Aim joystick auto-fire threshold
- If `aimVector` magnitude > threshold (suggest `0.85` — tunable), set `isFiring = true`
- Auto-fire off when magnitude drops below threshold
- **Dependency:** Phase 3 (skill chain) should exist so auto-fire triggers real burst
  behavior, not the legacy single-shot handler

---

## ALPHA MILESTONE DEFINITION

**Alpha = Phases 0 through 4 complete.**

Checklist:
- [x] Seeded map — same seed produces same map on reset and reload
- [x] `resetGame()` — full session restart without page reload
- [ ] GLADIUS fires 3-round bursts (`shot_count: 3`)
- [ ] Reload reflects shots fired (PER_SHOT mode)
- [ ] Manual reload (R key) works
- [ ] Energy decrements on fire, regenerates
- [ ] Heat builds on fire, dissipates — overheat penalty reachable
- [ ] GLADIUS skill_0 chain executes in sequence (3 bursts before reload)
- [ ] Enemies route around walls (no deadlocking)
- [ ] Wurm initializes in submerged state
- [x] Multiple sessions per browser visit work correctly
- [x] HUD health display shows correct percentage

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
- Main menu Settings / Info functionality (F-I)
- PWA update prompt
- Desktop control hints overlay

---

## DEPENDENCY GRAPH (ALPHA PATH)

```
P0-A ✅ (seeded map)
  └── P0-B ✅ (resetGame)
        └── P5-A (score persistence)

P1-A (burst shot_count)          ← NEXT
  └── P1-B (PER_SHOT reload)
        └── P1-C (R key reload)
  └── P2-A (energy)
  └── P2-B (heat)
        └── P3-A (skill chain)
              └── P3-B (chain reload)

P0-A ✅
  └── P4-B (pathfinding)
        └── P4-C (wurm submerged)
```

P2-C ✅, P5-B ✅, P5-C ✅, P5-D ✅ — complete.
P5-E (FireButton size prop) — no dependencies, can be done anytime.

---

*todo-004.md | Project Orion internal documentation*
