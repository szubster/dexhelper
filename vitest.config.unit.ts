import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig({ mode: 'test', command: 'serve' }),
  defineConfig({
    test: {
      name: 'unit',
      include: ['**/*.test.ts', '**/*.test.tsx'],
      exclude: ['tests/e2e/**', 'playwright.config.ts', 'node_modules/**', 'dist/**'],
      environment: 'happy-dom',
      globals: true,
    },
  })
);
