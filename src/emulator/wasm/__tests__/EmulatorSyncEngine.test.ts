import { describe, expect, it } from 'vitest';
import { EmulatorSyncEngine } from '../EmulatorSyncEngine';

describe('EmulatorSyncEngine', () => {
  const initMockSectionsLocal = (view: DataView) => {
    const section0Offset = 0;
    view.setUint32(section0Offset + 4088, 0x08012025, true);
    view.setUint16(section0Offset + 4084, 0, true);
    view.setUint32(section0Offset + 4092, 1, true);

    const section1Offset = 4096;
    view.setUint32(section1Offset + 4088, 0x08012025, true);
    view.setUint16(section1Offset + 4084, 1, true);
    view.setUint32(section1Offset + 4092, 1, true);

    const section2Offset = 8192;
    view.setUint32(section2Offset + 4088, 0x08012025, true);
    view.setUint16(section2Offset + 4084, 2, true);
    view.setUint32(section2Offset + 4092, 1, true);
  };

  const initMockSaveBlock1 = (view: DataView) => {
    const block1Offset = 1 * 4096;
    const emeraldFlagsOffset = block1Offset + 0x1310;
    if (emeraldFlagsOffset + Math.ceil(864 / 8) < view.byteLength) {
      view.setUint8(emeraldFlagsOffset, 0b00000001); // Trainer 0 defeated
      view.setUint8(emeraldFlagsOffset + 107, 0b10000000); // Trainer 863 defeated
    }
  };

  it('syncSaveData parses Gen3 data successfully', () => {
    const wasmMemory = new WebAssembly.Memory({ initial: 2 }); // 128KB
    const view = new DataView(wasmMemory.buffer);
    initMockSectionsLocal(view);
    initMockSaveBlock1(view);

    const engine = new EmulatorSyncEngine(wasmMemory);
    const saveData = engine.syncSaveData(wasmMemory.buffer.byteLength, 'emerald') as unknown as Record<string, unknown>;

    const flags = saveData['gen3TrainerDefeatFlags'] as boolean[];
    expect(flags).toBeDefined();
    expect(flags?.length).toBe(864);
    expect(flags?.[0]).toBe(true);
    expect(flags?.[1]).toBe(false);
    expect(flags?.[863]).toBe(true);
  });
});
