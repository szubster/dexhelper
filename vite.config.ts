import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { codecovVitePlugin } from "@codecov/vite-plugin";
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: process.env.CF_PAGES === 'true' ? '/' : '/dexhelper/',
    plugins: [
      TanStackRouterVite(),
      react(),
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
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon-96.png', 'icon-192.png', 'icon-512.png'],
        manifest: {
          name: "Gen 1/2 Pokédex Reader",
          short_name: "PokeReader",
          description: "Read your Gen 1 and Gen 2 Pokémon save files.",
          start_url: "/dexhelper/",
          scope: "/dexhelper/",
          display: "standalone",
          background_color: "#18181b",
          theme_color: "#ef4444",
          icons: [
            {
              src: "/dexhelper/icon-96.png",
              sizes: "96x96",
              type: "image/png"
            },
            {
              src: "/dexhelper/icon-192.png",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "/dexhelper/icon-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable"
            }
          ]
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/pokeapi\.co\/api\/v2\//i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'pokeapi-data-v1',
                expiration: {
                  maxEntries: 1000,
                },
              },
            },
            {
              urlPattern: /^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\//i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'pokeapi-sprites-v1',
                expiration: {
                  maxEntries: 2000,
                  maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'shell-v2',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
          ],
        },
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
