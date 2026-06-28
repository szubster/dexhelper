import { describe, expect, it } from 'vitest';
import { STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from '../assistantData';

describe('STATIC_GIFT_DATA', () => {
  it('should have basic valid structure for all entries', () => {
    Object.values(STATIC_GIFT_DATA).forEach((gift) => {
      expect(typeof gift.name).toBe('string');
      expect(gift.name.length).toBeGreaterThan(0);
      expect(typeof gift.location).toBe('string');
      expect(gift.location.length).toBeGreaterThan(0);
      expect(typeof gift.reason).toBe('string');
      expect(gift.reason.length).toBeGreaterThan(0);
      expect(gift.gen).toBe(2);
    });
  });

  it('should correctly define Togepi (ID 175)', () => {
    const togepi = STATIC_GIFT_DATA[175];
    expect(togepi).toBeDefined();
    expect(togepi?.name).toBe('Togepi');
    expect(togepi?.location).toBe('Violet City');
    expect(togepi?.reason).toBe('Gift from Aide');
    expect(togepi?.gen).toBe(2);
    expect(togepi?.eventFlag).toBe(0x2d);
  });

  it('should have correct eventFlag mappings for other gifts', () => {
    expect(STATIC_GIFT_DATA[133]?.eventFlag).toBe(0x4f); // Eevee
    expect(STATIC_GIFT_DATA[213]?.eventFlag).toBe(0x45); // Shuckle
    expect(STATIC_GIFT_DATA[147]?.eventFlag).toBe(0xbd); // Dratini
    expect(STATIC_GIFT_DATA[236]?.eventFlag).toBe(0x61); // Tyrogue
    expect(STATIC_GIFT_DATA[185]?.eventFlag).toBe(0x2a); // Sudowoodo
    expect(STATIC_GIFT_DATA[130]?.eventFlag).toBe(0x751); // Gyarados
    expect(STATIC_GIFT_DATA[249]?.eventFlag).toBe(0x318); // Lugia
    expect(STATIC_GIFT_DATA[250]?.eventFlag).toBe(0x317); // Ho-oh
    expect(STATIC_GIFT_DATA[245]?.eventFlag).toBe(0x335); // Suicune
  });
});

describe('STATIC_NPC_TRADE_DATA', () => {
  it('should correctly define Onix for Bellsprout (ROCKY)', () => {
    const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'ROCKY' && t.versions?.includes('gold'));
    expect(trade).toBeDefined();
    expect(trade?.offeredId).toBe(69); // Bellsprout
    expect(trade?.receivedId).toBe(95); // Onix
    expect(trade?.gen).toBe(2);
  });

  it('should correctly define Machop for Drowzee (MUSCLE) in Gold/Silver', () => {
    const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'MUSCLE' && t.versions?.includes('gold'));
    expect(trade).toBeDefined();
    expect(trade?.offeredId).toBe(96); // Drowzee
    expect(trade?.receivedId).toBe(66); // Machop
    expect(trade?.gen).toBe(2);
  });

  it('should correctly define Machop for Abra (MUSCLE) in Crystal', () => {
    const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'MUSCLE' && t.versions?.includes('crystal'));
    expect(trade).toBeDefined();
    expect(trade?.offeredId).toBe(63); // Abra
    expect(trade?.receivedId).toBe(66); // Machop
    expect(trade?.gen).toBe(2);
  });

  it('should not contain NOB or TOM trades from older data', () => {
    const nob = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'NOB');
    expect(nob).toBeUndefined();

    const tom = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'TOM');
    expect(tom).toBeUndefined();
  });
});
