import { tanstackRouter } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { codecovVitePlugin } from "@codecov/vite-plugin";
import { VitePWA } from 'vite-plugin-pwa';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

import { pokedataPlugin } from './vite-plugins/pokedata-plugin.ts';
import { foundryPlugin } from './vite-plugins/foundry-plugin.ts';

export default defineConfig(() => {
  const sourceDir = path.resolve(import.meta.dirname, 'data/db');
  const target = 'esnext';

  return {
    base: process.env['CF_PAGES'] === 'true' ? '/' : '/dexhelper/',
    plugins: [
      pokedataPlugin({ sourceDir }),
      foundryPlugin(),
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
      process.env['ANALYZE'] === 'true' && visualizer({
        filename: 'stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
      codecovVitePlugin({
        enableBundleAnalysis: process.env['CODECOV_TOKEN'] !== undefined,
        bundleName: "dexhelper",
        uploadToken: process.env['CODECOV_TOKEN'] ?? '',
        gitService: "github",
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    css: {
      transformer: 'lightningcss' as const,
      lightningcss: {
        targets: browserslistToTargets(browserslist('last 1 Chrome version')),
      },
    },
    build: {
      target,
      chunkSizeWarningLimit: 1000,
      cssMinify: 'lightningcss' as const,
      assetsInlineLimit: 102400, // Inline assets up to 100KB
      sourcemap: process.env['ANALYZE'] === 'true',
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'react';
            }
            if (id.includes('node_modules/@tanstack/react-router/')) {
              return 'router';
            }
            if (id.includes('node_modules/@tanstack/react-query/')) {
              return 'query';
            }
            if (id.includes('node_modules/@xyflow/')) {
              return 'xyflow';
            }
            if (id.includes('node_modules/msgpackr/')) {
              return 'msgpackr';
            }
            if (id.includes('node_modules/idb/')) {
              return 'idb';
            }
            if (id.includes('src/components/dashboard/battle-frontier/')) {
              return 'BattleFrontierDashboard';
            }
            if (id.includes('src/components/dashboard/breeding/')) {
              return 'ShinyCarrierBreedingDashboard';
            }
            if (id.includes('src/components/dashboard/ribbons/')) {
              return 'GlobalRibbonChecklistDashboard';
            }
            if (id.includes('src/components/pokemon/details/PokemonLocations.tsx')) {
              return 'PokemonLocations';
            }
            if (id.includes('src/components/pokemon/details/PokemonEvolutions.tsx')) {
              return 'PokemonEvolutions';
            }
            if (id.includes('src/components/pokemon/details/PokemonCatchProbability.tsx')) {
              return 'PokemonCatchProbability';
            }
            if (id.includes('src/components/pokemon/details/PokemonCaughtDetails.tsx')) {
              return 'PokemonCaughtDetails';
            }
            return undefined;
          }
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env['DISABLE_HMR'] !== 'true',
    },
  };
});
