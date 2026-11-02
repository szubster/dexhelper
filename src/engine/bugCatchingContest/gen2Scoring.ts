/**
 * @module bugCatchingContest/gen2Scoring
 *
 * Implements the scoring formula used in Generation 2 (Gold, Silver, and Crystal)
 * Bug-Catching Contest held at the National Park on Tuesdays, Thursdays, and Saturdays.
 *
 * In the original Game Boy Color ROMs (`pokegold-spaceworld` / `pokecrystal`), the contestant's
 * score is calculated upon catching a contest Pokémon using a weighted sum of stats, remaining HP,
 * held item status, and determinant value (DV) bit bonuses.
 */

/**
 * Represents the combat and intrinsic stats of a Pokémon evaluated in the
 * Generation 2 Bug-Catching Contest.
 */
export interface Gen2PokemonStats {
  /** Maximum hit points of the Pokémon. */
  maxHp: number;
  /** Current remaining hit points when caught (affects HP bonus points). */
  currentHp: number;
  /** Attack stat value. */
  attack: number;
  /** Defense stat value. */
  defense: number;
  /** Special Attack stat value (Gen 2 split stat). */
  specialAttack: number;
  /** Special Defense stat value (Gen 2 split stat). */
  specialDefense: number;
  /** Speed stat value. */
  speed: number;
  /**
   * Determinant Values (DVs) for each stat category (ranging from 0 to 15).
   * Note that in Generation 2, Special Attack and Special Defense share a single Special DV.
   */
  ivs: {
    attack: number;
    defense: number;
    speed: number;
    special: number;
  };
  /** Indicates whether the wild Pokémon was holding an item when caught (e.g. Butterfree with SilverPowder). */
  heldItem: boolean;
  /**
   * Optional flag indicating if the Pokémon is shiny.
   * In Generation 2, shiny status grants an immediate flat +29 point IV bonus,
   * matching the fixed shiny DV configuration (Defense 10, Speed 10, Special 10, Attack 2/3/6/7/10/11/14/15).
   */
  isShiny?: boolean;
}

/**
 * Calculates the official Generation 2 Bug-Catching Contest score for a caught Pokémon.
 *
 * Scoring Formula Breakdown:
 * 1. **Base Max HP**: `4 * Max HP`
 * 2. **Stat Total**: Sum of Attack, Defense, Special Attack, Special Defense, and Speed.
 * 3. **IV / DV Bonus**:
 *    - If shiny: fixed `+29` points.
 *    - Otherwise: bit 1 of each 4-bit DV contributes points based on its presence:
 *      - Defense (DV / 2 % 2 !== 0): `+16`
 *      - Attack (DV / 2 % 2 !== 0): `+8`
 *      - Special (DV / 2 % 2 !== 0): `+4`
 *      - Speed (DV / 2 % 2 !== 0): `+1`
 *      (Maximum non-shiny IV bonus: 16 + 8 + 4 + 1 = 29 points).
 * 4. **Remaining HP Ratio**: `Math.floor(Current HP / 8)`
 * 5. **Held Item Bonus**: `+1` point if holding an item.
 *
 * @param pokemon - The stats, DVs, current HP, and held item state of the caught Pokémon.
 * @returns The total integer score for the Bug-Catching Contest judging.
 *
 * @example
 * ```ts
 * const score = calculateGen2BugCatchingScore({
 *   maxHp: 50,
 *   currentHp: 50,
 *   attack: 30,
 *   defense: 30,
 *   specialAttack: 30,
 *   specialDefense: 30,
 *   speed: 30,
 *   ivs: { attack: 0, defense: 0, speed: 0, special: 0 },
 *   heldItem: false,
 *   isShiny: false,
 * });
 * // score === 356
 * ```
 */
export function calculateGen2BugCatchingScore(pokemon: Gen2PokemonStats): number {
  let score = 0;

  // 1. Max HP Contribution: 4 points per maximum HP
  score += 4 * pokemon.maxHp;

  // 2. Stat Pool Contribution: 1 point per stat value across all 5 combat stats
  score += pokemon.attack + pokemon.defense + pokemon.specialAttack + pokemon.specialDefense + pokemon.speed;

  // 3. IV / DV Bonus:
  // In Gen 2, shininess guarantees the exact DV bit combination yielding 29 points.
  // For non-shiny Pokémon, bit 1 of each DV nibble adds powers of 2 (16, 8, 4, 1).
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

  // 4. Current HP Contribution: 1 point per 8 remaining HP
  score += Math.floor(pokemon.currentHp / 8);

  // 5. Held Item Contribution: +1 point if caught with an item attached
  if (pokemon.heldItem) {
    score += 1;
  }

  return score;
}
