import * as fs from 'node:fs';
import { test as baseTest, describe } from 'vitest';
import type { SaveData } from './common';
import { parseGen1 } from './gen1';
import { parseGen2 } from './gen2';

// Define the custom context/fixtures for these tests
interface ParserFixtures {
  loadSaveData: (fileName: string, gen: 1 | 2) => SaveData;
}

// Extend base vitest test with our injected save loader
const test = baseTest.extend<ParserFixtures>({
  loadSaveData: async ({ task: _task }, use) => {
    // Provide a loader utility that abstracts disk I/O and root parsing
    const loader = (fileName: string, gen: 1 | 2) => {
      const buffer = fs.readFileSync(`tests/fixtures/${fileName}`);
      // Use the actual ArrayBuffer from the Buffer
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      const view = new DataView(arrayBuffer);
      return gen === 1 ? parseGen1(view) : parseGen2(view);
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
      expectedVersion: 'unknown', // Valid fallback for very early-game states where unique exclusives or Pikachu status offsets aren't sufficient indicators
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
  ];

  // Using the advanced 'test.for' to map our suite, removing all duplication
  // and securely injecting the `loadSaveData` contextual fixture.
  test.for(saveCases)('should parse generic bounds for $file', ({
    file,
    gen,
    expectedVersion,
    expectedTrainer,
    expectedId,
    expectedPartyLength,
  }, { loadSaveData, expect }) => {
    const data = loadSaveData(file, gen);

    expect(data.generation).toBe(gen);
    expect(data.gameVersion).toBe(expectedVersion);
    expect(data.trainerName).toBe(expectedTrainer);
    expect(data.trainerId).toBe(expectedId);
    expect(data.party).toHaveLength(expectedPartyLength);

    // Verify PC box counts don't error and are numbers
    expect(typeof data.pc.length).toBe('number');
  });
});
