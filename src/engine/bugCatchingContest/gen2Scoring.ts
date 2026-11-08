export interface Gen2PokemonStats {
  maxHp: number;
  currentHp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  ivs: {
    attack: number;
    defense: number;
    speed: number;
    special: number;
  };
  heldItem: boolean;
  isShiny?: boolean;
}

export function calculateGen2BugCatchingScore(pokemon: Gen2PokemonStats): number {
  let score = 0;

  // 4 * Max HP
  score += 4 * pokemon.maxHp;

  // Sum of the Pokémon's other stats
  score += pokemon.attack + pokemon.defense + pokemon.specialAttack + pokemon.specialDefense + pokemon.speed;

  // IV Bonus
  if (pokemon.isShiny) {
    score += 29;
  } else {
    let ivBonus = 0;
    if (Math.floor(pokemon.ivs.defense / 2) % 2 !== 0) ivBonus += 16;
    if (Math.floor(pokemon.ivs.attack / 2) % 2 !== 0) ivBonus += 8;
    if (Math.floor(pokemon.ivs.special / 2) % 2 !== 0) ivBonus += 4;
    if (Math.floor(pokemon.ivs.speed / 2) % 2 !== 0) ivBonus += 1;
    score += ivBonus;
  }

  // Current HP / 8
  score += Math.floor(pokemon.currentHp / 8);

  // Held Item
  if (pokemon.heldItem) {
    score += 1;
  }

  return score;
}
