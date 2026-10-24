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

  it('should have valid STATIC_GIFT_DATA for Gen 3 gifts and encounters', () => {
    expect(STATIC_GIFT_DATA).toBeDefined();
    expect(Object.keys(STATIC_GIFT_DATA).length).toBeGreaterThan(0);

    // Spot check Beldum gift in Emerald/RS
    const beldum = STATIC_GIFT_DATA[374];
    expect(beldum).toBeDefined();
    expect(beldum?.name).toBe('Beldum');
    expect(beldum?.location).toContain("Steven's House");

    // Spot check Rayquaza static legendary
    const rayquaza = STATIC_GIFT_DATA[384];
    expect(rayquaza).toBeDefined();
    expect(rayquaza?.name).toBe('Rayquaza');
    expect(rayquaza?.gen3StaticKey).toBe('rayquaza');
  });
});
