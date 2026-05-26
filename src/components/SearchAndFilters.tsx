import { Search, X } from 'lucide-react';
import { useRef } from 'react';
import { FILTER_TYPES, useStore } from '../store';
import { cn } from '../utils/cn';
import { LocationSuggestions } from './LocationSuggestions';
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
      <TacticalPanel className="flex flex-col gap-0 border-zinc-800 p-0 sm:flex-row">
        {/* Left Side: Search Input */}
        <div className="relative flex-1 border-zinc-800 border-dashed p-4 sm:border-r sm:p-6">
          <TelemetryDecoration label="SYS.QUERY_STRING" className="-top-3 left-6 z-10 bg-zinc-950" />

          <div className="group relative mt-2 flex items-center border border-zinc-800 border-dashed bg-zinc-950 transition-colors focus-within:border-[var(--theme-primary)]">
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-zinc-800 transition-colors group-focus-within:bg-[var(--theme-primary)]" />

            <div className="pr-3 pl-6 text-zinc-500 transition-colors group-focus-within:text-[var(--theme-primary)]">
              <Search size={16} />
            </div>

            <input
              ref={inputRef}
              type="text"
              data-testid="search-input"
              placeholder="[ ENTER QUERY_ ]"
              aria-label="Search Pokedex by name, ID, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent py-4 font-black font-mono text-white text-xs uppercase tracking-[0.2em] outline-none placeholder:text-zinc-700"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear input"
                title="Clear input"
                className="px-4 text-zinc-600 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)]"
              >
                <X size={14} />
              </button>
            )}

            {/* Location Suggestions Dropdown */}
            <LocationSuggestions />
          </div>
        </div>

        {/* Right Side: Filters */}
        <div className="relative w-full bg-zinc-900/30 p-4 sm:w-[320px] sm:p-6 lg:w-[400px]">
          <TelemetryDecoration label="FILTER_MATRIX" className="-top-3 left-6 z-10 bg-zinc-950" />

          <fieldset className="mt-2 grid grid-cols-2 gap-2" aria-label="Filter Pokémon">
            <legend className="sr-only">Filter Pokémon</legend>
            <button
              type="button"
              onClick={() => setFilters([])}
              aria-pressed={filtersSet.size === 0}
              className={cn(
                'col-span-2 rounded-none border border-dashed px-3 py-3 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] sm:col-span-1',
                filtersSet.size === 0
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.3)]'
                  : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300',
              )}
            >
              [ ALL ]
            </button>

            {FILTER_TYPES.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => toggleFilter(f)}
                aria-pressed={filtersSet.has(f)}
                data-testid={`filter-${f}`}
                className={cn(
                  'col-span-1 rounded-none border border-dashed px-3 py-3 font-black font-mono text-[9px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)]',
                  filtersSet.has(f)
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.3)]'
                    : 'border-zinc-800 bg-zinc-950 text-zinc-500 hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300',
                )}
              >
                [ {f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX ONLY'} ]
              </button>
            ))}
          </fieldset>
        </div>
      </TacticalPanel>
    </div>
  );
}
