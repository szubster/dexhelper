import { CheckCircle2, X } from 'lucide-react';
import React from 'react';
import type { PokemonInstance } from '../../../engine/saveParser/index';

interface UnownDexPanelProps {
  yourPokemon: (PokemonInstance & { location: string })[];
}

const UNOWN_FORMS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function UnownDexPanel({ yourPokemon }: UnownDexPanelProps) {
  // A set of owned unown forms extracted from the list of the player's Pokémon
  const ownedForms = React.useMemo(() => {
    const set = new Set<string>();
    for (const p of yourPokemon) {
      if (p.speciesId === 201 && p.unownForm) {
        set.add(p.unownForm);
      }
    }
    return set;
  }, [yourPokemon]);

  return (
    <div className="tactical-panel mt-8 p-4 sm:p-6">
      <div className="mb-6 flex flex-col justify-between border-zinc-800 border-b border-dashed pb-4 sm:flex-row sm:items-center">
        <h3 className="font-bold font-mono text-sm text-zinc-400 uppercase tracking-widest">Unown Database</h3>
        <div className="mt-2 font-mono text-xs text-zinc-500 sm:mt-0">
          <span className="text-emerald-400">{ownedForms.size}</span> / 26 Forms Discovered
        </div>
      </div>
      <div className="grid grid-cols-5 gap-3 sm:grid-cols-7">
        {UNOWN_FORMS.map((form) => {
          const isOwned = ownedForms.has(form);
          return (
            <div
              key={form}
              className={`flex aspect-square flex-col items-center justify-center rounded-none border border-dashed p-1 font-mono transition-colors duration-300 ${
                isOwned
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[0_0_10px_rgba(var(--theme-primary-rgb),0.2)]'
                  : 'border-zinc-800 bg-black/40 text-zinc-700'
              }`}
            >
              <div className="font-black text-2xl">{form}</div>
              {isOwned ? <CheckCircle2 size={12} className="mt-1" /> : <X size={12} className="mt-1 opacity-50" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
