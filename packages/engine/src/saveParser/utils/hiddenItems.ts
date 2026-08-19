import type { HiddenItemData } from '@/db/schema';

export const BITMASK_ACQUIRED = 1;

/**
 * Merges raw parsed event flags with statically defined hidden items.
 *
 * The game state stores hidden item acquisition as a tightly packed bit array within
 * the save file's event flags to conserve memory. This function bridges the gap by
 * taking the static definitions (which byte/bit to check) and evaluating the binary
 * save data to determine if the player has picked up the item.
 *
 * @param flags - The raw DataView representing the event flags block of the save file, or undefined if not loaded.
 * @param items - The statically defined array of `HiddenItemData` containing location and bit offset metadata.
 * @returns A new array of `HiddenItemData` objects where the `isAcquired` property has been populated.
 * @throws {RangeError} If reading a specific `flagOffset` goes out of the DataView's bounds (e.g. truncated save file).
 *
 * @example
 * const staticItems = [{ id: 1, flagOffset: 0x1A, flagBit: 2, ... }];
 * const merged = mergeHiddenItemFlags(saveDataView, staticItems);
 * console.log(merged[0].isAcquired); // true or false
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
 * Returns a filtered array of `HiddenItemData` containing only the items that have been acquired.
 *
 * This is primarily used for rendering logic in the UI (e.g. crossing out or dimming items
 * on a map view) to show the user what they have already accomplished.
 *
 * @param items - The fully populated array of hidden items (post-merge).
 * @returns An array containing only the items where `isAcquired` is true.
 *
 * @example
 * const foundItems = getAcquiredHiddenItems(allMapItems);
 * renderCrossedOut(foundItems);
 */
export function getAcquiredHiddenItems(items: HiddenItemData[]): HiddenItemData[] {
  return items.filter((item) => item.isAcquired === true);
}

/**
 * Returns a filtered array of `HiddenItemData` containing only the items that have NOT been acquired.
 *
 * This acts as the primary filter for the assistant engine. By treating `undefined`
 * as unacquired (which occurs before a save file is loaded), the engine defaults to
 * showing all possible hidden items as actionable targets.
 *
 * @param items - The fully populated array of hidden items (post-merge).
 * @returns An array containing only the items where `isAcquired` is false or undefined.
 *
 * @example
 * const actionableItems = getRemainingHiddenItems(allMapItems);
 * if (actionableItems.length > 0) notifyUser("Hidden items nearby!");
 */
export function getRemainingHiddenItems(items: HiddenItemData[]): HiddenItemData[] {
  return items.filter((item) => item.isAcquired === false || item.isAcquired === undefined);
}
