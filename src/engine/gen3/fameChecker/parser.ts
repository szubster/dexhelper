export interface Gen3FameCheckerData {
  pickState: number;
  flavorTextFlags: boolean[];
}

export function parseGen3FameChecker(view: DataView, saveBlock1Offset: number): Gen3FameCheckerData[] {
  const NUM_FAMECHECKER_PERSONS = 16;
  const FAME_CHECKER_OFFSET = 0x3a54;
  const result: Gen3FameCheckerData[] = [];

  const baseOffset = saveBlock1Offset + FAME_CHECKER_OFFSET;

  for (let i = 0; i < NUM_FAMECHECKER_PERSONS; i++) {
    const rawValue = view.getUint16(baseOffset + i * 2, true);

    // Bits 0-1: pickState
    const pickState = rawValue & 0x3;

    // Bits 2-13: flavorTextFlags
    const flavorTextFlagsRaw = (rawValue >> 2) & 0xfff;
    const flavorTextFlags: boolean[] = [];
    for (let j = 0; j < 6; j++) {
      flavorTextFlags.push((flavorTextFlagsRaw & (1 << j)) !== 0);
    }

    result.push({
      pickState,
      flavorTextFlags,
    });
  }

  return result;
}
