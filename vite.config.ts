import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { codecovVitePlugin } from "@codecov/vite-plugin";
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  let pokedataHash = 'initial';
  try {
    const hashPath = path.resolve(__dirname, 'public/data/pokedata.hash');
    if (fs.existsSync(hashPath)) {
      pokedataHash = fs.readFileSync(hashPath, 'utf-8').trim();
    }
  } catch (e) {
    console.warn('Failed to read pokedata.hash, using fallback.');
  }

  return {
    define: {
      __POKEDATA_HASH__: JSON.stringify(pokedataHash),
    },
    base: process.env.CF_PAGES === 'true' ? '/' : '/dexhelper/',
    plugins: [
      tanstackRouter(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'DexHelper',
          short_name: 'DexHelper',
          description: 'A modern Pokedex with AI assistance',
          theme_color: '#ef4444',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/sprites\/pokemon\/.*\.png$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'pokemon-sprites',
                expiration: {
                  maxEntries: 500,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
                },
              },
            },
          ],
        },
      }),
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
