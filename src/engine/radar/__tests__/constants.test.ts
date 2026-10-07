import { describe, expect, it } from 'vitest';
import { ITEM_GATING_REQUIREMENTS } from '../constants';

describe('ITEM_GATING_REQUIREMENTS', () => {
  it('should define route 119 items requiring acro bike', () => {
    expect(ITEM_GATING_REQUIREMENTS['route_119_items']).toEqual({
      type: 'bike',
      bikeType: 'acro',
    });
  });

  it('should define abandoned ship tm13 requiring dive and storage key', () => {
    expect(ITEM_GATING_REQUIREMENTS['abandoned_ship_tm13']).toEqual({
      type: 'logical',
      operator: 'AND',
      requirements: [
        {
          type: 'hm',
          hmId: 'dive',
        },
        {
          type: 'item',
          itemId: 'storage_key',
        },
      ],
    });
  });
});
