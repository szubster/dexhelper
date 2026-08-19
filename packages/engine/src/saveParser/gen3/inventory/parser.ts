import type { GameVersion } from '../../parsers/common';
import {
  ITEM_AURORA_TICKET,
  ITEM_ENTRY_SIZE,
  ITEM_EON_TICKET,
  ITEM_INDEX_OFFSET,
  ITEM_MYSTIC_TICKET,
  ITEM_OLD_SEA_MAP,
  KEY_ITEM_POCKET_OFFSET_EMERALD,
  KEY_ITEM_POCKET_OFFSET_FRLG,
  KEY_ITEM_POCKET_OFFSET_RS,
  KEY_ITEM_POCKET_SIZE_EMERALD,
  KEY_ITEM_POCKET_SIZE_FRLG,
  KEY_ITEM_POCKET_SIZE_RS,
} from './constants';

export function parseGen3EventItems(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
): Record<number, boolean> {
  try {
    let offset = saveBlock1Offset;
    let size = 0;

    if (gameVersion === 'emerald') {
      offset += KEY_ITEM_POCKET_OFFSET_EMERALD;
      size = KEY_ITEM_POCKET_SIZE_EMERALD;
    } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
      offset += KEY_ITEM_POCKET_OFFSET_FRLG;
      size = KEY_ITEM_POCKET_SIZE_FRLG;
    } else {
      offset += KEY_ITEM_POCKET_OFFSET_RS;
      size = KEY_ITEM_POCKET_SIZE_RS;
    }

    const hasEventItem: Record<number, boolean> = {
      [ITEM_EON_TICKET]: false,
      [ITEM_MYSTIC_TICKET]: false,
      [ITEM_AURORA_TICKET]: false,
      [ITEM_OLD_SEA_MAP]: false,
    };

    const numItems = size / ITEM_ENTRY_SIZE;

    for (let i = 0; i < numItems; i++) {
      const itemOffset = offset + i * ITEM_ENTRY_SIZE;
      const itemId = view.getUint16(itemOffset + ITEM_INDEX_OFFSET, true);

      if (itemId === 0) continue;

      if (hasEventItem[itemId] !== undefined) {
        hasEventItem[itemId] = true;
      }
    }

    return hasEventItem;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
