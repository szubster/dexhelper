import { useQuery } from '@tanstack/react-query';
import { MapPin, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import type { GenericLocation } from '../db/schema';
import { useStore } from '../store';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';

export function LocationSuggestions() {
  const searchTerm = useStore((s) => s.searchTerm);
  const selectedLocationId = useStore((s) => s.selectedLocationId);
  const setSelectedLocationId = useStore((s) => s.setSelectedLocationId);
  const setSearchTerm = useStore((s) => s.setSearchTerm);

  const [suggestions, setSuggestions] = useState<(GenericLocation & { count: number })[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // ⚡ Bolt: Cache locations query to prevent redundant IndexedDB hits on every keystroke debounce
  const { data: locations = [] } = useQuery({
    queryKey: ['locations'],
    queryFn: () => pokeDB.getLocations(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2 || selectedLocationId) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const term = searchTerm.toLowerCase();

      // ⚡ Bolt: Replaced O(N) filter().slice() with a fast-breaking loop to avoid scanning all locations once 5 matches are found
      const filtered = [];
      for (let i = 0; i < locations.length; i++) {
        const l = locations[i];
        if (l?.n.toLowerCase().includes(term)) {
          filtered.push(l);
          if (filtered.length >= 5) break;
        }
      }

      // ⚡ Bolt: Implemented batched getInverseIndexBulk to clear N+1 queries
      const indexes = await pokeDB.getInverseIndexBulk(filtered.map((l) => l.id));
      const filteredWithCounts = filtered.map((l, i) => ({ ...l, count: indexes[i]?.length || 0 }));

      setSuggestions(filteredWithCounts);
      setIsOpen(filteredWithCounts.length > 0);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedLocationId, locations]);

  const selectedLocationName = useMemo(() => {
    if (!selectedLocationId) return 'Selected Area';
    return suggestions.find((s) => s.id === selectedLocationId)?.n || 'Selected Area';
  }, [suggestions, selectedLocationId]);

  if (!isOpen && !selectedLocationId) return null;

  if (selectedLocationId) {
    return (
      <div className="fade-in slide-in-from-top-1 flex animate-in items-center gap-2 px-4 pb-4">
        <div className="relative flex items-center gap-2 border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/10 px-4 py-2 font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
          <div className="absolute top-0 left-0 h-full w-1 bg-[var(--theme-primary)]" />
          <CornerCrosshairs
            corners={['top-right', 'bottom-right']}
            className="h-1.5 w-1.5 border-[var(--theme-primary)]/50"
          />
          <div className="relative z-10 flex items-center gap-2">
            <MapPin size={12} className="shrink-0" />
            <span>Location: {selectedLocationName}</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedLocationId(null)}
            aria-label="Clear location filter"
            title="Clear location filter"
            className="relative z-10 ml-2 text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <X size={10} />
          </button>
        </div>
      </div>
    );
  }

  return (
    // oxlint-disable jsx-a11y/prefer-tag-over-role
    <div
      role="listbox"
      aria-label="Location suggestions"
      className="fade-in zoom-in-95 absolute top-full left-0 z-50 mt-4 w-full animate-in overflow-hidden border-2 border-[var(--theme-primary)]/40 border-dashed bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md duration-300 sm:-left-[25%] sm:w-[150%]"
    >
      <LcdGrid className="opacity-10" color="var(--theme-primary)" />
      <ScanlineOverlay opacityClass="opacity-30" />
      <CornerCrosshairs thickness={2} className="h-3 w-3 border-[var(--theme-primary)]/60" />

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--theme-primary)]/50 to-transparent" />

      <div className="relative z-10 p-4">
        <div className="mb-3 flex items-center justify-between border-[var(--theme-primary)]/20 border-b border-dashed pb-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse bg-[var(--theme-primary)]" />
            <span className="font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-[0.3em]">
              [ DATABASE SCAN ACTIVE ]
            </span>
          </div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
            {suggestions.length} ENTRIES FOUND
          </span>
        </div>

        <div className="custom-scrollbar max-h-[400px] space-y-2 overflow-y-auto pr-2">
          {suggestions.map((loc) => (
            <button
              type="button"
              role="option"
              aria-selected="false"
              aria-label={loc.n}
              key={loc.id}
              onClick={() => {
                setSelectedLocationId(loc.id);
                setSearchTerm('');
                setIsOpen(false);
              }}
              className="group relative flex w-full items-center gap-4 border border-zinc-800/50 border-dashed bg-zinc-900/30 p-3 text-left transition-all duration-300 hover:border-[var(--theme-primary)]/50 hover:bg-[var(--theme-primary)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <div className="absolute top-0 left-0 h-full w-1 bg-transparent transition-all duration-300 group-hover:bg-[var(--theme-primary)] group-hover:shadow-[0_0_10px_var(--theme-primary)]" />

              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-zinc-700/50 border-dashed bg-black/50 text-zinc-600 transition-all duration-300 group-hover:border-[var(--theme-primary)]/40 group-hover:bg-[var(--theme-primary)]/20 group-hover:text-[var(--theme-primary)]">
                <MapPin size={16} />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <div className="truncate font-black font-mono text-[12px] text-zinc-200 uppercase tracking-widest transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                  {loc.n}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-block rounded-none border border-[var(--theme-primary)]/20 border-dashed bg-[var(--theme-primary)]/5 px-1.5 py-0.5 font-bold font-mono text-[8px] text-[var(--theme-primary)] uppercase tracking-widest">
                    LOC_ID: {loc.id.toString().padStart(3, '0')}
                  </span>
                  <span className="font-bold font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    [ {loc.count} UNITS DETECTED ]
                  </span>
                </div>
              </div>

              {/* Hover decorative element */}
              <div className="pr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="animate-pulse font-black font-mono text-[10px] text-[var(--theme-primary)]">
                  SELECT_
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
