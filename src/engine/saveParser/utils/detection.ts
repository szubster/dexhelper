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

const GEN3_SIGNATURE = 0x08012025;
const GEN3_SIGNATURE_OFFSET = 0x0ff8;
const GEN3_SAVE_BLOCK_A = 0x0000;
const GEN3_SAVE_BLOCK_B = 0xe000;
const GEN3_NUM_SECTIONS = 14;
const GEN3_SECTION_SIZE = 4096;

/**
 * Heuristically determines if the provided DataView represents a Generation 3 save file.
 *
 * It checks both Save Block A (0x0000) and Save Block B (0xe000) for at least one
 * valid section containing the expected signature (0x08012025) at the correct offset.
 *
 * @param view - The raw save file DataView.
 * @returns True if the file matches the expected Generation 3 structural signatures.
 */
export function isGen3Save(view: DataView): boolean {
  try {
    let validSections = 0;

    const checkBank = (baseOffset: number) => {
      for (let i = 0; i < GEN3_NUM_SECTIONS; i++) {
        const offset = baseOffset + i * GEN3_SECTION_SIZE;
        // bounds check
        if (offset + GEN3_SIGNATURE_OFFSET + 4 <= view.byteLength) {
          const signature = view.getUint32(offset + GEN3_SIGNATURE_OFFSET, true);
          if (signature === GEN3_SIGNATURE) {
            validSections++;
          }
        }
      }
    };

    checkBank(GEN3_SAVE_BLOCK_A);
    checkBank(GEN3_SAVE_BLOCK_B);

    return validSections > 0;
  } catch (error) {
    if (error instanceof RangeError) {
      return false;
    }
    throw error;
  }
}
