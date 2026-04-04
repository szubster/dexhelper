import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { loadEnv } from 'vite';

export default defineConfig({
  integrations: [
    react(),
  ],
  vite: {
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(loadEnv('', process.cwd(), '').GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': '.',
      },
    },
    build: {
      target: ['es2022', 'edge100', 'firefox100', 'chrome100', 'safari15'],
      cssCodeSplit: false,
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  },
});
