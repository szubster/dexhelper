import { describe, expect, it } from 'vitest';
import {
  BERRY_POCKET_OFFSET_EMERALD,
  BERRY_POCKET_OFFSET_FRLG,
  BERRY_POCKET_OFFSET_RS,
  ITEM_AURORA_TICKET,
  ITEM_EON_TICKET,
  ITEM_MYSTIC_TICKET,
  ITEM_OLD_SEA_MAP,
  KEY_ITEM_POCKET_OFFSET_EMERALD,
  KEY_ITEM_POCKET_OFFSET_FRLG,
  KEY_ITEM_POCKET_OFFSET_RS,
} from './constants';
import { parseGen3BerryPouch, parseGen3EventItems } from './parser';

describe('parseGen3EventItems', () => {
  it('should parse event items correctly for RS', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);

    // Set Eon Ticket and Mystic Ticket
    const offset = KEY_ITEM_POCKET_OFFSET_RS;
    view.setUint16(offset, ITEM_EON_TICKET, true);
    view.setUint16(offset + 4, ITEM_MYSTIC_TICKET, true);

    const result = parseGen3EventItems(view, 0, 'ruby');
    expect(result[ITEM_EON_TICKET]).toBe(true);
    expect(result[ITEM_MYSTIC_TICKET]).toBe(true);
    expect(result[ITEM_AURORA_TICKET]).toBe(false);
    expect(result[ITEM_OLD_SEA_MAP]).toBe(false);
  });

  it('should parse event items correctly for Emerald', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);

    // Set Aurora Ticket and Old Sea Map
    const offset = KEY_ITEM_POCKET_OFFSET_EMERALD;
    view.setUint16(offset, ITEM_AURORA_TICKET, true);
    view.setUint16(offset + 4, ITEM_OLD_SEA_MAP, true);

    const result = parseGen3EventItems(view, 0, 'emerald');
    expect(result[ITEM_EON_TICKET]).toBe(false);
    expect(result[ITEM_MYSTIC_TICKET]).toBe(false);
    expect(result[ITEM_AURORA_TICKET]).toBe(true);
    expect(result[ITEM_OLD_SEA_MAP]).toBe(true);
  });

  it('should parse event items correctly for FRLG', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);

    // Set Eon Ticket and Mystic Ticket
    const offset = KEY_ITEM_POCKET_OFFSET_FRLG;
    view.setUint16(offset, ITEM_EON_TICKET, true);
    view.setUint16(offset + 4, ITEM_MYSTIC_TICKET, true);

    const result = parseGen3EventItems(view, 0, 'firered');
    expect(result[ITEM_EON_TICKET]).toBe(true);
    expect(result[ITEM_MYSTIC_TICKET]).toBe(true);
    expect(result[ITEM_AURORA_TICKET]).toBe(false);
    expect(result[ITEM_OLD_SEA_MAP]).toBe(false);
  });

  it('should catch RangeError and throw specific message', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => parseGen3EventItems(view, 0, 'ruby')).toThrow('The save file is corrupted or incomplete.');
  });
});

describe('parseGen3BerryPouch', () => {
  it('should parse berry pouch items correctly for RS without security key', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);

    // No security key in RS, XOR with 0
    const offset = BERRY_POCKET_OFFSET_RS;
    view.setUint16(offset, 133 /* Cheri Berry */, true);
    view.setUint16(offset + 2, 5 /* Quantity */, true);

    const result = parseGen3BerryPouch(view, 0, 'ruby', 0);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ itemId: 133, quantity: 5 });
  });

  it('should parse berry pouch items correctly for Emerald with security key', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const securityKey = 0x1234abcd;
    const lower16Mask = securityKey & 0xffff;

    // Apply security key
    const offset = BERRY_POCKET_OFFSET_EMERALD;
    view.setUint16(offset, 134 /* Chesto Berry */, true);
    view.setUint16(offset + 2, 10 ^ lower16Mask, true);

    const result = parseGen3BerryPouch(view, 0, 'emerald', securityKey);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ itemId: 134, quantity: 10 });
  });

  it('should parse berry pouch items correctly for FRLG with security key', () => {
    const buffer = new ArrayBuffer(0x1000);
    const view = new DataView(buffer);
    const securityKey = 0xabcdef12;
    const lower16Mask = securityKey & 0xffff;

    // Apply security key
    const offset = BERRY_POCKET_OFFSET_FRLG;
    view.setUint16(offset, 135 /* Pecha Berry */, true);
    view.setUint16(offset + 2, 15 ^ lower16Mask, true);
    // Ignore empty slots
    view.setUint16(offset + 4, 0, true);
    view.setUint16(offset + 6, 0, true);

    const result = parseGen3BerryPouch(view, 0, 'firered', securityKey);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ itemId: 135, quantity: 15 });
  });

  it('should catch RangeError and throw specific message', () => {
    const buffer = new ArrayBuffer(10);
    const view = new DataView(buffer);

    expect(() => parseGen3BerryPouch(view, 0, 'emerald', 0)).toThrow('The save file is corrupted or incomplete.');
  });
});
