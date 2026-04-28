import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import viteConfigFn from './vite.config';

export default defineConfig(async (configEnv) => {
  const baseConfig = typeof viteConfigFn === 'function' 
    ? await viteConfigFn({ ...configEnv, command: 'serve', mode: 'test' }) 
    : viteConfigFn;

  return mergeConfig(baseConfig, {
    test: {
      reporters: ['default', ['junit', { outputFile: './test-report.junit.xml' }]],
      coverage: {
        provider: 'v8',
        exclude: [
          'src/engine/data/gen1/mapLocations.json',
          'src/engine/data/gen2/landmarks.json',
          'src/engine/data/gen2/mapLocations.json',
        ]
      },
      // Vitest 4 uses 'projects' instead of 'workspace'
      projects: [
        {
          extends: true,
          test: {
            name: 'node',
            include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
            exclude: ['src/components/**/*.test.tsx', 'tests/e2e/**/*'],
            setupFiles: ['./src/node-setup.ts'],
            environment: 'node',
            globals: true,
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['src/components/**/*.test.tsx'],
            exclude: ['tests/e2e/**/*'],
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: 'chromium' }],
              headless: true,
            },
            globals: true,
          },
        },
      ],
    },
  });
});
