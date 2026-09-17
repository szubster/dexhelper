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
}

export class SaveDataReader implements ISaveDataReader {
  private view: DataView;

  constructor(view: DataView) {
    this.view = view;
  }

  private checkBounds(offset: number, byteLength: number): void {
    if (offset < 0 || offset + byteLength > this.view.byteLength) {
      throw new RangeError('The save file is corrupted or incomplete.');
    }
  }

  getUint8(offset: number): number {
    this.checkBounds(offset, 1);
    try {
      return this.view.getUint8(offset);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getInt8(offset: number): number {
    this.checkBounds(offset, 1);
    try {
      return this.view.getInt8(offset);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getUint16Le(offset: number): number {
    this.checkBounds(offset, 2);
    try {
      return this.view.getUint16(offset, true);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getUint16Be(offset: number): number {
    this.checkBounds(offset, 2);
    try {
      return this.view.getUint16(offset, false);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getInt16Le(offset: number): number {
    this.checkBounds(offset, 2);
    try {
      return this.view.getInt16(offset, true);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getInt16Be(offset: number): number {
    this.checkBounds(offset, 2);
    try {
      return this.view.getInt16(offset, false);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getUint32Le(offset: number): number {
    this.checkBounds(offset, 4);
    try {
      return this.view.getUint32(offset, true);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getUint32Be(offset: number): number {
    this.checkBounds(offset, 4);
    try {
      return this.view.getUint32(offset, false);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getInt32Le(offset: number): number {
    this.checkBounds(offset, 4);
    try {
      return this.view.getInt32(offset, true);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getInt32Be(offset: number): number {
    this.checkBounds(offset, 4);
    try {
      return this.view.getInt32(offset, false);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getFloat32Le(offset: number): number {
    this.checkBounds(offset, 4);
    try {
      return this.view.getFloat32(offset, true);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getFloat32Be(offset: number): number {
    this.checkBounds(offset, 4);
    try {
      return this.view.getFloat32(offset, false);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getFloat64Le(offset: number): number {
    this.checkBounds(offset, 8);
    try {
      return this.view.getFloat64(offset, true);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }

  getFloat64Be(offset: number): number {
    this.checkBounds(offset, 8);
    try {
      return this.view.getFloat64(offset, false);
    } catch (e) {
      if (e instanceof RangeError) {
        throw new RangeError('The save file is corrupted or incomplete.');
      }
      throw e;
    }
  }
}
