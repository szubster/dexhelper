import { execSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';

test.describe('Benchmarking Workflow E2E', () => {
  test('should execute full benchmark suite using npm script', async () => {
    // Note: E2E for CLI tools runs the commands using execSync just like integration tests,
    // as it verifies the entire workflow from the perspective of a developer running the scripts.
    const rootDir = process.cwd();
    const jsonPath = join(rootDir, 'benchmarks.json');
    const csvPath = join(rootDir, 'benchmarks.csv');

    // Clean up before test
    if (existsSync(jsonPath)) unlinkSync(jsonPath);
    if (existsSync(csvPath)) unlinkSync(csvPath);

    // Run the benchmark suite via the npm script (this tests the integration points defined in package.json)
    // using the JSON reporter to verify functionality.
    expect(() => {
      execSync('pnpm test:bench --reporter=json', { stdio: 'pipe' });
    }).not.toThrow();

    // Verify the artifact was generated
    expect(existsSync(jsonPath)).toBeTruthy();

    // Clean up
    if (existsSync(jsonPath)) unlinkSync(jsonPath);
    if (existsSync(csvPath)) unlinkSync(csvPath);
  });
});
