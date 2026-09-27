import type { SaveData } from '../saveParser/parsers/common';

export function extractHeldItems(saveData: SaveData): number[] {
  const heldItems = new Set<number>();

  for (const pokemon of saveData.partyDetails) {
    if (pokemon.item && pokemon.item > 0) {
      heldItems.add(pokemon.item);
    }
  }

  for (const pokemon of saveData.pcDetails) {
    if (pokemon.item && pokemon.item > 0) {
      heldItems.add(pokemon.item);
    }
  }

  return Array.from(heldItems).sort((a, b) => a - b);
}
