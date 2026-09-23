import type { GameVersion } from '../../parsers/common';
import {
  BERRY_POCKET_OFFSET_EMERALD,
  BERRY_POCKET_OFFSET_FRLG,
  BERRY_POCKET_OFFSET_RS,
  BERRY_POCKET_SIZE_EMERALD,
  BERRY_POCKET_SIZE_FRLG,
  BERRY_POCKET_SIZE_RS,
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

export const ITEM_QUANTITY_OFFSET = 0x02;
export const LOWER_16_BIT_MASK = 0xffff;

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

export function parseGen3BerryPouch(
  view: DataView,
  saveBlock1Offset: number,
  gameVersion: GameVersion,
  securityKey: number,
): { itemId: number; quantity: number }[] {
  let offset = saveBlock1Offset;
  let size = 0;

  if (gameVersion === 'emerald') {
    offset += BERRY_POCKET_OFFSET_EMERALD;
    size = BERRY_POCKET_SIZE_EMERALD;
  } else if (gameVersion === 'firered' || gameVersion === 'leafgreen') {
    offset += BERRY_POCKET_OFFSET_FRLG;
    size = BERRY_POCKET_SIZE_FRLG;
  } else {
    offset += BERRY_POCKET_OFFSET_RS;
    size = BERRY_POCKET_SIZE_RS;
  }

  try {
    const inventory: { itemId: number; quantity: number }[] = [];
    const numItems = size / ITEM_ENTRY_SIZE;

    // In Gen 3, item quantity is masked with the lower 16 bits of the security key
    const mask = securityKey & LOWER_16_BIT_MASK;

    for (let i = 0; i < numItems; i++) {
      const itemOffset = offset + i * ITEM_ENTRY_SIZE;
      const itemId = view.getUint16(itemOffset + ITEM_INDEX_OFFSET, true);
      const maskedQuantity = view.getUint16(itemOffset + ITEM_QUANTITY_OFFSET, true);

      // 0 indicates an empty slot
      if (itemId === 0) continue;

      const quantity = maskedQuantity ^ mask;

      if (quantity > 0) {
        inventory.push({ itemId, quantity });
      }
    }

    return inventory;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new Error('The save file is corrupted or incomplete.');
    }
    throw error;
  }
}
