// One-time static choices in Gen 2
export const ONE_TIME_CHOICES = {
  starters: [152, 155, 158], // Chikorita, Cyndaquil, Totodile
  eevee: [133], // Bill gives an Eevee
  tyrogue: [236], // Dojo gives Tyrogue
  shuckle: [213], // Mania gives Shuckle
  spearow: [21], // Kenya the Spearow
};

const GEN2_VERSION_EXCLUSIVES: Record<string, number[]> = {
  // Lists of Pokemon MISSING from each version
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
    13,
    14,
    15, // Weedle, Kakuna, Beedrill
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
  _ownedCount: number,
  ownedSet: Set<number>,
): string | null {
  // Gen 2 allows breeding, so missing a pre-evolution doesn't lock you out if you have the evolution.
  // The only truly mutually exclusive choices are the starters.
  const hasFamily = (base: number, evos: number[]) => {
    return ownedSet.has(base) || evos.some((e) => ownedSet.has(e));
  };

  const isStarter = (id: number) => [152, 153, 154, 155, 156, 157, 158, 159, 160].includes(id);

  if (isStarter(pokemonId) && !ownedSet.has(pokemonId)) {
    const hasChikorita = hasFamily(152, [153, 154]);
    const hasCyndaquil = hasFamily(155, [156, 157]);
    const hasTotodile = hasFamily(158, [159, 160]);

    let requestedFamily = '';
    if ([152, 153, 154].includes(pokemonId)) requestedFamily = 'chikorita';
    else if ([155, 156, 157].includes(pokemonId)) requestedFamily = 'cyndaquil';
    else if ([158, 159, 160].includes(pokemonId)) requestedFamily = 'totodile';

    if (requestedFamily === 'chikorita' && !hasChikorita && (hasCyndaquil || hasTotodile)) {
      return `You chose a different Johto starter. Must trade for this one.`;
    }
    if (requestedFamily === 'cyndaquil' && !hasCyndaquil && (hasChikorita || hasTotodile)) {
      return `You chose a different Johto starter. Must trade for this one.`;
    }
    if (requestedFamily === 'totodile' && !hasTotodile && (hasChikorita || hasCyndaquil)) {
      return `You chose a different Johto starter. Must trade for this one.`;
    }
  }

  // Version Exclusives
  const exclusives = GEN2_VERSION_EXCLUSIVES[gameVersion] || [];
  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  // Gen 1 starters, fossils, and legendaries are unobtainable in Gen 2 without trading
  const gen1Missing = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9, // Starters
    138,
    139,
    140,
    141, // Fossils
    144,
    145,
    146, // Birds
    150,
    151, // Mewtwo, Mew
  ];
  if (gen1Missing.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `Not found in Johto or Kanto in Generation 2. Must be traded from Generation 1 via Time Capsule.`;
  }

  // Celebi
  if (pokemonId === 251 && !ownedSet.has(pokemonId) && gameVersion !== 'crystal') {
    return `Celebi is only obtainable in the Virtual Console release of Pokémon Crystal.`;
  }

  return null;
}
