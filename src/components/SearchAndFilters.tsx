import { Search } from 'lucide-react';
import { useRef } from 'react';
import { FILTER_TYPES, useStore } from '../store';
import { LocationSuggestions } from './LocationSuggestions';
import { TacticalInput } from './TacticalInput';
import { TacticalMultiSelectControl } from './TacticalMultiSelectControl';
import { TacticalPanel } from './TacticalPanel';
import { TelemetryDecoration } from './TelemetryDecoration';

export function SearchAndFilters() {
  const inputRef = useRef<HTMLInputElement>(null);
  const saveData = useStore((s) => s.saveData);
  const searchTerm = useStore((s) => s.searchTerm);
  const setSearchTerm = useStore((s) => s.setSearchTerm);
  const filters = useStore((s) => s.filters);
  const toggleFilter = useStore((s) => s.toggleFilter);
  const setFilters = useStore((s) => s.setFilters);

  if (!saveData) return null;

  const filtersSet = new Set(filters);

  const handleClearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && searchTerm) {
      handleClearSearch();
    }
  };

  return (
    <div className="mb-6 px-4">
      <TacticalPanel className="p-4 sm:p-6" variant="default">
        <TelemetryDecoration label="SYS.QUERY_TERMINAL" className="top-2 right-4" />

        <div className="flex flex-col gap-6 pt-4">
          <TacticalInput
            ref={inputRef}
            type="text"
            data-testid="search-input"
            placeholder="[ ENTER QUERY_ ]"
            aria-label="Search Pokedex by name, ID, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            label="Database Scan"
            icon={<Search size={14} />}
            onClear={handleClearSearch}
            containerClassName="w-full"
          >
            {/* Location Suggestions Dropdown */}
            <LocationSuggestions />
          </TacticalInput>

          {/* Tactical Filter Toggles Segmented Control */}
          <TacticalMultiSelectControl<(typeof FILTER_TYPES)[number] | 'all'>
            ariaLabel="Filter Pokémon"
            legendLabel="[ FILTER_PARAMETERS ]"
            selectedValues={
              filtersSet.size === 0
                ? new Set(['all'])
                : (filtersSet as unknown as Set<(typeof FILTER_TYPES)[number] | 'all'>)
            }
            onToggle={(value) => {
              if (value === 'all') {
                setFilters([]);
              } else {
                toggleFilter(value as (typeof FILTER_TYPES)[number]);
              }
            }}
            items={[
              {
                id: 'all',
                label: <span title="Clear filters">[ ALL ]</span>,
                className: 'min-w-[100px]',
              },
              ...FILTER_TYPES.map((f) => ({
                id: f,
                label: (
                  <span
                    title={`${f} filter`}
                  >{`[ ${f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX ONLY'} ]`}</span>
                ),
                testId: `filter-${f}`,
                className: 'min-w-[100px]',
              })),
            ]}
          />
        </div>
      </TacticalPanel>
    </div>
  );
}
