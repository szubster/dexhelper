import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { generateCSV, generateJSON } from './reporter.ts';
import type { BenchmarkResult } from './types.ts';

const benchmarkDir = new URL('.', import.meta.url).pathname;

const files = readdirSync(benchmarkDir).filter((f) => f.endsWith('.benchmark.ts'));

const isJsonReporter = process.argv.includes('--reporter=json');
const isCsvReporter = process.argv.includes('--reporter=csv');
const isReporterActive = isJsonReporter || isCsvReporter;
const results: BenchmarkResult[] = [];

if (!isReporterActive) {
  console.log(`Found ${files.length} benchmarks to run.`);
}

for (const file of files) {
  if (!isReporterActive) {
    console.log(`\n--- Running ${file} ---`);
  }
  try {
    const out = execSync(`node --experimental-strip-types ${join(benchmarkDir, file)}`, {
      stdio: isReporterActive ? 'pipe' : 'inherit',
      env: { ...process.env, BENCHMARK_JSON_STDOUT: isReporterActive ? 'true' : undefined },
    });

    if (isReporterActive) {
      const lines = out.toString().trim().split('\n');
      for (const line of lines) {
        if (line) {
          results.push(JSON.parse(line));
        }
      }
    }
  } catch (e) {
    console.error(`Failed to run benchmark ${file}`, e);
  }
}

const outputArg = process.argv.find((a) => a.startsWith('--output='));
const customOutputPath = outputArg ? outputArg.slice('--output='.length) : null;

if (isJsonReporter) {
  generateJSON(results, customOutputPath || 'benchmarks.json');
} else if (isCsvReporter) {
  generateCSV(results, customOutputPath || 'benchmarks.csv');
}
