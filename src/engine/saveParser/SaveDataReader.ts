/**
 * @module saveParser/SaveDataReader
 *
 * Encapsulates raw binary buffer reading for save file parsers.
 * Wraps standard `DataView` accessors to provide standardized error handling
 * (converting low-level `RangeError` bounds violations into standardized corruption errors)
 * and bit-level extraction capabilities across arbitrary byte boundaries.
 */

/**
 * Interface contract for reading multi-endian scalar values and bitwise flag data
 * from a raw save file binary buffer.
 */
export interface ISaveDataReader {
  /**
   * Reads an unsigned 8-bit integer (byte).
   * @param offset - Byte index within the save buffer.
   * @returns Unsigned 8-bit integer value (0 to 255).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getUint8(offset: number): number;

  /**
   * Reads a signed 8-bit integer.
   * @param offset - Byte index within the save buffer.
   * @returns Signed 8-bit integer value (-128 to 127).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getInt8(offset: number): number;

  /**
   * Reads an unsigned 16-bit integer in little-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Unsigned 16-bit integer value (0 to 65,535).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getUint16Le(offset: number): number;

  /**
   * Reads an unsigned 16-bit integer in big-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Unsigned 16-bit integer value (0 to 65,535).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getUint16Be(offset: number): number;

  /**
   * Reads a signed 16-bit integer in little-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Signed 16-bit integer value (-32,768 to 32,767).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getInt16Le(offset: number): number;

  /**
   * Reads a signed 16-bit integer in big-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Signed 16-bit integer value (-32,768 to 32,767).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getInt16Be(offset: number): number;

  /**
   * Reads an unsigned 32-bit integer in little-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Unsigned 32-bit integer value (0 to 4,294,967,295).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getUint32Le(offset: number): number;

  /**
   * Reads an unsigned 32-bit integer in big-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Unsigned 32-bit integer value (0 to 4,294,967,295).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getUint32Be(offset: number): number;

  /**
   * Reads a signed 32-bit integer in little-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Signed 32-bit integer value (-2,147,483,648 to 2,147,483,647).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getInt32Le(offset: number): number;

  /**
   * Reads a signed 32-bit integer in big-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Signed 32-bit integer value (-2,147,483,648 to 2,147,483,647).
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getInt32Be(offset: number): number;

  /**
   * Reads a 32-bit IEEE 754 floating-point number in little-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Single-precision float value.
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getFloat32Le(offset: number): number;

  /**
   * Reads a 32-bit IEEE 754 floating-point number in big-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Single-precision float value.
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getFloat32Be(offset: number): number;

  /**
   * Reads a 64-bit IEEE 754 floating-point number in little-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Double-precision float value.
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getFloat64Le(offset: number): number;

  /**
   * Reads a 64-bit IEEE 754 floating-point number in big-endian byte order.
   * @param offset - Byte index within the save buffer.
   * @returns Double-precision float value.
   * @throws {Error} If `offset` exceeds buffer boundaries.
   */
  getFloat64Be(offset: number): number;

  /**
   * Reads an arbitrary bitfield up to 32 bits wide spanning byte boundaries.
   * @param offset - Base byte index in the buffer.
   * @param bitOffset - Relative bit position from the base byte offset.
   * @param bitLength - Number of bits to read (1 to 32).
   * @returns Unsigned integer representing the extracted bits.
   * @throws {Error} If arguments are invalid or bit reading exceeds buffer boundaries.
   */
  readBits(offset: number, bitOffset: number, bitLength: number): number;

  /**
   * Reads a single bit as a boolean flag.
   * @param offset - Base byte index in the buffer.
   * @param bitOffset - Relative bit index from the base byte offset.
   * @returns `true` if the target bit is 1, `false` if 0.
   * @throws {Error} If arguments are invalid or bit reading exceeds buffer boundaries.
   */
  readFlag(offset: number, bitOffset: number): boolean;
}

/**
 * Concrete binary save reader implementation wrapping a `DataView`.
 *
 * **Architecture Note:**
 * 1. Standardizes bounds violation exceptions by catching `DataView` `RangeError` instances
 *    and converting them to standardized user-facing corruption errors.
 * 2. Provides bit-level flag and bitfield extraction across byte boundaries, using
 *    unsigned zero-fill right shift (`>>> 0`) to maintain 32-bit unsigned integrity in JavaScript.
 *
 * @example
 * const reader = new SaveDataReader(new DataView(arrayBuffer));
 * const trainerId = reader.getUint16Le(0x2000);
 * const isEventFlagActive = reader.readFlag(0x1270, 5);
 */
export class SaveDataReader implements ISaveDataReader {
  private view: DataView;

  /**
   * Creates a new `SaveDataReader` instance.
   * @param view - The `DataView` wrapping the raw save file `ArrayBuffer`.
   */
  constructor(view: DataView) {
    this.view = view;
  }

