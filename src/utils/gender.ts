/**
 * Calculates the gender of a Generation 2 Pokémon based on its Attack DV and gender ratio.
 *
 * @param attackDv The physical Attack DV of the Pokémon (0-15).
 * @param genderRate The gender rate of the species (PokeAPI format, representing eighths of female chance. -1 for genderless).
 * @returns 'male', 'female', or 'genderless'
 */
export function calculateGen2Gender(attackDv: number, genderRate: number): 'male' | 'female' | 'genderless' {
  if (genderRate === -1) {
    return 'genderless';
  }
  if (genderRate === 0) {
    return 'male';
  }
  if (genderRate === 8) {
    return 'female';
  }

  // Determine the threshold for female based on the gender rate
  let femaleThreshold = -1;
  switch (genderRate) {
    case 1: // 1/8 female (7:1 male:female)
      femaleThreshold = 1;
      break;
    case 2: // 1/4 female (3:1 male:female)
      femaleThreshold = 3;
      break;
    case 4: // 1/2 female (1:1 male:female)
      femaleThreshold = 7;
      break;
    case 6: // 3/4 female (1:3 male:female)
      femaleThreshold = 11;
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
  if (genderRate === -1) {
    return 'genderless';
  }
  if (genderRate === 0) {
    return 'male';
  }
  if (genderRate === 8) {
    return 'female';
  }

  // Determine the threshold for female based on the gender rate
  // Gender is determined by the lowest 8 bits of the personality value
  let femaleThreshold = 0;
  switch (genderRate) {
    case 1: // 1/8 female
      femaleThreshold = 31;
      break;
    case 2: // 1/4 female
      femaleThreshold = 63;
      break;
    case 4: // 1/2 female
      femaleThreshold = 127;
      break;
    case 6: // 3/4 female
      femaleThreshold = 191;
      break;
    default:
      // Approximation for other rates
      femaleThreshold = Math.floor((genderRate / 8) * 256) - 1;
      break;
  }

  const lowestByte = personalityValue & 0xff;
  return lowestByte <= femaleThreshold ? 'female' : 'male';
}
