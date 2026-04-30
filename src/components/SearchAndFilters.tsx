import { Search, X } from 'lucide-react';
import { useRef } from 'react';
import { FILTER_TYPES, useStore } from '../store';
import { cn } from '../utils/cn';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LocationSuggestions } from './LocationSuggestions';

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
        <div className="group relative mt-2 flex-1">
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center bg-[var(--theme-primary)]/10 p-1.5 text-[var(--theme-primary)] transition-all duration-300 group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-zinc-950">
            <Search size={14} className="transition-transform group-focus-within:scale-110" />
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
            className="w-full rounded-none border border-white/20 border-dashed bg-zinc-900/50 py-4 pr-12 pl-14 font-black font-mono text-white text-xs uppercase tracking-[0.2em] outline-none transition-all placeholder:text-zinc-600 focus:border-[var(--theme-primary)] focus:bg-zinc-900/80"
          />

          {/* Tactical Label */}
          <div className="pointer-events-none absolute -top-2 left-4 bg-zinc-950 px-1 font-mono text-[9px] text-zinc-500 uppercase tracking-widest transition-colors group-focus-within:text-[var(--theme-primary)]">
            Database Scan
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              title="Clear search"
              className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-zinc-500 transition-all hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <X size={14} />
            </button>
          )}

          {/* Corner Crosshairs */}
          <CornerCrosshairs
            thickness={2}
            className="h-2 w-2 border-white/40 transition-colors group-focus-within:border-[var(--theme-primary)]"
          />

          {/* Location Suggestions Dropdown */}
          <LocationSuggestions />
        </div>

        {/* Tactical Filter Toggles */}
        {/* biome-ignore lint/a11y/useSemanticElements: semantic element breaks overflow styles */}
        <div
          className="no-scrollbar mt-2 flex gap-2 overflow-x-auto px-1 pb-2"
          role="group"
          aria-label="Filter Pokémon"
        >
          <button
            type="button"
            onClick={() => setFilters([])}
            aria-pressed={filtersSet.size === 0}
            className={cn(
              'relative flex shrink-0 items-center gap-3 overflow-hidden rounded-none border border-dashed px-5 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              filtersSet.size === 0
                ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
                : 'border-white/20 bg-zinc-900/50 text-zinc-500 hover:border-white/40 hover:bg-zinc-800/80 hover:text-white',
            )}
          >
            <span className="relative z-10">All</span>
            {filtersSet.size === 0 && <div className="absolute top-0 left-0 h-full w-1 bg-[var(--theme-primary)]" />}

            {/* Corner Crosshairs */}
            <CornerCrosshairs
              corners={['top-left', 'bottom-right']}
              className={cn(
                'h-1.5 w-1.5 transition-colors',
                filtersSet.size === 0 ? 'border-[var(--theme-primary)]' : 'border-white/40',
              )}
            />
          </button>

          {FILTER_TYPES.map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => toggleFilter(f)}
              aria-pressed={filtersSet.has(f)}
              data-testid={`filter-${f}`}
              className={cn(
                'relative flex shrink-0 items-center gap-3 overflow-hidden rounded-none border border-dashed px-5 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                filtersSet.has(f)
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]'
                  : 'border-white/20 bg-zinc-900/50 text-zinc-500 hover:border-white/40 hover:bg-zinc-800/80 hover:text-white',
              )}
            >
              <span className="relative z-10">
                {f === 'secured' ? 'Secured' : f === 'missing' ? 'Missing' : 'Dex Only'}
              </span>
              {filtersSet.has(f) && <div className="absolute top-0 left-0 h-full w-1 bg-[var(--theme-primary)]" />}

              {/* Corner Crosshairs */}
              <CornerCrosshairs
                corners={['top-left', 'bottom-right']}
                className={cn(
                  'h-1.5 w-1.5 transition-colors',
                  filtersSet.has(f) ? 'border-[var(--theme-primary)]' : 'border-white/40',
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
