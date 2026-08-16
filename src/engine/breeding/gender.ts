export function getGen2Gender(attackDV: number, genderRate: number): 'Male' | 'Female' | 'Genderless' {
  if (genderRate === -1) return 'Genderless';
  if (genderRate === 0) return 'Male';
  if (genderRate === 8) return 'Female';
  const femaleThreshold = genderRate * 2;
  return attackDV < femaleThreshold ? 'Female' : 'Male';
}
