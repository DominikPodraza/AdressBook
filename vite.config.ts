import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: "src/quasar-variables.sass",
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5221",
        changeOrigin: true,
        rewrite: (path) => path.replace("/api", "/api"),
      },
    },
  },
});
