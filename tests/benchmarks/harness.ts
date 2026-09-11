import { performance } from 'node:perf_hooks';
import type { BenchmarkResult } from './types.ts';

export function runBenchmark(name: string, fn: () => void, iterations = 1000000): BenchmarkResult {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const totalTimeMs = end - start;
  const operationsPerSecond = (iterations / totalTimeMs) * 1000;
  const averageTimeNs = (totalTimeMs / iterations) * 1000000;

  return {
    name,
    operationsPerSecond,
    averageTimeNs,
    samples: iterations,
  };
}

export function reportResult(result: BenchmarkResult): void {
  console.log(`\nBenchmark: ${result.name}`);
  console.log(
    `Operations per second: ${result.operationsPerSecond.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
  );
  console.log(`Average time per operation: ${result.averageTimeNs.toFixed(4)} ns`);
  console.log(`Samples: ${result.samples.toLocaleString()}`);
}
