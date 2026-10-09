import type { GatingRequirement } from './types';

export const ITEM_GATING_REQUIREMENTS: Record<string, GatingRequirement> = {
  // Example data from prompt
  route_119_items: {
    type: 'bike',
    bikeType: 'acro',
  },
  abandoned_ship_tm13: {
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
  },
};
