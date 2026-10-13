import {
  CONDITION_BEAUTY_OFFSET,
  CONDITION_COOL_OFFSET,
  CONDITION_CUTE_OFFSET,
  CONDITION_SHEEN_OFFSET,
  CONDITION_SMART_OFFSET,
  CONDITION_TOUGH_OFFSET,
} from './constants';

/**
 * Parses the 6-byte Condition stats (Contest attributes) for a Gen 3 Pokémon.
 *
 * @remarks
 * Contest attributes (Cool, Beauty, Cute, Smart, Tough) and Sheen (Feel) are stored as individual
 * bytes within the 12-byte "EVs & Condition (E)" substructure of the 48-byte encrypted Data block.
 * They are extracted sequentially from offset `0x06` to `0x0b` relative to the substructure's base.
 *
 * @param view - The raw save file DataView.
 * @param offset - The offset within the buffer to the base of the E substructure.
 * @returns An object containing the extracted Contest attributes.
 * @throws Error - "The save file is corrupted or incomplete." on out-of-bounds reads.
 */
export function parseGen3ConditionStats(view: DataView, offset: number) {
  try {
    const cool = view.getUint8(offset + CONDITION_COOL_OFFSET);
    const beauty = view.getUint8(offset + CONDITION_BEAUTY_OFFSET);
    const cute = view.getUint8(offset + CONDITION_CUTE_OFFSET);
    const smart = view.getUint8(offset + CONDITION_SMART_OFFSET);
    const tough = view.getUint8(offset + CONDITION_TOUGH_OFFSET);
    const sheen = view.getUint8(offset + CONDITION_SHEEN_OFFSET);

    return { cool, beauty, cute, smart, tough, sheen };
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
