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
