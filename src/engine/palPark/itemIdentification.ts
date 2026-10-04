// Pokeballs
const ITEM_MASTER_BALL = 1;

// Hold items / battle items
const ITEM_LEFTOVERS = 200;
const ITEM_LUCKY_EGG = 197;
const ITEM_EXP_SHARE = 182;
const ITEM_AMULET_COIN = 189;
const ITEM_SOUL_DEW = 191;
const ITEM_CHOICE_BAND = 186;
const ITEM_FOCUS_BAND = 196;
const ITEM_MACHO_BRACE = 181;

// Consumables / stat boosters
const ITEM_RARE_CANDY = 68;
const ITEM_PP_UP = 69;
const ITEM_PP_MAX = 71;
const ITEM_HP_UP = 63;
const ITEM_PROTEIN = 64;
const ITEM_IRON = 65;
const ITEM_CARBOS = 66;
const ITEM_CALCIUM = 67;
const ITEM_ZINC = 70;

// Evolution/revival/rare items
const ITEM_HEART_SCALE = 111;
const ITEM_SACRED_ASH = 45;

// Fossils
const ITEM_HELIX_FOSSIL = 357;
const ITEM_DOME_FOSSIL = 358;
const ITEM_OLD_AMBER = 354;
const ITEM_ROOT_FOSSIL = 286;
const ITEM_CLAW_FOSSIL = 287;

// Rare Berries
const ITEM_LIECHI_BERRY = 168;
const ITEM_GANLON_BERRY = 169;
const ITEM_SALAC_BERRY = 170;
const ITEM_PETAYA_BERRY = 171;
const ITEM_APICOT_BERRY = 172;
const ITEM_LANSAT_BERRY = 173;
const ITEM_STARF_BERRY = 174;
const ITEM_ENIGMA_BERRY = 175;

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
