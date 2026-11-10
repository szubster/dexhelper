import { calculateGen2Gender } from '../../utils/gender';

export function getGen2Gender(attackDV: number, genderRate: number): 'Male' | 'Female' | 'Genderless' {
  const gender = calculateGen2Gender(attackDV, genderRate);
  if (gender === 'male') return 'Male';
  if (gender === 'female') return 'Female';
  return 'Genderless';
}
