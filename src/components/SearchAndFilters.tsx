import { Filter, Search } from 'lucide-react';
import { useRef } from 'react';
import { FILTER_TYPES, useStore } from '../store';
import { LocationSuggestions } from './LocationSuggestions';
import { TacticalButton } from './TacticalButton';
import { TacticalInput } from './TacticalInput';
import { TacticalPanel } from './TacticalPanel';

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
    <div className="mb-6 space-y-5 px-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Tactical Hardware Search Terminal */}
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
          containerClassName="mt-2 flex-1"
        >
          {/* Location Suggestions Dropdown */}
          <LocationSuggestions />
        </TacticalInput>

        {/* Tactical Filter Toggles */}
        <TacticalPanel className="mt-2 shrink-0 p-3 pt-4 sm:p-4 sm:pt-5">
          <div className="absolute -top-1.5 left-4 flex items-center gap-1.5 bg-zinc-950 px-2 text-zinc-500">
            <Filter size={10} className="text-[var(--theme-primary)]" />
            <span className="font-mono text-[9px] uppercase tracking-widest">[ SYS.FILTER ]</span>
          </div>

          <fieldset className="no-scrollbar m-0 flex min-w-0 gap-2 overflow-x-auto border-none p-0">
            <legend className="sr-only">Filter Pokémon</legend>
            <TacticalButton
              type="button"
              onClick={() => setFilters([])}
              aria-pressed={filtersSet.size === 0}
              variant={filtersSet.size === 0 ? 'primary' : 'default'}
              hasCrosshairs="corners"
            >
              All
            </TacticalButton>

            {FILTER_TYPES.map((f) => (
              <TacticalButton
                type="button"
                key={f}
                onClick={() => toggleFilter(f)}
                aria-pressed={filtersSet.has(f)}
                data-testid={`filter-${f}`}
                variant={filtersSet.has(f) ? 'primary' : 'default'}
                hasCrosshairs="corners"
              >
                {f === 'secured' ? 'Secured' : f === 'missing' ? 'Missing' : 'Dex Only'}
              </TacticalButton>
            ))}
          </fieldset>
        </TacticalPanel>
      </div>
    </div>
  );
}
