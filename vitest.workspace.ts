export default [
  {
    extends: './vite.config.ts',
    test: {
      name: 'node',
      environment: 'node',
      include: ['src/**/*.test.{ts,tsx}'],
      exclude: [
        'src/components/**/*.test.{ts,tsx}',
        'src/features/**/*.test.{ts,tsx}',
        'src/routes/**/*.test.{ts,tsx}',
        'src/contexts/**/*.test.{ts,tsx}',
        'src/hooks/**/*.test.{ts,tsx}',
      ],
      setupFiles: ['./vitest.node.setup.ts'],
    },
  },
  {
    extends: './vite.config.ts',
    test: {
      name: 'browser',
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }],
      },
      include: [
        'src/components/**/*.test.{ts,tsx}',
        'src/features/**/*.test.{ts,tsx}',
        'src/routes/**/*.test.{ts,tsx}',
        'src/contexts/**/*.test.{ts,tsx}',
        'src/hooks/**/*.test.{ts,tsx}',
      ],
    },
  },
];
