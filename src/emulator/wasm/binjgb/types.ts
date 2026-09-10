export interface BinjgbModule {
  HEAPU8: Uint8Array;
  _malloc(size: number): number;
  _free(ptr: number): void;
  _emulator_init(romPtr: number, romSize: number): number;
  _emulator_run(): void;
  _emulator_pause(): void;
  _emulator_reset(): void;
}

export interface BinjgbInstance {
  start(): void;
  pause(): void;
  reset(): void;
  loadRom(romBuffer: Uint8Array): void;
}
