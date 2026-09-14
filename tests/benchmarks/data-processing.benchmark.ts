import { reportResult, runBenchmark } from './harness.ts';

// Mock data processing task: mapping over an array of numbers
const data = Array.from({ length: 1000 }, (_, i) => i);

const result = runBenchmark(
  'Data Processing (Map & Filter)',
  () => {
    // Process data by filtering evens and multiplying by 2
    data.filter((n) => n % 2 === 0).map((n) => n * 2);
  },
  10000,
);

reportResult(result);
