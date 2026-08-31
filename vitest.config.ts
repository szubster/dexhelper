import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import viteConfigFn from './vite.config.ts';

export default defineConfig(async (configEnv) => {
  const baseConfig = typeof viteConfigFn === 'function' 
    ? viteConfigFn({ ...configEnv, command: 'serve', mode: 'test' })
    : viteConfigFn;

  return mergeConfig(baseConfig, {
    test: {
      testTimeout: 30000,
      coverage: {
        provider: 'v8',
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['**/*.json', '**/*.test.ts', '**/*.test.tsx', 'src/hooks/useFileSyncController.ts', 'src/db/SaveDB.ts', 'src/components/AppHeader.tsx', 'src/components/header/OfflineControls.tsx', 'src/components/header/SystemControls.tsx', 'src/components/header/TelemetryMatrix.tsx', 'src/components/dashboard/battle-frontier/BattleFrontierDashboard.tsx'],
      },
      reporters: process.env['GITHUB_ACTIONS']
        ? ['github-actions', 'default', ['junit', { outputFile: './test-report.junit.xml' }]]
        : ['default', ['junit', { outputFile: './test-report.junit.xml' }]],
      // Vitest 4 uses 'projects' instead of 'workspace'
      projects: [
        {
          extends: true,
          test: {
            name: 'node',
            include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'scripts/**/*.test.ts'],
            exclude: ['src/components/**/*.test.tsx', 'src/hooks/**/*.test.tsx', 'src/contexts/**/*.test.tsx', 'tests/e2e/**/*', 'src/features/**/*.test.tsx'],
            setupFiles: ['./src/node-setup.ts'],
            environment: 'node',
            globals: true,
          },
        },
        {
          extends: true,
          test: {
            name: 'browser',
            include: ['src/components/**/*.test.tsx', 'src/hooks/**/*.test.tsx', 'src/contexts/**/*.test.tsx', 'src/routes/__tests__/**/*.test.tsx', 'src/features/**/*.test.tsx'],
            exclude: ['tests/e2e/**/*'],
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [
                {
                  browser: 'chromium',
                  viewport: { width: 640, height: 800 },
                },
              ],
              headless: true,
            },
            globals: true,
          },
        },
      ],
    },
  });
});
