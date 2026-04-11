import { tanstackRouter } from '@tanstack/router-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { codecovVitePlugin } from "@codecov/vite-plugin";


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: process.env.CF_PAGES === 'true' ? '/' : '/dexhelper/',
    plugins: [
      react(),
      tanstackRouter(),
      tailwindcss(),
      process.env.ANALYZE === 'true' && visualizer({
        filename: 'stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      codecovVitePlugin({
        enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
        bundleName: "dexhelper",
        uploadToken: process.env.CODECOV_TOKEN,
        gitService: "github",
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      sourcemap: process.env.ANALYZE === 'true',
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
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    test: {
      globals: true,
      include: ['**/*.test.ts', '**/*.test.tsx'],
    },
  };
});
