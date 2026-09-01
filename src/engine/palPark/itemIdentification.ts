/**
 * A list of high-value Gen 3 internal item IDs to highlight during Pal Park migration.
 * Includes rare items like Master Ball, Leftovers, EV items, rare berries, and fossils.
 */
export const PAL_PARK_HIGH_VALUE_ITEMS: number[] = [
  // Pokeballs
  1, // Master Ball

  // Hold items / battle items
  200, // Leftovers
  197, // Lucky Egg
  182, // Exp. Share
  189, // Amulet Coin
  191, // Soul Dew
  186, // Choice Band
  196, // Focus Band
  181, // Macho Brace

  // Consumables / stat boosters
  68, // Rare Candy
  69, // PP Up
  71, // PP Max
  63, // HP Up
  64, // Protein
  65, // Iron
  66, // Carbos
  67, // Calcium
  70, // Zinc

  // Evolution/revival/rare items
  111, // Heart Scale
  45, // Sacred Ash

  // Fossils
  357, // Helix Fossil
  358, // Dome Fossil
  354, // Old Amber
  286, // Root Fossil
  287, // Claw Fossil

  // Rare Berries
  168, // Liechi Berry
  169, // Ganlon Berry
  170, // Salac Berry
  171, // Petaya Berry
  172, // Apicot Berry
  173, // Lansat Berry
  174, // Starf Berry
  175, // Enigma Berry
];

export const PAL_PARK_HIGH_VALUE_ITEM_NAMES: Record<number, string> = {
  // Pokeballs
  1: 'Master Ball',

  // Hold items / battle items
  200: 'Leftovers',
  197: 'Lucky Egg',
  182: 'Exp. Share',
  189: 'Amulet Coin',
  191: 'Soul Dew',
  186: 'Choice Band',
  196: 'Focus Band',
  181: 'Macho Brace',

  // Consumables / stat boosters
  68: 'Rare Candy',
  69: 'PP Up',
  71: 'PP Max',
  63: 'HP Up',
  64: 'Protein',
  65: 'Iron',
  66: 'Carbos',
  67: 'Calcium',
  70: 'Zinc',

  // Evolution/revival/rare items
  111: 'Heart Scale',
  45: 'Sacred Ash',

  // Fossils
  357: 'Helix Fossil',
  358: 'Dome Fossil',
  354: 'Old Amber',
  286: 'Root Fossil',
  287: 'Claw Fossil',

  // Rare Berries
  168: 'Liechi Berry',
  169: 'Ganlon Berry',
  170: 'Salac Berry',
  171: 'Petaya Berry',
  172: 'Apicot Berry',
  173: 'Lansat Berry',
  174: 'Starf Berry',
  175: 'Enigma Berry',
};

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
