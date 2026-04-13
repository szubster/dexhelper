import { MapPin, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { pokeDB } from '../db/PokeDB';
import type { GenericLocation } from '../db/schema';
import { useStore } from '../store';
import { cn } from '../utils/cn';

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
      const filtered = locations
        .filter((l) => l.n.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5);

      const withCounts = await Promise.all(
        filtered.map(async (l) => {
          const index = await pokeDB.getInverseIndex(l.id);
          return { ...l, count: index?.pids.length || 0 };
        })
      );

      setSuggestions(withCounts);
      setIsOpen(withCounts.length > 0);
    };

    fetchSuggestions();
  }, [searchTerm, selectedLocationId]);

  if (!isOpen && !selectedLocationId) return null;

  if (selectedLocationId) {
    return (
      <div className="flex items-center gap-2 px-4 pb-4 animate-in fade-in slide-in-from-top-1">
        <div className="flex items-center gap-2 rounded-full bg-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/30 px-3 py-1.5 text-[var(--theme-primary)] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--theme-primary)]/10">
          <MapPin size={12} className="shrink-0" />
          <span>Location: {suggestions.find(s => s.id === selectedLocationId)?.n || "Selected Area"}</span>
          <button
            onClick={() => setSelectedLocationId(null)}
            className="ml-1 rounded-full p-0.5 hover:bg-[var(--theme-primary)] hover:text-white transition-colors"
          >
            <Search size={10} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
      <div className="p-2 space-y-1">
        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
          Map Locations
        </div>
        {suggestions.map((loc) => (
          <button
            key={loc.id}
            onClick={() => {
              setSelectedLocationId(loc.id);
              setSearchTerm('');
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all hover:bg-[var(--theme-primary)]/10 group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-white/5 text-zinc-500 group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-colors duration-300">
              <MapPin size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white group-hover:text-[var(--theme-primary)] transition-colors">
                {loc.n}
              </div>
              <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                {loc.count} Pokémon detected
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
