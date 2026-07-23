import { Check, CircleDot, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '../../utils/cn';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { EmptyState } from '../EmptyState';
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
              <span className="tactical-text font-bold text-xs text-zinc-400">{group.locationName}</span>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item, _idx) => {
                const acquired = item.isAcquired === true;
                return (
                  <div
                    key={`${group.locationId}-${item.itemId}`}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-none border border-dashed p-3 transition-colors',
                      acquired
                        ? 'border-emerald-900/50 bg-emerald-950/10 hover:border-emerald-500/50'
                        : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700',
                    )}
                  >
                    <CornerCrosshairs
                      className={cn(
                        'h-1.5 w-1.5 transition-colors',
                        acquired
                          ? 'border-emerald-900/50 group-hover:border-emerald-500/80'
                          : 'border-zinc-700/50 group-hover:border-zinc-500',
                      )}
                    />
                    {acquired ? (
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />
                    )}
                    <div className="flex min-w-0 flex-col">
                      <span
                        className={cn(
                          'truncate font-bold text-xs uppercase tracking-wider',
                          acquired ? 'text-zinc-500 line-through' : 'text-zinc-300',
                        )}
                      >
                        {item.itemName}
                      </span>
                      <span className="tactical-text text-[10px] text-zinc-500">
                        ITEM ID: {item.itemId.toString().padStart(4, '0')}
                      </span>
                    </div>
                  </div>
                );
              })}
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
