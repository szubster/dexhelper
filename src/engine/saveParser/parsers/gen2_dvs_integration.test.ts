import * as fs from 'node:fs';
import { test as baseTest, describe, expect } from 'vitest';
import type { SaveData } from './common';
import { parseGen2 } from './gen2';

const customTest = baseTest.extend<{ loadSaveData: (fileName: string, isCrystal: boolean) => SaveData }>({
  loadSaveData: async ({ task: _task }, use) => {
    const loader = (fileName: string, isCrystal: boolean) => {
      const buffer = fs.readFileSync(`tests/fixtures/${fileName}`);
      const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
      const view = new DataView(arrayBuffer);
      return parseGen2(view, isCrystal);
    };
    await use(loader);
  },
});

describe('Gen 2 DV Extraction Integration', () => {
  customTest('should correctly extract and parse DVs from gold save', ({ loadSaveData }) => {
    const data = loadSaveData('gold.sav', false);

    expect(data.partyDetails.length).toBeGreaterThan(0);
    const firstPokemon = data.partyDetails[0];

    // Check DVs structure
    expect(firstPokemon?.dvs).toBeDefined();
    expect(firstPokemon?.dvs).toHaveProperty('hp');
    expect(firstPokemon?.dvs).toHaveProperty('atk');
    expect(firstPokemon?.dvs).toHaveProperty('def');
    expect(firstPokemon?.dvs).toHaveProperty('spd');
    expect(firstPokemon?.dvs).toHaveProperty('spc');

    // Check that DV values are within valid bounds (0-15)
    expect(firstPokemon?.dvs?.hp).toBeGreaterThanOrEqual(0);
    expect(firstPokemon?.dvs?.hp).toBeLessThanOrEqual(15);
    expect(firstPokemon?.dvs?.atk).toBeGreaterThanOrEqual(0);
    expect(firstPokemon?.dvs?.atk).toBeLessThanOrEqual(15);
  });

  customTest('should correctly extract and parse DVs from crystal save', ({ loadSaveData }) => {
    const data = loadSaveData('crystal.sav', true);

    expect(data.partyDetails.length).toBeGreaterThan(0);
    const firstPokemon = data.partyDetails[0];

    expect(firstPokemon?.dvs).toBeDefined();
    expect(firstPokemon?.dvs).toHaveProperty('hp');
    expect(firstPokemon?.dvs).toHaveProperty('atk');

    // Check that it's generating a correct hash with DVs
    expect(firstPokemon?.hash).toContain(`${firstPokemon?.dvs?.hp}-${firstPokemon?.dvs?.atk}`);
  });

  customTest('should correctly extract and parse DVs from pc details', ({ loadSaveData }) => {
    const data = loadSaveData('crystal.sav', true);

    if (data.pcDetails.length > 0) {
      const firstPcPoke = data.pcDetails[0];

      expect(firstPcPoke?.dvs).toBeDefined();
      expect(firstPcPoke?.dvs).toHaveProperty('hp');
      expect(firstPcPoke?.dvs).toHaveProperty('atk');
    }
  });
});
