import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: "/PJO/",
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // injectManifest: we write the SW ourselves.
      // vite-plugin-pwa only injects the precache manifest into it.
      // This completely bypasses workbox-build's terser minification step.
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "icon-192.png", "icon-512.png"],
      manifest: {
        name: "Project Orion",
        short_name: "Orion",
        description: "Top-down action RPG mech shooter.",
        theme_color: "#00ff00",
        background_color: "#0a0a0a",
        display: "standalone",
        orientation: "landscape",
        start_url: "/PJO/",
        scope: "/orion-bog-demo/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      }
    })
  ]
});

