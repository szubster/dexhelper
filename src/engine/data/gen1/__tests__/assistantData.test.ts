import { describe, expect, it } from 'vitest';
import { STATIC_NPC_TRADE_DATA } from '../assistantData';

describe('STATIC_NPC_TRADE_DATA', () => {
  describe('Yellow Version Trades', () => {
    it('should correctly define Lickitung for Dugtrio (GURIO)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find(t => t.receivedOtName === 'GURIO' && t.versions?.includes('yellow'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(108); // Lickitung
      expect(trade?.receivedId).toBe(51); // Dugtrio
    });

    it('should correctly define Tangela for Parasect (SPIKE)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find(t => t.receivedOtName === 'SPIKE' && t.versions?.includes('yellow'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(114); // Tangela
      expect(trade?.receivedId).toBe(47); // Parasect
    });
  });

  describe('Red/Blue Version Trades', () => {
    it('should correctly define Venonat for Tangela (CRINKLES)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find(t => t.receivedOtName === 'CRINKLES' && t.versions?.includes('red'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(49); // Venonat
      expect(trade?.receivedId).toBe(114); // Tangela
      expect(trade?.versions).toContain('blue');
    });

    it('should correctly define Slowbro for Lickitung (MARC)', () => {
      const trade = STATIC_NPC_TRADE_DATA.find(t => t.receivedOtName === 'MARC' && t.versions?.includes('red'));
      expect(trade).toBeDefined();
      expect(trade?.offeredId).toBe(80); // Slowbro
      expect(trade?.receivedId).toBe(108); // Lickitung
    });
  });
});
