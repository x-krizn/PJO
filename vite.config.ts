import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/PJO/",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PJO",
        short_name: "PJO",
        start_url: "/PJO/",
        scope: "/PJO/",
        display: "standalone",
        background_color: "#0a0a0f",
        theme_color: "#0a0a0f",
        icons: [
          {
            src: "/PJO/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/PJO/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
