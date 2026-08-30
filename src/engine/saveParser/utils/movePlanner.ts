import type { PokemonInstance } from '../parsers/common';
import type { BoxDiffResult } from './boxDiff';

/**
 * Represents the type of manual action required in the PC storage system.
 * - `MOVE`: Moves a Pokémon from one slot to an empty slot.
 * - `SWAP`: Swaps the positions of two Pokémon in a single action.
 * - `DEPOSIT`: Moves a newly acquired Pokémon into the PC.
 * - `WITHDRAW`: Removes a Pokémon from the PC.
 */
export type MoveOperationType = 'MOVE' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW';

/**
 * A discrete step in a sequence of PC box operations.
 *
 * For operations that lack a definitive source or target within the PC itself
 * (e.g., DEPOSIT from the Party, WITHDRAW to the Party, or when utilizing temporary
 * holding space to break movement cycles), a value of `-1` is used for the relevant
 * box and slot fields.
 */
export interface MoveOperation {
  /** The specific type of PC action to perform. */
  type: MoveOperationType;
  /** The zero-indexed source box number, or -1 if originating outside the PC. */
  sourceBox: number;
  /** The zero-indexed slot number within the source box, or -1 if N/A. */
  sourceSlot: number;
  /** The zero-indexed target box number, or -1 if moving outside the PC. */
  targetBox: number;
  /** The zero-indexed slot number within the target box, or -1 if N/A. */
  targetSlot: number;
}

function extractBoxSlot(p: PokemonInstance): { box: number; slot: number } {
  const boxMatch = p.storageLocation.match(/Box (\d+)/);
  const box = boxMatch?.[1] ? parseInt(boxMatch[1], 10) : -1;
  const slot = p.slot ?? -1;
  return { box, slot };
}

/**
 * Translates a `BoxDiffResult` into a sequential list of minimal, actionable manual user
 * operations required to transition the PC layout from the current state to the target state.
 *
 * **Architecture Note: Graph Traversal & Cycle Resolution**
 * Relocations are modeled as a directed graph where nodes are PC slots and edges are movements.
 * To guarantee that a Pokémon is never overwritten during the manual operation sequence:
 *
 * 1. **Phase 1 (Withdrawals)**: All `WITHDRAW` operations are processed first to maximize
 *    available empty slots, actively reducing collision risks.
 * 2. **Phase 2 (Acyclic Paths)**: Acyclic paths are resolved backwards (leaves to roots).
 *    Moving the tail node first guarantees the slot is vacated before its predecessor attempts
 *    to move into it.
 * 3. **Phase 3 (Cycles)**: If a movement cycle exists:
 *    - Length 2 cycles are resolved using the native `SWAP` mechanic.
 *    - Length 3+ cycles are resolved by moving the first element into a temporary buffer
 *      (e.g., the Party, represented by index `-1`), resolving the remaining path backwards,
 *      and finally moving the buffered element to its final destination.
 * 4. **Phase 4 (Deposits)**: All `DEPOSIT` operations are processed last to fill the newly arranged empty slots.
 *
 * @param diff - The computed differences containing additions, removals, and relocations.
 * @returns An array of sequential move operations to execute.
 *
 * @example
 * const diff = calculateBoxDiff(oldState, newState);
 * const plan = calculateMovePlan(diff);
 */
