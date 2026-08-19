import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';

export interface SynchronizedState {
  owned: Set<number>;
  seen: Set<number>;
  items: Set<number>;
}

export function calculateSynchronizedState(saves: Record<string, SaveData>): SynchronizedState {
  const result: SynchronizedState = {
    owned: new Set<number>(),
    seen: new Set<number>(),
    items: new Set<number>(),
  };

  for (const save of Object.values(saves)) {
    save.owned?.forEach((id) => {
      result.owned.add(id);
    });
    save.seen?.forEach((id) => {
      result.seen.add(id);
    });

    save.inventory?.forEach((item) => {
      if (item.quantity > 0) {
        result.items.add(item.id);
      }
    });

    save.pcItems?.forEach((item) => {
      if (item.quantity > 0) {
        result.items.add(item.id);
      }
    });
  }

  return result;
}
