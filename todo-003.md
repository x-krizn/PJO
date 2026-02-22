# PROJECT ORION — TECHNICAL TODO
*Last Updated: 2026-02-22*
*Version: 003*

---

## COMPLETED THIS SESSION

- [x] Fixed `package.json` syntax error (missing comma)
- [x] Removed dead dependencies (`babylonjs`, `idb`)
- [x] Fixed `vite.config.ts` — restored missing imports, added Tailwind v4 plugin
- [x] Fixed service worker double registration (App.tsx + main.tsx conflict)
- [x] Fixed `public/manifest.json` icon paths
- [x] Fixed canvas scaling — replaced broken `object-contain` with `ResizeObserver` + CSS `scale()`
- [x] Fixed SW generation — switched to `injectManifest` strategy to bypass Termux/terser crash
- [x] Fixed mouse coordinate calculation to account for CSS scale factor
- [x] Wired auto-lock cone (`AUTO_LOCK_CONE`) — was defined but never applied
- [x] Wired fog overlay — `FOG_COLOR` now used correctly
- [x] Wired firing cooldown and ammo decrement — was firing infinite projectiles silently
- [x] Deployed to GitHub Pages as installable PWA (x-krizn/PJO)
- [x] Fixed PWA orientation (`landscape` → `any`)

---

## CRITICAL — REPO HYGIENE

- [ ] **Delete `codebase-dump.txt`** — 13k line debug file committed to main, bloats repo
- [ ] **Delete `server.ts`** — Express server, never used, GH Pages is static-only
- [ ] **Delete `metadata.json`** — AI Studio template artifact, irrelevant
- [ ] **Update README.md** — still references Gemini API key setup from the template
- [ ] **Add `.gitignore` entry for `*.txt` dumps** — prevent future accidental commits

---

## CRITICAL — CODE BUGS STILL PRESENT

- [ ] **Game reset is `window.location.reload()`** — map regenerates randomly on every restart, no state reset function exists
- [ ] **Map generation is unseeded `Math.random()`** — runs at module import time, different map every session, cannot reproduce layouts
- [ ] **Energy / Heat / Shield systems are dead** — `Player` type defines all three, game loop never reads or modifies them after init
- [ ] **Weapon skill chain system is dead** — `ActionType`, `SkillType`, `ActionLibrary`, `Skill`, full `GLADIUS` moveset defined in types/constants, none of it connected to the fire loop
- [ ] **Enemy pathfinding ignores walls** — direct vector movement, enemies walk through wall tiles

---

## TIER 1 — MINIMUM VIABLE GAME

### Core Systems
- [ ] **Proper game reset** — `resetGame()` function, reinitialise state without page reload
- [ ] **Seeded map generation** — deterministic map from a seed value, store seed for reproducibility
- [ ] **Energy system** — firing costs energy, energy regenerates over time
- [ ] **Heat system** — sustained fire builds heat, overheat penalty already coded but heat never increases
- [ ] **Ammo UI feedback** — reload bar/indicator during reload cooldown

### Enemy AI
- [ ] **Wall-aware pathfinding** — enemies currently clip through walls
- [ ] **Wurm submerged state** — `state: 'submerged'` / `'emerging'` exists in types, spawn logic never sets it

### Controls
- [ ] **Mobile fire + aim integration** — currently requires three simultaneous inputs (move joystick + aim joystick + fire button); aim joystick should auto-fire when pushed past threshold

---

## TIER 2 — PLAYABLE

### Weapon System
- [ ] **Wire GLADIUS skill chain** — connect `moveset.skill_0` burst sequence to actual projectile spawning
- [ ] **Weapon swap** — `weaponSwapCooldown` tracked but only one weapon exists; add at least one alternate weapon
- [ ] **Multiple weapon classes** — Rifle, SMG, Beam as per armory docs

### Progression
- [ ] **Score persistence** — score resets on reload, no high score stored
- [ ] **Player stats display** — energy and heat bars visible in HUD but values never change

### Map
- [ ] **M01-ORC-ENCAMPMENT zone** — second zone, undefined
- [ ] **Zone transition system** — exit point from M00 to next zone

---

## TIER 3 — CONTENT

### From Lore Docs (documented but unimplemented)
- [ ] Trait line selection (Rogue / Wizard / Cleric / Warrior / Marauder / Guardian)
- [ ] NPC system — named NPCs, dialogue, merchants
- [ ] Quest system — structure, givers, rewards, tracking
- [ ] Reputation system — threshold values documented in `border-town-v1.md`
- [ ] Crafting system — blueprints documented in `armory.md`, no implementation
- [ ] Inventory system — no item pickup or storage exists
- [ ] Boss encounters — Percival, Tristan, Bors fully documented in `border-town-v1.md`
- [ ] Map fragment system — 3 fragments, merge mechanic documented
- [ ] Waygate system — fast travel, documented but unimplemented

---

## TIER 4 — POLISH

- [ ] Sound effects — no audio exists
- [ ] Particle effects — projectile impacts, enemy death
- [ ] Animated player sprite — currently a static triangle
- [ ] Main menu — Settings and Info buttons are non-functional placeholders
- [ ] PWA update prompt — notify user when new version is available
- [ ] Desktop control hints overlay

---

## VERIFIED WORKING

| System | Status |
|---|---|
| GitHub Pages deploy (Actions) | ✅ Working |
| PWA install (Android + Desktop) | ✅ Working |
| Service worker / offline cache | ✅ Working |
| Tailwind v4 styling | ✅ Working |
| Canvas rendering + viewport culling | ✅ Working |
| Fog of war (LOS raycasting) | ✅ Working |
| Radar component | ✅ Working |
| Mobile dual joystick | ✅ Working |
| Desktop WASD + mouse aim | ✅ Working |
| Enemy spawn + basic chase AI | ✅ Working |
| Projectile collision | ✅ Working |
| Screen shake | ✅ Working |
| HUD health bar | ✅ Working |
