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
}
