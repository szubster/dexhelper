export const GEN2_VERSION_EXCLUSIVES: Record<string, number[]> = {
  gold: [37, 38, 52, 53, 165, 166, 225, 227, 231, 232],
  silver: [56, 57, 58, 59, 167, 168, 207, 216, 217, 226],
  crystal: [37, 38, 56, 57, 179, 180, 181, 203, 223, 224],
};

export function getGen2UnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  _ownedCount: number,
  ownedSet: Set<number>,
): string | null {
  const exclusives = GEN2_VERSION_EXCLUSIVES[gameVersion] || [];

  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  return null;
}
