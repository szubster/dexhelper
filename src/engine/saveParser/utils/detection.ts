export const GEN1_PARTY_COUNT_OFFSET = 0x2f2c;
export const GEN1_PARTY_DATA_START_OFFSET = 0x2f2d;
export const GEN1_PARTY_MAX_MONS = 6;

export const GEN2_PARTY_COUNT_OFFSET_GS = 0x288a;
export const GEN2_PARTY_SPECIES_OFFSET_GS = 0x288b;

export const GEN2_PARTY_COUNT_OFFSET_CRYSTAL = 0x2865;
export const GEN2_PARTY_SPECIES_OFFSET_CRYSTAL = 0x2866;

/**
 * Heuristically determines if the provided DataView represents a Generation 1 save file.
 *
 * It checks the party count and verifies that the byte immediately following the active
 * party members is the expected terminator byte (`0xff`), and that no active party ID
 * is invalid (`0x00` or `0xff`).
 *
 * @param view - The raw save file DataView.
 * @returns True if the file matches the expected Generation 1 structural signatures.
 */
export function isGen1Save(view: DataView): boolean {
  try {
    const partyCount = view.getUint8(GEN1_PARTY_COUNT_OFFSET);
    if (partyCount > GEN1_PARTY_MAX_MONS) return false;
    if (view.getUint8(GEN1_PARTY_DATA_START_OFFSET + partyCount) !== 0xff) return false;
    for (let i = 0; i < partyCount; i++) {
      const id = view.getUint8(GEN1_PARTY_DATA_START_OFFSET + i);
      if (id === 0 || id === 0xff) return false;
    }
    return true;
  } catch (e) {
    if (e instanceof RangeError) return false;
    throw e;
  }
}

/**
 * Heuristically determines if the provided DataView represents a Generation 2 save file.
 *
 * Because Gold/Silver and Crystal use different memory offsets for the party data,
 * this function accepts a `crystal` boolean to conditionally check the correct memory locations.
 * It validates that the party count is reasonable (<= 6) and that the expected terminator
 * byte (`0xff`) appears at the correct offset.
 *
 * @param view - The raw save file DataView.
 * @param crystal - True if the offsets for Pokémon Crystal should be used, False for Gold/Silver.
 * @returns True if the file matches the expected Generation 2 structural signatures.
 */
export function isGen2Save(view: DataView, crystal: boolean): boolean {
  try {
    const countOffset = crystal ? GEN2_PARTY_COUNT_OFFSET_CRYSTAL : GEN2_PARTY_COUNT_OFFSET_GS;
    const speciesOffset = crystal ? GEN2_PARTY_SPECIES_OFFSET_CRYSTAL : GEN2_PARTY_SPECIES_OFFSET_GS;
    const partyCount = view.getUint8(countOffset);
    if (partyCount > 6) return false;
    if (view.getUint8(speciesOffset + partyCount) !== 0xff) return false;
    for (let i = 0; i < partyCount; i++) {
      const id = view.getUint8(speciesOffset + i);
      if (id === 0 || id > 251) return false;
    }
    return true;
  } catch (e) {
    if (e instanceof RangeError) return false;
    throw e;
  }
}

/**
 * Stubs the detection for Generation 3 save files.
 *
 * **Architecture Note:**
 * Generation 3 uses a complex A/B flash bank system with multiple checksums per sector,
 * so its initial detection heavily relies on a structural fallback path in `index.ts`
 * (scanning for signatures across sections) rather than a simple contiguous block heuristic here.
 * As a result, this function is currently stubbed to prevent false positives and will always
 * return false unless a RangeError occurs during bounds checking.
 *
 * @param view - The raw save file DataView.
 * @returns Always returns false.
 */
export function isGen3Save(view: DataView): boolean {
  try {
    if (view.byteLength < 0x8000) return false;
    const SIGNATURE = 0x08012025;
    const SIGNATURE_OFFSET = 0x0ff8;
    const SECTION_SIZE = 4096;
    for (let i = 0; i < 14; i++) {
      const offset = i * SECTION_SIZE + SIGNATURE_OFFSET;
      if (offset + 4 <= view.byteLength && view.getUint32(offset, true) === SIGNATURE) {
        return true;
      }
    }
    return false;
  } catch (error) {
    if (error instanceof RangeError) {
      return false;
    }
    throw error;
  }
}
