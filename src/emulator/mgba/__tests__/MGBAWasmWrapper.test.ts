/**
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MGBAWasmWrapper } from '../MGBAWasmWrapper';
import type { MGBAFactory, MGBAWasmModule } from '../types';

describe('MGBAWasmWrapper', () => {
  afterEach(() => {
    delete window.mgba;
  });

  it('should initialize successfully with wasmBinary', async () => {
    const mockModule = {} as MGBAWasmModule;
    window.mgba = vi.fn<() => Promise<MGBAWasmModule>>().mockResolvedValue(mockModule) as unknown as MGBAFactory;

    const onReady = vi.fn<() => void>();
    const config = {
      wasmBinary: new ArrayBuffer(8),
      onReady,
    };
    const wrapper = new MGBAWasmWrapper(config);
    await wrapper.init();
    expect(wrapper.getModule()).toBe(mockModule);
    expect(onReady).toHaveBeenCalled();
  });

  it('should throw an error if no wasm source is provided', async () => {
    const onError = vi.fn<(error: Error) => void>();
    const config = {
      onError,
    };
    const wrapper = new MGBAWasmWrapper(config);
    await expect(wrapper.init()).rejects.toThrow('Must provide either wasmBinary or wasmUrl');
    expect(onError).toHaveBeenCalled();
  });

  it('should throw an error if factory is not found', async () => {
    const onError = vi.fn<(error: Error) => void>();
    const config = {
      wasmBinary: new ArrayBuffer(8),
      onError,
    };
    const wrapper = new MGBAWasmWrapper(config);
    await expect(wrapper.init()).rejects.toThrow('mGBA Emscripten factory function not found.');
    expect(onError).toHaveBeenCalled();
  });

  it('should only initialize once', async () => {
    const mockModule = {} as MGBAWasmModule;
    window.mgba = vi.fn<() => Promise<MGBAWasmModule>>().mockResolvedValue(mockModule) as unknown as MGBAFactory;

    const onReady = vi.fn<() => void>();
    const config = {
      wasmBinary: new ArrayBuffer(8),
      onReady,
    };
    const wrapper = new MGBAWasmWrapper(config);
    await wrapper.init();
    await wrapper.init();
    expect(window.mgba).toHaveBeenCalledTimes(1);
    expect(onReady).toHaveBeenCalledTimes(1);
  });

  it('should pass locateFile if wasmUrl is provided', async () => {
    const mockModule = {} as MGBAWasmModule;
    const mgbaSpy = vi.fn<(args: Partial<MGBAWasmModule>) => Promise<MGBAWasmModule>>().mockResolvedValue(mockModule);
    window.mgba = mgbaSpy as unknown as MGBAFactory;

    const onReady = vi.fn<() => void>();
    const config = {
      wasmUrl: 'http://example.com/mgba.wasm',
      onReady,
    };
    const wrapper = new MGBAWasmWrapper(config);
    await wrapper.init();

    expect(mgbaSpy).toHaveBeenCalled();
    const callArgs = mgbaSpy.mock.calls[0];

    expect(callArgs).toBeDefined();
    const args = (callArgs?.[0] || {}) as Partial<MGBAWasmModule>;
    expect(args.locateFile).toBeDefined();
    const locateFile = args.locateFile || (() => '');
    expect(locateFile('mgba.wasm', '')).toBe('http://example.com/mgba.wasm');
    expect(locateFile('mgba.js', '')).toBe('mgba.js');
  });
});
