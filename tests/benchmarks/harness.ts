import { performance } from 'node:perf_hooks';
import type { BenchmarkResult } from './types.ts';

export function runBenchmark(name: string, fn: () => void, iterations = 1000000): BenchmarkResult {
  const memBefore = process.memoryUsage().heapUsed;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const memAfter = process.memoryUsage().heapUsed;
  const totalTimeMs = end - start;
  const operationsPerSecond = (iterations / totalTimeMs) * 1000;
  const averageTimeNs = (totalTimeMs / iterations) * 1000000;

  // Calculate difference and ensure it's not negative due to GC runs
  const memoryUsageBytes = Math.max(0, memAfter - memBefore);

  return {
    name,
    operationsPerSecond,
    averageTimeNs,
    samples: iterations,
    memoryUsageBytes,
  };
}

export function reportResult(result: BenchmarkResult): void {
  console.log(`\nBenchmark: ${result.name}`);
  console.log(
    `Operations per second: ${result.operationsPerSecond.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
  );
  console.log(`Average time per operation: ${result.averageTimeNs.toFixed(4)} ns`);
  console.log(`Samples: ${result.samples.toLocaleString()}`);
  if (result.memoryUsageBytes !== undefined) {
    console.log(`Memory Usage: ${(result.memoryUsageBytes / 1024 / 1024).toFixed(4)} MB`);
  }
}
