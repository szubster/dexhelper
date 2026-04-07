import path from 'path';
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.ts';
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { argosVitestPlugin } from "@argos-ci/storybook/vitest-plugin";

import { playwright } from '@vitest/browser-playwright';

export default mergeConfig(
  viteConfig({ mode: 'test', command: 'serve' }) as any,
  defineConfig({
    plugins: [
      storybookTest({ configDir: path.join(__dirname, ".storybook") }) as any,
      argosVitestPlugin({
        uploadToArgos: !!process.env.CI,
        buildName: "Storybook",
      }) as any,
    ],
    test: {
      name: 'visual',
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: "chromium" }],
      },
      include: ['src/**/*.stories.tsx', 'src/**/*.stories.ts'],
      exclude: ['tests/e2e/**', 'playwright.config.ts', 'node_modules/**', 'dist/**', '**/*.test.ts', '**/*.test.tsx'],
      setupFiles: [".storybook/vitest.setup.ts"],
    },
  }) as any
);
