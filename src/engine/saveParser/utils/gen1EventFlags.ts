import { STATIC_GIFT_DATA } from '../../data/gen1/assistantData';

const BITS_PER_BYTE_SHIFT = 3;
const BIT_INDEX_MASK = 7;

/**
 * Evaluates which Gen 1 static encounters (gifts, trades, legendaries) have been claimed.
 *
 * **Architecture Note:**
 * The Gen 1 Game Boy stores all global event flags in a packed bit array (1 bit per event)
 * to conserve memory. Since the game engine provides the flag ID as a continuous integer, we
 * must map it into the specific byte offset and bit position in the buffer.
 *
 * @param eventFlags - The raw byte array of event flags (`0x29e6` to `0x2afe`).
 * @returns A dictionary mapping the specific Pokémon instance ID to a boolean of whether it has been claimed.
 * @example
 * const claimed = parseGen1StaticEncounters(saveData.eventFlags);
 * if (claimed[150]) { console.log('Mewtwo has been captured!'); }
 */
export function parseGen1StaticEncounters(eventFlags: Uint8Array): Record<number, boolean> {
  const claimed: Record<number, boolean> = {};

  for (const [idStr, gift] of Object.entries(STATIC_GIFT_DATA)) {
    const id = parseInt(idStr, 10);
    const flagId = gift.eventFlag;

    if (flagId === undefined) {
      claimed[id] = false;
      continue;
    }

    const byteIndex = flagId >> BITS_PER_BYTE_SHIFT;
    const bitIndex = flagId & BIT_INDEX_MASK;
    const byte = eventFlags[byteIndex];

    if (byte === undefined) {
      claimed[id] = false;
    } else {
      claimed[id] = (byte & (1 << bitIndex)) !== 0;
    }
  }

  return claimed;
}
