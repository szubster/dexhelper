import { STATIC_GIFT_DATA } from '../../data/gen1/assistantData';

export const GEN1_TM_HM_TO_MOVE_ID: Record<number, number> = {
  196: 16,
  197: 20,
  198: 58,
  199: 71,
  200: 149,
  201: 6,
  202: 14,
  203: 15,
  204: 19,
  205: 26,
  206: 93,
  207: 33,
  208: 35,
  209: 37,
  210: 39,
  211: 62,
  212: 56,
  213: 59,
  214: 60,
  215: 64,
  216: 7,
  217: 67,
  218: 69,
  219: 70,
  220: 100,
  221: 73,
  222: 77,
  223: 83,
  224: 86,
  225: 88,
  226: 90,
  227: 91,
  228: 92,
  229: 95,
  230: 101,
  231: 103,
  232: 105,
  233: 116,
  234: 118,
  235: 119,
  236: 121,
  237: 122,
  238: 127,
  239: 130,
  240: 131,
  241: 136,
  242: 139,
  243: 144,
  244: 157,
  245: 87,
  246: 150,
  247: 154,
  248: 158,
  249: 162,
  250: 165,
};

export const GEN1_TM_EVENT_FLAGS: Record<number, number> = {
  206: 0x258,
  211: 0x0be,
  213: 0x18c,
  218: 0x18f,
  221: 0x1a8,
  224: 0x164,
  227: 0x050,
  229: 0x3b0,
  231: 0x340,
  234: 0x076,
  235: 0x2d7,
  236: 0x6ff,
  238: 0x298,
  239: 0x480,
  241: 0x180,
  242: 0x029,
  246: 0x360,
  248: 0x18d,
  249: 0x18e,
};

/**
 * Evaluates which Gen 1 TMs (Technical Machines) and HMs (Hidden Machines) have been obtained.
 *
 * **Architecture Note:**
 * Similar to static encounters, Gen 1 stores TM/HM acquisition in a packed bit array to save memory.
 * This function extracts the bit corresponding to each TM/HM using bitwise operations
 * and maps it to a boolean record indexed by the move ID.
 *
 * @param eventFlags - The raw byte array of event flags.
 * @returns A dictionary mapping the specific TM/HM move ID to a boolean of whether it has been acquired.
 * @example
 * const tms = parseGen1TMFlags(saveData.eventFlags);
 * if (tms[206]) { console.log('Obtained TM 206!'); }
 */
export function parseGen1TMFlags(eventFlags: Uint8Array): Record<number, boolean> {
  const flags: Record<number, boolean> = {};
  for (const [idStr, flag] of Object.entries(GEN1_TM_EVENT_FLAGS)) {
    const id = parseInt(idStr, 10);
    const byteIndex = flag >> BITS_PER_BYTE_SHIFT;
    const bitIndex = flag & BIT_INDEX_MASK;
    flags[id] = eventFlags[byteIndex] !== undefined && (eventFlags[byteIndex] & (1 << bitIndex)) !== 0;
  }
  return flags;
}

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
