export interface ISaveDataReader {
  getUint8(offset: number): number;
  getUint16(offset: number, littleEndian?: boolean): number;
  getUint32(offset: number, littleEndian?: boolean): number;
  getInt8(offset: number): number;
  getInt16(offset: number, littleEndian?: boolean): number;
  getInt32(offset: number, littleEndian?: boolean): number;
  getFloat32(offset: number, littleEndian?: boolean): number;
  getFloat64(offset: number, littleEndian?: boolean): number;
}
