/**
 * @module gatingUtilities
 *
 * Utility functions for evaluating route and encounter gating requirements in the Route Radar engine.
 *
 * **Domain Logic:**
 * The Route Radar determines whether wild encounters or specific route areas are accessible to the player
 * based on their current progression context (`GatingContext`). Requirements can range from simple
 * item checks (e.g. key items like Devon Scope or Storage Key), overworld HM move prerequisites (e.g. Surf,
 * Waterfall, Dive), bicycle type requirements (e.g. Mach Bike for mud slopes or Acro Bike for bunny hop rails),
 * or complex nested boolean expressions (`AND` / `OR` logical trees).
 */

import type { GatingContext, GatingRequirement } from './types';

/**
 * Evaluates whether a player's current progression context satisfies a given gating requirement.
 *
 * Supports recursive evaluation of nested logical requirements (`AND` / `OR` conditions), allowing
 * for arbitrary prerequisite trees (e.g., needing both Dive AND Storage Key to access a TM).
 *
 * @param requirement - The gating requirement object (`GatingRequirement`) to evaluate.
 * @param context - The player's progression context (`GatingContext`) providing lookup callbacks.
 * @returns `true` if the requirement is satisfied by the context, `false` otherwise.
 *
 * @example
 * // Evaluate single HM requirement
 * const canSurf = evaluateRequirement(
 *   { type: 'hm', hmId: 'surf' },
 *   { hasItem: () => false, hasHM: (id) => id === 'surf', hasBike: () => false }
 * ); // returns true
 *
 * @example
 * // Evaluate logical AND requirement
 * const canAccessAbandonedShipTM = evaluateRequirement(
 *   {
 *     type: 'logical',
 *     operator: 'AND',
 *     requirements: [
 *       { type: 'hm', hmId: 'dive' },
 *       { type: 'item', itemId: 'storage_key' }
 *     ]
 *   },
 *   context
 * );
 */
export function evaluateRequirement(requirement: GatingRequirement, context: GatingContext): boolean {
  switch (requirement.type) {
    case 'item':
      return context.hasItem(requirement.itemId);
    case 'hm':
      return context.hasHM(requirement.hmId);
    case 'bike':
      return context.hasBike(requirement.bikeType);
    case 'logical': {
      // Recursively evaluate all nested child requirements based on logical operator
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
