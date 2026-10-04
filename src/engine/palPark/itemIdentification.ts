// Pokeballs
export const ITEM_MASTER_BALL = 1;

// Hold items / battle items
export const ITEM_LEFTOVERS = 200;
export const ITEM_LUCKY_EGG = 197;
export const ITEM_EXP_SHARE = 182;
export const ITEM_AMULET_COIN = 189;
export const ITEM_SOUL_DEW = 191;
export const ITEM_CHOICE_BAND = 186;
export const ITEM_FOCUS_BAND = 196;
export const ITEM_MACHO_BRACE = 181;

// Consumables / stat boosters
export const ITEM_RARE_CANDY = 68;
export const ITEM_PP_UP = 69;
export const ITEM_PP_MAX = 71;
export const ITEM_HP_UP = 63;
export const ITEM_PROTEIN = 64;
export const ITEM_IRON = 65;
export const ITEM_CARBOS = 66;
export const ITEM_CALCIUM = 67;
export const ITEM_ZINC = 70;

// Evolution/revival/rare items
export const ITEM_HEART_SCALE = 111;
export const ITEM_SACRED_ASH = 45;

// Fossils
export const ITEM_HELIX_FOSSIL = 357;
export const ITEM_DOME_FOSSIL = 358;
export const ITEM_OLD_AMBER = 354;
export const ITEM_ROOT_FOSSIL = 286;
export const ITEM_CLAW_FOSSIL = 287;

// Rare Berries
export const ITEM_LIECHI_BERRY = 168;
export const ITEM_GANLON_BERRY = 169;
export const ITEM_SALAC_BERRY = 170;
export const ITEM_PETAYA_BERRY = 171;
export const ITEM_APICOT_BERRY = 172;
export const ITEM_LANSAT_BERRY = 173;
export const ITEM_STARF_BERRY = 174;
export const ITEM_ENIGMA_BERRY = 175;

export const PAL_PARK_HIGH_VALUE_ITEM_NAMES: Record<number, string> = {
  // Pokeballs
  [ITEM_MASTER_BALL]: 'Master Ball',

  // Hold items / battle items
  [ITEM_LEFTOVERS]: 'Leftovers',
  [ITEM_LUCKY_EGG]: 'Lucky Egg',
  [ITEM_EXP_SHARE]: 'Exp. Share',
  [ITEM_AMULET_COIN]: 'Amulet Coin',
  [ITEM_SOUL_DEW]: 'Soul Dew',
  [ITEM_CHOICE_BAND]: 'Choice Band',
  [ITEM_FOCUS_BAND]: 'Focus Band',
  [ITEM_MACHO_BRACE]: 'Macho Brace',

  // Consumables / stat boosters
  [ITEM_RARE_CANDY]: 'Rare Candy',
  [ITEM_PP_UP]: 'PP Up',
  [ITEM_PP_MAX]: 'PP Max',
  [ITEM_HP_UP]: 'HP Up',
  [ITEM_PROTEIN]: 'Protein',
  [ITEM_IRON]: 'Iron',
  [ITEM_CARBOS]: 'Carbos',
  [ITEM_CALCIUM]: 'Calcium',
  [ITEM_ZINC]: 'Zinc',

  // Evolution/revival/rare items
  [ITEM_HEART_SCALE]: 'Heart Scale',
  [ITEM_SACRED_ASH]: 'Sacred Ash',

  // Fossils
  [ITEM_HELIX_FOSSIL]: 'Helix Fossil',
  [ITEM_DOME_FOSSIL]: 'Dome Fossil',
  [ITEM_OLD_AMBER]: 'Old Amber',
  [ITEM_ROOT_FOSSIL]: 'Root Fossil',
  [ITEM_CLAW_FOSSIL]: 'Claw Fossil',

  // Rare Berries
  [ITEM_LIECHI_BERRY]: 'Liechi Berry',
  [ITEM_GANLON_BERRY]: 'Ganlon Berry',
  [ITEM_SALAC_BERRY]: 'Salac Berry',
  [ITEM_PETAYA_BERRY]: 'Petaya Berry',
  [ITEM_APICOT_BERRY]: 'Apicot Berry',
  [ITEM_LANSAT_BERRY]: 'Lansat Berry',
  [ITEM_STARF_BERRY]: 'Starf Berry',
  [ITEM_ENIGMA_BERRY]: 'Enigma Berry',
};

/**
 * A list of high-value Gen 3 internal item IDs to highlight during Pal Park migration.
 * Includes rare items like Master Ball, Leftovers, EV items, rare berries, and fossils.
 * Dynamically derived from PAL_PARK_HIGH_VALUE_ITEM_NAMES to ensure a single source of truth.
 */
export const PAL_PARK_HIGH_VALUE_ITEMS: number[] = Object.keys(PAL_PARK_HIGH_VALUE_ITEM_NAMES).map((id) =>
  parseInt(id, 10),
);

/**
 * Checks if a given held item ID is considered a high-value item for Pal Park migration.
 * @param heldItemId - The internal Gen 3 item ID.
 * @returns An object containing a boolean indicating if it's high value, and optionally the item's name.
 */
export function identifyHighValueHeldItem(heldItemId: number): { isHighValue: boolean; itemName?: string } {
  const isHighValue = PAL_PARK_HIGH_VALUE_ITEMS.includes(heldItemId);
  if (isHighValue) {
    const itemName = PAL_PARK_HIGH_VALUE_ITEM_NAMES[heldItemId];
    if (itemName !== undefined) {
      return { isHighValue: true, itemName };
    }
    return { isHighValue: true };
  }
  return { isHighValue: false };
}
