import type { WasmMemoryHook } from './WasmMemoryHook';

/**
 * Maps the live WASM memory buffer to structured data blocks.
 * Adheres strictly to ADR 010 by exclusively using the native DataView API.
 */
export class LiveMemoryMapper {
  private hook: WasmMemoryHook;

  constructor(hook: WasmMemoryHook) {
    this.hook = hook;
  }

  /**
   * Reads a structured memory block using the DataView API.
   * @param offset The starting byte offset in the WASM memory.
   * @param length The total length of the block to map.
   * @returns A DataView representing the requested memory block.
   * @throws RangeError if the offset or length is out of bounds.
   */
  public mapBlock(offset: number, length: number): DataView {
    const rawSlice = this.hook.extractSlice(offset, length);
    // ADR 010: Exclusively use DataView API over raw Uint8Array manipulations.
    return new DataView(rawSlice.buffer, rawSlice.byteOffset, rawSlice.byteLength);
  }

  /**
   * Retrieves an 8-bit unsigned integer from the active memory.
   * @param offset The byte offset.
   * @returns The uint8 value.
   */
  public readUint8(offset: number): number {
    const view = this.mapBlock(offset, 1);
    return view.getUint8(0);
  }

  /**
   * Retrieves a 16-bit unsigned integer from the active memory.
   * @param offset The byte offset.
   * @param littleEndian Whether to read as little-endian. Defaults to true.
   * @returns The uint16 value.
   */
  public readUint16(offset: number, littleEndian = true): number {
    const view = this.mapBlock(offset, 2);
    return view.getUint16(0, littleEndian);
  }

  /**
   * Retrieves a 32-bit unsigned integer from the active memory.
   * @param offset The byte offset.
   * @param littleEndian Whether to read as little-endian. Defaults to true.
   * @returns The uint32 value.
   */
  public readUint32(offset: number, littleEndian = true): number {
    const view = this.mapBlock(offset, 4);
    return view.getUint32(0, littleEndian);
  }
}
