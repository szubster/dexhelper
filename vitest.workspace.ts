export default [
  {
    extends: './vite.config.ts',
    test: {
      name: 'node',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
      exclude: ['src/components/**/*.test.tsx', 'tests/e2e/**/*'],
      setupFiles: ['./src/node-setup.ts'],
      environment: 'node',
    },
  },
  {
    extends: './vite.config.ts',
    test: {
      name: 'browser',
      include: ['src/components/**/*.test.tsx'],
      exclude: ['tests/e2e/**/*'],
      browser: {
        enabled: true,
        provider: 'playwright',
        name: 'chromium',
        headless: true,
      },
    },
  },
];
