import { saveHistoryDB } from '../../../db/SaveHistoryDB';
import { parseSaveFile } from '../../../engine/saveParser';
import type { GameVersion, SaveData } from '../../../engine/saveParser/parsers/common';
import type { BinjgbInstance } from './types';

/**
 * Connects a Binjgb emulator instance to the save parser and SaveHistoryDB.
 */
export class BinjgbSyncEngine {
  private instance: BinjgbInstance;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private saveId: string | null = null;
  private forcedVersion?: GameVersion;

  constructor(instance: BinjgbInstance) {
    this.instance = instance;
  }

  /**
   * Extracts the current save state buffer from Binjgb, parses it,
   * saves it to SaveHistoryDB, and returns the parsed SaveData.
   *
   * @param saveId The ID to use when storing the save in SaveHistoryDB
   * @param forcedVersion An optional GameVersion override for parsing
   * @returns A promise resolving to the structured SaveData, or null if no buffer could be extracted
   */
  public async syncSaveData(saveId: string, forcedVersion?: GameVersion): Promise<SaveData | null> {
    const saveStateBuffer = this.instance.extractSaveState();

    if (!saveStateBuffer) {
      return null;
    }

    // Parse the save data
    const saveData = await parseSaveFile(saveStateBuffer.buffer, forcedVersion);

    // Persist to SaveHistoryDB
    await saveHistoryDB.putSave(saveId, saveStateBuffer);

    return saveData;
  }

  /**
   * Starts periodic polling to sync save data.
   *
   * @param saveId The ID to use when storing the save in SaveHistoryDB
   * @param intervalMs The polling interval in milliseconds
   * @param forcedVersion An optional GameVersion override for parsing
   */
  public startPolling(saveId: string, intervalMs: number = 1000, forcedVersion?: GameVersion): void {
    if (this.intervalId !== null) {
      return; // Already polling
    }

    this.saveId = saveId;
    if (forcedVersion !== undefined) {
      this.forcedVersion = forcedVersion;
    }

    this.intervalId = setInterval(() => {
      if (this.saveId !== null) {
        this.syncSaveData(this.saveId, this.forcedVersion).catch((err) => {
          console.error('BinjgbSyncEngine polling error:', err);
        });
      }
    }, intervalMs);
  }

  /**
   * Stops periodic polling.
   */
  public stopPolling(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
