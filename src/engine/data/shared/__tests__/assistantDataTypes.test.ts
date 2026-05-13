import { describe, expect, it } from 'vitest';
import type { NpcTradeEntry } from '../assistantDataTypes';

describe('Shared Assistant Data Types', () => {
  it('should allow defining objects that conform to the NpcTradeEntry interface', () => {
    const validTrade: NpcTradeEntry = {
      receivedId: 1,
      offeredId: 2,
      location: 'Test Location',
      receivedOtName: 'TESTER',
      gen: 1,
    };

    expect(validTrade.receivedId).toBe(1);
    expect(validTrade.offeredId).toBe(2);
    expect(validTrade.location).toBe('Test Location');
    expect(validTrade.receivedOtName).toBe('TESTER');
    expect(validTrade.gen).toBe(1);
  });
});
