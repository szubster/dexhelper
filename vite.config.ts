import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    base: process.env.CF_PAGES === "true" ? "/" : "/dexhelper/",
    plugins: [
      react(),
      tanstackRouter(),
      tailwindcss(),
      process.env.ANALYZE === "true" &&
        visualizer({
          filename: "stats.html",
          open: false,
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      sourcemap: process.env.ANALYZE === "true",
      cssCodeSplit: false,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks: undefined, // Ensure single chunk is prioritized where possible
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
    },
    test: {
      globals: true,
      include: ["**/*.test.ts", "**/*.test.tsx"],
    },
  };
});
