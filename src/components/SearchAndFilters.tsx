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
    <div className="mb-6 space-y-5 px-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Modern Search Bar with Retro Flair */}
        <div className="group relative flex-1">
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center rounded-lg bg-[var(--theme-primary)]/10 p-1.5 text-[var(--theme-primary)] transition-all duration-300 group-focus-within:bg-[var(--theme-primary)] group-focus-within:text-white">
            <Search size={14} className="transition-transform group-focus-within:scale-110" />
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
            className="glass-card w-full rounded-2xl border-white/5 bg-zinc-900/40 py-4 pr-12 pl-14 font-black font-mono text-white text-xs uppercase tracking-widest shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] outline-none transition-all placeholder:text-zinc-600 focus:border-[var(--theme-primary)]/50 focus:bg-zinc-900/60"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              title="Clear search"
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-xl p-2 text-zinc-500 transition-all hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <X size={14} />
            </button>
          )}
          {/* LCD Effect on Input */}
          <div className="pointer-events-none absolute inset-x-4 top-0 h-[1px] bg-white/5" />

          {/* Location Suggestions Dropdown */}
          <LocationSuggestions />
        </div>

        {/* Filter Buttons designed as Retro Console Switches */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-1 pb-2">
          <button
            type="button"
            onClick={() => setFilters([])}
            aria-pressed={filtersSet.size === 0}
            className={cn(
              'retro-button relative flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border-2 px-5 py-3 font-black text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              filtersSet.size === 0
                ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white shadow-[0_10px_20px_rgba(var(--theme-primary-rgb),0.3)]'
                : 'border-white/5 bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white',
            )}
          >
            <span className="relative z-10">All</span>
            {filtersSet.size === 0 && <div className="lcd-flicker pointer-events-none absolute inset-0 bg-white/10" />}
          </button>

          {(['secured', 'missing', 'dex-only'] as FilterType[]).map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => toggleFilter(f)}
              aria-pressed={filtersSet.has(f)}
              data-testid={`filter-${f}`}
              className={cn(
                'retro-button relative flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl border-2 px-5 py-3 font-black text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                filtersSet.has(f)
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)] text-white shadow-[0_10px_20px_rgba(var(--theme-primary-rgb),0.3)]'
                  : 'border-white/5 bg-zinc-900 text-zinc-500 hover:bg-zinc-800 hover:text-white',
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
  );
}
