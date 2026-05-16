export const GEN2_VERSION_EXCLUSIVES: Record<string, number[]> = {
  gold: [56, 57, 58, 59, 167, 168, 207, 216, 217, 226],
  silver: [37, 38, 52, 53, 165, 166, 225, 227, 231, 232],
  crystal: [37, 38, 56, 57, 179, 180, 181, 203, 223, 224],
};

export function getGen2UnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  _ownedCount: number,
  ownedSet: Set<number>,
): string | null {
  // Version Exclusives
  const exclusives =
    gameVersion === 'crystal'
      ? // biome-ignore lint/complexity/useLiteralKeys: TypeScript requires bracket notation for index signatures
        GEN2_VERSION_EXCLUSIVES['crystal'] || []
      : GEN2_VERSION_EXCLUSIVES[gameVersion === 'silver' ? 'gold' : 'silver'] || [];

  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  return null;
}
