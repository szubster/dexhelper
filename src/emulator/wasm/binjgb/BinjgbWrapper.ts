import type { BinjgbInstance, BinjgbModule } from './types';

export class BinjgbWrapper implements BinjgbInstance {
  private module: BinjgbModule | null = null;
  private romPtr: number = 0;

  public async init(moduleFactory: () => Promise<BinjgbModule>): Promise<void> {
    this.module = await moduleFactory();
  }

  public loadRom(romBuffer: Uint8Array): void {
    if (!this.module) {
      throw new Error('Module not initialized');
    }

    if (this.romPtr !== 0) {
      this.module._free(this.romPtr);
    }

    this.romPtr = this.module._malloc(romBuffer.length);
    this.module.HEAPU8.set(romBuffer, this.romPtr);

    this.module._emulator_init(this.romPtr, romBuffer.length);
  }

  public start(): void {
    if (!this.module) {
      throw new Error('Module not initialized');
    }
    this.module._emulator_run();
  }

  public pause(): void {
    if (!this.module) {
      throw new Error('Module not initialized');
    }
    this.module._emulator_pause();
  }

  public reset(): void {
    if (!this.module) {
      throw new Error('Module not initialized');
    }
    this.module._emulator_reset();
  }

  public setJoypadState(state: number): void {
    if (!this.module) {
      throw new Error('Module not initialized');
    }
    this.module._emulator_set_joypad_state(state);
  }

  public extractSaveState(): Uint8Array | null {
    if (!this.module) {
      throw new Error('Module not initialized');
    }

    const fileDataPtr = this.module._ext_ram_file_data_new();
    if (fileDataPtr === 0) {
      return null;
    }

    try {
      const dataPtr = this.module._get_file_data_ptr(fileDataPtr);
      const dataSize = this.module._get_file_data_size(fileDataPtr);

      if (dataPtr === 0 || dataSize === 0) {
        return null;
      }

      // Create a copy of the data since the WASM memory can change or be freed
      const saveStateBuffer = new Uint8Array(dataSize);
      saveStateBuffer.set(this.module.HEAPU8.subarray(dataPtr, dataPtr + dataSize));
      return saveStateBuffer;
    } finally {
      this.module._file_data_delete(fileDataPtr);
    }
  }
}
