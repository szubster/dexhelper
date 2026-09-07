export interface MGBAConfig {
  wasmBinary?: ArrayBuffer;
  wasmUrl?: string;
  canvas?: HTMLCanvasElement;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export interface MGBAWasmModule {
  FS: unknown;
  _malloc: (size: number) => number;
  _free: (ptr: number) => void;
  HEAP8: Int8Array;
  HEAPU8: Uint8Array;
  callMain?: (args: string[]) => void;
  canvas?: HTMLCanvasElement;
  wasmBinary?: ArrayBuffer;
  locateFile?: (path: string, prefix: string) => string;
}

export type MGBAFactory = (config: Partial<MGBAWasmModule>) => Promise<MGBAWasmModule>;
