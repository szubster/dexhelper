// Following Gen 1 and 2 patterns, these lists represent Pokémon that are UNOBTAINABLE in the key's version.
export const GEN3_VERSION_EXCLUSIVES: Record<string, number[]> = {
  // Ruby missing (Sapphire exclusives)
  ruby: [270, 271, 272, 302, 336, 337, 380, 382],
  // Sapphire missing (Ruby exclusives)
  sapphire: [273, 274, 275, 303, 335, 338, 381, 383],
  // Emerald missing
  emerald: [283, 284, 307, 308, 315, 335, 337],
  // FireRed missing (LeafGreen exclusives)
  firered: [27, 28, 37, 38, 69, 70, 71, 79, 80, 120, 121, 126, 127, 183, 184, 199, 200, 215, 223, 224, 226, 240, 298],
  // LeafGreen missing (FireRed exclusives)
  leafgreen: [23, 24, 43, 44, 45, 54, 55, 58, 59, 90, 91, 123, 125, 182, 194, 195, 198, 211, 212, 225, 227, 239],
};

export function getGen3UnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  _ownedCount: number,
  ownedSet: Set<number>,
): string | null {
  const exclusives = GEN3_VERSION_EXCLUSIVES[gameVersion] || [];

  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  return null;
}
