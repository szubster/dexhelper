import { CheckCircle2, CircleDot, MapPin, Sparkles } from 'lucide-react';
import { gen2Items, gen2Locations } from '../../../engine/data/gen2/legacyNameMap';
import type { PokemonInstance } from '../../../engine/saveParser/index';

interface PokemonCaughtDetailsProps {
  yourPokemon: (PokemonInstance & { location: string })[];
}

export function PokemonCaughtDetails({ yourPokemon }: PokemonCaughtDetailsProps) {
  if (yourPokemon.length === 0) return null;

  return (
    <div className="slide-in-from-bottom-4 fade-in animate-in space-y-6 fill-mode-both duration-500">
      <h3 className="flex items-center gap-2 font-black text-[10px] text-zinc-500 uppercase tracking-[0.3em]">
        <CheckCircle2 size={14} className="text-emerald-500" /> Discovered Units
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {yourPokemon.map((p, i) => (
          <div
            key={`${p.storageLocation}-${p.slot || i}`}
            className="glass-card group relative space-y-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 transition-transform group-hover:scale-110">
              {p.isShiny ? (
                <Sparkles size={40} className="text-amber-400" />
              ) : (
                <CircleDot size={40} className="text-white/20" />
              )}
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="font-black font-display text-2xl text-white tracking-tighter">LV.{p.level}</div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="rounded-md border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 px-2 py-0.5">
                    <span className="font-black text-[9px] text-[var(--theme-primary)] uppercase leading-none tracking-widest">
                      {p.location}
                    </span>
                  </div>
                  {p.slot && (
                    <div className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5">
                      <span className="font-black text-[9px] text-zinc-500 uppercase leading-none tracking-widest">
                        Slot {p.slot}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2">
              {p.otName && (
                <div className="flex flex-col">
                  <span className="font-black text-[8px] text-zinc-500 uppercase tracking-widest">
                    Original Trainer
                  </span>
                  <span className="truncate font-bold text-[10px] text-zinc-200 uppercase">{p.otName}</span>
                </div>
              )}
              {p.item !== undefined && p.item > 0 && (
                <div className="flex flex-col">
                  <span className="font-black text-[8px] text-zinc-500 uppercase tracking-widest">Held Item</span>
                  <span className="truncate font-bold text-[10px] text-zinc-200 uppercase">{gen2Items[p.item]}</span>
                </div>
              )}
              {p.friendship !== undefined && (
                <div className="flex flex-col">
                  <span className="font-black text-[8px] text-zinc-500 uppercase tracking-widest">Friendship</span>
                  <span className="font-bold text-[10px] text-rose-400">{p.friendship} pt</span>
                </div>
              )}
            </div>

            {p.caughtData && (
              <div className="relative z-10 space-y-1 border-white/5 border-t pt-4">
                <span className="flex items-center gap-1 font-black text-[8px] text-zinc-500 uppercase tracking-widest">
                  <MapPin size={8} /> Origin Point
                </span>
                <div className="truncate font-black text-[10px] text-zinc-300 uppercase tracking-tight">
                  {gen2Locations[p.caughtData.location] || 'UNKNOWN ZONE'}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
