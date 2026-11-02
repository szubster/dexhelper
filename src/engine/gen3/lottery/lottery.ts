import type { PokemonInstance, SaveData } from '../../saveParser/parsers/common';

export const GEN3_TRAINER_ID_MASK = 0xffff;

export const LOTTERY_MAX_DIGITS = 5;
export const LOTTERY_MAX_MATCHES = 5;
export const LOTTERY_PAD_CHAR = '0';

export const LOTTERY_TIER_NO_MATCH = 0;
export const LOTTERY_TIER_FIRST_PRIZE = 1;
export const LOTTERY_TIER_SECOND_PRIZE = 2;
export const LOTTERY_TIER_THIRD_PRIZE = 3;
export const LOTTERY_TIER_FOURTH_PRIZE = 4;

export type LotteryTier =
  | typeof LOTTERY_TIER_NO_MATCH
  | typeof LOTTERY_TIER_FIRST_PRIZE
  | typeof LOTTERY_TIER_SECOND_PRIZE
  | typeof LOTTERY_TIER_THIRD_PRIZE
  | typeof LOTTERY_TIER_FOURTH_PRIZE;

export const MATCH_COUNT_TO_TIER: Record<number, LotteryTier> = {
  5: LOTTERY_TIER_FIRST_PRIZE,
  4: LOTTERY_TIER_SECOND_PRIZE,
  3: LOTTERY_TIER_THIRD_PRIZE,
  2: LOTTERY_TIER_FOURTH_PRIZE,
};

export interface LotteryResult {
  tier: LotteryTier;
  winningPokemon: PokemonInstance | null;
}

export function calculateLotteryTier(otId: number, winningNumber: number): LotteryTier {
  const otIdStr = otId.toString().padStart(LOTTERY_MAX_DIGITS, LOTTERY_PAD_CHAR);
  const winningNumberStr = winningNumber.toString().padStart(LOTTERY_MAX_DIGITS, LOTTERY_PAD_CHAR);

  let matches = 0;
  for (let i = LOTTERY_MAX_DIGITS - 1; i >= 0; i--) {
    if (otIdStr[i] === winningNumberStr[i]) {
      matches++;
    } else {
      break;
    }
  }

  return MATCH_COUNT_TO_TIER[matches] ?? LOTTERY_TIER_NO_MATCH;
}

export function getBestLotteryMatch(pokemonList: PokemonInstance[], winningNumber: number): LotteryResult {
  let bestTier: LotteryTier = LOTTERY_TIER_NO_MATCH;
  let bestPokemon = null;

  for (const pokemon of pokemonList) {
    if (pokemon.otId === undefined) continue;

    // Use only the lower 16 bits of the OT ID, which represents the Trainer ID.
    // The upper 16 bits (Secret ID) are not used for lottery matching.
    const trainerId = pokemon.otId & GEN3_TRAINER_ID_MASK;

    const tier = calculateLotteryTier(trainerId, winningNumber);
    if (tier !== LOTTERY_TIER_NO_MATCH && (bestTier === LOTTERY_TIER_NO_MATCH || tier < bestTier)) {
      // tier 1 is best, tier 4 is worst
      bestTier = tier;
      bestPokemon = pokemon;
      if (bestTier === LOTTERY_TIER_FIRST_PRIZE) {
        break; // Found the best possible match
      }
    }
  }

  return { tier: bestTier, winningPokemon: bestPokemon };
}

export function checkSaveDataForLottery(saveData: SaveData, winningNumber: number): LotteryResult {
  const pokemonList = [...saveData.partyDetails, ...saveData.pcDetails];
  return getBestLotteryMatch(pokemonList, winningNumber);
}
