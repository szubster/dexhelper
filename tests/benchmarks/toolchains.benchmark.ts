import { execSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { reportResult } from './harness.ts';

const code = `
const x: number = 42;
function foo(a: number): number {
  return a * 2;
}
console.log(foo(x));
`;

function measure(fn: () => void) {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
}

function runToolchainBenchmark(tool: string, installCmd: string, runCmd: string, setup?: (dir: string) => void) {
  const dir = mkdtempSync(join(tmpdir(), `bench-${tool}-`));
  try {
    writeFileSync(join(dir, 'package.json'), '{}');
    writeFileSync(join(dir, 'index.ts'), code);

    let installTime = 0;
    if (installCmd) {
      installTime = measure(() => {
        execSync(installCmd, { cwd: dir, stdio: 'pipe' });
      });
    }

    if (setup) {
      setup(dir);
    }

    const execTime = measure(() => {
      execSync(runCmd, { cwd: dir, stdio: 'pipe' });
    });

    reportResult({
      name: `Toolchain: ${tool}`,
      operationsPerSecond: 1000 / execTime,
      averageTimeNs: execTime * 1e6,
      samples: 1,
      memoryUsageBytes: installTime, // Reusing field for install time as dependency overhead
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(`[${tool}] Error:`, e.message);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// 1. Node.js native strip-typing
runToolchainBenchmark('node-native', '', 'node --experimental-strip-types index.ts');

// 2. ts-node
runToolchainBenchmark('ts-node', 'npm install typescript@5 ts-node', 'npx ts-node index.ts');

// 3. esbuild
runToolchainBenchmark(
  'esbuild',
  'npm install esbuild',
  'npx esbuild index.ts --bundle --platform=node --outfile=out.js && node out.js',
);

// 4. swc
runToolchainBenchmark('swc', 'npm install @swc/core @swc/cli', 'npx swc index.ts -o out.js && node out.js');

// 5. oxc
runToolchainBenchmark('oxc', 'npm install @oxc-transform/binding-linux-x64-gnu oxc-transform', 'node run.js', (dir) => {
  writeFileSync(
    join(dir, 'run.js'),
    `
const fs = require('fs');
const oxc = require('oxc-transform');
const code = fs.readFileSync('index.ts', 'utf8');
const out = oxc.transformSync('index.ts', code);
fs.writeFileSync('out.js', out.code);
require('./out.js');
    `,
  );
});
