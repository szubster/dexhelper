import { writeFileSync } from 'node:fs';
import type { BenchmarkResult } from './types.ts';

export function generateJSON(results: BenchmarkResult[], filePath: string): void {
  writeFileSync(filePath, JSON.stringify(results, null, 2), 'utf-8');
}

export function generateCSV(results: BenchmarkResult[], filePath: string): void {
  if (results.length === 0) return;
  const headers = ['name', 'operationsPerSecond', 'averageTimeNs', 'samples', 'memoryUsageBytes'];
  const rows = results.map((r) =>
    headers
      .map((h) => {
        const val = r[h as keyof BenchmarkResult];
        return val === undefined ? '' : val.toString();
      })
      .join(','),
  );
  writeFileSync(filePath, [headers.join(','), ...rows].join('\n'), 'utf-8');
}
