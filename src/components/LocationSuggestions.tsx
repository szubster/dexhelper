import { MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import type { GenericLocation } from '../db/schema';
import { useStore } from '../store';

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
        <div className="group relative flex items-center gap-2 overflow-hidden rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-3 py-1.5 font-bold font-mono text-[var(--theme-primary)] text-xs uppercase tracking-wider shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.2)]">
          <MapPin size={12} className="shrink-0" />
          <span>[ LOC: {suggestions.find((s) => s.id === selectedLocationId)?.n || 'SELECTED AREA'} ]</span>
          <button
            type="button"
            onClick={() => setSelectedLocationId(null)}
            aria-label="Clear location filter"
            title="Clear location filter"
            className="ml-1 rounded-none p-0.5 transition-colors hover:bg-[var(--theme-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <X size={10} />
          </button>

          <div className="pointer-events-none absolute top-0 left-0 h-1 w-1 border-[var(--theme-primary)] border-t border-l" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-1 w-1 border-[var(--theme-primary)] border-r border-b" />
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in zoom-in-95 absolute top-full left-0 z-50 mt-1 w-full animate-in overflow-hidden rounded-none border border-white/20 border-dashed bg-zinc-950/95 shadow-2xl backdrop-blur-xl duration-200">
      <div className="space-y-1 p-2">
        <div className="flex items-center gap-2 px-3 py-2 font-black font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
          <span className="text-[var(--theme-primary)]">&gt;</span> TARGET ZONES DETECTED
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
            className="group relative flex w-full items-center gap-3 rounded-none border border-transparent px-4 py-3 text-left font-mono transition-all hover:border-[var(--theme-primary)]/30 hover:bg-[var(--theme-primary)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-none border border-white/20 border-dashed bg-zinc-900/50 text-zinc-500 transition-colors duration-300 group-hover:border-[var(--theme-primary)]/50 group-hover:bg-[var(--theme-primary)]/20 group-hover:text-[var(--theme-primary)]">
              <MapPin size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-zinc-300 transition-colors group-hover:text-[var(--theme-primary)]">
                {loc.n}
              </div>
              <div className="flex items-center gap-2 font-medium text-[10px] text-zinc-500 uppercase tracking-wider transition-colors group-hover:text-[var(--theme-primary)]/70">
                <span>[ MATCHES: {loc.count.toString().padStart(3, '0')} ]</span>
              </div>
            </div>

            <div className="pointer-events-none absolute top-0 left-0 h-1.5 w-1.5 border-transparent border-t border-l transition-colors group-hover:border-[var(--theme-primary)]" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-1.5 w-1.5 border-transparent border-r border-b transition-colors group-hover:border-[var(--theme-primary)]" />
          </button>
        ))}
      </div>
    </div>
  );
}
