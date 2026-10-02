export interface BinjgbModule {
  HEAPU8: Uint8Array;
  _malloc(size: number): number;
  _free(ptr: number): void;
  _emulator_init(romPtr: number, romSize: number): number;
  _emulator_run(): void;
  _emulator_pause(): void;
  _emulator_reset(): void;
  _ext_ram_file_data_new(): number;
  _get_file_data_ptr(fileDataPtr: number): number;
  _get_file_data_size(fileDataPtr: number): number;
  _file_data_delete(fileDataPtr: number): void;
}

export interface BinjgbInstance {
  start(): void;
  pause(): void;
  reset(): void;
  loadRom(romBuffer: Uint8Array): void;
  extractSaveState(): Uint8Array | null;
}
