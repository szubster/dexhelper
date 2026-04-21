import { Search, X } from 'lucide-react';
import { useRef } from 'react';
import type { FilterType } from '../store';
import { useStore } from '../store';
import { cn } from '../utils/cn';
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
    <div className="mb-6 px-2 sm:px-4">
      <div className="glass-card flex flex-col gap-4 rounded-3xl border border-white/10 bg-zinc-900/50 p-4 shadow-2xl backdrop-blur-xl lg:flex-row lg:items-center">
        {/* Unified Search Input Section */}
        <div className="group relative flex-1">
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center rounded-lg bg-[var(--theme-primary)]/20 p-2 text-[var(--theme-primary)] transition-all duration-300 group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-white">
            <Search size={16} className="transition-transform group-focus-within:scale-110" />
          </div>
          <input
            ref={inputRef}
            type="text"
            data-testid="search-input"
            placeholder="Search Pokedex by name, ID, or location..."
            aria-label="Search Pokedex by name, ID, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-2xl border-2 border-white/5 bg-black/40 py-4 pr-12 pl-16 font-black font-mono text-sm text-white uppercase tracking-widest outline-none transition-all placeholder:text-zinc-600 focus:border-[var(--theme-primary)] focus:bg-black/60 focus:shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.2)]"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-xl p-2 text-zinc-500 transition-all hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <X size={16} />
            </button>
          )}

          {/* Location Suggestions Dropdown */}
          <LocationSuggestions />
        </div>

        {/* Separator on Desktop */}
        <div className="hidden h-12 w-[2px] bg-white/10 lg:block" />

        {/* Status Filters Section */}
        <div className="flex flex-col gap-2 lg:min-w-[400px]">
          <span className="pl-1 font-black text-[9px] text-zinc-500 uppercase tracking-widest">Filter by Status</span>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setFilters([])}
              aria-pressed={filtersSet.size === 0}
              className={cn(
                'retro-button relative flex flex-1 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border-2 px-4 py-2 font-black text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                filtersSet.size === 0
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white shadow-[0_5px_15px_rgba(var(--theme-primary-rgb),0.3)]'
                  : 'border-transparent bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white',
              )}
            >
              <span className="relative z-10">All</span>
              {filtersSet.size === 0 && (
                <div className="lcd-flicker pointer-events-none absolute inset-0 bg-white/10" />
              )}
            </button>

            {(['secured', 'missing', 'dex-only'] as FilterType[]).map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => toggleFilter(f)}
                aria-pressed={filtersSet.has(f)}
                data-testid={`filter-${f}`}
                className={cn(
                  'retro-button relative flex flex-1 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border-2 px-4 py-2 font-black text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                  filtersSet.has(f)
                    ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white shadow-[0_5px_15px_rgba(var(--theme-primary-rgb),0.3)]'
                    : 'border-transparent bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white',
                )}
              >
                <span className="relative z-10">
                  {f === 'secured' ? 'Secured' : f === 'missing' ? 'Missing' : 'Dex Only'}
                </span>
                {filtersSet.has(f) && <div className="lcd-flicker pointer-events-none absolute inset-0 bg-white/10" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
