/**
 * Constants and calculation routines for the Generation 2 Bug-Catching Contest scoring algorithm.
 *
 * In Generation 2 (Gold, Silver, Crystal), the Bug-Catching Contest score is determined by:
 * - 4x the caught Pokémon's maximum HP
 * - The sum of other stats (Attack, Defense, Special Attack, Special Defense, Speed)
 * - An IV bonus based on whether specific IV bits are odd (or a fixed 29 points if shiny)
 * - 1/8th of current HP (rounded down)
 * - 1 point if the Pokémon is holding an item
 */

export const BUG_CONTEST_MAX_HP_MULTIPLIER = 4;
export const BUG_CONTEST_CURRENT_HP_DIVISOR = 8;
export const BUG_CONTEST_HELD_ITEM_BONUS = 1;
export const BUG_CONTEST_SHINY_IV_BONUS = 29;

export const IV_BONUS_DEFENSE = 16;
export const IV_BONUS_ATTACK = 8;
export const IV_BONUS_SPECIAL = 4;
export const IV_BONUS_SPEED = 1;

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

/**
 * Calculates the IV bonus component for the Bug-Catching Contest score.
 *
 * Shiny Pokémon automatically receive 29 points.
 * Otherwise, each stat adds bonus points if `Math.floor(iv / 2) % 2 !== 0`:
 * - Defense: 16 points
 * - Attack: 8 points
 * - Special: 4 points
 * - Speed: 1 point
 */
export function calculateBugContestIvBonus(ivs: Gen2PokemonStats['ivs'], isShiny?: boolean): number {
  if (isShiny) {
    return BUG_CONTEST_SHINY_IV_BONUS;
  }

  let ivBonus = 0;
  if (Math.floor(ivs.defense / 2) % 2 !== 0) ivBonus += IV_BONUS_DEFENSE;
  if (Math.floor(ivs.attack / 2) % 2 !== 0) ivBonus += IV_BONUS_ATTACK;
  if (Math.floor(ivs.special / 2) % 2 !== 0) ivBonus += IV_BONUS_SPECIAL;
  if (Math.floor(ivs.speed / 2) % 2 !== 0) ivBonus += IV_BONUS_SPEED;

  return ivBonus;
}

/**
 * Calculates the sum of non-HP combat stats (Attack, Defense, Sp. Atk, Sp. Def, Speed).
 */
export function calculateOtherStatsSum(pokemon: Gen2PokemonStats): number {
  return pokemon.attack + pokemon.defense + pokemon.specialAttack + pokemon.specialDefense + pokemon.speed;
}

/**
 * Calculates the overall Bug-Catching Contest score in Generation 2.
 */
export function calculateGen2BugCatchingScore(pokemon: Gen2PokemonStats): number {
  let score = 0;

  // 4 * Max HP
  score += BUG_CONTEST_MAX_HP_MULTIPLIER * pokemon.maxHp;

  // Sum of the Pokémon's other stats
  score += calculateOtherStatsSum(pokemon);

  // IV Bonus
  score += calculateBugContestIvBonus(pokemon.ivs, pokemon.isShiny);

  // Current HP / 8
  score += Math.floor(pokemon.currentHp / BUG_CONTEST_CURRENT_HP_DIVISOR);

  // Held Item
  if (pokemon.heldItem) {
    score += BUG_CONTEST_HELD_ITEM_BONUS;
  }

  return score;
}
