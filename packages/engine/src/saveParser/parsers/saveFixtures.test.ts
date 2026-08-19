import * as fs from 'node:fs';
import { test as baseTest, describe, expect } from 'vitest';
import type { GameVersion, SaveData } from './common';
import { parseGen1 } from './gen1';
import { parseGen2 } from './gen2';
import { parseGen3 } from './gen3';

// Define the custom context/fixtures for these tests
interface ParserFixtures {
  loadSaveData: (fileName: string, gen: 1 | 2 | 3, forcedVersion?: GameVersion) => SaveData;
}

// Extend base vitest test with our injected save loader
const customTest = baseTest.extend<ParserFixtures>({
  loadSaveData: async ({ task: _task }, use) => {
    // Provide a loader utility that abstracts disk I/O and root parsing
    const loader = (fileName: string, gen: 1 | 2 | 3, forcedVersion?: GameVersion) => {
      const buffer = fs.readFileSync(`tests/fixtures/${fileName}`);
      // Use the actual ArrayBuffer from the Buffer
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      const view = new DataView(arrayBuffer);
      if (gen === 1) {
        return parseGen1(view, forcedVersion);
      }
      if (gen === 2) {
        const isCrystal = forcedVersion === 'crystal';
        return parseGen2(view, isCrystal);
      }
      return parseGen3(view, forcedVersion);
    };
    await use(loader); // inject provider into tests
  },
});

describe('Real Save Fixtures Verification', () => {
  const saveCases = [
    {
      file: 'gold.sav',
      gen: 2 as const,
      expectedVersion: 'gold',
      expectedTrainer: 'Carlyle',
      expectedId: 30685,
      expectedPartyLength: 1,
    },
    {
      file: 'crystal.sav',
      gen: 2 as const,
      expectedVersion: 'crystal',
      expectedTrainer: 'KRIS',
      expectedId: 33849,
      expectedPartyLength: 1,
    },
    {
      file: 'blue.sav',
      gen: 1 as const,
      expectedVersion: 'unknown',
      expectedTrainer: 'Carlyle',
      expectedId: 20590,
      expectedPartyLength: 1,
    },
    {
      file: 'blue-complete.sav',
      gen: 1 as const,
      expectedVersion: 'blue',
      expectedTrainer: 'BLUE',
      expectedId: 61477,
      expectedPartyLength: 1,
    },
    {
      file: 'yellow.sav',
      gen: 1 as const,
      expectedVersion: 'yellow',
      expectedTrainer: 'YELLOW',
      expectedId: 62198,
      expectedPartyLength: 6,
    },
    {
      file: 'yellow-2026-03-30.sav',
      gen: 1 as const,
      expectedVersion: 'yellow',
      expectedTrainer: 'YELLOW',
      expectedId: 62198,
      expectedPartyLength: 6,
    },
    {
      file: 'red.sav',
      gen: 1 as const,
      expectedVersion: 'unknown',
      expectedTrainer: 'RED',
      expectedId: 7945,
      expectedPartyLength: 6,
    },
    {
      file: 'blue-evolve.sav',
      gen: 1 as const,
      expectedVersion: 'unknown',
      expectedTrainer: 'BLUE',
      expectedId: 57434,
      expectedPartyLength: 6,
    },
    {
      file: 'silver.sav',
      gen: 2 as const,
      expectedVersion: 'gold',
      expectedTrainer: 'SILVER',
      expectedId: 3403,
      expectedPartyLength: 4,
    },
    {
      file: 'crystal-evolve.sav',
      gen: 2 as const,
      expectedVersion: 'crystal',
      expectedTrainer: 'CRYSTAL',
      expectedId: 51078,
      expectedPartyLength: 6,
    },
    {
      file: 'emerald.sav',
      gen: 3 as const,
      forcedVersion: 'emerald' as GameVersion,
      expectedVersion: 'emerald',
      expectedTrainer: '',
      expectedId: 58646,
      expectedPartyLength: 5,
    },
  ];

  customTest.for(saveCases)(
    'should parse generic bounds for $file',
    (
      { file, gen, forcedVersion, expectedVersion, expectedTrainer, expectedId, expectedPartyLength },
      { loadSaveData },
    ) => {
      const data = loadSaveData(file, gen, forcedVersion);

      expect(data.generation).toBe(gen);
      expect(data.gameVersion).toBe(expectedVersion);
      expect(data.trainerName).toBe(expectedTrainer);
      expect(data.trainerId).toBe(expectedId);
      expect(data.party).toHaveLength(expectedPartyLength);

      expect(typeof data.pc.length).toBe('number');
    },
  );
});
