import type { GameVersion, Generation, PokemonInstance, SaveData } from './parsers/common';
import { INTERNAL_ID_TO_DEX, isGen1Save, parseGen1 } from './parsers/gen1';
import { isGen2Save, parseGen2 } from './parsers/gen2';

export { decodeGen12String } from './parsers/common';

export type { GameVersion, Generation, PokemonInstance, SaveData };
export { INTERNAL_ID_TO_DEX };

/**
 * Main entry point for decoding a raw Pokémon save file buffer.
 * It identifies whether the file belongs to Generation 1 (R/B/Y) or Generation 2 (G/S/C)
 * by verifying checksums and internal structures.
 *
 * @param buffer - The raw binary data of the .sav file.
 * @param forcedVersion - An optional version override provided by the user to force specific parsing logic (e.g., forcing Yellow or Crystal).
 * @returns The structured SaveData object representing the player's progress and Pokémon.
 * @throws An Error if the file size is invalid or if neither Gen 1 nor Gen 2 structures could be matched.
 */
export function parseSaveFile(buffer: ArrayBuffer, forcedVersion?: GameVersion): SaveData {
  const u8 = new Uint8Array(buffer);

  if (buffer.byteLength < 32768) {
    throw new Error('Invalid save file size. Expected at least 32KB.');
  }

  // Gen 1 Checksum
  // Gen 1 calculates its checksum by iterating over the main save data block (0x2598 to 0x3522),
  // subtracting each byte's value from an initial value of 255 (0xFF).
  // The result is stored at 0x3523.
  let gen1Sum = 255;
  for (let i = 0x2598; i <= 0x3522; i++) {
    gen1Sum -= u8[i] ?? 0;
  }
  const isGen1ChecksumValid = (gen1Sum & 0xff) === (u8[0x3523] ?? 0);

  // Gen 2 Checksum
  // Gen 2 calculates its checksum by summing up the bytes in the main save data block (0x2009 to 0x2D0C).
  // The expected total is stored as a 16-bit little-endian integer at 0x2D0D.
  let gen2Sum = 0;
  for (let i = 0x2009; i <= 0x2d0c; i++) {
    gen2Sum += u8[i] ?? 0;
  }
  const gen2Checksum = ((u8[0x2d0e] ?? 0) << 8) | (u8[0x2d0d] ?? 0);
  const isGen2ChecksumValid = (gen2Sum & 0xffff) === gen2Checksum;

  if (isGen1ChecksumValid && isGen1Save(u8)) {
    return parseGen1(u8, forcedVersion);
  } else if (isGen2ChecksumValid) {
    if (isGen2Save(u8, true)) return parseGen2(u8, true);
    if (isGen2Save(u8, false)) return parseGen2(u8, false);
    // If checksum is valid but structure is weird, still try to parse
    return parseGen2(u8);
  } else {
    // Fallback for saves with broken checksums but valid structure
    if (isGen1Save(u8)) {
      return parseGen1(u8, forcedVersion);
    } else if (isGen2Save(u8, true)) {
      return parseGen2(u8, true);
    } else if (isGen2Save(u8, false)) {
      return parseGen2(u8, false);
    }
    throw new Error(
      'Could not detect a valid Pokémon Red/Blue/Yellow or Gold/Silver/Crystal save file. Please ensure you are uploading a .sav file from a Gen 1 or Gen 2 game.',
    );
  }
}
