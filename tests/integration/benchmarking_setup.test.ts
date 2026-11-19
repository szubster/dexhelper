import { execSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Benchmarking Setup Integration', () => {
  const rootDir = process.cwd();
  const runnerPath = join(rootDir, 'tests/benchmarks/run-benchmarks.ts');
  const jsonPath = join(rootDir, 'benchmarks.json');
  const csvPath = join(rootDir, 'benchmarks.csv');

  const cleanArtifacts = () => {
    if (existsSync(jsonPath)) unlinkSync(jsonPath);
    if (existsSync(csvPath)) unlinkSync(csvPath);
  };

  beforeEach(() => {
    cleanArtifacts();
  });

  afterEach(() => {
    cleanArtifacts();
  });

  it.concurrent('should execute run-benchmarks.ts without errors', () => {
    expect(() => {
      execSync(`node --experimental-strip-types ${runnerPath}`, { stdio: 'pipe' });
    }).not.toThrow();
  });

  it.concurrent('should generate valid benchmarks.json when using --reporter=json', () => {
    execSync(`node --experimental-strip-types ${runnerPath} --reporter=json`, { stdio: 'pipe' });

    expect(existsSync(jsonPath)).toBe(true);
    const content = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    expect(Array.isArray(content)).toBe(true);
    expect(content.length).toBeGreaterThan(0);
    expect(content[0]).toHaveProperty('name');
    expect(content[0]).toHaveProperty('operationsPerSecond');
  });

  it.concurrent('should generate valid benchmarks.csv when using --reporter=csv', () => {
    execSync(`node --experimental-strip-types ${runnerPath} --reporter=csv`, { stdio: 'pipe' });

    expect(existsSync(csvPath)).toBe(true);
    const content = readFileSync(csvPath, 'utf-8');
    expect(content).toContain('name,operationsPerSecond,averageTimeNs,samples,memoryUsageBytes');
    const lines = content.trim().split('\n');
    expect(lines.length).toBeGreaterThan(1);
  });
});
