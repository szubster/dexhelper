import { useNavigate } from '@tanstack/react-router';
import { Sparkles } from 'lucide-react';
import type { PokemonInstance } from '../../engine/saveParser/index';

interface StorageCardProps {
  pokemonInstance: PokemonInstance;
  pokemon: { id: number; name: string };
  location: string;
  spriteUrl: string;
}

export function StorageCard({ pokemonInstance: p, pokemon, location, spriteUrl }: StorageCardProps) {
  const navigate = useNavigate();

  let cardStyle = 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700 shadow-sm';
  if (p.isShiny) {
    cardStyle = 'bg-amber-900/10 border border-amber-500/30 hover:bg-amber-900/20';
  } else if (location === 'Party') {
    cardStyle = 'bg-red-900/10 border border-red-900/30 hover:bg-red-900/20';
  } else {
    cardStyle = 'bg-emerald-900/10 border border-emerald-900/30 hover:bg-emerald-900/20';
  }

  return (
    <button
      type="button"
      onClick={() => navigate({ to: `/pokemon/${pokemon.id}`, search: { from: '/storage' } })}
      className={`relative flex w-full cursor-pointer flex-col items-center rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-1 active:scale-95 ${cardStyle}`}
    >
      <div className="absolute top-3 left-3 font-bold font-mono text-[10px] text-zinc-600">LV.{p.level}</div>
      <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
        {p.isShiny && <Sparkles size={14} className="text-amber-400 drop-shadow-sm" />}
        {p.otName && (
          <div className="max-w-[60px] truncate rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-black text-[8px] text-zinc-500">
            {p.otName}
          </div>
        )}
      </div>
      <div className="relative mb-4 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
        <img
          src={spriteUrl}
          alt={pokemon.name}
          className="pixelated h-full w-full object-contain drop-shadow-xl"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <div className="w-full truncate px-1 text-center font-bold text-[10px] text-zinc-100 uppercase tracking-wider">
        {pokemon.name}
      </div>
    </button>
  );
}
