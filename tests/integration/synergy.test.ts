import * as fs from 'node:fs';
import { test as baseTest, describe, expect } from 'vitest';
import { generateSynergyData } from '../../src/engine/assistant/generators/synergyDataGenerator';
import type { GameVersion, SaveData } from '../../src/engine/saveParser/parsers/common';
import { parseGen1 } from '../../src/engine/saveParser/parsers/gen1';
import { parseGen2 } from '../../src/engine/saveParser/parsers/gen2';
import { parseGen3 } from '../../src/engine/saveParser/parsers/gen3';

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

describe('Cross-Save Synergy Integration', () => {
  customTest('should correctly generate trade opportunities between Red and Blue fixtures', ({ loadSaveData }) => {
    const redSave = loadSaveData('red.sav', 1, 'red');
    const blueSave = loadSaveData('blue.sav', 1, 'blue');

    // Quick assertions to make sure they are properly identified
    expect(redSave.gameVersion).toBe('red');
    expect(blueSave.gameVersion).toBe('blue');

    const saves: Record<string, SaveData> = {
      saveRed: redSave,
      saveBlue: blueSave,
    };

    const synergyData = generateSynergyData(saves);

    // There should be some opportunities
    expect(synergyData.opportunities.length).toBeGreaterThan(0);

    // Ensure exclusive flag mapping is correct
    // For example, if red needs an exclusive from blue (like Bellsprout #69, Meowth #52, etc)
    const exclusiveOpp = synergyData.opportunities.find((opp) => opp.isExclusive === true);
    if (exclusiveOpp) {
      expect(exclusiveOpp.priority).toBe(100);
    }

    const standardOpp = synergyData.opportunities.find((opp) => opp.isExclusive === false);
    if (standardOpp) {
      expect(standardOpp.priority).toBe(50);
    }
  });

  customTest('should correctly generate trade opportunities between Gen 3 saves', ({ loadSaveData }) => {
    const emeraldSave = loadSaveData('emerald.sav', 3, 'emerald');
    const fireredSave = loadSaveData('firered.sav', 3, 'firered');

    expect(emeraldSave.gameVersion).toBe('emerald');
    expect(fireredSave.gameVersion).toBe('firered');

    const saves: Record<string, SaveData> = {
      saveEmerald: emeraldSave,
      saveFirered: fireredSave,
    };

    const synergyData = generateSynergyData(saves);

    expect(synergyData.opportunities.length).toBeGreaterThan(0);

    // Verify prioritization logic continues to work correctly through the integrations
    // Check that priorities are sorted highest to lowest
    let prevPriority = 100;
    for (const opp of synergyData.opportunities) {
      expect(opp.priority).toBeLessThanOrEqual(prevPriority);
      prevPriority = opp.priority;
    }
  });
});
