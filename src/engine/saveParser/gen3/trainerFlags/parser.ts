/**
 * Gen 3 Trainer Defeat Flags and Rematch Flags Parser
 */

// --- Module-Level Constants ---

// Game-specific offset for `flags` array in SaveBlock1
export const RSE_FLAGS_OFFSET_E = 0x1270;
export const RSE_FLAGS_OFFSET_RS = 0x1220;
export const FRLG_FLAGS_OFFSET = 0x0ee0;

// Logical ID start inside flags array
// Since flags start at 0x500 and 1 flag = 1 bit (8 per byte):
export const TRAINER_FLAGS_BYTE_OFFSET = 0xa0; // (160)

// Max standard trainers per game
export const MAX_TRAINERS_EMERALD = 864;
export const MAX_TRAINERS_RS = 693;
export const MAX_TRAINERS_FRLG = 768;

// Rematch array (trainerRematches) game-specific offset in SaveBlock1
export const REMATCH_OFFSET_E = 0x09ca;
export const REMATCH_OFFSET_RS = 0x097a;
export const REMATCH_OFFSET_FRLG = 0x063a;

// Size of the trainerRematches array
export const MAX_REMATCH_ENTRIES = 100;

export const BITS_PER_BYTE = 8;
export const BIT_MASK = 1;

/**
 * Parses the standard trainer defeat flags from a Gen 3 save file.
 * Returns an array of booleans indicating whether each trainer index has been defeated.
 *
 * @param view - The DataView of the save file.
 * @param saveBlock1Offset - The absolute offset of SaveBlock1.
 * @param gameVersion - The game version string.
 * @returns An array of boolean flags where index represents the logical trainer ID - 0x500.
 */
export function parseGen3TrainerDefeatFlags(view: DataView, saveBlock1Offset: number, gameVersion: string): boolean[] {
  try {
    let baseFlagsOffset = 0;
    let maxTrainers = 0;

    if (gameVersion === 'emerald') {
      baseFlagsOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_E;
      maxTrainers = MAX_TRAINERS_EMERALD;
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      baseFlagsOffset = saveBlock1Offset + RSE_FLAGS_OFFSET_RS;
      maxTrainers = MAX_TRAINERS_RS;
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      baseFlagsOffset = saveBlock1Offset + FRLG_FLAGS_OFFSET;
      maxTrainers = MAX_TRAINERS_FRLG;
    } else {
      return []; // Unsupported
    }

    const startOffset = baseFlagsOffset + TRAINER_FLAGS_BYTE_OFFSET;
    const defeatedFlags: boolean[] = [];

    for (let i = 0; i < maxTrainers; i++) {
      const byteOffset = startOffset + Math.floor(i / BITS_PER_BYTE);
      const bitIndex = i % BITS_PER_BYTE;

      const byteValue = view.getUint8(byteOffset);
      const isDefeated = !!((byteValue >> bitIndex) & BIT_MASK);
      defeatedFlags.push(isDefeated);
    }

    return defeatedFlags;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}

/**
 * Parses the trainer rematch flags from a Gen 3 save file.
 * Returns an array of raw byte states representing rematch status.
 *
 * @param view - The DataView of the save file.
 * @param saveBlock1Offset - The absolute offset of SaveBlock1.
 * @param gameVersion - The game version string.
 * @returns An array of number values indicating the rematch state per entry.
 */
export function parseGen3TrainerRematchFlags(view: DataView, saveBlock1Offset: number, gameVersion: string): number[] {
  try {
    let baseRematchOffset = 0;

    if (gameVersion === 'emerald') {
      baseRematchOffset = saveBlock1Offset + REMATCH_OFFSET_E;
    } else if (gameVersion === 'ruby' || gameVersion === 'sapphire') {
      baseRematchOffset = saveBlock1Offset + REMATCH_OFFSET_RS;
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      baseRematchOffset = saveBlock1Offset + REMATCH_OFFSET_FRLG;
    } else {
      return []; // Unsupported
    }

    const rematchFlags: number[] = [];
    for (let i = 0; i < MAX_REMATCH_ENTRIES; i++) {
      rematchFlags.push(view.getUint8(baseRematchOffset + i));
    }

    return rematchFlags;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
