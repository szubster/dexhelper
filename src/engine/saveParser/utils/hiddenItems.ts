import type { HiddenItemData } from '../../../db/schema';

export const BITMASK_ACQUIRED = 1;

/**
 * Merges raw parsed event flags with statically defined hidden items.
 *
 * @param flags - The raw binary data of the event flags, or undefined.
 * @param items - The statically defined HiddenItemData objects.
 * @returns A new array of HiddenItemData with `isAcquired` populated.
 * @throws RangeError if a flagOffset goes out of bounds.
 */
export function mergeHiddenItemFlags(flags: DataView | undefined, items: HiddenItemData[]): HiddenItemData[] {
  return items.map((item) => {
    let isAcquired = false;
    if (flags) {
      try {
        const byte = flags.getUint8(item.flagOffset);
        isAcquired = ((byte >> item.flagBit) & BITMASK_ACQUIRED) === BITMASK_ACQUIRED;
      } catch (error) {
        if (error instanceof RangeError) {
          throw new RangeError(`Out of bounds read for HiddenItemData at offset ${item.flagOffset}`);
        }
        throw error;
      }
    }
    return {
      ...item,
      isAcquired,
    };
  });
}

/**
 * Returns a filtered array of HiddenItemData containing only the items that have been acquired.
 */
export function getAcquiredHiddenItems(items: HiddenItemData[]): HiddenItemData[] {
  return items.filter((item) => item.isAcquired === true);
}

/**
 * Returns a filtered array of HiddenItemData containing only the items that have NOT been acquired.
 */
export function getRemainingHiddenItems(items: HiddenItemData[]): HiddenItemData[] {
  return items.filter((item) => item.isAcquired === false || item.isAcquired === undefined);
}
