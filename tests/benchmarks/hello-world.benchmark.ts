import { reportResult, runBenchmark } from './harness.ts';

const result = runBenchmark(
  'Hello World (String Concatenation)',
  () => {
    // @ts-expect-error test
    const _a = 'hello' + 'world';
  },
  10000000,
);

reportResult(result);
