import {
  BITS_PER_BYTE,
  GEN3_POKEDEX_OFFSET,
  GEN3_POKEDEX_OWNED_OFFSET,
  GEN3_POKEDEX_SEEN_OFFSET,
  NATIONAL_DEX_MAX,
} from './constants';

/**
 * Parses the Pokédex seen and owned data from a Generation 3 save file.
 *
 * @param view - The raw save file DataView.
 * @param section0Offset - The memory offset for Section 0 (Trainer Info).
 * @returns An object containing sets of seen and owned National Dex IDs.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3Pokedex(view: DataView, section0Offset: number): { seen: Set<number>; owned: Set<number> } {
  const owned = new Set<number>();
  const seen = new Set<number>();

  const pokedexOwnedOffset = section0Offset + GEN3_POKEDEX_OFFSET + GEN3_POKEDEX_OWNED_OFFSET;
  const pokedexSeenOffset = section0Offset + GEN3_POKEDEX_OFFSET + GEN3_POKEDEX_SEEN_OFFSET;

  try {
    // In Gen 3, the National Dex goes up to 386.
    for (let dexId = 1; dexId <= NATIONAL_DEX_MAX; dexId++) {
      // Internal flags are 0-indexed where index 0 is Bulbasaur (Dex ID 1)
      const bitIndex = dexId - 1;
      const byteIdx = Math.floor(bitIndex / BITS_PER_BYTE);
      const bitPos = bitIndex % BITS_PER_BYTE;

      const oByte = view.getUint8(pokedexOwnedOffset + byteIdx);
      const sByte = view.getUint8(pokedexSeenOffset + byteIdx);

      if ((oByte & (1 << bitPos)) !== 0) owned.add(dexId);
      if ((sByte & (1 << bitPos)) !== 0) seen.add(dexId);
    }
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }

  return { seen, owned };
}
