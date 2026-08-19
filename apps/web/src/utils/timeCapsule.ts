import { hasGen2ExclusiveMove } from '@dexhelper/engine/moves/gen2Moves';
import { isGen1Species } from './species';

export function isTimeCapsuleEligible(pokemonId: number, moves: number[]): boolean {
  return isGen1Species(pokemonId) && !hasGen2ExclusiveMove(moves);
}

export function getTimeCapsuleValidation(pokemonId: number, moves: number[]): { isEligible: boolean; reason?: string } {
  if (!isGen1Species(pokemonId)) {
    return { isEligible: false, reason: 'INVALID: Gen 2 Species' };
  }
  if (hasGen2ExclusiveMove(moves)) {
    return { isEligible: false, reason: 'INVALID: Gen 2 Exclusive Move(s)' };
  }
  return { isEligible: true };
}
