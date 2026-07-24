import { STATIC_GIFT_DATA } from '../../data/gen1/assistantData';

const BITS_PER_BYTE_SHIFT = 3;
const BIT_INDEX_MASK = 7;

/**
 * Evaluates which Gen 1 static encounters have been claimed.
 *
 * @param eventFlags - The raw byte array of event flags.
 * @returns A dictionary of claimed static encounters.
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
