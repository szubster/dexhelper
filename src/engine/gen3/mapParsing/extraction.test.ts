import { describe, expect, it, vi } from 'vitest';
import * as berryParser from '../../saveParser/gen3/berry/parser';
import * as gen3Parser from '../../saveParser/parsers/gen3';
import * as feebasParser from '../feebas';
import * as playerLocationParser from '../playerLocation/parser';
import * as roamerParser from '../roamer/parser';
import {
  extractGen3ActiveSwarms,
  extractGen3BerryPatches,
  extractGen3FeebasTiles,
  extractGen3PlayerLocation,
  extractGen3Roamers,
} from './extraction';

vi.mock('../playerLocation/parser');
vi.mock('../roamer/parser');
vi.mock('../../saveParser/gen3/berry/parser');
vi.mock('../../saveParser/parsers/gen3', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../saveParser/parsers/gen3')>();
  return {
    ...actual,
    parseGen3ActiveSwarm: vi.fn(),
  };
});
vi.mock('../feebas');

describe('Gen 3 Map Extraction Logic', () => {
  const buffer = new ArrayBuffer(100);
  const view = new DataView(buffer);
  const offset = 0;

  describe('extractGen3PlayerLocation', () => {
    it('should map PlayerLocation to PlayerLocationData correctly', () => {
      vi.mocked(playerLocationParser.extractPlayerLocation).mockReturnValue({
        mapGroup: 1,
        mapNum: 2,
        mapId: 258,
        x: 10,
        y: 20,
        warpId: 3,
        nearestTrainer: { name: 'Roxanne', type: 'Rock' },
      });

      const result = extractGen3PlayerLocation(view, offset);

      expect(result).toEqual({
        mapGroup: 1,
        mapNum: 2,
        mapId: 258,
        x: 10,
        y: 20,
        warpId: 3,
        nearestTrainer: { name: 'Roxanne', type: 'Rock' },
      });
      expect(playerLocationParser.extractPlayerLocation).toHaveBeenCalledWith(view, offset);
    });
  });

  describe('extractGen3Roamers', () => {
    it('should return empty array if no roamer is active', () => {
      vi.mocked(roamerParser.parseGen3EmeraldRoamer).mockReturnValue({
        isActive: false,
        speciesId: 380,
        level: 40,
        hp: 100,
        statusCondition: 0,
        personalityValue: 12345,
        ivs: { hp: 1, atk: 2, def: 3, spAtk: 4, spDef: 5, spd: 6 },
      });

      const result = extractGen3Roamers(view, offset, 'emerald');

      expect(result).toEqual([]);
      expect(roamerParser.parseGen3EmeraldRoamer).toHaveBeenCalledWith(view, offset);
    });

    it('should return roamer data if active (Emerald)', () => {
      vi.mocked(roamerParser.parseGen3EmeraldRoamer).mockReturnValue({
        isActive: true,
        speciesId: 380,
        level: 40,
        hp: 100,
        statusCondition: 0,
        personalityValue: 12345,
        ivs: { hp: 1, atk: 2, def: 3, spAtk: 4, spDef: 5, spd: 6 },
      });

      const result = extractGen3Roamers(view, offset, 'emerald');

      expect(result).toEqual([
        {
          isActive: true,
          speciesId: 380,
          level: 40,
          hp: 100,
          statusCondition: 0,
          personalityValue: 12345,
          ivs: { hp: 1, atk: 2, def: 3, spAtk: 4, spDef: 5, spd: 6 },
        },
      ]);
    });

    it('should call FRLG parser for firered/leafgreen', () => {
      vi.mocked(roamerParser.parseGen3FRLGRoamer).mockReturnValue({
        isActive: true,
        speciesId: 244,
        level: 50,
        hp: 150,
        statusCondition: 0,
        personalityValue: 54321,
        ivs: { hp: 1, atk: 2, def: 3, spAtk: 4, spDef: 5, spd: 6 },
      });

      const result = extractGen3Roamers(view, offset, 'firered');

      expect(result).toHaveLength(1);
      expect(roamerParser.parseGen3FRLGRoamer).toHaveBeenCalledWith(view, offset);
    });

    it('should call RS parser for ruby/sapphire', () => {
      vi.mocked(roamerParser.parseGen3RSRoamer).mockReturnValue({
        isActive: true,
        speciesId: 381,
        level: 40,
        hp: 120,
        statusCondition: 0,
        personalityValue: 11111,
        ivs: { hp: 1, atk: 2, def: 3, spAtk: 4, spDef: 5, spd: 6 },
      });

      const result = extractGen3Roamers(view, offset, 'ruby');

      expect(result).toHaveLength(1);
      expect(roamerParser.parseGen3RSRoamer).toHaveBeenCalledWith(view, offset);
    });
  });

  describe('extractGen3BerryPatches', () => {
    it('should map BerryTree to BerryPatchData correctly', () => {
      vi.mocked(berryParser.parseGen3BerryTrees).mockReturnValue([
        {
          berryId: 1,
          stage: 2,
          stopGrowth: 0,
          minutesUntilNextStage: 60,
          berryYield: 2,
          regrowthCount: 1,
          watered1: 1,
          watered2: 0,
          watered3: 1,
          watered4: 0,
        },
      ]);

      const result = extractGen3BerryPatches(view, offset);

      expect(result).toEqual([
        {
          locationName: 'Route 102', // Index 0 in BERRY_TREE_LOCATIONS
          berryId: 1,
          stage: 2,
          stopGrowth: false,
          minutesUntilNextStage: 60,
          berryYield: 2,
          regrowthCount: 1,
          watered1: true,
          watered2: false,
          watered3: true,
          watered4: false,
        },
      ]);
      expect(berryParser.parseGen3BerryTrees).toHaveBeenCalledWith(view, offset);
    });
  });

  describe('extractGen3ActiveSwarms', () => {
    it('should return empty array if no swarm is active', () => {
      vi.mocked(gen3Parser.parseGen3ActiveSwarm).mockReturnValue(undefined);

      const result = extractGen3ActiveSwarms(view, offset);

      expect(result).toEqual([]);
      expect(gen3Parser.parseGen3ActiveSwarm).toHaveBeenCalledWith(view, offset + gen3Parser.TV_SHOWS_OFFSET);
    });

    it('should return mapped swarm data if active', () => {
      vi.mocked(gen3Parser.parseGen3ActiveSwarm).mockReturnValue({
        speciesId: 273,
        mapId: 10,
        mapGroup: 2,
        daysRemaining: 1,
      });

      const result = extractGen3ActiveSwarms(view, offset);

      expect(result).toEqual([
        {
          speciesId: 273,
          mapId: 10,
          mapGroup: 2,
          daysRemaining: 1,
        },
      ]);
    });
  });

  describe('extractGen3FeebasTiles', () => {
    it('should return empty array for non-Hoenn games', () => {
      expect(extractGen3FeebasTiles(view, offset, 'firered')).toEqual([]);
    });

    it('should return empty array if calculation fails gracefully (not range error)', () => {
      vi.mocked(feebasParser.extractFeebasSeed).mockReturnValue(12345);
      vi.mocked(feebasParser.calculateFeebasTiles).mockImplementation(() => {
        throw new Error('Some other error');
      });

      expect(extractGen3FeebasTiles(view, offset, 'emerald')).toEqual([]);
    });

    it('should throw if corrupted save file error', () => {
      vi.mocked(feebasParser.extractFeebasSeed).mockImplementation(() => {
        throw new Error('The save file is corrupted or incomplete.');
      });

      expect(() => extractGen3FeebasTiles(view, offset, 'emerald')).toThrow(
        'The save file is corrupted or incomplete.',
      );
    });

    it('should return mapped coordinates', () => {
      vi.mocked(feebasParser.extractFeebasSeed).mockReturnValue(12345);
      vi.mocked(feebasParser.calculateFeebasTiles).mockReturnValue([1, 2, 3]);
      vi.mocked(feebasParser.mapSpotIdsToCoordinates).mockReturnValue([
        [1, 1],
        [2, 2],
        [3, 3],
      ]);

      const result = extractGen3FeebasTiles(view, offset, 'emerald');

      expect(result).toEqual([
        [1, 1],
        [2, 2],
        [3, 3],
      ]);
      expect(feebasParser.extractFeebasSeed).toHaveBeenCalledWith(view, 'emerald', offset);
      expect(feebasParser.calculateFeebasTiles).toHaveBeenCalledWith(12345);
      expect(feebasParser.mapSpotIdsToCoordinates).toHaveBeenCalledWith([1, 2, 3]);
    });
  });
});
