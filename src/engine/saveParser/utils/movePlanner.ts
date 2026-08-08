import type { PokemonInstance } from '../parsers/common';
import type { BoxDiffResult } from './boxDiff';

/**
 * Represents the type of manual action required in the PC.
 */
export type MoveOperationType = 'MOVE' | 'SWAP' | 'DEPOSIT' | 'WITHDRAW';

/**
 * A discrete step in a sequence of PC box operations.
 * For DEPOSIT/WITHDRAW operations, or when utilizing temporary holding space (like the Party),
 * a value of `-1` is used for the relevant box and slot fields.
 */
export interface MoveOperation {
  type: MoveOperationType;
  sourceBox: number;
  sourceSlot: number;
  targetBox: number;
  targetSlot: number;
}

function extractBoxSlot(p: PokemonInstance): { box: number; slot: number } {
  const boxMatch = p.storageLocation.match(/Box (\d+)/);
  const box = boxMatch?.[1] ? parseInt(boxMatch[1], 10) : -1;
  const slot = p.slot ?? -1;
  return { box, slot };
}

/**
 * Translates a BoxDiffResult into a sequential list of minimal, actionable manual user
 * operations required to transition the PC layout from the current state to the target state.
 *
 * It models the relocations as a directed graph where nodes are PC slots. To prevent overwriting
 * Pokémon, the algorithm resolves acyclic paths backwards (leaves to roots) and breaks cycles
 * by utilizing temporary holding spaces.
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
