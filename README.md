# PJO

Babylon.js 7.x test platform. PWA, deploys to GitHub Pages.

## Local dev

```bash
npm install
npm run dev
```

Place `.glb` files in `public/assets/` before running.

## Deploy

Push to `main`. GitHub Actions builds and deploys automatically.

**Required before first deploy:**
- Go to repo Settings → Pages → Source → set to **GitHub Actions**
- Add two PNG icons to `public/icons/`: `icon-192.png` and `icon-512.png`

## Tuning

All scale, position, and camera constants are at the top of `src/scene.ts`.
