import type { GameVersion, SaveData } from '../../engine/saveParser/parsers/common';
import { parseGen3 } from '../../engine/saveParser/parsers/gen3';
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
   * Syncs the live memory state and extracts the current SaveData using Gen3 parsers.
   * @param bufferSize The total size of the memory buffer to map.
   * @param forcedVersion An optional Gen 3 game version override.
   * @returns The structured SaveData.
   */
  public syncSaveData(bufferSize: number, forcedVersion?: GameVersion): SaveData {
    // We map the entire buffer into a DataView, as expected by parseGen3
    const dataView = this.mapper.mapBlock(0, bufferSize);
    return parseGen3(dataView, forcedVersion);
  }
}
