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
  });
});

describe('STATIC_NPC_TRADE_DATA', () => {
  it('should correctly define Onix for Bellsprout (ROCKY)', () => {
    const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'ROCKY');
    expect(trade).toBeDefined();
    expect(trade?.offeredId).toBe(69); // Bellsprout
    expect(trade?.receivedId).toBe(95); // Onix
    expect(trade?.gen).toBe(2);
  });

  it('should correctly define Machop for Drowzee (MUSCLE)', () => {
    const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'MUSCLE');
    expect(trade).toBeDefined();
    expect(trade?.offeredId).toBe(96); // Drowzee
    expect(trade?.receivedId).toBe(66); // Machop
    expect(trade?.gen).toBe(2);
  });
});
