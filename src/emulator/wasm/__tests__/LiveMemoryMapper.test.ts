import { beforeEach, describe, expect, it } from 'vitest';
import { LiveMemoryMapper } from '../LiveMemoryMapper';
import { WasmMemoryHook } from '../WasmMemoryHook';

describe('LiveMemoryMapper', () => {
  let wasmMemory: WebAssembly.Memory;
  let hook: WasmMemoryHook;
  let mapper: LiveMemoryMapper;

  beforeEach(() => {
    // Create a 1 page (64KB) memory instance
    wasmMemory = new WebAssembly.Memory({ initial: 1 });
    hook = new WasmMemoryHook(wasmMemory);
    mapper = new LiveMemoryMapper(hook);
  });

  it('maps a block into a DataView correctly', () => {
    const view = new Uint8Array(wasmMemory.buffer);
    view[10] = 0xab;
    view[11] = 0xcd;

    const dataView = mapper.mapBlock(10, 2);
    expect(dataView).toBeInstanceOf(DataView);
    expect(dataView.byteLength).toBe(2);
    expect(dataView.getUint8(0)).toBe(0xab);
    expect(dataView.getUint8(1)).toBe(0xcd);
  });

  it('reads Uint8 correctly', () => {
    const view = new Uint8Array(wasmMemory.buffer);
    view[20] = 42;

    const val = mapper.readUint8(20);
    expect(val).toBe(42);
  });

  it('reads Uint16 correctly', () => {
    const view = new Uint8Array(wasmMemory.buffer);
    // Little endian: 0x34 0x12 -> 0x1234
    view[30] = 0x34;
    view[31] = 0x12;

    const valLE = mapper.readUint16(30, true);
    expect(valLE).toBe(0x1234);

    const valBE = mapper.readUint16(30, false);
    expect(valBE).toBe(0x3412);
  });

  it('reads Uint32 correctly', () => {
    const view = new Uint8Array(wasmMemory.buffer);
    // Little endian: 0x78 0x56 0x34 0x12 -> 0x12345678
    view[40] = 0x78;
    view[41] = 0x56;
    view[42] = 0x34;
    view[43] = 0x12;

    const valLE = mapper.readUint32(40, true);
    expect(valLE).toBe(0x12345678);

    const valBE = mapper.readUint32(40, false);
    expect(valBE).toBe(0x78563412);
  });

  it('throws RangeError for out of bounds reads', () => {
    expect(() => mapper.mapBlock(65535, 2)).toThrow(RangeError);
    expect(() => mapper.readUint8(65536)).toThrow(RangeError);
    expect(() => mapper.readUint16(65535)).toThrow(RangeError);
    expect(() => mapper.readUint32(65534)).toThrow(RangeError);
  });
});
