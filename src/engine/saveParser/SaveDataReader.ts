export interface ISaveDataReader {
  getUint8(byteOffset: number): number;
  getUint16(byteOffset: number, littleEndian?: boolean): number;
  getUint32(byteOffset: number, littleEndian?: boolean): number;
}
