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

  readBits(_offset: number, _bitOffset: number, _bitLength: number): number {
    throw new Error('Not implemented');
  }

  readFlag(_offset: number, _bitOffset: number): boolean {
    throw new Error('Not implemented');
  }
}
