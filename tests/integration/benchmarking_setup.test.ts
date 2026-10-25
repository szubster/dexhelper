import { execSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Benchmarking Setup Integration', () => {
  it('should execute run-benchmarks.ts without errors', () => {
    const rootDir = process.cwd();
    const runnerPath = join(rootDir, 'tests/benchmarks/run-benchmarks.ts');

    // Execute without reporters
    expect(() => {
      execSync(`node --experimental-strip-types ${runnerPath}`, { stdio: 'pipe' });
    }).not.toThrow();
  });

  it('should generate benchmarks.json when using --reporter=json', () => {
    const rootDir = process.cwd();
    const runnerPath = join(rootDir, 'tests/benchmarks/run-benchmarks.ts');
    const jsonPath = join(rootDir, 'benchmarks.json');

    if (existsSync(jsonPath)) {
      unlinkSync(jsonPath);
    }

    execSync(`node --experimental-strip-types ${runnerPath} --reporter=json`, { stdio: 'pipe' });

    expect(existsSync(jsonPath)).toBe(true);

    // Clean up
    if (existsSync(jsonPath)) {
      unlinkSync(jsonPath);
    }
  });

  it('should generate benchmarks.csv when using --reporter=csv', () => {
    const rootDir = process.cwd();
    const runnerPath = join(rootDir, 'tests/benchmarks/run-benchmarks.ts');
    const csvPath = join(rootDir, 'benchmarks.csv');

    if (existsSync(csvPath)) {
      unlinkSync(csvPath);
    }

    execSync(`node --experimental-strip-types ${runnerPath} --reporter=csv`, { stdio: 'pipe' });

    expect(existsSync(csvPath)).toBe(true);

    // Clean up
    if (existsSync(csvPath)) {
      unlinkSync(csvPath);
    }
  });
});