export function calculateMovePlan(diff: BoxDiffResult): MoveOperation[] {
  const operations: MoveOperation[] = [];

  // 1. Process WITHDRAWs first to maximize available empty slots for subsequent moves, reducing collision risk.
  for (const removal of diff.removals) {
    const { box, slot } = extractBoxSlot(removal);
    operations.push({
      type: 'WITHDRAW',
      sourceBox: box,
      sourceSlot: slot,
      targetBox: -1,
      targetSlot: -1,
    });
  }

  // 2. Process relocations
  const outEdge = new Map<string, BoxDiffResult['relocations'][number]>();
  const inEdge = new Map<string, BoxDiffResult['relocations'][number]>();

  const formatSlot = (box: number, slot: number) => `${box}:${slot}`;

  for (const reloc of diff.relocations) {
    const u = formatSlot(reloc.sourceBox, reloc.sourceSlot);
    const v = formatSlot(reloc.targetBox, reloc.targetSlot);
    outEdge.set(u, reloc);
    inEdge.set(v, reloc);
  }

  // Find all paths (nodes that have incoming edges but NO outgoing edges)
  const queue: string[] = [];
  for (const v of inEdge.keys()) {
    if (!outEdge.has(v)) {
      queue.push(v);
    }
  }

  // Resolve acyclic paths backwards (from destination to source).
  // Moving the tail node first guarantees the slot is vacated before the predecessor attempts to move into it.
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) continue;
    const reloc = inEdge.get(curr);
    if (reloc) {
      operations.push({
        type: 'MOVE',
        sourceBox: reloc.sourceBox,
        sourceSlot: reloc.sourceSlot,
        targetBox: reloc.targetBox,
        targetSlot: reloc.targetSlot,
      });

      const u = formatSlot(reloc.sourceBox, reloc.sourceSlot);
      outEdge.delete(u);
      inEdge.delete(curr);

      // If the source of this move now has no outgoing edges, it becomes the end of a path
      if (inEdge.has(u) && !outEdge.has(u)) {
        queue.push(u);
      }
    }
  }

  // Resolve remaining cycles
  while (outEdge.size > 0) {
    // Pick an arbitrary starting point
    const start = outEdge.keys().next().value;
    if (!start) break;

    const cycle: BoxDiffResult['relocations'][number][] = [];
    let curr = start;

    // Trace the cycle
    while (true) {
      const reloc = outEdge.get(curr);
      if (!reloc) break;

      cycle.push(reloc);
      outEdge.delete(curr);
      inEdge.delete(formatSlot(reloc.targetBox, reloc.targetSlot));

      curr = formatSlot(reloc.targetBox, reloc.targetSlot);
      if (curr === start) break;
    }

    if (cycle.length === 2) {
      // In-game mechanics allow directly swapping two Pokémon in one action, neatly resolving a 2-node cycle.
      const r0 = cycle[0];
      if (!r0) continue;
      operations.push({
        type: 'SWAP',
        sourceBox: r0.sourceBox,
        sourceSlot: r0.sourceSlot,
        targetBox: r0.targetBox,
        targetSlot: r0.targetSlot,
      });
    } else if (cycle.length > 2) {
      // Direct multi-way swaps aren't possible. A cycle of 3+ nodes requires a temporary buffer (Party or an empty slot)
      // to break the cycle into an acyclic path. We denote this temporary space using index -1.
      const tempBox = -1;
      const tempSlot = -1;

      const firstReloc = cycle[0];
      if (!firstReloc) continue;

      // MOVE first pokemon to Temp
      operations.push({
        type: 'MOVE',
        sourceBox: firstReloc.sourceBox,
        sourceSlot: firstReloc.sourceSlot,
        targetBox: tempBox,
        targetSlot: tempSlot,
      });

      // Move remaining pokemon in the cycle backwards
      for (let i = cycle.length - 1; i > 0; i--) {
        const r = cycle[i];
        if (!r) continue;
        operations.push({
          type: 'MOVE',
          sourceBox: r.sourceBox,
          sourceSlot: r.sourceSlot,
          targetBox: r.targetBox,
          targetSlot: r.targetSlot,
        });
      }

      // Finally move from Temp to the target of the first relocation
      operations.push({
        type: 'MOVE',
        sourceBox: tempBox,
        sourceSlot: tempSlot,
        targetBox: firstReloc.targetBox,
        targetSlot: firstReloc.targetSlot,
      });
    }
  }

  // 3. Process all DEPOSITs (Additions)
  for (const addition of diff.additions) {
    const { box, slot } = extractBoxSlot(addition);
    operations.push({
      type: 'DEPOSIT',
      sourceBox: -1,
      sourceSlot: -1,
      targetBox: box,
      targetSlot: slot,
    });
  }

  return operations;
}
