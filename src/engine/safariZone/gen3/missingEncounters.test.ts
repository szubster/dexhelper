import { describe, expect, it } from 'vitest';
import type { SafariEncounter } from '../../data/shared/safariZoneTypes';
import type { SaveData } from '../../saveParser/parsers/common';
import { getMissingGen3SafariEncounters } from './missingEncounters';

describe('getMissingGen3SafariEncounters', () => {
  const createMockSaveData = (version: SaveData['gameVersion'], ownedArr: number[], party: number[], pc: number[]) => {
    return {
      generation: 3,
      gameVersion: version,
      owned: new Set(ownedArr),
      seen: new Set(),
      party,
      pc,
      partyDetails: [],
      pcDetails: [],
      badges: 0,
      trainerName: 'Test',
      trainerId: 123,
      currentMapId: 0,
      inventory: [],
      hallOfFameCount: 0,
      currentBoxCount: 0,
    } as unknown as SaveData;
  };

  it('should return empty array for unsupported versions', () => {
    const saveData = createMockSaveData('red', [], [], []);
    const missing = getMissingGen3SafariEncounters(saveData);
    expect(missing).toEqual([]);
  });

  it('should return missing encounters for Emerald', () => {
    // In emerald, let's say HoennSafariZone area 'hoenn-safari-zone-nwmach-bike-area' has Oddish (43), Gloom (44), Psyduck (54).
    // Let's pretend player has Oddish in owned, Gloom in party.
    const saveData = createMockSaveData('emerald', [43], [44], []);
    const missing = getMissingGen3SafariEncounters(saveData);

    // We expect some areas. Let's find nwmach-bike-area and check its encounters.
    expect(missing.length).toBeGreaterThan(0);
    const bikeArea = missing.find((a) => a.name === 'hoenn-safari-zone-nwmach-bike-area');
    expect(bikeArea).toBeDefined();

    // It should have Psyduck (54) but NOT Oddish (43) or Gloom (44).
    const emeraldEncounters: SafariEncounter[] = bikeArea?.encounters
      ? // @ts-expect-error: dynamic access
        bikeArea.encounters.emerald || []
      : [];
    const pokemonIds = emeraldEncounters.map((e: SafariEncounter) => e.pokemon);

    expect(pokemonIds).not.toContain(43);
    expect(pokemonIds).not.toContain(44);
    expect(pokemonIds).toContain(54);
  });

  it('should return missing encounters for FireRed', () => {
    // In firered, let's check KantoSafariZoneGen3 area 'kanto-safari-zone-area-1-east'
    // Contains Nidoran F (29), Nidoran M (32), Nidorina (30), Nidorino (33).
    // Let's say player has 29 in PC, 33 in owned.
    const saveData = createMockSaveData('firered', [33], [], [29]);
    const missing = getMissingGen3SafariEncounters(saveData);

    expect(missing.length).toBeGreaterThan(0);
    const area1East = missing.find((a) => a.name === 'kanto-safari-zone-area-1-east');
    expect(area1East).toBeDefined();

    const fireredEncounters: SafariEncounter[] = area1East?.encounters
      ? // @ts-expect-error: dynamic access
        area1East.encounters.firered || []
      : [];
    const pokemonIds = fireredEncounters.map((e: SafariEncounter) => e.pokemon);

    expect(pokemonIds).not.toContain(29);
    expect(pokemonIds).toContain(32);
    expect(pokemonIds).not.toContain(33);
  });

  it('should filter out a pokemon if it is in pc', () => {
    const saveData = createMockSaveData('leafgreen', [], [], [29]); // 29 is Nidoran F
    const missing = getMissingGen3SafariEncounters(saveData);
    const middleArea = missing.find((a) => a.name === 'kanto-safari-zone-middle');

    const leafgreenEncounters: SafariEncounter[] = middleArea?.encounters
      ? // @ts-expect-error: dynamic access
        middleArea.encounters.leafgreen || []
      : [];
    const pokemonIds = leafgreenEncounters.map((e: SafariEncounter) => e.pokemon);

    expect(pokemonIds).not.toContain(29);
    expect(pokemonIds).toContain(30); // Nidorina
  });
});
