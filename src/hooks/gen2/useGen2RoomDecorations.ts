import { useMemo } from 'react';
import { gen2Decorations } from '../../engine/data/gen2/decorations';
import type { DecorationCategory, DecorationItem } from '../../features/decorations/types';
import { MysteryGiftExclusives } from '../../features/decorations/types';

interface UseGen2RoomDecorationsProps {
  activeDecorations?: number[];
  unlockedDecorations?: boolean[];
}

export function useGen2RoomDecorations({
  activeDecorations = [],
  unlockedDecorations = [],
}: UseGen2RoomDecorationsProps): DecorationCategory {
  return useMemo(() => {
    const categories: DecorationCategory = {
      Beds: [],
      Plants: [],
      Posters: [],
      Consoles: [],
      Ornaments: [],
      Dolls: [],
    };

    // The gen2Decorations record uses 1-based indices (1 to 45).
    // The unlockedDecorations array from the save file corresponds to these indices
    // (though the exact mapping needs to align with the array indices).
    // We will iterate over the predefined gen2Decorations keys.

    Object.entries(gen2Decorations).forEach(([idStr, name]) => {
      const id = parseInt(idStr, 10);
      const isMysteryGift = MysteryGiftExclusives.includes(id);
      const isActive = activeDecorations.includes(id);

      // Gen2 save file stores unlocked decorations as a boolean array where index 0 might be decoration 1?
      // Assuming array index matches (id - 1) based on typical Gen 2 memory layout
      // Or if it's a 1-to-1 map where index corresponds directly to id.
      // Usually, it's a bitmask array where index corresponds to the flag position.
      const isUnlocked = unlockedDecorations[id - 1] ?? false;

      const item: DecorationItem = {
        id,
        name,
        isMysteryGift,
        isActive,
        isUnlocked,
      };

      if (name.includes('Bed')) categories.Beds.push(item);
      else if (name.includes('Plant')) categories.Plants.push(item);
      else if (name.includes('Poster')) categories.Posters.push(item);
      else if (name.includes('N64') || name.includes('SNES') || name.includes('NES') || name.includes('Virtual Boy'))
        categories.Consoles.push(item);
      else if (name.includes('Doll')) categories.Dolls.push(item);
      else categories.Ornaments.push(item);
    });

    return categories;
  }, [activeDecorations, unlockedDecorations]);
}
