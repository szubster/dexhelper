import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BinjgbWrapper } from '../BinjgbWrapper';
import type { BinjgbModule } from '../types';

describe('BinjgbWrapper', () => {
  let wrapper: BinjgbWrapper;
  let mockModule: BinjgbModule;

  beforeEach(() => {
    wrapper = new BinjgbWrapper();
    mockModule = {
      HEAPU8: new Uint8Array(1024),
      _malloc: vi.fn<(size: number) => number>().mockReturnValue(10),
      _free: vi.fn<(ptr: number) => void>(),
      _emulator_init: vi.fn<(romPtr: number, romSize: number) => number>().mockReturnValue(1),
      _emulator_run: vi.fn<() => void>(),
      _emulator_pause: vi.fn<() => void>(),
      _emulator_reset: vi.fn<() => void>(),
      _ext_ram_file_data_new: vi.fn<() => number>() as import('vitest').Mock<() => number>,
      _get_file_data_ptr: vi.fn<(ptr: number) => number>() as import('vitest').Mock<(ptr: number) => number>,
      _get_file_data_size: vi.fn<(ptr: number) => number>() as import('vitest').Mock<(ptr: number) => number>,
      _file_data_delete: vi.fn<(ptr: number) => void>() as import('vitest').Mock<(ptr: number) => void>,
      _emulator_set_joypad_state: vi.fn<(state: number) => void>(),
      setJoypadState: vi.fn<(state: number) => void>(),
    };
  });

  it('throws when calling methods before init', () => {
    expect(() => wrapper.loadRom(new Uint8Array())).toThrow('Module not initialized');
    expect(() => wrapper.start()).toThrow('Module not initialized');
    expect(() => wrapper.pause()).toThrow('Module not initialized');
    expect(() => wrapper.reset()).toThrow('Module not initialized');
  });

  it('initializes module via factory', async () => {
    const factory = vi.fn<() => Promise<BinjgbModule>>().mockResolvedValue(mockModule);
    await wrapper.init(factory);
    expect(factory).toHaveBeenCalled();
  });

  describe('after init', () => {
    beforeEach(async () => {
      await wrapper.init(async () => mockModule);
    });

    it('loads ROM correctly', () => {
      const romData = new Uint8Array([1, 2, 3]);
      wrapper.loadRom(romData);

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._malloc).toHaveBeenCalledWith(3);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._emulator_init).toHaveBeenCalledWith(10, 3);
      expect(mockModule.HEAPU8.slice(10, 13)).toEqual(romData);
    });

    it('frees previous ROM if loaded again', () => {
      const romData = new Uint8Array([1, 2, 3]);
      wrapper.loadRom(romData);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._free).not.toHaveBeenCalled();

      wrapper.loadRom(romData);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._free).toHaveBeenCalledWith(10);
    });

    it('starts emulator', () => {
      wrapper.start();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._emulator_run).toHaveBeenCalled();
    });

    it('pauses emulator', () => {
      wrapper.pause();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._emulator_pause).toHaveBeenCalled();
    });

    it('resets emulator', () => {
      wrapper.reset();
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockModule._emulator_reset).toHaveBeenCalled();
    });

    describe('extractSaveState', () => {
      it('returns null if file data ptr is 0', () => {
        (mockModule._ext_ram_file_data_new as import('vitest').Mock).mockReturnValue(0);
        const result = wrapper.extractSaveState();
        expect(result).toBeNull();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockModule._ext_ram_file_data_new).toHaveBeenCalled();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockModule._file_data_delete).not.toHaveBeenCalled();
      });

      it('returns null if data ptr or size is 0', () => {
        (mockModule._ext_ram_file_data_new as import('vitest').Mock).mockReturnValue(123);
        (mockModule._get_file_data_ptr as import('vitest').Mock).mockReturnValue(0);
        (mockModule._get_file_data_size as import('vitest').Mock).mockReturnValue(0);

        const result = wrapper.extractSaveState();
        expect(result).toBeNull();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockModule._file_data_delete).toHaveBeenCalledWith(123);
      });

      it('extracts save state correctly', () => {
        (mockModule._ext_ram_file_data_new as import('vitest').Mock).mockReturnValue(123);
        (mockModule._get_file_data_ptr as import('vitest').Mock).mockReturnValue(100);
        (mockModule._get_file_data_size as import('vitest').Mock).mockReturnValue(3);

        const memory = new Uint8Array(1024);
        memory.set([1, 2, 3], 100);
        mockModule.HEAPU8 = memory;

        const result = wrapper.extractSaveState();
        expect(result).toEqual(new Uint8Array([1, 2, 3]));
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(mockModule._file_data_delete).toHaveBeenCalledWith(123);
      });
    });
  });
});
