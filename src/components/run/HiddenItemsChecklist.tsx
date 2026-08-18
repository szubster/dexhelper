import { MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState } from '../EmptyState';
import { TacticalChecklistItem } from '../TacticalChecklistItem';
import { TacticalPanel } from '../TacticalPanel';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';
import { TelemetryDecoration } from '../TelemetryDecoration';

export interface HiddenItemUI {
  itemId: number;
  itemName: string;
  isAcquired?: boolean | undefined;
}

export interface LocationGroupedHiddenItems {
  locationId: number;
  locationName: string;
  items: HiddenItemUI[];
}

export interface HiddenItemsChecklistProps {
  groupedItems: LocationGroupedHiddenItems[];
}

type FilterOption = 'ALL' | 'REMAINING' | 'FOUND';

export function HiddenItemsChecklist({ groupedItems }: HiddenItemsChecklistProps) {
  const [filter, setFilter] = useState<FilterOption>('REMAINING');

  const filteredGroups = useMemo(() => {
    return groupedItems
      .map((group) => {
        const filteredItems = group.items.filter((item) => {
          if (filter === 'ALL') return true;
          if (filter === 'FOUND') return item.isAcquired === true;
          // REMAINING
          return item.isAcquired === false || item.isAcquired === undefined;
        });

        return {
          ...group,
          items: filteredItems,
        };
      })
      .filter((group) => group.items.length > 0);
  }, [groupedItems, filter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="tactical-text font-bold text-sm text-zinc-300 uppercase tracking-widest">
          [ HIDDEN ITEMS SCANNER ]
        </h2>
        <TacticalSegmentedControl<FilterOption>
          items={[
            { id: 'ALL', label: 'ALL TARGETS' },
            { id: 'REMAINING', label: 'REMAINING' },
            { id: 'FOUND', label: 'ACQUIRED' },
          ]}
          selectedValue={filter}
          onValueChange={setFilter}
          ariaLabel="Hidden Items Filter"
          containerClassName="sm:w-64"
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredGroups.map((group) => (
          <TacticalPanel key={group.locationId} variant="default" className="flex flex-col gap-3 p-4 sm:p-6">
            <TelemetryDecoration
              label={`LOC.${group.locationId.toString().padStart(3, '0')}`}
              className="-top-3 left-4"
            />

            <div className="mb-2 flex items-center gap-2 border-zinc-800 border-b border-dashed pb-2">
              <MapPin className="h-4 w-4 text-zinc-500" />
              <span className="font-bold font-mono text-xs text-zinc-400 uppercase tracking-widest">
                {group.locationName}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => (
                <TacticalChecklistItem
                  key={`${group.locationId}-${item.itemId}`}
                  label={item.itemName}
                  acquired={item.isAcquired === true}
                  subtitle={`ITEM ID: ${item.itemId.toString().padStart(4, '0')}`}
                  showCrosshairs={true}
                  interactive={true}
                />
              ))}
            </div>
          </TacticalPanel>
        ))}

        {filteredGroups.length === 0 && (
          <TacticalPanel variant="default" className="flex items-center justify-center p-8">
            <EmptyState label={filter === 'FOUND' ? 'NO ITEMS ACQUIRED' : 'NO TARGETS FOUND IN SCAN'} />
          </TacticalPanel>
        )}
      </div>
    </div>
  );
}
