import { describe, expect, it } from 'vitest';
import {
  ITEM_AURORA_TICKET,
  ITEM_EON_TICKET,
  ITEM_MYSTIC_TICKET,
  ITEM_OLD_SEA_MAP,
  KEY_ITEM_POCKET_OFFSET_EMERALD,
  KEY_ITEM_POCKET_OFFSET_FRLG,
  KEY_ITEM_POCKET_OFFSET_RS,
} from './constants';
import { parseGen3EventItems } from './parser';

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
