import { describe, expect, it, vi } from 'vitest';
import * as gen3Module from '../../parsers/gen3';
import { calculateGen3HiddenPower, calculateGen3Shiny } from '../../parsers/gen3';
import { parseGen3PCBoxesWithStats } from './parser';

describe('Gen 3 Storage Stats Parsing', () => {
  describe('calculateGen3HiddenPower', () => {
    it('calculates Dark 70 correctly for all 31 IVs', () => {
      const result = calculateGen3HiddenPower(31, 31, 31, 31, 31, 31);
      expect(result.type).toBe('Dark');
      expect(result.power).toBe(70);
    });

    it('calculates Bug correctly for specific IVs', () => {
      // Fighting type max power usually 30/30/30/30/30/30 (Fighting 70)
      // Let's test a known Fighting spread: 31/31/30/30/30/30 -> Fighting 70
      const result = calculateGen3HiddenPower(31, 31, 30, 30, 30, 30);
      expect(result.type).toBe('Fighting');
      expect(result.power).toBe(70);
    });
  });

  describe('calculateGen3Shiny', () => {
    it('returns true when shiny value is less than 8', () => {
      // TID = 0, SID = 0, PV_HIGH = 0, PV_LOW = 7 -> 0^0^0^7 = 7 < 8 -> True
      // OTID = (SID << 16) | TID = 0
      const pv = 7;
      const otId = 0;
      expect(calculateGen3Shiny(pv, otId)).toBe(true);
    });

    it('returns false when shiny value is 8 or greater', () => {
      // TID = 0, SID = 0, PV_HIGH = 0, PV_LOW = 8 -> 8
      const pv = 8;
      const otId = 0;
      expect(calculateGen3Shiny(pv, otId)).toBe(false);
    });
  });

  describe('parseGen3PCBoxesWithStats', () => {
    it('should parse PC boxes, calculate stats and group by species', () => {
      // Mock the base parsing function since it requires complex encrypted data structure
      const mockPcDetails = [
        {
          hash: '123-456',
          speciesId: 25, // Pikachu
          level: 1,
          isShiny: false,
          moves: [1, 2],
          personalityValue: 25, // Nature: 25 % 25 = 0 (Hardy)
          storageLocation: 'Box 1',
          slot: 0,
        },
        {
          hash: '789-101',
          speciesId: 25, // Pikachu
          level: 1,
          isShiny: false,
          moves: [3, 4],
          personalityValue: 26, // Nature: 26 % 25 = 1 (Lonely)
          storageLocation: 'Box 1',
          slot: 1,
        },
        {
          hash: '111-222',
          speciesId: 1, // Bulbasaur
          level: 1,
          isShiny: false,
          moves: [5],
          personalityValue: 51, // Nature: 51 % 25 = 1 (Lonely)
          storageLocation: 'Box 2',
          slot: 5,
        },
      ];

      vi.spyOn(gen3Module, 'parseGen3PCBoxes').mockReturnValue({
        pc: [25, 25, 1],
        pcDetails: mockPcDetails as unknown as import('../../parsers/common').PokemonInstance[],
      });

      // We need to mock parseGen3PokemonPVAndIVs because it reads directly from DataView
      vi.spyOn(gen3Module, 'parseGen3PokemonPVAndIVs').mockImplementation((_view, _offset) => {
        // Return 31 for all IVs for easy testing
        return { hp: 31, attack: 31, defense: 31, speed: 31, specialAttack: 31, specialDefense: 31, pv: 0 };
      });

      // Minimal valid DataView mock
      const buffer = new ArrayBuffer(100);
      const view = new DataView(buffer);
      // Let's set a fake OT ID so shiny calculation can run
      // Box 1 Slot 0 -> offset = 4 + 0 * 80 = 4. OT_ID is at 4 + 4 = 8.
      // Box 1 Slot 1 -> offset = 4 + 1 * 80 = 84. OT_ID is at 84 + 4 = 88.
      // Box 2 Slot 5 -> offset = 4 + (1 * 30 + 5) * 80 = 4 + 35 * 80 = 2804.
      // But we just mock the view to return 0 for everything since this is a unit test focusing on the logic
      vi.spyOn(view, 'getUint32').mockReturnValue(0);

      const result = parseGen3PCBoxesWithStats(view);

      // Verify Grouping
      expect(Object.keys(result)).toEqual(['1', '25']);
      expect(result[25]?.length).toBe(2);
      expect(result[1]?.length).toBe(1);

      // Verify Nature calculation
      expect(result[25]?.[0]?.nature).toBe(0);
      expect(result[25]?.[1]?.nature).toBe(1);
      expect(result[1]?.[0]?.nature).toBe(1);

      // Verify Hidden Power calculation (31 IVs -> Dark 70)
      expect(result[25]?.[0]?.hiddenPower).toEqual({ type: 'Dark', power: 70 });

      // Verify IVs are attached
      expect(result[1]?.[0]?.dvs).toEqual({ hp: 31, atk: 31, def: 31, spd: 31, spc: 31 });

      vi.restoreAllMocks();
    });

    it('handles corrupted save file range error gracefully', () => {
      vi.spyOn(gen3Module, 'parseGen3PCBoxes').mockReturnValue({
        pc: [],
        pcDetails: [
          {
            hash: '123-456',
            speciesId: 25,
            level: 1,
            isShiny: false,
            moves: [1],
            personalityValue: 25,
            storageLocation: 'Box 1',
            slot: 0,
          },
        ] as unknown as import('../../parsers/common').PokemonInstance[],
      });

      vi.spyOn(gen3Module, 'parseGen3PokemonPVAndIVs').mockImplementation(() => {
        throw new RangeError('Out of bounds');
      });

      const buffer = new ArrayBuffer(10);
      const view = new DataView(buffer);

      expect(() => parseGen3PCBoxesWithStats(view)).toThrowError('The save file is corrupted or incomplete.');

      vi.restoreAllMocks();
    });
  });
});
