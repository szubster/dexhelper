import type { GameVersion, PokemonInstance, SaveData } from './parsers/common';
import { isGen1Save, isGen2Save, isGen3Save } from '@/utils/detection';

const GEN1_CHECKSUM_DATA_START = 0x2598;
const GEN1_CHECKSUM_DATA_END = 0x3522;
const GEN1_CHECKSUM_OFFSET = 0x3523;

const GEN2_CHECKSUM_DATA_START = 0x2009;
const GEN2_CHECKSUM_DATA_END = 0x2d0c;
const GEN2_CHECKSUM_OFFSET = 0x2d0d;

export type { GameVersion, PokemonInstance, SaveData };

/**
 * Main entry point for decoding a raw Pokémon save file buffer.
 * It identifies whether the file belongs to Generation 1 (R/B/Y), Generation 2 (G/S/C), or
 * Generation 3 (R/S/E/FR/LG) by verifying checksums, signatures, and internal structures.
 *
 * ## Architecture Overview
 * The parser uses a two-pass heuristic pipeline to detect the game generation:
 * 1. **Checksum Verification**: First, it attempts to validate the file using strict
 *    mathematical checksum algorithms specific to Gen 1 and Gen 2.
 * 2. **Structural Fallback**: If the checksums fail (often due to emulator bugs, GameShark cheats,
 *    or corrupt flash memory), the parser falls back to structural "duck typing". It scans specific
 *    memory offsets for known signatures (e.g., trainer names, money encoding) to make a best-guess.
 *
 * @param buffer - The raw binary data of the .sav file.
 * @param forcedVersion - An optional version override provided by the user to force specific parsing logic (e.g., forcing Yellow, Crystal, or Emerald).
 * @returns The structured SaveData object representing the player's progress and Pokémon.
 * @throws An Error if the file size is invalid or if no known Generation structure could be matched.
 */
// ⚡ Bolt: Use dynamic imports for generation-specific parsers to reduce the initial bundle size.
export async function parseSaveFile(buffer: ArrayBufferLike, forcedVersion?: GameVersion): Promise<SaveData> {
  const view = new DataView(buffer);

  if (buffer.byteLength < 32768) {
    throw new Error('Invalid save file size. Expected at least 32KB.');
  }

  try {
    // Gen 1 Checksum
    // Gen 1 calculates its checksum by iterating over the main save data block (0x2598 to 0x3522),
    // subtracting each byte's value from an initial value of 255 (0xFF).
    // The result is stored at 0x3523.
    let gen1Sum = 255;
    for (let i = GEN1_CHECKSUM_DATA_START; i <= GEN1_CHECKSUM_DATA_END; i++) {
      gen1Sum -= view.getUint8(i);
    }
    const isGen1ChecksumValid = (gen1Sum & 0xff) === view.getUint8(GEN1_CHECKSUM_OFFSET);

    // Gen 2 Checksum
    // Gen 2 calculates its checksum by summing up the bytes in the main save data block (0x2009 to 0x2D0C).
    // The expected total is stored as a 16-bit little-endian integer at 0x2D0D.
    let gen2Sum = 0;
    for (let i = GEN2_CHECKSUM_DATA_START; i <= GEN2_CHECKSUM_DATA_END; i++) {
      gen2Sum += view.getUint8(i);
    }
    const gen2Checksum = view.getUint16(GEN2_CHECKSUM_OFFSET, true);
    const isGen2ChecksumValid = (gen2Sum & 0xffff) === gen2Checksum;

    if (isGen1ChecksumValid && isGen1Save(view)) {
      const { parseGen1 } = await import('./parsers/gen1');
      return parseGen1(view, forcedVersion);
    } else if (isGen2ChecksumValid) {
      const { parseGen2 } = await import('./parsers/gen2');
      if (isGen2Save(view, true)) return parseGen2(view, true);
      if (isGen2Save(view, false)) return parseGen2(view, false);
      // If checksum is valid but structure is weird, still try to parse
      return parseGen2(view);
    } else {
      // Fallback for saves with broken checksums but valid structure
      // Why do we need this?
      // Emulators, cheats (like GameShark), and third-party save editors frequently modify
      // the save payload without recalculating and updating the checksum byte at the end of the block.
      // If we strictly relied on checksums, these files would be permanently unreadable.
      // Instead, we use structural signatures (`isGen1Save`, `isGen2Save`, `isGen3Save`) to identify them.
      if (isGen1Save(view)) {
        const { parseGen1 } = await import('./parsers/gen1');
        return parseGen1(view, forcedVersion);
      } else if (isGen2Save(view, true)) {
        const { parseGen2 } = await import('./parsers/gen2');
        return parseGen2(view, true);
      } else if (isGen2Save(view, false)) {
        const { parseGen2 } = await import('./parsers/gen2');
        return parseGen2(view, false);
      } else if (isGen3Save(view)) {
        // Note: Gen 3 uses a complex A/B flash bank system with multiple checksums per sector,
        // so its initial detection heavily relies on this structural fallback path rather than a single contiguous block checksum.
        const { parseGen3 } = await import('./parsers/gen3');
        return parseGen3(view, forcedVersion);
      }
      throw new Error(
        'Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.',
      );
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
