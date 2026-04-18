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

    const fetchSuggestions = async () => {
      const locations = await pokeDB.getLocations();

      // ⚡ Bolt: Hoisted string allocation outside the loop and removed N+1 IDB queries
      const term = searchTerm.toLowerCase();
      const filteredWithCounts = locations
        .filter((l) => l.n.toLowerCase().includes(term))
        .slice(0, 5)
        .map((l) => ({ ...l, count: l.pids?.length || 0 }));

      setSuggestions(filteredWithCounts);
      setIsOpen(filteredWithCounts.length > 0);
    };

    fetchSuggestions();
  }, [searchTerm, selectedLocationId]);

  if (!isOpen && !selectedLocationId) return null;

  if (selectedLocationId) {
    return (
      <div className="fade-in slide-in-from-top-1 flex animate-in items-center gap-2 px-4 pb-4">
        <div className="flex items-center gap-2 rounded-full border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 px-3 py-1.5 font-bold text-[var(--theme-primary)] text-xs uppercase tracking-wider shadow-[var(--theme-primary)]/10 shadow-lg">
          <MapPin size={12} className="shrink-0" />
          <span>Location: {suggestions.find((s) => s.id === selectedLocationId)?.n || 'Selected Area'}</span>
          <button
            type="button"
            onClick={() => setSelectedLocationId(null)}
            aria-label="Clear location filter"
            className="ml-1 rounded-full p-0.5 transition-colors hover:bg-[var(--theme-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <X size={10} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in zoom-in-95 absolute top-full left-0 z-50 mt-1 w-full animate-in overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-2xl backdrop-blur-xl duration-200">
      <div className="space-y-1 p-2">
        <div className="px-3 py-2 font-black text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Map Locations</div>
        {suggestions.map((loc) => (
          <button
            type="button"
            key={loc.id}
            onClick={() => {
              setSelectedLocationId(loc.id);
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-[var(--theme-primary)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-zinc-900 text-zinc-500 transition-colors duration-300 group-hover:bg-[var(--theme-primary)] group-hover:text-white">
              <MapPin size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm text-white transition-colors group-hover:text-[var(--theme-primary)]">
                {loc.n}
              </div>
              <div className="font-medium text-[10px] text-zinc-500 uppercase tracking-wider">
                {loc.count} Pokémon detected
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
