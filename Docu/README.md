1| # PROJECT: ORION
2| 
3| > Tactical mech combat. Top-down. Installable.
4| 
5| A browser-based action RPG built with React, TypeScript, and Canvas 2D. Playable in any modern browser, installable as a PWA on Android and desktop.
6| 
7| **[Play Now →](https://x-krizn.github.io/PJO/)**
8| 
9| ---
10| 
11| ## What It Is
12| 
13| Project Orion is a top-down mech shooter set in a fractured sci-fantasy world. You pilot a mech through M00-THE-BOG — a fog-covered ruin zone — fighting enemies, managing limited ammo, and sur[...]
14| 
15| This is an early demo. The game is playable and distributable. Active development is ongoing.
16| 
17| ---
18| 
19| ## Playing
20| 
21| ### Install (Recommended)
22| Open the link above in Chrome on Android or desktop. You will see an install prompt in the address bar. Install it and it runs as a standalone app — no browser chrome, works offline.
23| 
24| ### Browser
25| Just open the link. No account, no download, no setup.
26| 
27| ---
28| 
29| ## Controls
30| 
31| **Desktop**
32| | Input | Action |
33| |---|---|
34| | `WASD` | Move |
35| | Mouse | Aim |
36| | Left Click / Space | Fire |
37| | Click enemy | Lock target |
38| 
39| **Mobile**
40| | Input | Action |
41| |---|---|
42| | Left joystick | Move |
43| | Right joystick | Aim |
44| | Fire button | Shoot |
45| 
46| ---
47| 
48| ## Stack
49| 
50| - **React 19** + **TypeScript**
51| - **Canvas 2D** — all game rendering
52| - **Vite 6** — build tooling
53| - **Tailwind v4** — UI styling
54| - **vite-plugin-pwa** — service worker, offline cache, installability
55| - **GitHub Actions** — automated build and deploy to GitHub Pages
56| 
57| ---
58| 
59| ## Running Locally
60| 
61| Requires Node.js 20+.
62| 
63| ```bash
64| git clone https://github.com/x-krizn/PJO.git
65| cd PJO
66| npm install
67| npm run dev
68| ```
69| 
70| Preview production build:
71| ```bash
72| npm run build
73| npm run preview
74| ```
75| 
76| Pushing to `main` automatically builds and deploys via GitHub Actions.
77| 
78| ---
79| 
80| ## Project Status
81| 
82| Early demo. Core systems working:
83| 
84| - ✅ Top-down movement with wall collision
85| - ✅ Fog of war with raycasted line-of-sight
86| - ✅ Enemy AI (warrior, scout, wurm types)
87| - ✅ Auto-lock targeting
88| - ✅ Radar
89| - ✅ Mobile dual-joystick controls
90| - ✅ PWA — installable, offline-capable
91| 
92| In progress: weapon system, trait lines, zone progression, NPC systems.
93| 
94| ---
95| 
96| ## Lore
97| 
98| Project Orion takes place across a network of fractured worlds — Belldor (Camelot), Novarin, Chyme, and others — connected by unstable waygates. Players are interlopers operating mechs built f[...]
99| 
100| Design documentation in the repo covers the full armory system, trait lines (Rogue, Wizard, Cleric, Warrior, Marauder, Guardian), zone design for M00-THE-BOG and Camelot Border Town, boss encount[...]
101| 
102| ---
103| 
104| *Version 0.4.2-BETA // Orion Initiative*