import type { MGBAConfig, MGBAFactory, MGBAWasmModule } from './types';

// The global factory function exposed by the mGBA Emscripten build.
// This is typically injected via a script tag, or dynamically imported.
// For the purpose of this wrapper, we assume it's available globally or will be provided.
declare global {
  interface Window {
    mgba?: MGBAFactory;
  }
}

export class MGBAWasmWrapper {
  private config: MGBAConfig;
  private module: MGBAWasmModule | null = null;
  private initPromise: Promise<void> | null = null;

  constructor(config: MGBAConfig) {
    this.config = config;
  }

  public async init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this._init();
    return this.initPromise;
  }

  private async _init(): Promise<void> {
    try {
      if (!this.config.wasmBinary && !this.config.wasmUrl) {
        throw new Error('Must provide either wasmBinary or wasmUrl');
      }

      const factory = window.mgba;

      if (!factory) {
        // Attempt to find it if not globally registered. In a real module context, you might import it directly.
        throw new Error('mGBA Emscripten factory function not found.');
      }

      const emscriptenConfig: Partial<MGBAWasmModule> = {};

      if (this.config.wasmBinary) {
        emscriptenConfig.wasmBinary = this.config.wasmBinary;
      } else if (this.config.wasmUrl) {
        emscriptenConfig.locateFile = (path: string) => {
          if (path.endsWith('.wasm') && this.config.wasmUrl) {
            return this.config.wasmUrl;
          }
          return path;
        };
      }

      if (this.config.canvas) {
        emscriptenConfig.canvas = this.config.canvas;
      }

      this.module = await factory(emscriptenConfig);

      if (this.config.onReady) {
        this.config.onReady();
      }
    } catch (error) {
      if (this.config.onError && error instanceof Error) {
        this.config.onError(error);
      }
      throw error;
    }
  }

  public getModule(): MGBAWasmModule | null {
    return this.module;
  }
}
