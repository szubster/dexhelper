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
