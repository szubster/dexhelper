export interface LotteryPokemon {
  otId: number;
}

export interface LotteryResult {
  tier: 0 | 1 | 2 | 3 | 4;
  winningPokemon: LotteryPokemon | null; // Replace any with appropriate Pokemon type
}

export function calculateLotteryTier(otId: number, winningNumber: number): 0 | 1 | 2 | 3 | 4 {
  const otIdStr = otId.toString().padStart(5, '0');
  const winningNumberStr = winningNumber.toString().padStart(5, '0');

  let matches = 0;
  for (let i = 4; i >= 0; i--) {
    if (otIdStr[i] === winningNumberStr[i]) {
      matches++;
    } else {
      break;
    }
  }

  if (matches === 5) return 1;
  if (matches === 4) return 2;
  if (matches === 3) return 3;
  if (matches === 2) return 4;
  return 0;
}

export function getBestLotteryMatch(pokemonList: LotteryPokemon[], winningNumber: number): LotteryResult {
  let bestTier: 0 | 1 | 2 | 3 | 4 = 0;
  let bestPokemon = null;

  for (const pokemon of pokemonList) {
    const tier = calculateLotteryTier(pokemon.otId, winningNumber);
    if (tier !== 0 && (bestTier === 0 || tier < bestTier)) {
      // tier 1 is best, tier 4 is worst
      bestTier = tier;
      bestPokemon = pokemon;
      if (bestTier === 1) {
        break; // Found the best possible match
      }
    }
  }

  return { tier: bestTier, winningPokemon: bestPokemon };
}
