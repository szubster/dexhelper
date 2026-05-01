import { MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import type { GenericLocation } from '../db/schema';
import { useStore } from '../store';
import { CornerCrosshairs } from './CornerCrosshairs';

export function LocationSuggestions() {
  const searchTerm = useStore((s) => s.searchTerm);
  const selectedLocationId = useStore((s) => s.selectedLocationId);
  const setSelectedLocationId = useStore((s) => s.setSelectedLocationId);
  const setSearchTerm = useStore((s) => s.setSearchTerm);

  const [suggestions, setSuggestions] = useState<(GenericLocation & { count: number })[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!searchTerm || searchTerm.length < 2 || selectedLocationId) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const locations = await pokeDB.getLocations();

      const term = searchTerm.toLowerCase();
      const filtered = locations.filter((l) => l.n.toLowerCase().includes(term)).slice(0, 5);

      // ⚡ Bolt: Implemented batched getInverseIndexBulk to clear N+1 queries
      const indexes = await pokeDB.getInverseIndexBulk(filtered.map((l) => l.id));
      const filteredWithCounts = filtered.map((l, i) => ({ ...l, count: indexes[i]?.length || 0 }));

      setSuggestions(filteredWithCounts);
      setIsOpen(filteredWithCounts.length > 0);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedLocationId]);

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
            <span>Location: {suggestions.find((s) => s.id === selectedLocationId)?.n || 'Selected Area'}</span>
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
    <div className="fade-in zoom-in-95 absolute top-full left-0 z-50 mt-2 w-full animate-in border border-white/20 border-dashed bg-zinc-950 shadow-2xl duration-200">
      <CornerCrosshairs thickness={2} className="h-2 w-2 border-white/40" />
      <div className="scanline-overlay pointer-events-none absolute inset-0 opacity-10" />
      <div className="relative z-10 space-y-1 p-2">
        <div className="px-3 py-2 font-black font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
          [ SCAN RESULTS ]
        </div>
        {suggestions.map((loc) => (
          <button
            type="button"
            key={loc.id}
            onClick={() => {
              setSelectedLocationId(loc.id);
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="group relative flex w-full items-center gap-3 border border-transparent px-4 py-3 text-left transition-all hover:border-white/10 hover:bg-zinc-900/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <div className="absolute top-0 left-0 h-full w-1 bg-transparent transition-colors group-hover:bg-[var(--theme-primary)]" />
            <div className="relative z-10 flex w-full items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-white/5 bg-zinc-900 text-zinc-500 transition-colors duration-300 group-hover:border-[var(--theme-primary)]/30 group-hover:bg-[var(--theme-primary)]/10 group-hover:text-[var(--theme-primary)]">
                <MapPin size={14} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-black font-mono text-[11px] text-white uppercase tracking-wider transition-colors group-hover:text-[var(--theme-primary)]">
                  {loc.n}
                </div>
                <div className="font-bold font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                  [{loc.count} DETECTED]
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
