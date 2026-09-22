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

  it('should have valid STATIC_GIFT_DATA for Gen 3 gifts and static encounters', () => {
    expect(STATIC_GIFT_DATA).toBeDefined();
    expect(Object.keys(STATIC_GIFT_DATA).length).toBeGreaterThan(0);

    // Spot check Castform, Beldum, Rayquaza, Snorlax
    expect(STATIC_GIFT_DATA[351]?.name).toBe('Castform');
    expect(STATIC_GIFT_DATA[375]?.name).toBe('Beldum');
    expect(STATIC_GIFT_DATA[384]?.gen3Key).toBe('rayquaza');
    expect(STATIC_GIFT_DATA[143]?.gen3Key).toBe('snorlaxRoute12');
  });
});
