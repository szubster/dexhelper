import { describe, expect, it } from 'vitest';
import { Gen1SafariZone } from '../data/gen1/safariZone';
import type { SafariEncounter } from '../data/shared/safariZoneTypes';
import type { SaveData } from '../saveParser/parsers/common';
import {
  getMissingGen1SafariEncounters,
  getMissingGen3SafariEncounters,
  getMissingSafariEncounters,
} from './missingEncounters';

describe('getMissingSafariEncounters', () => {
  const createMockSaveData = (
    generation: number,
    gameVersion: SaveData['gameVersion'],
    ownedIds: number[] = [],
    partyIds: number[] = [],
    pcIds: number[] = [],
  ): SaveData => {
    return {
      generation,
      gameVersion,
      owned: new Set(ownedIds),
      seen: new Set(ownedIds),
      party: partyIds,
      pc: pcIds,
      partyDetails: [],
      pcDetails: [],
      badges: 0,
      trainerName: 'TEST',
      trainerId: 12345,
      currentMapId: 0,
      inventory: [],
      hallOfFameCount: 0,
      currentBoxCount: 0,
    } as unknown as SaveData;
  };

  describe('Gen 1 missing encounters', () => {
    it('should return empty array for unsupported versions', () => {
      const saveData = createMockSaveData(1, 'unknown' as SaveData['gameVersion']);
      const result = getMissingSafariEncounters(saveData);
      expect(result).toEqual([]);
    });

    it('should return all encounters if nothing is owned', () => {
      const saveData = createMockSaveData(1, 'red');
      const result = getMissingSafariEncounters(saveData);

      const redAreasWithEncounters = Gen1SafariZone.filter(
        (a) => a.encounters.red && a.encounters.red.length > 0,
      ).length;
      expect(result.length).toBe(redAreasWithEncounters);
      expect(result[0]?.encounters.red).toEqual(Gen1SafariZone[0]?.encounters.red);
    });

    it('should correctly filter out owned pokemon', () => {
      const saveData = createMockSaveData(1, 'red', [29, 30]);
      const result = getMissingSafariEncounters(saveData);

      const middleArea = result.find((a) => a.name === 'kanto-safari-zone-middle');
      expect(middleArea).toBeDefined();

      const hasNidoranF = middleArea?.encounters.red?.some((e) => e.pokemon === 29);
      const hasNidorina = middleArea?.encounters.red?.some((e) => e.pokemon === 30);

      expect(hasNidoranF).toBe(false);
      expect(hasNidorina).toBe(false);
    });

    it('should correctly filter out pokemon in party or pc', () => {
      const saveData = createMockSaveData(1, 'red', [], [29], [30, 33]);
      const result = getMissingSafariEncounters(saveData);

      const middleArea = result.find((a) => a.name === 'kanto-safari-zone-middle');

      const hasNidoranF = middleArea?.encounters.red?.some((e) => e.pokemon === 29);
      const hasNidorina = middleArea?.encounters.red?.some((e) => e.pokemon === 30);
      const hasNidorino = middleArea?.encounters.red?.some((e) => e.pokemon === 33);

      expect(hasNidoranF).toBe(false);
      expect(hasNidorina).toBe(false);
      expect(hasNidorino).toBe(false);
    });

    it('should return empty if all Safari Zone pokemon are already owned', () => {
      const allRedPokemon = new Set<number>();
      for (const area of Gen1SafariZone) {
        for (const encounter of area.encounters.red || []) {
          allRedPokemon.add(encounter.pokemon);
        }
      }

      const saveData = createMockSaveData(1, 'red', Array.from(allRedPokemon));
      const result = getMissingSafariEncounters(saveData);
      expect(result).toEqual([]);
    });

    it('should handle Blue and Yellow game versions correctly', () => {
      const saveDataBlue = createMockSaveData(1, 'blue', [29, 30]);
      const resultBlue = getMissingSafariEncounters(saveDataBlue);
      const middleAreaBlue = resultBlue.find((a) => a.name === 'kanto-safari-zone-middle');
      expect(middleAreaBlue?.encounters.blue).toBeDefined();

      const saveDataYellow = createMockSaveData(1, 'yellow', [29, 30]);
      const resultYellow = getMissingSafariEncounters(saveDataYellow);
      const middleAreaYellow = resultYellow.find((a) => a.name === 'kanto-safari-zone-middle');
      expect(middleAreaYellow?.encounters.yellow).toBeDefined();
    });
  });

  describe('Gen 3 missing encounters', () => {
    it('should return missing encounters for Emerald', () => {
      const saveData = createMockSaveData(3, 'emerald', [43], [44], []);
      const missing = getMissingSafariEncounters(saveData);

      expect(missing.length).toBeGreaterThan(0);
      const bikeArea = missing.find((a) => a.name === 'hoenn-safari-zone-nwmach-bike-area');
      expect(bikeArea).toBeDefined();

      const emeraldEncounters: SafariEncounter[] = bikeArea?.encounters
        ? // @ts-expect-error dynamic access
          bikeArea.encounters.emerald || []
        : [];
      const pokemonIds = emeraldEncounters.map((e) => e.pokemon);

      expect(pokemonIds).not.toContain(43);
      expect(pokemonIds).not.toContain(44);
      expect(pokemonIds).toContain(54);
    });

    it('should return missing encounters for FireRed and LeafGreen', () => {
      const saveDataFR = createMockSaveData(3, 'firered', [33], [], [29]);
      const missingFR = getMissingSafariEncounters(saveDataFR);

      const area1East = missingFR.find((a) => a.name === 'kanto-safari-zone-area-1-east');
      expect(area1East).toBeDefined();

      const fireredEncounters: SafariEncounter[] = area1East?.encounters
        ? // @ts-expect-error dynamic access
          area1East.encounters.firered || []
        : [];
      const pokemonIdsFR = fireredEncounters.map((e) => e.pokemon);

      expect(pokemonIdsFR).not.toContain(29);
      expect(pokemonIdsFR).toContain(32);
      expect(pokemonIdsFR).not.toContain(33);

      const saveDataLG = createMockSaveData(3, 'leafgreen', [], [], [29]);
      const missingLG = getMissingSafariEncounters(saveDataLG);
      const middleArea = missingLG.find((a) => a.name === 'kanto-safari-zone-middle');

      const leafgreenEncounters: SafariEncounter[] = middleArea?.encounters
        ? // @ts-expect-error dynamic access
          middleArea.encounters.leafgreen || []
        : [];
      const pokemonIdsLG = leafgreenEncounters.map((e) => e.pokemon);

      expect(pokemonIdsLG).not.toContain(29);
      expect(pokemonIdsLG).toContain(30);
    });
  });

  describe('Legacy wrapper compatibility', () => {
    it('getMissingGen1SafariEncounters delegates correctly', () => {
      const gen1Data = createMockSaveData(1, 'red', [29]);
      expect(getMissingGen1SafariEncounters(gen1Data)).toEqual(getMissingSafariEncounters(gen1Data));

      const gen3Data = createMockSaveData(3, 'emerald');
      expect(getMissingGen1SafariEncounters(gen3Data)).toEqual([]);
    });

    it('getMissingGen3SafariEncounters delegates correctly', () => {
      const gen3Data = createMockSaveData(3, 'emerald', [43]);
      expect(getMissingGen3SafariEncounters(gen3Data)).toEqual(getMissingSafariEncounters(gen3Data));

      const gen1Data = createMockSaveData(1, 'red');
      expect(getMissingGen3SafariEncounters(gen1Data)).toEqual([]);
    });
  });
});
