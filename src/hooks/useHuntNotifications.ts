import { useEffect, useRef } from 'react';
import { useStore } from '../store';

/**
 * Custom hook to trigger notifications or side effects when a target wild item
 * is newly acquired during a hunting session.
 *
 * @param onNotify - Callback function triggered with the array of newly acquired item IDs.
 */
export function useHuntNotifications(onNotify?: (itemIds: number[]) => void) {
  const newlyAcquiredWildItemIds = useStore((state) => state.newlyAcquiredWildItemIds);
  const clearNewlyAcquiredWildItemIds = useStore((state) => state.clearNewlyAcquiredWildItemIds);
  const prevAcquiredRef = useRef<number[]>([]);

  useEffect(() => {
    // Only trigger if we actually have new items and they differ from the last notification
    if (newlyAcquiredWildItemIds.length > 0) {
      // Check if the current array differs from the previously processed one
      // to avoid infinite loops or redundant notifications
      const hasNew = newlyAcquiredWildItemIds.some((id) => !prevAcquiredRef.current.includes(id));

      if (hasNew) {
        if (onNotify) {
          onNotify(newlyAcquiredWildItemIds);
        }

        // Update the ref to the current state
        prevAcquiredRef.current = [...newlyAcquiredWildItemIds];

        // Clear the state so we're ready for the next detection
        clearNewlyAcquiredWildItemIds();
      }
    } else if (prevAcquiredRef.current.length > 0) {
      // Reset ref when the store is cleared
      prevAcquiredRef.current = [];
    }
  }, [newlyAcquiredWildItemIds, clearNewlyAcquiredWildItemIds, onNotify]);
}
