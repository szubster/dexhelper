import { beforeEach, describe, expect, it } from 'vitest';
import { WasmMemoryHook } from '../WasmMemoryHook';

describe('WasmMemoryHook', () => {
  let wasmMemory: WebAssembly.Memory;
  let memoryHook: WasmMemoryHook;

  beforeEach(() => {
    // Create a small WASM memory instance (1 page = 64KB)
    wasmMemory = new WebAssembly.Memory({ initial: 1 });
    memoryHook = new WasmMemoryHook(wasmMemory);
  });

  it('extracts the full buffer', () => {
    const view = new Uint8Array(wasmMemory.buffer);
    view[0] = 42;
    view[100] = 99;

    const extracted = memoryHook.extractBuffer();
    expect(extracted).toBeInstanceOf(Uint8Array);
    expect(extracted.length).toBe(65536); // 1 page
    expect(extracted[0]).toBe(42);
    expect(extracted[100]).toBe(99);
  });

  it('extracts a slice of the buffer', () => {
    const view = new Uint8Array(wasmMemory.buffer);
    view[10] = 1;
    view[11] = 2;
    view[12] = 3;

    const slice = memoryHook.extractSlice(10, 3);
    expect(slice).toBeInstanceOf(Uint8Array);
    expect(slice.length).toBe(3);
    expect(slice[0]).toBe(1);
    expect(slice[1]).toBe(2);
    expect(slice[2]).toBe(3);
  });

  it('throws RangeError when extracting out of bounds', () => {
    expect(() => memoryHook.extractSlice(65530, 10)).toThrow(RangeError);
    expect(() => memoryHook.extractSlice(-1, 10)).toThrow(RangeError);
    expect(() => memoryHook.extractSlice(0, 65537)).toThrow(RangeError);
  });
});
