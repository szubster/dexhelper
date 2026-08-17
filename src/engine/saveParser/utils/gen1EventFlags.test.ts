import { describe, expect, it } from 'vitest';
import { STATIC_GIFT_DATA } from '../../data/gen1/assistantData';
import { GEN1_TM_EVENT_FLAGS, parseGen1StaticEncounters, parseGen1TMFlags } from './gen1EventFlags';

describe('parseGen1StaticEncounters', () => {
  it('should handle an absolute zero state correctly', () => {
    const eventFlags = new Uint8Array(0x118); // all zeros
    const claimed = parseGen1StaticEncounters(eventFlags);
    for (const idStr of Object.keys(STATIC_GIFT_DATA)) {
      const id = parseInt(idStr, 10);
      expect(claimed[id]).toBe(false);
    }
  });

  it('should handle boundary state (flags undefined)', () => {
    // Array that is too small
    const eventFlags = new Uint8Array(10);
    const claimed = parseGen1StaticEncounters(eventFlags);

    // Filter gifts that are out of bounds and check that they return false
    const outOfBoundsGifts = Object.entries(STATIC_GIFT_DATA).filter(
      ([, gift]) => gift.eventFlag !== undefined && gift.eventFlag >> 3 >= 10,
    );

    const outOfBoundsClaimed = outOfBoundsGifts.map(([idStr]) => claimed[parseInt(idStr, 10)]);
    expect(outOfBoundsClaimed.every((val) => val === false)).toBe(true);
  });

  it('should parse specific claimed encounters correctly', () => {
    const eventFlags = new Uint8Array(0x118);
    // Let's fake setting the Mewtwo flag (id: 150)
    const mewtwoGift = STATIC_GIFT_DATA[150];
    if (mewtwoGift?.eventFlag) {
      const flagId = mewtwoGift.eventFlag;
      const byteIndex = flagId >> 3;
      const bitIndex = flagId & 7;
      const current = eventFlags[byteIndex];
      if (current !== undefined) eventFlags[byteIndex] = current | (1 << bitIndex);
    }

    // Let's fake setting the Snorlax flag (id: 143)
    const snorlaxGift = STATIC_GIFT_DATA[143];
    if (snorlaxGift?.eventFlag) {
      const flagId = snorlaxGift.eventFlag;
      const byteIndex = flagId >> 3;
      const bitIndex = flagId & 7;
      const current = eventFlags[byteIndex];
      if (current !== undefined) eventFlags[byteIndex] = current | (1 << bitIndex);
    }

    const claimed = parseGen1StaticEncounters(eventFlags);
    expect(claimed[150]).toBe(true);
    expect(claimed[143]).toBe(true);
    // Another static should be false
    expect(claimed[144]).toBe(false); // Articuno
  });
});

describe('parseGen1TMFlags', () => {
  it('should handle an absolute zero state correctly for TM flags', () => {
    const eventFlags = new Uint8Array(0x118); // all zeros
    const claimed = parseGen1TMFlags(eventFlags);
    for (const idStr of Object.keys(GEN1_TM_EVENT_FLAGS)) {
      const id = parseInt(idStr, 10);
      expect(claimed[id]).toBe(false);
    }
  });

  it('should handle boundary state (flags undefined) for TM flags', () => {
    // Array that is too small
    const eventFlags = new Uint8Array(10);
    const claimed = parseGen1TMFlags(eventFlags);

    // Filter gifts that are out of bounds and check that they return false
    const outOfBoundsGifts = Object.entries(GEN1_TM_EVENT_FLAGS).filter(([, flag]) => flag >> 3 >= 10);

    const outOfBoundsClaimed = outOfBoundsGifts.map(([idStr]) => claimed[parseInt(idStr, 10)]);
    expect(outOfBoundsClaimed.every((val) => val === false)).toBe(true);
  });

  it('should parse specific claimed TM flags correctly', () => {
    const eventFlags = new Uint8Array(0x118);

    // Fake setting the TM 206 flag (id: 206, flag: 0x258)
    const tm206Flag = GEN1_TM_EVENT_FLAGS[206];
    if (tm206Flag !== undefined) {
      const byteIndex = tm206Flag >> 3;
      const bitIndex = tm206Flag & 7;
      const current = eventFlags[byteIndex];
      if (current !== undefined) eventFlags[byteIndex] = current | (1 << bitIndex);
    }

    const claimed = parseGen1TMFlags(eventFlags);
    expect(claimed[206]).toBe(true);
    // Another TM should be false
    expect(claimed[211]).toBe(false);
  });
});
