// Following Gen 1 and 2 patterns, these lists represent Pokémon that are UNOBTAINABLE in the key's version.
export const GEN3_VERSION_EXCLUSIVES: Record<string, number[]> = {
  // Ruby missing (Sapphire exclusives)
  ruby: [270, 271, 272, 302, 336, 337, 382],
  // Sapphire missing (Ruby exclusives)
  sapphire: [273, 274, 275, 303, 335, 338, 383],
  // Emerald missing (Surskit, Masquerain, Meditite, Medicham, Roselia, Zangoose, Lunatone)
  emerald: [283, 284, 307, 308, 315, 335, 337],
  // FireRed missing (LeafGreen exclusives)
  firered: [27, 28, 37, 38, 69, 70, 71, 79, 80, 199, 120, 121, 126, 127, 183, 184, 298],
  // LeafGreen missing (FireRed exclusives)
  leafgreen: [23, 24, 43, 44, 45, 182, 54, 55, 58, 59, 66, 67, 68, 90, 91, 125, 123, 212, 238, 239, 240],
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
