# PROJECT: ORION

> Tactical mech combat. Top-down. Installable.

A browser-based action RPG built with React, TypeScript, and Canvas 2D. Playable in any modern browser, installable as a PWA on Android and desktop.

**[Play Now →](https://x-krizn.github.io/PJO/)**

---

## What It Is

Project Orion is a top-down mech shooter set in a fractured sci-fantasy world. You pilot a mech through M00-THE-BOG — a fog-covered ruin zone — fighting enemies, managing limited ammo, and surviving increasingly dangerous encounters.

This is an early demo. The game is playable and distributable. Active development is ongoing.

---

## Playing

### Install (Recommended)
Open the link above in Chrome on Android or desktop. You will see an install prompt in the address bar. Install it and it runs as a standalone app — no browser chrome, works offline.

### Browser
Just open the link. No account, no download, no setup.

---

## Controls

**Desktop**
| Input | Action |
|---|---|
| `WASD` | Move |
| Mouse | Aim |
| Left Click / Space | Fire |
| Click enemy | Lock target |

**Mobile**
| Input | Action |
|---|---|
| Left joystick | Move |
| Right joystick | Aim |
| Fire button | Shoot |

---

## Stack

- **React 19** + **TypeScript**
- **Canvas 2D** — all game rendering
- **Vite 6** — build tooling
- **Tailwind v4** — UI styling
- **vite-plugin-pwa** — service worker, offline cache, installability
- **GitHub Actions** — automated build and deploy to GitHub Pages

---

## Running Locally

Requires Node.js 20+.

```bash
git clone https://github.com/x-krizn/PJO.git
cd PJO
npm install
npm run dev
```

Preview production build:
```bash
npm run build
npm run preview
```

Pushing to `main` automatically builds and deploys via GitHub Actions.

---

## Project Status

Early demo. Core systems working:

- ✅ Top-down movement with wall collision
- ✅ Fog of war with raycasted line-of-sight
- ✅ Enemy AI (warrior, scout, wurm types)
- ✅ Auto-lock targeting
- ✅ Radar
- ✅ Mobile dual-joystick controls
- ✅ PWA — installable, offline-capable

In progress: weapon system, trait lines, zone progression, NPC systems.

---

## Lore

Project Orion takes place across a network of fractured worlds — Belldor (Camelot), Novarin, Chyme, and others — connected by unstable waygates. Players are interlopers operating mechs built from scavenged magitech components.

Design documentation in the repo covers the full armory system, trait lines (Rogue, Wizard, Cleric, Warrior, Marauder, Guardian), zone design for M00-THE-BOG and Camelot Border Town, boss encounters, and faction systems.

---

*Version 0.4.2-BETA // Orion Initiative*
