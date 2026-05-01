const GEN2_VERSION_EXCLUSIVES: Record<string, number[]> = {
  gold: [
    56,
    57,
    58,
    59, // Mankey, Primeape, Growlithe, Arcanine
    167,
    168, // Spinarak, Ariados
    226, // Mantine
    207, // Gligar
    216,
    217, // Teddiursa, Ursaring
  ],
  silver: [
    37,
    38, // Vulpix, Ninetales
    52,
    53, // Meowth, Persian
    165,
    166, // Ledyba, Ledian
    225, // Delibird
    227, // Skarmory
    231,
    232, // Phanpy, Donphan
  ],
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
