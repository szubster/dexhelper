import type { BugCatchingContestData } from '../parsers/common';

/**
 * Constant offsets relative to the start of the sPokemonData block
 * for the Bug-Catching Contest Pokemon.
 * The sContestMon structure is 0x2C5 bytes after the start of sPokemonData.
 */
export const BUG_CONTEST_MON_RELATIVE_OFFSET = 0x02c5;
export const BUG_CONTEST_SPECIES_OFFSET = BUG_CONTEST_MON_RELATIVE_OFFSET + 0x00;
export const BUG_CONTEST_LEVEL_OFFSET = BUG_CONTEST_MON_RELATIVE_OFFSET + 0x1f;
export const BUG_CONTEST_CURRENT_HP_OFFSET = BUG_CONTEST_MON_RELATIVE_OFFSET + 0x22;
export const BUG_CONTEST_MAX_HP_OFFSET = BUG_CONTEST_MON_RELATIVE_OFFSET + 0x24;

/**
 * Extracts the basic data for the currently caught Bug-Catching Contest Pokémon
 * from the Gen 2 save file.
 *
 * @param bufferOrView The full save file ArrayBuffer or DataView.
 * @param isCrystal Whether the save file is from Pokemon Crystal.
 * @returns The BugCatchingContestData, or null if no valid species is found.
 */
export function extractBugCatchingContestData(
  bufferOrView: DataView | ArrayBuffer,
  isCrystal: boolean,
): BugCatchingContestData | null {
  const view = bufferOrView instanceof DataView ? bufferOrView : new DataView(bufferOrView);

  // The start of the sPokemonData block in SRAM
  const sPokemonDataOffset = isCrystal ? 0x2865 : 0x288a;

  try {
    const speciesId = view.getUint8(sPokemonDataOffset + BUG_CONTEST_SPECIES_OFFSET);

    // If species is 0 (missingno) or FF (empty), there is no Pokemon caught.
    if (speciesId === 0 || speciesId === 0xff) {
      return null;
    }

    const level = view.getUint8(sPokemonDataOffset + BUG_CONTEST_LEVEL_OFFSET);
    const currentHp = view.getUint16(sPokemonDataOffset + BUG_CONTEST_CURRENT_HP_OFFSET, false); // Big-Endian
    const maxHp = view.getUint16(sPokemonDataOffset + BUG_CONTEST_MAX_HP_OFFSET, false); // Big-Endian

    return {
      speciesId,
      level,
      currentHp,
      maxHp,
    };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
