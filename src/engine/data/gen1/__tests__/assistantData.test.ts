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
    });
  });

  it('should correctly define Bulbasaur (ID 1)', () => {
    const bulbasaur = STATIC_GIFT_DATA[1];
    expect(bulbasaur).toBeDefined();
    expect(bulbasaur?.name).toBe('Bulbasaur');
    expect(bulbasaur?.location).toBe('Cerulean City');
    expect(bulbasaur?.gen).toBe(1);
    expect(bulbasaur?.eventFlag).toBe(0x2a1);
    expect(bulbasaur?.requiredBadges).toBe(1);
  });
});

describe('STATIC_NPC_TRADE_DATA', () => {
  describe('Yellow Version Trades', () => {
    it('should correctly define Lickitung for Dugtrio (GURIO)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'GURIO' && t.versions?.includes('yellow'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(108); // Lickitung
      expect(trade?.receivedId).toBe(51); // Dugtrio
    });

    it('should correctly define Tangela for Parasect (SPIKE)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'SPIKE' && t.versions?.includes('yellow'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(114); // Tangela
      expect(trade?.receivedId).toBe(47); // Parasect
    });
  });

  describe('Red/Blue Version Trades', () => {
    it('should correctly define Venonat for Tangela (CRINKLES)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'CRINKLES' && t.versions?.includes('red'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(49); // Venonat
      expect(trade?.receivedId).toBe(114); // Tangela
      expect(trade?.versions).toContain('blue');
    });

    it('should correctly define Slowbro for Lickitung (MARC)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedOtName === 'MARC' && t.versions?.includes('red'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(80); // Slowbro
      expect(trade?.receivedId).toBe(108); // Lickitung
    });
  });
});
