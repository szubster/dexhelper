const GEN2_VERSION_EXCLUSIVES: Record<string, number[]> = {
  gold: [
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
  silver: [
    56,
    57, // Mankey, Primeape
    58,
    59, // Growlithe, Arcanine
    167,
    168, // Spinarak, Ariados
    207, // Gligar
    216,
    217, // Teddiursa, Ursaring
    226, // Mantine
  ],
  crystal: [
    37,
    38, // Vulpix, Ninetales
    56,
    57, // Mankey, Primeape
    179,
    180,
    181, // Mareep, Flaaffy, Ampharos
    203, // Girafarig
    223,
    224, // Remoraid, Octillery
  ],
};

export function getUnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  _ownedCount: number, // Total current caught count
  ownedSet: Set<number>,
): string | null {
  const exclusives = GEN2_VERSION_EXCLUSIVES[gameVersion] || [];
  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  return null;
}
