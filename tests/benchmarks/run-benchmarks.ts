import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const benchmarkDir = new URL('.', import.meta.url).pathname;

const files = readdirSync(benchmarkDir).filter((f) => f.endsWith('.benchmark.ts'));

console.log(`Found ${files.length} benchmarks to run.`);

for (const file of files) {
  console.log(`\n--- Running ${file} ---`);
  try {
    execSync(`node --experimental-strip-types ${join(benchmarkDir, file)}`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to run benchmark ${file}`, e);
  }
}
