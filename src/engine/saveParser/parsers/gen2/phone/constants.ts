export type CallerType = 'SWARM' | 'ITEM' | 'TRAINER' | 'STORY' | 'NONE';

export interface HighValueContact {
  id: number;
  name: string;
  type: CallerType;
  details?: string;
}

// Module-level constants for phone contact IDs
export const GEN2_CONTACT_RALPH = 17;
const GEN2_CONTACT_ANTHONY = 19;
const GEN2_CONTACT_ARNIE = 23;
const GEN2_CONTACT_CHAD = 27;

const GEN2_CONTACT_BEVERLY = 6;
const GEN2_CONTACT_JOSE = 13;
const GEN2_CONTACT_WADE = 16;
const GEN2_CONTACT_TODD = 20;
export const GEN2_CONTACT_GINA = 21;
const GEN2_CONTACT_ALAN = 24;
const GEN2_CONTACT_DANA = 26;
export const GEN2_CONTACT_TULLY = 29;
const GEN2_CONTACT_TIFFANY = 31;
const GEN2_CONTACT_WILTON = 33;
const GEN2_CONTACT_KENJI = 34;

export const GEN2_PHONE_CALLER_REGISTRY: Record<number, Omit<HighValueContact, 'id'>> = {
  // Swarm callers
  [GEN2_CONTACT_RALPH]: { name: 'Fisher Ralph', type: 'SWARM', details: 'Qwilfish' },
  [GEN2_CONTACT_ANTHONY]: { name: 'Hiker Anthony', type: 'SWARM', details: 'Dunsparce' },
  [GEN2_CONTACT_ARNIE]: { name: 'Bug Catcher Arnie', type: 'SWARM', details: 'Yanma' },
  [GEN2_CONTACT_CHAD]: { name: 'Schoolboy Chad', type: 'SWARM', details: 'Snubbull' },

  // Item callers
  [GEN2_CONTACT_BEVERLY]: { name: 'Pokefan Beverly', type: 'ITEM', details: 'Nugget' },
  [GEN2_CONTACT_JOSE]: { name: 'Bird Keeper Jose', type: 'ITEM', details: 'Star Piece' },
  [GEN2_CONTACT_WADE]: { name: 'Bug Catcher Wade', type: 'ITEM', details: 'Berry / Berry Juice' },
  [GEN2_CONTACT_TODD]: { name: 'Camper Todd', type: 'ITEM', details: 'HP Up' },
  [GEN2_CONTACT_GINA]: { name: 'Picnicker Gina', type: 'ITEM', details: 'Leaf Stone' },
  [GEN2_CONTACT_ALAN]: { name: 'Schoolboy Alan', type: 'ITEM', details: 'Fire Stone' },
  [GEN2_CONTACT_DANA]: { name: 'Lass Dana', type: 'ITEM', details: 'Thunderstone' },
  [GEN2_CONTACT_TULLY]: { name: 'Fisher Tully', type: 'ITEM', details: 'Water Stone' },
  [GEN2_CONTACT_TIFFANY]: { name: 'Picnicker Tiffany', type: 'ITEM', details: 'Pink Bow' },
  [GEN2_CONTACT_WILTON]: { name: 'Fisher Wilton', type: 'ITEM', details: 'Poke Ball / Great Ball / Ultra Ball' },
  [GEN2_CONTACT_KENJI]: { name: 'Blackbelt Kenji', type: 'ITEM', details: 'PP Up' },
};
