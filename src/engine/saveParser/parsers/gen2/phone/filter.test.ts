import { describe, expect, it } from 'vitest';
import { GEN2_CONTACT_GINA, GEN2_CONTACT_RALPH, GEN2_CONTACT_TULLY } from './constants';
import { filterHighValueCalls } from './filter';

describe('filterHighValueCalls', () => {
  it('should return an empty array if phoneList is empty', () => {
    expect(filterHighValueCalls([])).toEqual([]);
  });

  it('should filter out zeroes and unmapped contacts', () => {
    // 0 is unused, 1 is MOM, 2 is OAK (which we haven't mapped as high value)
    const phoneList = [0, 1, 2, 0, 99];
    expect(filterHighValueCalls(phoneList)).toEqual([]);
  });

  it('should correctly identify SWARM and ITEM callers', () => {
    // 17 is Ralph (Swarm), 29 is Tully (Item), 21 is Gina (Item)
    const phoneList = [0, 1, GEN2_CONTACT_RALPH, GEN2_CONTACT_TULLY, 2, GEN2_CONTACT_GINA];
    const result = filterHighValueCalls(phoneList);

    expect(result).toHaveLength(3);

    // Check Ralph (Swarm)
    const ralph = result.find((c) => c.id === GEN2_CONTACT_RALPH);
    expect(ralph).toBeDefined();
    expect(ralph?.name).toBe('Fisher Ralph');
    expect(ralph?.type).toBe('SWARM');
    expect(ralph?.details).toBe('Qwilfish');

    // Check Tully (Item)
    const tully = result.find((c) => c.id === GEN2_CONTACT_TULLY);
    expect(tully).toBeDefined();
    expect(tully?.name).toBe('Fisher Tully');
    expect(tully?.type).toBe('ITEM');
    expect(tully?.details).toBe('Water Stone');

    // Check Gina (Item)
    const gina = result.find((c) => c.id === GEN2_CONTACT_GINA);
    expect(gina).toBeDefined();
    expect(gina?.name).toBe('Picnicker Gina');
    expect(gina?.type).toBe('ITEM');
    expect(gina?.details).toBe('Leaf Stone');
  });
});
