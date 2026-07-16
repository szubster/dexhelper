import { describe, expect, it } from 'vitest';
import { STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from './assistantData';

describe('Gen 3 assistantData', () => {
  it('should have valid STATIC_NPC_TRADE_DATA', () => {
    expect(STATIC_NPC_TRADE_DATA).toBeDefined();
    expect(STATIC_NPC_TRADE_DATA.length).toBeGreaterThan(0);
    // Spot check a trade
    const seedotTrade = STATIC_NPC_TRADE_DATA.find((t) => t.receivedId === 273);
    expect(seedotTrade).toBeDefined();
    expect(seedotTrade?.nickname).toBe('DOTS');
  });

  it('should have empty STATIC_GIFT_DATA for now', () => {
    expect(STATIC_GIFT_DATA).toBeDefined();
    expect(Object.keys(STATIC_GIFT_DATA).length).toBe(0);
  });
});
