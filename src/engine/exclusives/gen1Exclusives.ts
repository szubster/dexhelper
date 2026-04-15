// One-time static choices (if you miss the pre-evolution without breeding, you're locked out)
export const ONE_TIME_CHOICES = {
  starters: [1, 4, 7], // Bulbasaur, Charmander, Squirtle families
  fossils: [138, 140], // Omanyte, Kabuto
  hitmons: [106, 107], // Hitmonlee, Hitmonchan
  eevee: [133],
};

const GEN1_VERSION_EXCLUSIVES: Record<string, number[]> = {
  red: [
    23,
    24, // Ekans, Arbok
    43,
    44,
    45, // Oddish, Gloom, Vileplume
    56,
    57, // Mankey, Primeape
    58,
    59, // Growlithe, Arcanine
    123, // Scyther
    125, // Electabuzz
  ],
  blue: [
    27,
    28, // Sandshrew, Sandslash
    37,
    38, // Vulpix, Ninetales
    52,
    53, // Meowth, Persian
    69,
    70,
    71, // Bellsprout, Weepinbell, Victreebel
    126, // Magmar
    127, // Pinsir
  ],
  yellow: [
    13,
    14,
    15, // Weedle, Kakuna, Beedrill
    23,
    24, // Ekans, Arbok
    27,
    28, // Sandshrew, Sandslash
    52,
    53, // Meowth, Persian
    109,
    110, // Koffing, Weezing
    124, // Jynx
    126, // Magmar
    127, // Pinsir
  ],
};

export function getUnobtainableReason(
  pokemonId: number,
  gameVersion: string,
  _ownedCount: number, // Total current caught count
  ownedSet: Set<number>,
): string | null {
  // Yellow specific - Raichu
  if (gameVersion === 'yellow' && pokemonId === 26 && !ownedSet.has(26)) {
    return `Starter Pikachu refuses Thunder Stone. Must be traded.`;
  }

  // In Gen 1, you cannot breed. If you evolved your ONLY Bulbasaur into Ivysaur, you can NEVER get Bulbasaur again.
  // We check this: if evaluating a base stage of a one-time choice, and we own an evolution, but NOT the base stage.
  // E.g., evaluate Charmander (4). Owned: Charmeleon (5). Charmander NOT owned. -> Locked.

  const checkLineLock = (base: number, evos: number[]) => {
    if (pokemonId === base && !ownedSet.has(base) && evos.some((e) => ownedSet.has(e))) {
      return `Pre-evolution missed. In Generation 1, you must trade to replace evolved one-time Pokémon.`;
    }
    // Also, if you picked the OTHER choice, you can't get this one.
    // For hitmons: If evaluating 106, and you own 107 but not 106, it's locked.
    // Actually, fossils and hitmons are mutually exclusive choices.
    return null;
  };

  const lockObj =
    checkLineLock(1, [2, 3]) ||
    checkLineLock(4, [5, 6]) ||
    checkLineLock(7, [8, 9]) ||
    checkLineLock(133, [134, 135, 136]);
  if (lockObj) return lockObj;

  // Mutually exclusive static choices
  const isHitmon = (id: number) => id === 106 || id === 107;
  if (isHitmon(pokemonId) && !ownedSet.has(pokemonId)) {
    const otherHitmon = pokemonId === 106 ? 107 : 106;
    if (ownedSet.has(otherHitmon)) {
      return `You chose the other Dojo Pokémon. Must trade for this one.`;
    }
  }

  const isFossil = (id: number) => id === 138 || id === 139 || id === 140 || id === 141; // Omanyte/star, Kabuto/tops
  if (isFossil(pokemonId) && !ownedSet.has(pokemonId)) {
    const otherFossilBase = pokemonId === 138 || pokemonId === 139 ? 140 : 138;
    const otherFossilEvo = pokemonId === 138 || pokemonId === 139 ? 141 : 139;
    if (ownedSet.has(otherFossilBase) || ownedSet.has(otherFossilEvo)) {
      return `You chose the other Fossil at Mt. Moon. Must trade for this one.`;
    }
  }

  // Version Exclusives
  const exclusives = GEN1_VERSION_EXCLUSIVES[gameVersion] || [];
  if (exclusives.includes(pokemonId) && !ownedSet.has(pokemonId)) {
    return `This Pokémon is not available in ${gameVersion.charAt(0).toUpperCase() + gameVersion.slice(1)}. Must be traded from another version.`;
  }

  return null;
}
