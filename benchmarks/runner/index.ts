import { execSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const payloadsDir = join(new URL('.', import.meta.url).pathname, '../payloads');
const files = readdirSync(payloadsDir).filter(f => f.endsWith('.ts'));

interface Toolchain {
  name: string;
  command: (file: string) => string;
  dependencies: string[];
}

const toolchains: Toolchain[] = [
  {
    name: 'ts-node',
    command: (file) => `pnpm exec ts-node --project benchmarks/configs/tsconfig.ts-node.json ${join(payloadsDir, file)}`,
    dependencies: ['ts-node', 'typescript']
  },
  {
    name: 'swc',
    command: (file) => `pnpm exec swc benchmarks/payloads/${file} -o benchmarks/dist/${file.replace('.ts', '.js')} --config-file benchmarks/configs/.swcrc && node benchmarks/dist/${file.replace('.ts', '.js')}`,
    dependencies: ['@swc/core', '@swc/cli']
  },
  {
    name: 'esbuild',
    command: (file) => `pnpm exec esbuild benchmarks/payloads/${file} --outfile=benchmarks/dist/${file.replace('.ts', '.js')} --format=cjs && node benchmarks/dist/${file.replace('.ts', '.js')}`,
    dependencies: ['esbuild']
  },
  {
    name: 'oxc',
    command: (file) => `node --experimental-strip-types benchmarks/runner/oxc-runner.ts ${join(payloadsDir, file)} benchmarks/dist/${file.replace('.ts', '.js')} && node benchmarks/dist/${file.replace('.ts', '.js')}`,
    dependencies: ['oxc-transform']
  },
  {
    name: 'node-native',
    command: (file) => `node --experimental-strip-types ${join(payloadsDir, file)}`,
    dependencies: []
  }
];

function getDependencySize(deps: string[]): number {
  return deps.length;
}

console.log('--- Benchmark Runner ---');
console.log(`Found ${files.length} payload files.\n`);

execSync('mkdir -p benchmarks/dist');

const results: Record<string, { executionTimeMs: number | 'FAILED', dependencyCount: number }> = {};

for (const toolchain of toolchains) {
  console.log(`Evaluating toolchain: ${toolchain.name}`);
  let totalTime = 0;
  let failed = false;

  for (const file of files) {
    const start = performance.now();
    try {
      execSync(toolchain.command(file), { stdio: 'ignore' });
      const end = performance.now();
      totalTime += (end - start);
    } catch {
      console.error(`  Error running ${file} with ${toolchain.name}`);
      failed = true;
      break;
    }
  }

  const depCount = getDependencySize(toolchain.dependencies);

  results[toolchain.name] = {
    executionTimeMs: failed ? 'FAILED' : Number(totalTime.toFixed(2)),
    dependencyCount: depCount
  };

  if (!failed) {
    console.log(`  Total time: ${totalTime.toFixed(2)}ms`);
  }
  console.log(`  Dependency count: ${depCount}\n`);
}

console.log('--- Final Report ---');
console.table(results);

// Clean up
execSync('rm -rf benchmarks/dist');
