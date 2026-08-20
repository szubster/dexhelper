import { describe, expect, it } from 'vitest';
import { isGen2Save } from '../utils/detection';
import { parseGen2 } from './gen2';

describe('gen2 parsers', () => {
  describe('isGen2Save', () => {
    it('should return false for invalid party count', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 7); // GS party count
      expect(isGen2Save(view, false)).toBe(false);

      view.setUint8(0x2865, 7); // Crystal party count
      expect(isGen2Save(view, true)).toBe(false);
    });

    it('should return false for invalid terminator', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1); // GS
      view.setUint8(0x288b + 1, 0x00); // Invalid terminator
      expect(isGen2Save(view, false)).toBe(false);
    });

    it('should return false for invalid species id', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1); // GS
      view.setUint8(0x288b + 1, 0xff); // Terminator
      view.setUint8(0x288b, 0); // ID 0 is invalid
      expect(isGen2Save(view, false)).toBe(false);
      view.setUint8(0x288b, 252); // Out of bounds
      expect(isGen2Save(view, false)).toBe(false);
    });

    it('should return true for valid looking save', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);

      view.setUint8(0x288a, 1); // GS party count
      view.setUint8(0x288b + 1, 0xff); // Terminator
      view.setUint8(0x288b, 1); // Bulbasaur
      expect(isGen2Save(view, false)).toBe(true);

      view.setUint8(0x2865, 1); // Crystal party count
      view.setUint8(0x2866 + 1, 0xff); // Terminator
      view.setUint8(0x2866, 1); // Bulbasaur
      expect(isGen2Save(view, true)).toBe(true);
    });
  });

  describe('parseGen2', () => {
    it('should parse GS party', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      // Valid party of 1
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1); // Bulbasaur
      view.setUint8(0x288b + 7, 1); // speciesId inside struct
      view.setUint8(0x288b + 7 + 31, 5); // Level

      const data = parseGen2(view, false);
      expect(data.party).toContain(1);
      expect(data.partyDetails[0]?.speciesId).toBe(1);
      expect(data.generation).toBe(2);
      expect(data.gameVersion).toBe('gold'); // As we haven't provided seen/owned data to identify gold/silver
    });

    it('should detect Crystal and parse', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 7); // invalid GS
      view.setUint8(0x2865, 1); // Valid Crystal
      view.setUint8(0x2866, 2); // Ivysaur
      view.setUint8(0x2866 + 7, 2); // speciesId inside struct

      const data = parseGen2(view, false);
      expect(data.gameVersion).toBe('crystal');
      expect(data.party).toContain(2);
    });

    it('should fall back to gold if unknown GS', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1); // GS
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      const data = parseGen2(view, false);
      expect(data.gameVersion).toBe('gold');
    });

    it('should parse Pokemon caught details (time, location)', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 3); // Crystal party count
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 1, 2);
      view.setUint8(0x2866 + 2, 3);
      view.setUint8(0x2866 + 3, 0xff); // Terminator

      // Pokemon 1: Morning, Event/Gift (0x7e)
      let pOff = 0x2866 + 7;
      view.setUint8(pOff, 1);
      view.setUint8(pOff + 29, 0x40); // caughtByte1: 0x40 = Morning
      view.setUint8(pOff + 30, 0x7e); // caughtByte2: 0x7e = Event/Gift

      // Pokemon 2: Day, Special Event/Traded (0x7f)
      pOff = 0x2866 + 7 + 48;
      view.setUint8(pOff, 2);
      view.setUint8(pOff + 29, 0x80); // caughtByte1: 0x80 = Day
      view.setUint8(pOff + 30, 0x7f); // caughtByte2: 0x7f = Special Event/Traded

      // Pokemon 3: Night, Normal map (e.g. 1)
      pOff = 0x2866 + 7 + 96;
      view.setUint8(pOff, 3);
      view.setUint8(pOff + 29, 0xc0); // caughtByte1: 0xc0 = Night
      view.setUint8(pOff + 30, 1); // map location

      const data = parseGen2(view, true);
      expect(data.partyDetails[0]?.speciesId).toBe(1);
      expect(data.partyDetails[0]?.caughtData?.time).toBe('Morning');
      expect(data.partyDetails[0]?.caughtData?.locationName).toBe('Event/Gift');

      expect(data.partyDetails[1]?.caughtData?.time).toBe('Day');
      expect(data.partyDetails[1]?.caughtData?.locationName).toBe('Special Event/Traded');

      expect(data.partyDetails[2]?.caughtData?.time).toBe('Night');
      // map 1 should resolve to a string
      expect(typeof data.partyDetails[2]?.caughtData?.locationName).toBe('string');
    });

    it('should parse friendship correctly', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1); // p1
      view.setUint8(0x288b + 7 + 27, 210); // friendship value

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.friendship).toBe(210);
    });

    it('should parse pokerus byte correctly', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 4); // 4 in party
      view.setUint8(0x288b, 1);
      view.setUint8(0x288c, 2);
      view.setUint8(0x288d, 3);
      view.setUint8(0x288e, 4);

      view.setUint8(0x288b + 7, 1); // p1
      view.setUint8(0x288b + 7 + 28, 0x00); // 0 pokerus

      view.setUint8(0x288b + 7 + 48, 2); // p2
      view.setUint8(0x288b + 7 + 48 + 28, 0x1a); // pokerus: strain 1, days 10

      view.setUint8(0x288b + 7 + 96, 3); // p3
      view.setUint8(0x288b + 7 + 96 + 28, 0x50); // pokerus: strain 5, days 0 (cured state)

      view.setUint8(0x288b + 7 + 144, 4); // p4
      view.setUint8(0x288b + 7 + 144 + 28, 0xff); // pokerus: strain 15, days 15 (max boundary)

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.pokerus).toBeUndefined();
      expect(data.partyDetails[1]?.pokerus).toEqual({ strain: 1, daysRemaining: 10 });
      expect(data.partyDetails[2]?.pokerus).toEqual({ strain: 5, daysRemaining: 0 }); // cured state
      expect(data.partyDetails[3]?.pokerus).toEqual({ strain: 15, daysRemaining: 15 }); // max boundary
    });

    it('should correctly detect silver/gold using pokedex seen/owned', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Silver exclusive: Vulpix (ID 37). Byte offset 0x2A27 for index 37 => 37 / 8 = 4 => 0x2a27 + 4 = 0x2a2b, bit 4.
      // Set bit 4 (0x10) to 1 for seen, and owned.
      // Owned offset: 0x2A4C. 0x2A4C + 4 = 0x2A50
      view.setUint8(0x2a50, 0x10); // Owned Vulpix
      view.setUint8(0x2a2b, 0x10); // Seen Vulpix

      const data = parseGen2(view, false);
      expect(data.gameVersion).toBe('silver');

      // Now reset and add Gold exclusives
      view.setUint8(0x2a50, 0);
      view.setUint8(0x2a2b, 0);

      // Gold exclusive: Mankey (ID 56). Byte offset: 56 / 8 = 7 => 0x2a27 + 7 = 0x2a2e, bit 7.
      // Owned offset: 0x2A4C + 7 = 0x2A53
      view.setUint8(0x2a53, 0x80); // Owned Mankey
      view.setUint8(0x2a2e, 0x80); // Seen Mankey
      const data2 = parseGen2(view, false);
      expect(data2.gameVersion).toBe('gold');
    });

    it('should parse PC storage', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Box numbers and offsets:
      // current box is at 0x2700. Set to box 1 (0).
      view.setUint8(0x2724, 0);
      view.setUint8(0x2d10, 1); // currentBoxCount for GS is 0x2D10
      view.setUint8(0x2d11, 1); // ID
      view.setUint8(0x2d26, 1); // start of box 0 data (0x2D11 + 21)

      // Add a pokemon to box 2 (index 1). Offset is 0x4000.
      view.setUint8(0x444e, 1); // count
      view.setUint8(0x444f, 2); // ID
      view.setUint8(0x4464, 2); // start of box 1 data (0x444E + 22)

      const data = parseGen2(view, false);
      expect(data.pc).toContain(1);
      expect(data.pc).toContain(2);
      expect(data.pcDetails.length).toBe(2);
    });

    it('should correctly count badges and map location', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Set 1 Johto badge and 1 Kanto badge
      view.setUint8(0x23e4, 0x01); // Johto badges
      view.setUint8(0x23e5, 0x02); // Kanto badges (bit 1)

      // Set Map
      view.setUint8(0x25b3, 1); // mapGroup = 1 (Olivine City)
      view.setUint8(0x25b4, 1); // mapId = 1 (Olivine City)

      const data = parseGen2(view, false);
      expect(data.badges).toBe(2);
      expect(data.currentMapName).not.toBe('Unknown Map');
      // If the map is in gen2MapLocations, it will have a name. Otherwise it should fall back safely without crashing.
    });

    it('should extract Hall of Fame count and roaming legendaries (GS)', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      view.setUint8(0x248c, 12); // GS HoF count

      // Setup Entei (Species 244) as roaming in GS
      const roamingOffset = 0x28da;
      view.setUint8(roamingOffset, 244); // Species
      view.setUint8(roamingOffset + 1, 40); // Level
      view.setUint8(roamingOffset + 2, 5); // Map Group
      view.setUint8(roamingOffset + 3, 2); // Map ID

      const data = parseGen2(view, false);
      expect(data.hallOfFameCount).toBe(12);
      expect(data.roamingLegendaries).toHaveLength(1);
      expect(data.roamingLegendaries?.[0]).toEqual({
        speciesId: 244,
        level: 40,
        mapGroup: 5,
        mapId: 2,
        isActive: true,
        hp: 0,
        ivs: { hp: 0, atk: 0, def: 0, spd: 0, spAtk: 0, spDef: 0 },
      });
    });

    it('should extract Hall of Fame count and roaming legendaries (Crystal)', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 1);
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 7, 1);

      view.setUint8(0x248d, 5); // Crystal HoF count

      // Setup Suicune (Species 245) as roaming in Crystal
      const roamingOffset = 0x28b6;
      view.setUint8(roamingOffset, 245); // Species
      view.setUint8(roamingOffset + 1, 40); // Level
      view.setUint8(roamingOffset + 2, 8); // Map Group
      view.setUint8(roamingOffset + 3, 3); // Map ID

      const data = parseGen2(view, true);
      expect(data.hallOfFameCount).toBe(5);
      expect(data.roamingLegendaries).toHaveLength(1);
      expect(data.roamingLegendaries?.[0]).toEqual({
        speciesId: 245,
        level: 40,
        mapGroup: 8,
        mapId: 3,
        isActive: true,
        hp: 0,
        ivs: { hp: 0, atk: 0, def: 0, spd: 0, spAtk: 0, spDef: 0 },
      });
    });

    it('should extract eventFlags, trainerFlags, and hiddenItemFlags for Gold/Silver', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Set some bytes in the GS wEventFlags block
      view.setUint8(0x2624, 0x11);
      view.setUint8(0x2624 + 255, 0x99);

      const data = parseGen2(view, false);
      expect(data.eventFlags).toBeDefined();
      expect(data.eventFlags?.[0]).toBe(0x11);
      expect(data.eventFlags?.[255]).toBe(0x99);
      expect(data.eventFlags?.length).toBe(0x100);
      expect(data.hiddenItemFlags).toBe(data.eventFlags);
      expect(data.trainerFlags).toBeDefined();
      expect(data.trainerFlags?.length).toBe(2048);
      // 0x11 = 00010001 in binary
      expect(data.trainerFlags?.[0]).toBe(true);
      expect(data.trainerFlags?.[1]).toBe(false);
      expect(data.trainerFlags?.[4]).toBe(true);
      // 0x99 = 10011001 in binary, index 255 byte starts at bit 2040
      expect(data.trainerFlags?.[2040]).toBe(true);
      expect(data.trainerFlags?.[2041]).toBe(false);
      expect(data.trainerFlags?.[2043]).toBe(true);
      expect(data.trainerFlags?.[2044]).toBe(true);
      expect(data.trainerFlags?.[2047]).toBe(true);
    });

    it('should extract trainerFlags with absolute zero state and boundary values (ADR 026)', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 1); // Crystal valid party count
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 7, 1);

      // Absolute zero state
      let data = parseGen2(view, true);
      expect(data.trainerFlags).toBeDefined();
      expect(data.trainerFlags?.length).toBe(2048);
      expect(data.trainerFlags?.every((flag) => flag === false)).toBe(true);

      // Max boundary state
      for (let i = 0; i < 256; i++) {
        view.setUint8(0x2600 + i, 0xff);
      }
      data = parseGen2(view, true);
      expect(data.trainerFlags?.every((flag) => flag === true)).toBe(true);
    });

    it('should extract eventFlags and hiddenItemFlags for Crystal', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 1);
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 7, 1);

      // Set some bytes in the Crystal wEventFlags block
      view.setUint8(0x2600, 0x22);
      view.setUint8(0x2600 + 255, 0xaa);

      const data = parseGen2(view, true);
      expect(data.eventFlags).toBeDefined();
      expect(data.eventFlags?.[0]).toBe(0x22);
      expect(data.eventFlags?.[255]).toBe(0xaa);
      expect(data.eventFlags?.length).toBe(0x100);
      expect(data.hiddenItemFlags).toBe(data.eventFlags);
    });

    it('should throw "The save file is corrupted or incomplete." if reading event flags out of bounds', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 1);
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 7, 1);

      const originalGetUint8 = view.getUint8.bind(view);
      view.getUint8 = (offset: number) => {
        if (offset === 0x2600) throw new RangeError('Out of bounds');
        return originalGetUint8(offset);
      };

      expect(() => parseGen2(view, true)).toThrow('The save file is corrupted or incomplete.');
    });

    it('should throw "The save file is corrupted or incomplete." if reading npcTradeFlags out of bounds', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 1);
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 7, 1);

      // Force view.getUint8 to throw RangeError for npcTradeFlagsOffset (Crystal = 0x24eb)
      view.getUint8 = (offset: number) => {
        if (offset === 0x24eb) {
          throw new RangeError('Out of bounds');
        }
        return DataView.prototype.getUint8.call(view, offset);
      };

      expect(() => parseGen2(view, true)).toThrow('The save file is corrupted or incomplete.');
    });

    it('should throw "The save file is corrupted or incomplete." if TM Pocket is out of bounds', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Force view.getUint8 to throw RangeError for TM Pocket GS (0x23e7)
      const originalGetUint8 = view.getUint8.bind(view);
      view.getUint8 = (offset: number) => {
        if (offset === 0x23e7) {
          throw new RangeError('Out of bounds');
        }
        return originalGetUint8(offset);
      };

      expect(() => parseGen2(view, false)).toThrow('The save file is corrupted or incomplete.');
    });

    it('should handle RangeError gracefully during roaming legendaries extraction', () => {
      const buffer = new ArrayBuffer(0x8000);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Force view.getUint8 to throw RangeError for roaming legendaries offset (GS = 0x28da)
      const originalGetUint8 = view.getUint8.bind(view);
      view.getUint8 = (offset: number) => {
        if (offset === 0x28da) {
          throw new RangeError('Out of bounds');
        }
        return originalGetUint8(offset);
      };

      expect(() => parseGen2(view, false)).toThrow('The save file is corrupted or incomplete.');
    });
  });

  describe('Gen 2 Egg Parsing', () => {
    it('should correctly calculate eggSteps for an Egg (speciesId 253)', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);

      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 253); // Party species list: Egg

      // Party Pokémon data offset for GS is 0x288A + 8 = 0x2892
      const dataOffset = 0x2892;
      view.setUint8(dataOffset, 253); // speciesId
      view.setUint8(dataOffset + 27, 10); // friendship byte (cycle count)

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.speciesId).toBe(253);
      expect(data.partyDetails[0]?.eggSteps).toBe(10 * 256);
      expect(data.partyDetails[0]?.friendship).toBe(10);
    });

    it('should not define eggSteps for non-Egg Pokemon', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);

      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1); // Party species list: Bulbasaur

      // Party Pokémon data offset for GS is 0x288A + 8 = 0x2892
      const dataOffset = 0x2892;
      view.setUint8(dataOffset, 1); // speciesId
      view.setUint8(dataOffset + 27, 70); // friendship byte

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.speciesId).toBe(1);
      expect(data.partyDetails[0]?.eggSteps).toBeUndefined();
    });
  });

  describe('parseGen2 - Unown Forms', () => {
    it('should correctly parse Unown Form A', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 201); // Unown species
      view.setUint8(0x288b + 7, 201); // speciesId inside struct

      // Form A (value 0): DVs = 0
      view.setUint16(0x288b + 7 + 21, 0, false);

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.unownForm).toBe('A');
    });

    it('should correctly parse Unown Form Z', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 201); // Unown species
      view.setUint8(0x288b + 7, 201); // speciesId inside struct

      // Form Z (value 25): DVs = 578
      view.setUint16(0x288b + 7 + 21, 578, false);

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.unownForm).toBe('Z');
    });

    it('should not parse Unown form for non-Unown Pokemon even with same DVs', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1); // Bulbasaur
      view.setUint8(0x288b + 7, 1); // speciesId inside struct

      // DVs = 578 (which would be Form Z for Unown)
      view.setUint16(0x288b + 7 + 21, 578, false);

      const data = parseGen2(view, false);
      expect(data.partyDetails[0]?.speciesId).toBe(1);
      expect(data.partyDetails[0]?.unownForm).toBeUndefined();
    });
  });

  describe('parseGen2 - PC Items', () => {
    it('should parse pcItems correctly for Gold/Silver', () => {
      const buffer = new ArrayBuffer(0x8000);
      const view = new DataView(buffer);

      // Gold/Silver PC Items offset is 0x247e
      view.setUint8(0x247e, 2); // 2 items
      view.setUint8(0x247e + 1, 4); // Item ID 4 (Poke Ball)
      view.setUint8(0x247e + 2, 10); // Quantity 10
      view.setUint8(0x247e + 3, 17); // Item ID 17 (Potion)
      view.setUint8(0x247e + 4, 5); // Quantity 5

      const data = parseGen2(view);

      expect(data.pcItems).toEqual(
        expect.arrayContaining([
          { id: 4, quantity: 10 },
          { id: 17, quantity: 5 },
        ]),
      );
    });

    it('should parse pcItems correctly for Crystal', () => {
      const buffer = new ArrayBuffer(0x8000);
      const view = new DataView(buffer);

      // Crystal PC Items offset is 0x2460
      view.setUint8(0x2460, 2); // 2 items
      view.setUint8(0x2460 + 1, 4); // Item ID 4 (Poke Ball)
      view.setUint8(0x2460 + 2, 10); // Quantity 10
      view.setUint8(0x2460 + 3, 17); // Item ID 17 (Potion)
      view.setUint8(0x2460 + 4, 5); // Quantity 5

      const data = parseGen2(view, true);

      expect(data.pcItems).toEqual(
        expect.arrayContaining([
          { id: 4, quantity: 10 },
          { id: 17, quantity: 5 },
        ]),
      );
    });
  });

  describe('Gen 2 NPC Trade Flags Parsing', () => {
    it('should correctly extract npcTradeFlags for Gold/Silver', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Gold/Silver NPC trade flags offset is 0x250f
      // Set to 85 (0b01010101). Flags are extracted from bit 0 to 6.
      view.setUint8(0x250f, 85);

      const data = parseGen2(view, false);
      expect(data.npcTradeFlags).toBeDefined();
      expect(data.npcTradeFlags).toHaveLength(7);
      expect(data.npcTradeFlags).toEqual([true, false, true, false, true, false, true]);
    });

    it('should correctly extract npcTradeFlags for Crystal', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x2865, 1);
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 7, 1);

      // Crystal NPC trade flags offset is 0x24eb
      // Set to 42 (0b00101010). Flags are extracted from bit 0 to 6.
      view.setUint8(0x24eb, 42);

      const data = parseGen2(view, true);
      expect(data.npcTradeFlags).toBeDefined();
      expect(data.npcTradeFlags).toHaveLength(7);
      expect(data.npcTradeFlags).toEqual([false, true, false, true, false, true, false]);
    });
  });

  describe('Gen 2 TM/HM Parsing', () => {
    it('should correctly parse TM/HM inventory and event flags', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // TM Pocket is a flat array of 57 bytes (no length prefix).
      // Item ID 191 is TM01, stored at index 0.
      view.setUint8(0x23e7, 2); // 2 of TM01

      // Item ID 193 is TM03, stored at index 2.
      view.setUint8(0x23e7 + 2, 1); // 1 of TM03

      // Set Event Flags (GS offset: 0x2624)
      // TM02 (Headbutt, itemId 192) event flag is 92.
      // Byte offset: Math.floor(92 / 8) = 11. Bit offset: 92 % 8 = 4.
      // 0x2624 + 11 = 0x262f. Set bit 4.
      view.setUint8(0x262f, 1 << 4);

      const data = parseGen2(view, false);
      expect(data.tms).toBeDefined();

      const tm01 = data.tms?.find((t) => t.id === 191);
      expect(tm01?.quantity).toBe(2);
      expect(tm01?.isAcquired).toBe(true);

      const tm02 = data.tms?.find((t) => t.id === 192);
      expect(tm02?.quantity).toBe(0);
      expect(tm02?.isAcquired).toBe(true);

      const tm03 = data.tms?.find((t) => t.id === 193);
      expect(tm03?.quantity).toBe(1);
      expect(tm03?.isAcquired).toBe(true); // TM03 has no event flag, but isAcquired is true because quantity > 0

      const tm04 = data.tms?.find((t) => t.id === 194);
      expect(tm04?.quantity).toBe(0);
      expect(tm04?.isAcquired).toBe(false);
    });

    it('should throw "The save file is corrupted or incomplete." if eventFlags are out of bounds', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 7, 1);

      // Force view.getUint8 to throw RangeError for Event Flags (0x2624)
      const originalGetUint8 = view.getUint8.bind(view);
      view.getUint8 = (offset: number) => {
        if (offset === 0x2624) {
          throw new RangeError('Out of bounds');
        }
        return originalGetUint8(offset);
      };

      expect(() => parseGen2(view, false)).toThrow('The save file is corrupted or incomplete.');
    });

    it('should extract Moms savings correctly for GS', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);

      // Setup minimal valid save data for GS
      view.setUint8(0x288a, 1);
      view.setUint8(0x288b, 1);
      view.setUint8(0x288b + 1, 0xff);
      view.setUint8(0x288a + 7, 1);

      const johtoBadgesOffset = 0x23e4;
      const momsMoneyOffset = johtoBadgesOffset - 0x06;
      const momSavingMoneyOffset = johtoBadgesOffset - 0x03;

      // Set Moms money to 1,234,567 (0x12D687)
      view.setUint8(momsMoneyOffset, 0x12);
      view.setUint8(momsMoneyOffset + 1, 0xd6);
      view.setUint8(momsMoneyOffset + 2, 0x87);

      // Set saving active (bit 7)
      view.setUint8(momSavingMoneyOffset, 0b10000000);

      const result = parseGen2(view);
      expect(result.gen2MomsSavings?.money).toBe(1234567);
      expect(result.gen2MomsSavings?.savingActive).toBe(true);
    });

    it('should extract room decorations correctly for Crystal', () => {
      const buffer = new ArrayBuffer(32768);
      const view = new DataView(buffer);

      // Setup minimal valid save data for Crystal
      view.setUint8(0x2865, 1);
      view.setUint8(0x2866, 1);
      view.setUint8(0x2866 + 1, 0xff);
      view.setUint8(0x2865 + 7, 1);
      view.setUint8(0x288a, 7); // force crystal

      const johtoBadgesOffset = 0x23e5;
      const activeDecoOffset = johtoBadgesOffset + 0x3b8;

      // Set active decorations
      view.setUint8(activeDecoOffset, 2); // deco bed
      view.setUint8(activeDecoOffset + 1, 3); // deco carpet

      // Set unlocked decorations in event flags
      // EVENT_DECO_BED_1 = 676. Byte offset: 0x54, bit offset: 4
      const eventFlagsOffset = 0x2600;
      // Unlock 1st (bit 4), 2nd (bit 5), and 6th (bit 1 of next byte)
      view.setUint8(eventFlagsOffset + 0x54, 0b00110000);
      view.setUint8(eventFlagsOffset + 0x55, 0b00000010);

      const result = parseGen2(view, true);
      expect(result.gen2RoomDecorations?.active[0]).toBe(2);
      expect(result.gen2RoomDecorations?.active[1]).toBe(3);
      expect(result.gen2RoomDecorations?.active.length).toBe(8);

      expect(result.gen2RoomDecorations?.unlocked[0]).toBe(true);
      expect(result.gen2RoomDecorations?.unlocked[1]).toBe(true);
      expect(result.gen2RoomDecorations?.unlocked[2]).toBe(false);
      expect(result.gen2RoomDecorations?.unlocked[3]).toBe(false);
      expect(result.gen2RoomDecorations?.unlocked[4]).toBe(false);
      expect(result.gen2RoomDecorations?.unlocked[5]).toBe(true);
      expect(result.gen2RoomDecorations?.unlocked.length).toBe(46);
    });
  });
});
