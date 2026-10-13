import { Search } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { pokeDB } from '../../../db/PokeDB';
import type { ItemMetadata } from '../../../db/schema';
import { useStore } from '../../../store';
import { TacticalButton } from '../../TacticalButton';
import { TacticalChip } from '../../TacticalChip';
import { TacticalInput } from '../../TacticalInput';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

// ⚡ Bolt: Wrapped in React.memo and pre-built itemsMap / selectedWildItemIdsSet to replace linear scans with O(1) Map/Set lookups (O(N * M) -> O(N)).
const WildItemSelectorComponent: React.FC = () => {
  const [items, setItems] = useState<ItemMetadata[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedWildItemIds = useStore((state) => state.selectedWildItemIds);
  const addSelectedWildItemId = useStore((state) => state.addSelectedWildItemId);
  const removeSelectedWildItemId = useStore((state) => state.removeSelectedWildItemId);
  const clearSelectedWildItemIds = useStore((state) => state.clearSelectedWildItemIds);

  useEffect(() => {
    let mounted = true;
    pokeDB
      .getAllItems()
      .then((fetchedItems) => {
        if (mounted) setItems(fetchedItems);
      })
      .catch((err) => {
        console.error('Failed to fetch items:', err instanceof Error ? err.message : 'Unknown error');
      });
    return () => {
      mounted = false;
    };
  }, []);

  const itemsMap = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const selectedWildItemIdsSet = useMemo(() => new Set(selectedWildItemIds), [selectedWildItemIds]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      // By default, just show selected items to keep it clean, or all.
      return items.slice(0, 50);
    }
    const q = searchQuery.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(q) || item.id.toString() === q);
  }, [items, searchQuery]);

  const selectedItems = useMemo(() => {
    return selectedWildItemIds.map((id) => itemsMap.get(id)).filter((i): i is ItemMetadata => i !== undefined);
  }, [itemsMap, selectedWildItemIds]);

  return (
    <TacticalPanel className="flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.WILD_ITEMS" className="-top-[17px] left-[-1px]" />

      <div className="z-10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <span className="tactical-text font-black font-mono text-lg text-white">WILD ITEM TRACKER TARGETS</span>
        {selectedWildItemIds.length > 0 && (
          <TacticalButton
            variant="danger-outline"
            size="sm"
            onClick={clearSelectedWildItemIds}
            className="rounded-none"
          >
            CLEAR ALL
          </TacticalButton>
        )}
      </div>

      <div className="z-10 flex flex-col gap-2">
        <TacticalInput
          placeholder="SEARCH ITEMS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          onClear={() => setSearchQuery('')}
          className="rounded-none border-dashed font-mono"
        />
      </div>

      {selectedItems.length > 0 && (
        <div className="z-10 mt-2 flex flex-col gap-2">
          <span className="font-mono text-xs text-zinc-500">SELECTED TARGETS</span>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <TacticalChip
                key={item.id}
                onRemove={() => removeSelectedWildItemId(item.id)}
                removeButtonTitle="Remove target"
              >
                {item.name.toUpperCase()}
              </TacticalChip>
            ))}
          </div>
        </div>
      )}

      <div className="z-10 mt-4 grid max-h-64 grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const isSelected = selectedWildItemIdsSet.has(item.id);
          return (
            <TacticalButton
              key={item.id}
              variant={isSelected ? 'primary' : 'secondary'}
              onClick={() => (isSelected ? removeSelectedWildItemId(item.id) : addSelectedWildItemId(item.id))}
              className="justify-start truncate rounded-none border-dashed font-mono"
              hasCrosshairs
            >
              <span className="truncate">{item.name.toUpperCase()}</span>
            </TacticalButton>
          );
        })}
      </div>
    </TacticalPanel>
  );
};

export const WildItemSelector = React.memo(WildItemSelectorComponent);
