import path from 'path';
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { argosVitestPlugin } from "@argos-ci/storybook/vitest-plugin";

export default [
  {
    extends: './vite.config.ts',
    test: {
      name: 'unit',
      include: ['**/*.test.ts', '**/*.test.tsx'],
      environment: 'happy-dom',
      globals: true,
    },
  },
  {
    extends: './vite.config.ts',
    plugins: [
      storybookTest({ configDir: path.join(__dirname, ".storybook") }) as any,
      argosVitestPlugin({
        uploadToArgos: !!process.env.CI,
        buildName: "Storybook",
      }) as any,
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: "playwright" as any,
        instances: [{ browser: "chromium" }],
      },
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  },
];
