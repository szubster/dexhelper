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
          <TacticalMultiSelectControl
            ariaLabel="Filter Pokémon"
            legendLabel="[ FILTER_PARAMETERS ]"
            buttonBaseClassName="min-w-[100px]"
            selectedValues={filtersSet}
            onValueToggle={(f) => toggleFilter(f as (typeof FILTER_TYPES)[number])}
            renderPrefixItem={() => (
              <button
                type="button"
                onClick={() => setFilters([])}
                aria-pressed={filtersSet.size === 0}
                title="Clear filters"
                className={`min-w-[100px] flex-1 border-zinc-800 border-r border-dashed px-2 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
                  filtersSet.size === 0
                    ? 'bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_10px_rgba(var(--theme-primary-rgb),0.3)]'
                    : 'bg-zinc-950/50 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400'
                }`}
              >
                [ ALL ]
              </button>
            )}
            items={FILTER_TYPES.map((f) => ({
              id: f,
              label: `[ ${f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX ONLY'} ]`,
              testId: `filter-${f}`,
            }))}
          />
        </div>
      </TacticalPanel>
    </div>
  );
}
