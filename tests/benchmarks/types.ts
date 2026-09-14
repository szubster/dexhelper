export interface BenchmarkResult {
  name: string;
  operationsPerSecond: number;
  averageTimeNs: number;
  samples: number;
  memoryUsageBytes?: number;
}
