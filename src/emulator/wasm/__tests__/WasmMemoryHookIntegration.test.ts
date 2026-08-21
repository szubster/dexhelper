import { describe, expect, it } from 'vitest';
import { WasmMemoryHook } from '../WasmMemoryHook';

describe('WasmMemoryHook Integration', () => {
  it('extracts correctly under simulated continuous load', () => {
    // Create a 1 page (64KB) memory instance
    const memory = new WebAssembly.Memory({ initial: 1 });
    const hook = new WasmMemoryHook(memory);

    const bufferView = new Uint8Array(memory.buffer);
    const start = performance.now();
    const ITERATIONS = 10000;

    // Create arrays to hold expected and actual values for non-conditional assertion
    const actualLengths = [];
    const actual0 = [];
    const actual1024 = [];
    const actual65000 = [];
    const expected0 = [];
    const expected1024 = [];
    const expected65000 = [];

    // Simulate continuous emulator loop updating memory and extracting it
    for (let i = 0; i < ITERATIONS; i++) {
      // Modify a few bytes
      bufferView[0] = i % 256;
      bufferView[1024] = (i * 2) % 256;
      bufferView[65000] = (i * 3) % 256;

      // Extract the buffer
      const extracted = hook.extractBuffer();

      // Collect data periodically instead of testing conditionally
      if (i % 1000 === 0) {
        actualLengths.push(extracted.length);
        actual0.push(extracted[0]);
        actual1024.push(extracted[1024]);
        actual65000.push(extracted[65000]);

        expected0.push(i % 256);
        expected1024.push((i * 2) % 256);
        expected65000.push((i * 3) % 256);
      }
    }
    const end = performance.now();
    const duration = end - start;

    // Assert lengths and values after loop
    expect(actualLengths).toEqual(Array(10).fill(65536));
    expect(actual0).toEqual(expected0);
    expect(actual1024).toEqual(expected1024);
    expect(actual65000).toEqual(expected65000);

    // The extraction must be fast. 10000 full buffer extractions of 64KB should take < 50ms locally.
    // Given CI environments, we'll give it a generous bound of 200ms.
    expect(duration).toBeLessThan(200);
  });
});
