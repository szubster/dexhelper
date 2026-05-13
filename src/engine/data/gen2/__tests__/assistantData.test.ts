import { describe, expect, it } from 'vitest';
import { STATIC_GIFT_DATA, STATIC_NPC_TRADE_DATA } from '../assistantData';

describe('Gen 2 Assistant Data', () => {
  it('should have the expected structure for STATIC_GIFT_DATA', () => {
    expect(STATIC_GIFT_DATA).toBeDefined();

    // Check specific gifts
    expect(STATIC_GIFT_DATA[175]).toBeDefined(); // Togepi
    expect(STATIC_GIFT_DATA[175].name).toBe('Togepi');
    expect(STATIC_GIFT_DATA[175].gen).toBe(2);

    expect(STATIC_GIFT_DATA[133]).toBeDefined(); // Eevee
    expect(STATIC_GIFT_DATA[133].name).toBe('Eevee');

    expect(STATIC_GIFT_DATA[213]).toBeDefined(); // Shuckle
    expect(STATIC_GIFT_DATA[213].name).toBe('Shuckle');
  });

  it('should have the expected structure for STATIC_NPC_TRADE_DATA', () => {
    expect(STATIC_NPC_TRADE_DATA).toBeDefined();
    expect(Array.isArray(STATIC_NPC_TRADE_DATA)).toBe(true);
    expect(STATIC_NPC_TRADE_DATA.length).toBeGreaterThan(0);

    // Check for specific trades
    const onixTrade = STATIC_NPC_TRADE_DATA.find(t => t.receivedId === 95);
    expect(onixTrade).toBeDefined();
    expect(onixTrade?.offeredId).toBe(69); // Bellsprout
    expect(onixTrade?.receivedOtName).toBe('ROCKY');

    const machopTrade = STATIC_NPC_TRADE_DATA.find(t => t.receivedId === 66);
    expect(machopTrade).toBeDefined();
    expect(machopTrade?.offeredId).toBe(96); // Drowzee
    expect(machopTrade?.receivedOtName).toBe('MUSCLE');
  });
});
