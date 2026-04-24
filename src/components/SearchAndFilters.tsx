import { X } from 'lucide-react';
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
        {/* Tactical Search Bar */}
        <div className="group relative flex-1 font-mono">
          <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center justify-center font-black text-[var(--theme-primary)] text-xs tracking-widest transition-all duration-300">
            <span>SYS.QUERY&gt;</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            data-testid="search-input"
            placeholder="AWAITING INPUT..."
            aria-label="Search Pokedex by name, ID, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-none border border-white/20 border-dashed bg-zinc-900/40 py-4 pr-12 pl-28 font-black font-mono text-white text-xs uppercase tracking-widest outline-none transition-all placeholder:text-zinc-600 focus:border-[var(--theme-primary)] focus:bg-zinc-900/80"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              aria-label="Clear search"
              title="Clear search"
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-none p-2 text-[var(--theme-primary)] transition-all hover:bg-[var(--theme-primary)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <X size={14} />
            </button>
          )}

          {/* Corner Crosshairs */}
          <div className="pointer-events-none absolute top-0 left-0 h-2 w-2 border-white/40 border-t-2 border-l-2 transition-colors group-focus-within:border-[var(--theme-primary)]" />
          <div className="pointer-events-none absolute top-0 right-0 h-2 w-2 border-white/40 border-t-2 border-r-2 transition-colors group-focus-within:border-[var(--theme-primary)]" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-white/40 border-b-2 border-l-2 transition-colors group-focus-within:border-[var(--theme-primary)]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-2 w-2 border-white/40 border-r-2 border-b-2 transition-colors group-focus-within:border-[var(--theme-primary)]" />

          {/* Location Suggestions Dropdown */}
          <LocationSuggestions />
        </div>

        {/* Filter Buttons designed as Tactical Data Tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-1 pb-2">
          <button
            type="button"
            onClick={() => setFilters([])}
            aria-pressed={filtersSet.size === 0}
            className={cn(
              'group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-none border border-dashed px-5 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
              filtersSet.size === 0
                ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]'
                : 'border-white/20 bg-zinc-900/50 text-zinc-500 hover:border-white/40 hover:bg-zinc-800/80 hover:text-white',
            )}
          >
            <span className="relative z-10">[ ALL ]</span>
            <div className="absolute top-0 left-0 h-1 w-1 border-current border-t border-l" />
            <div className="absolute right-0 bottom-0 h-1 w-1 border-current border-r border-b" />
          </button>

          {(['secured', 'missing', 'dex-only'] as FilterType[]).map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => toggleFilter(f)}
              aria-pressed={filtersSet.has(f)}
              data-testid={`filter-${f}`}
              className={cn(
                'group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-none border border-dashed px-5 py-3 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                filtersSet.has(f)
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]'
                  : 'border-white/20 bg-zinc-900/50 text-zinc-500 hover:border-white/40 hover:bg-zinc-800/80 hover:text-white',
              )}
            >
              <span className="relative z-10">
                [ {f === 'secured' ? 'SECURED' : f === 'missing' ? 'MISSING' : 'DEX ONLY'} ]
              </span>
              <div className="absolute top-0 left-0 h-1 w-1 border-current border-t border-l" />
              <div className="absolute right-0 bottom-0 h-1 w-1 border-current border-r border-b" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
