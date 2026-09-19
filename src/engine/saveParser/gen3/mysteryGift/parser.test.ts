import { describe, expect, it } from 'vitest';
import * as constants from './constants';
import { parseGen3MysteryGift } from './parser';

describe('parseGen3MysteryGift', () => {
  it('should parse nothing if no flags are set', () => {
    const buffer = new ArrayBuffer(0x2000);
    const view = new DataView(buffer);
    const offset = 0;

    const result = parseGen3MysteryGift(view, offset, 'emerald');
    expect(result).toEqual({
      hasAuroraTicket: false,
      hasMysticTicket: false,
      hasEonTicket: false,
      hasOldSeaMap: false,
      isSouthernIslandEnabled: false,
      isBirthIslandEnabled: false,
      isNavelRockEnabled: false,
      isFarawayIslandEnabled: false,
    });
  });

  describe('Emerald/Ruby/Sapphire', () => {
    it('should parse Aurora Ticket', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_EMERALD;

      const byteOffset = flagsOffset + constants.RSE_FLAG_RECEIVED_AURORA_TICKET_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_RECEIVED_AURORA_TICKET_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'emerald');
      expect(result.hasAuroraTicket).toBe(true);
    });

    it('should parse Mystic Ticket', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_RS;

      const byteOffset = flagsOffset + constants.RSE_FLAG_RECEIVED_MYSTIC_TICKET_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_RECEIVED_MYSTIC_TICKET_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'ruby');
      expect(result.hasMysticTicket).toBe(true);
    });

    it('should parse Old Sea Map (Emerald)', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_EMERALD;

      const byteOffset = flagsOffset + constants.RSE_FLAG_RECEIVED_OLD_SEA_MAP_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_RECEIVED_OLD_SEA_MAP_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'emerald');
      expect(result.hasOldSeaMap).toBe(true);
    });

    it('should parse Enable Ship Birth Island', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_RS;

      const byteOffset = flagsOffset + constants.RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'ruby');
      expect(result.isBirthIslandEnabled).toBe(true);
    });

    it('should parse Enable Ship Southern Island', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_RS;

      const byteOffset = flagsOffset + constants.RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_ENABLE_SHIP_SOUTHERN_ISLAND_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'ruby');
      expect(result.isSouthernIslandEnabled).toBe(true);
    });

    it('should parse Enable Ship Navel Rock', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_RS;

      const byteOffset = flagsOffset + constants.RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'sapphire');
      expect(result.isNavelRockEnabled).toBe(true);
    });

    it('should parse Enable Ship Faraway Island', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_EMERALD;

      const byteOffset = flagsOffset + constants.RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_ENABLE_SHIP_FARAWAY_ISLAND_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'emerald');
      expect(result.isFarawayIslandEnabled).toBe(true);
    });
  });

  describe('FireRed/LeafGreen', () => {
    it('should parse Aurora Ticket', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_FRLG;

      const byteOffset = flagsOffset + constants.FRLG_FLAG_RECEIVED_AURORA_TICKET_BYTE;
      view.setUint8(byteOffset, 1 << constants.FRLG_FLAG_RECEIVED_AURORA_TICKET_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'firered');
      expect(result.hasAuroraTicket).toBe(true);
    });

    it('should parse Mystic Ticket', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_FRLG;

      const byteOffset = flagsOffset + constants.FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BYTE;
      view.setUint8(byteOffset, 1 << constants.FRLG_FLAG_RECEIVED_MYSTIC_TICKET_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'leafgreen');
      expect(result.hasMysticTicket).toBe(true);
    });

    it('should not parse Old Sea Map', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_FRLG;

      // This is where Old Sea Map would be for RSE
      const byteOffset = flagsOffset + constants.RSE_FLAG_RECEIVED_OLD_SEA_MAP_BYTE;
      view.setUint8(byteOffset, 1 << constants.RSE_FLAG_RECEIVED_OLD_SEA_MAP_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'leafgreen');
      expect(result.hasOldSeaMap).toBe(false);
    });

    it('should parse Enable Ship Navel Rock', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_FRLG;

      const byteOffset = flagsOffset + constants.FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BYTE;
      view.setUint8(byteOffset, 1 << constants.FRLG_FLAG_ENABLE_SHIP_NAVEL_ROCK_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'leafgreen');
      expect(result.isNavelRockEnabled).toBe(true);
    });

    it('should parse Enable Ship Birth Island', () => {
      const buffer = new ArrayBuffer(0x2000);
      const view = new DataView(buffer);
      const saveBlock1Offset = 0;
      const flagsOffset = saveBlock1Offset + constants.MYSTERY_GIFT_FLAGS_OFFSET_FRLG;

      const byteOffset = flagsOffset + constants.FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BYTE;
      view.setUint8(byteOffset, 1 << constants.FRLG_FLAG_ENABLE_SHIP_BIRTH_ISLAND_BIT);

      const result = parseGen3MysteryGift(view, saveBlock1Offset, 'firered');
      expect(result.isBirthIslandEnabled).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should throw Error for out of bounds read', () => {
      const buffer = new ArrayBuffer(10); // Too small
      const view = new DataView(buffer);
      const offset = 0;

      expect(() => parseGen3MysteryGift(view, offset, 'emerald')).toThrow('The save file is corrupted or incomplete.');
    });
  });
});
