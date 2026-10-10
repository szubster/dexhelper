import type { GatingContext, GatingRequirement } from './types';

export function evaluateRequirement(requirement: GatingRequirement, context: GatingContext): boolean {
  switch (requirement.type) {
    case 'item':
      return context.hasItem(requirement.itemId);
    case 'hm':
      return context.hasHM(requirement.hmId);
    case 'bike':
      return context.hasBike(requirement.bikeType);
    case 'logical': {
      if (requirement.operator === 'AND') {
        return requirement.requirements.every((req) => evaluateRequirement(req, context));
      }
      if (requirement.operator === 'OR') {
        return requirement.requirements.some((req) => evaluateRequirement(req, context));
      }
      return false;
    }
    default:
      return false;
  }
}
