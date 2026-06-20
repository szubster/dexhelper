export interface PokemonWithMetadata {
  id: string; // Unique identifier for the specific pokemon instance
  speciesId: number;
  gender: 'Male' | 'Female' | 'Genderless';
  eggGroups: string[];
  isShinyCarrier?: boolean;
  isShiny?: boolean;
}

export interface BreedingPair {
  parentA: PokemonWithMetadata;
  parentB: PokemonWithMetadata;
  score: number; // Prioritize by Shiny Carrier status
}

export function calculateBreedingPairs(pokemonList: PokemonWithMetadata[]): BreedingPair[] {
  const pairs: BreedingPair[] = [];

  for (let i = 0; i < pokemonList.length; i++) {
    for (let j = i + 1; j < pokemonList.length; j++) {
      const p1 = pokemonList[i];
      const p2 = pokemonList[j];

      if (isValidPair(p1, p2)) {
        let score = 0;
        if (p1.isShinyCarrier || p1.isShiny) score += 1;
        if (p2.isShinyCarrier || p2.isShiny) score += 1;
        pairs.push({
          parentA: p1,
          parentB: p2,
          score
        });
      }
    }
  }

  return pairs.sort((a, b) => b.score - a.score);
}

function isValidPair(p1: PokemonWithMetadata, p2: PokemonWithMetadata): boolean {
  if (p1.speciesId === p2.speciesId && p1.id === p2.id) return false;

  const hasNoEggs = p1.eggGroups.includes('No Eggs') || p2.eggGroups.includes('No Eggs');
  if (hasNoEggs) return false;

  const p1IsDitto = p1.eggGroups.includes('Ditto');
  const p2IsDitto = p2.eggGroups.includes('Ditto');

  // Two dittos can't breed with each other, right? Let's check Pokemon breeding rules.
  // Wait, in Gen 2 two Dittos CAN breed, yielding a Ditto. But usually "Two Dittos cannot breed". Let's assume standard rules: Two Dittos CANNOT breed.
  if (p1IsDitto && p2IsDitto) return false;

  if (p1IsDitto || p2IsDitto) return true;

  if (p1.gender === 'Genderless' || p2.gender === 'Genderless') return false;
  if (p1.gender === p2.gender) return false;

  return p1.eggGroups.some(group => p2.eggGroups.includes(group));
}
