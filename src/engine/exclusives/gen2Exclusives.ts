export const goldExclusives = [10, 11, 12, 27, 28, 56, 57, 58, 59, 167, 168, 207, 216, 217, 226];
export const silverExclusives = [13, 14, 15, 23, 24, 37, 38, 52, 53, 165, 166, 225, 227, 231, 232];

export const GEN2_VERSION_EXCLUSIVES: Record<string, number[]> = {
  gold: goldExclusives,
  silver: silverExclusives,
};

export function getGen2UnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  _ownedCount: number,
  ownedSet: Set<number>,
): string | null {
  // Version Exclusives
  const exclusives =
    GEN2_VERSION_EXCLUSIVES[gameVersion === 'silver' ? 'gold' : gameVersion === 'gold' ? 'silver' : gameVersion] || [];
  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  return null;
}
