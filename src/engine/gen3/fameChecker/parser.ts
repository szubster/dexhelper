import {
  FAME_CHECKER_FLAVOR_FLAGS_COUNT,
  FAME_CHECKER_FLAVOR_FLAGS_MASK,
  FAME_CHECKER_PICK_STATE_MASK,
  FAME_CHECKER_RECORD_SIZE,
  GEN3_FAME_CHECKER_OFFSET,
  NUM_FAMECHECKER_PERSONS,
} from '@dexhelper/core';

export interface Gen3FameCheckerData {
  pickState: number;
  flavorTextFlags: boolean[];
}

export function parseGen3FameChecker(view: DataView, saveBlock1Offset: number): Gen3FameCheckerData[] {
  const result: Gen3FameCheckerData[] = [];

  const baseOffset = saveBlock1Offset + GEN3_FAME_CHECKER_OFFSET;

  for (let i = 0; i < NUM_FAMECHECKER_PERSONS; i++) {
    const rawValue = view.getUint16(baseOffset + i * FAME_CHECKER_RECORD_SIZE, true);

    // Bits 0-1: pickState
    const pickState = rawValue & FAME_CHECKER_PICK_STATE_MASK;

    // Bits 2-13: flavorTextFlags
    const flavorTextFlagsRaw = (rawValue >> 2) & FAME_CHECKER_FLAVOR_FLAGS_MASK;
    const flavorTextFlags: boolean[] = [];
    for (let j = 0; j < FAME_CHECKER_FLAVOR_FLAGS_COUNT; j++) {
      flavorTextFlags.push((flavorTextFlagsRaw & (1 << j)) !== 0);
    }

    result.push({
      pickState,
      flavorTextFlags,
    });
  }

  return result;
}
