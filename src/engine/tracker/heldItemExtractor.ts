import type { SaveData } from '../saveParser/parsers/common';

export function extractHeldItems(saveData: SaveData): number[] {
  const heldItems = new Set<number>();

  // Extract from party
  if (saveData.partyDetails) {
    saveData.partyDetails.forEach((pokemon) => {
      if (pokemon?.item && pokemon.item > 0) {
        heldItems.add(pokemon.item);
      }
    });
  }

  // Extract from PC boxes
  if (saveData.pcDetails) {
    saveData.pcDetails.forEach((pokemon) => {
      if (pokemon?.item && pokemon.item > 0) {
        heldItems.add(pokemon.item);
      }
    });
  }

  return Array.from(heldItems).sort((a, b) => a - b);
}