  /**
   * Executes a DataView read function within a standardized exception boundary.
   *
   * **Why this exists:**
   * Low-level `DataView` accessors throw native `RangeError` when an offset extends
   * past the buffer boundary. To prevent unhandled range exceptions from leaking across
   * parsing modules, this wrapper converts `RangeError` into a clean, domain-specific
   * error message ('The save file is corrupted or incomplete.').
   *
   * @template T - Return type of the underlying reader operation.
   * @param readFn - Callback executing the underlying DataView method.
   * @returns Result of `readFn`.
   * @throws {Error} Converted error if `readFn` throws a `RangeError`.
   */
  private executeRead<T>(readFn: () => T): T {
    try {
      return readFn();
    } catch (error) {
      if (error instanceof RangeError) {
        throw new Error('The save file is corrupted or incomplete.');
      }
      throw error;
    }
  }

  getUint8(offset: number): number {
    return this.executeRead(() => this.view.getUint8(offset));
  }

  getInt8(offset: number): number {
    return this.executeRead(() => this.view.getInt8(offset));
  }

  getUint16Le(offset: number): number {
    return this.executeRead(() => this.view.getUint16(offset, true));
  }

  getUint16Be(offset: number): number {
    return this.executeRead(() => this.view.getUint16(offset, false));
  }

  getInt16Le(offset: number): number {
    return this.executeRead(() => this.view.getInt16(offset, true));
  }

  getInt16Be(offset: number): number {
    return this.executeRead(() => this.view.getInt16(offset, false));
  }

  getUint32Le(offset: number): number {
    return this.executeRead(() => this.view.getUint32(offset, true));
  }

  getUint32Be(offset: number): number {
    return this.executeRead(() => this.view.getUint32(offset, false));
  }

  getInt32Le(offset: number): number {
    return this.executeRead(() => this.view.getInt32(offset, true));
  }

  getInt32Be(offset: number): number {
    return this.executeRead(() => this.view.getInt32(offset, false));
  }

  getFloat32Le(offset: number): number {
    return this.executeRead(() => this.view.getFloat32(offset, true));
  }

  getFloat32Be(offset: number): number {
    return this.executeRead(() => this.view.getFloat32(offset, false));
  }

  getFloat64Le(offset: number): number {
    return this.executeRead(() => this.view.getFloat64(offset, true));
  }

  getFloat64Be(offset: number): number {
    return this.executeRead(() => this.view.getFloat64(offset, false));
  }

  /**
   * Reads an arbitrary bitfield up to 32 bits wide across byte boundaries.
   *
   * **Why bitwise math is used:**
   * Event flags, IVs, and state variables in Game Boy save files are densely packed into
   * bitfields. This method calculates bit-by-bit extraction using byte offset `Math.floor(bitPos / 8)`
   * and bit index `bitPos % 8`.
   *
   * **Unsigned 32-bit Shift (`>>> 0`):**
   * JavaScript bitwise operators (`|`, `<<`) convert operands to 32-bit signed integers.
   * Applying `>>> 0` coerces the final result back to a 32-bit unsigned integer to prevent
   * bitfields with the 31st bit set from being returned as negative numbers.
   *
   * @param offset - Base byte index in the buffer.
   * @param bitOffset - Relative bit position from the base byte offset.
   * @param bitLength - Number of bits to read (1 to 32).
   * @returns Unsigned integer containing the extracted bits.
   * @throws {Error} If parameters are negative, `bitLength` > 32, or reading exceeds buffer bounds.
   * @example
   * // Read 5-bit IV value starting at byte 0x2000, bit 3
   * const iv = reader.readBits(0x2000, 3, 5);
   */
  readBits(offset: number, bitOffset: number, bitLength: number): number {
    if (bitOffset < 0 || bitLength < 0 || bitLength > 32) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    return this.executeRead(() => {
      const BITS_PER_BYTE = 8;
      let result = 0;
      for (let i = 0; i < bitLength; i++) {
        const bitPos = bitOffset + i;
        const byteOffset = offset + Math.floor(bitPos / BITS_PER_BYTE);
        const bitIndex = bitPos % BITS_PER_BYTE;
        const byte = this.view.getUint8(byteOffset);
        const bit = (byte >> bitIndex) & 1;
        result |= bit << i;
      }
      // Zero-fill right shift converts signed 32-bit integer bitwise result into an unsigned number
      return result >>> 0;
    });
  }

  /**
   * Reads a single bit as a boolean flag.
   *
   * @param offset - Base byte index in the buffer.
   * @param bitOffset - Relative bit index from the base byte offset.
   * @returns `true` if the bit at `bitOffset` is 1, `false` otherwise.
   * @throws {Error} If arguments are invalid or bit reading exceeds buffer boundaries.
   * @example
   * const hasNationalDex = reader.readFlag(0x1270, 0x38);
   */
  readFlag(offset: number, bitOffset: number): boolean {
    return this.readBits(offset, bitOffset, 1) === 1;
  }
}
