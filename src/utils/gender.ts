export const GENDER_RATE_GENDERLESS = -1;
export const GENDER_RATE_ALWAYS_MALE = 0;
export const GENDER_RATE_ALWAYS_FEMALE = 8;

export const GENDER_RATE_FEMALE_ONE_EIGHTH = 1;
export const GENDER_RATE_FEMALE_ONE_FOURTH = 2;
export const GENDER_RATE_FEMALE_HALF = 4;
export const GENDER_RATE_FEMALE_THREE_FOURTHS = 6;

export const GEN2_FEMALE_THRESHOLD_ONE_EIGHTH = 1;
export const GEN2_FEMALE_THRESHOLD_ONE_FOURTH = 3;
export const GEN2_FEMALE_THRESHOLD_HALF = 7;
export const GEN2_FEMALE_THRESHOLD_THREE_FOURTHS = 11;

export const GEN3_FEMALE_THRESHOLD_ONE_EIGHTH = 31;
export const GEN3_FEMALE_THRESHOLD_ONE_FOURTH = 63;
export const GEN3_FEMALE_THRESHOLD_HALF = 127;
export const GEN3_FEMALE_THRESHOLD_THREE_FOURTHS = 191;

export const GEN3_PERSONALITY_GENDER_MASK = 0xff;
export const GEN3_GENDER_RATIO_MAX = 8;
export const GEN3_GENDER_BYTE_RANGE = 256;

/**
 * Calculates the gender of a Generation 2 Pokémon based on its Attack DV and gender ratio.
 *
 * @param attackDv The physical Attack DV of the Pokémon (0-15).
 * @param genderRate The gender rate of the species (PokeAPI format, representing eighths of female chance. -1 for genderless).
 * @returns 'male', 'female', or 'genderless'
 */
export function calculateGen2Gender(attackDv: number, genderRate: number): 'male' | 'female' | 'genderless' {
  if (genderRate === GENDER_RATE_GENDERLESS) {
    return 'genderless';
  }
  if (genderRate === GENDER_RATE_ALWAYS_MALE) {
    return 'male';
  }
  if (genderRate === GENDER_RATE_ALWAYS_FEMALE) {
    return 'female';
  }

  // Determine the threshold for female based on the gender rate
  let femaleThreshold = -1;
  switch (genderRate) {
    case GENDER_RATE_FEMALE_ONE_EIGHTH: // 1/8 female (7:1 male:female)
      femaleThreshold = GEN2_FEMALE_THRESHOLD_ONE_EIGHTH;
      break;
    case GENDER_RATE_FEMALE_ONE_FOURTH: // 1/4 female (3:1 male:female)
      femaleThreshold = GEN2_FEMALE_THRESHOLD_ONE_FOURTH;
      break;
    case GENDER_RATE_FEMALE_HALF: // 1/2 female (1:1 male:female)
      femaleThreshold = GEN2_FEMALE_THRESHOLD_HALF;
      break;
    case GENDER_RATE_FEMALE_THREE_FOURTHS: // 3/4 female (1:3 male:female)
      femaleThreshold = GEN2_FEMALE_THRESHOLD_THREE_FOURTHS;
      break;
    default:
      // Fallback for unexpected rates, though PokeAPI only uses the above values
      // Approximation: threshold = (genderRate / 8) * 16 - 1 = genderRate * 2 - 1
      femaleThreshold = genderRate * 2 - 1;
      break;
  }

  return attackDv <= femaleThreshold ? 'female' : 'male';
}

/**
 * Calculates the gender of a Generation 3 Pokémon based on its Personality Value and gender ratio.
 *
 * @param personalityValue The 32-bit personality value of the Pokémon.
 * @param genderRate The gender rate of the species (PokeAPI format, representing eighths of female chance. -1 for genderless).
 * @returns 'male', 'female', or 'genderless'
 */
export function calculateGen3Gender(personalityValue: number, genderRate: number): 'male' | 'female' | 'genderless' {
  if (genderRate === GENDER_RATE_GENDERLESS) {
    return 'genderless';
  }
  if (genderRate === GENDER_RATE_ALWAYS_MALE) {
    return 'male';
  }
  if (genderRate === GENDER_RATE_ALWAYS_FEMALE) {
    return 'female';
  }

  // Determine the threshold for female based on the gender rate
  // Gender is determined by the lowest 8 bits of the personality value
  let femaleThreshold = 0;
  switch (genderRate) {
    case GENDER_RATE_FEMALE_ONE_EIGHTH: // 1/8 female
      femaleThreshold = GEN3_FEMALE_THRESHOLD_ONE_EIGHTH;
      break;
    case GENDER_RATE_FEMALE_ONE_FOURTH: // 1/4 female
      femaleThreshold = GEN3_FEMALE_THRESHOLD_ONE_FOURTH;
      break;
    case GENDER_RATE_FEMALE_HALF: // 1/2 female
      femaleThreshold = GEN3_FEMALE_THRESHOLD_HALF;
      break;
    case GENDER_RATE_FEMALE_THREE_FOURTHS: // 3/4 female
      femaleThreshold = GEN3_FEMALE_THRESHOLD_THREE_FOURTHS;
      break;
    default:
      // Approximation for other rates
      femaleThreshold = Math.floor((genderRate / GEN3_GENDER_RATIO_MAX) * GEN3_GENDER_BYTE_RANGE) - 1;
      break;
  }

  const lowestByte = personalityValue & GEN3_PERSONALITY_GENDER_MASK;
  return lowestByte <= femaleThreshold ? 'female' : 'male';
}
