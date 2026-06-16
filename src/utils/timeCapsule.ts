import { hasGen2ExclusiveMove } from '../engine/moves/gen2Moves';
import { isGen1Species } from './species';

export interface TimeCapsuleValidationResult {
  isEligible: boolean;
  reasons: string[];
}

export function validateTimeCapsuleEligibility(speciesId: number, moves: number[]): TimeCapsuleValidationResult {
  const isGen1 = isGen1Species(speciesId);
  const hasGen2Move = hasGen2ExclusiveMove(moves);

  const reasons: string[] = [];

  if (!isGen1) {
    reasons.push('INVALID: Gen 2 Species');
  }

  if (hasGen2Move) {
    reasons.push('INVALID: Gen 2 Exclusive Move(s)');
  }

  return {
    isEligible: isGen1 && !hasGen2Move,
    reasons,
  };
}
