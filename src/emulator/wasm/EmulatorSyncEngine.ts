import { parseSaveFile } from '../../engine/saveParser';
import type { GameVersion, SaveData } from '../../engine/saveParser/parsers/common';
import { LiveMemoryMapper } from './LiveMemoryMapper';
import { WasmMemoryHook } from './WasmMemoryHook';

/**
 * Connects the live WASM memory of an emulator to the save parser.
 */
export class EmulatorSyncEngine {
  private mapper: LiveMemoryMapper;

  constructor(memory: WebAssembly.Memory) {
    const hook = new WasmMemoryHook(memory);
    this.mapper = new LiveMemoryMapper(hook);
  }

  /**
   * Syncs the live memory state and extracts the current SaveData using the save parser pipeline.
   * @param bufferSize The total size of the memory buffer to map.
   * @param forcedVersion An optional Gen 3 game version override.
   * @returns A promise resolving to the structured SaveData.
   */
  // ⚡ Bolt: Use parseSaveFile to leverage dynamic imports and eliminate static bundle dependencies on parseGen3.
  public async syncSaveData(bufferSize: number, forcedVersion?: GameVersion): Promise<SaveData> {
    const dataView = this.mapper.mapBlock(0, bufferSize);
    return parseSaveFile(dataView.buffer, forcedVersion);
  }
}
