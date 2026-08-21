export class WasmMemoryHook {
  private memory: WebAssembly.Memory;

  constructor(memory: WebAssembly.Memory) {
    this.memory = memory;
  }

  /**
   * Extracts the raw memory buffer from the active WASM memory instance.
   * @returns A Uint8Array representing the current state of the WASM memory.
   */
  public extractBuffer(): Uint8Array {
    return new Uint8Array(this.memory.buffer);
  }

  /**
   * Extracts a portion of the raw memory buffer from the active WASM memory instance.
   * @param offset The starting byte offset.
   * @param length The number of bytes to extract.
   * @returns A Uint8Array containing the extracted slice.
   */
  public extractSlice(offset: number, length: number): Uint8Array {
    if (offset < 0 || length < 0 || offset + length > this.memory.buffer.byteLength) {
      throw new RangeError('Extracted slice is out of bounds');
    }
    return new Uint8Array(this.memory.buffer, offset, length);
  }
}
