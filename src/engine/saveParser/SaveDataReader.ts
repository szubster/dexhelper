export interface ISaveDataReader {
  getUint8(offset: number): number;
  getInt8(offset: number): number;
  getUint16Le(offset: number): number;
  getUint16Be(offset: number): number;
  getInt16Le(offset: number): number;
  getInt16Be(offset: number): number;
  getUint32Le(offset: number): number;
  getUint32Be(offset: number): number;
  getInt32Le(offset: number): number;
  getInt32Be(offset: number): number;
  getFloat32Le(offset: number): number;
  getFloat32Be(offset: number): number;
  getFloat64Le(offset: number): number;
  getFloat64Be(offset: number): number;
  readBits(offset: number, bitOffset: number, bitLength: number): number;
  readFlag(offset: number, bitOffset: number): boolean;
}

export class SaveDataReader implements ISaveDataReader {
  private view: DataView;

  constructor(view: DataView) {
    this.view = view;
  }

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
      return result >>> 0;
    });
  }

  readFlag(offset: number, bitOffset: number): boolean {
    return this.readBits(offset, bitOffset, 1) === 1;
  }
}
