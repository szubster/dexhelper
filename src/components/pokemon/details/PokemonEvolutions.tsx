import { AlertTriangle, ArrowUpCircle, Check, ChevronRight, Heart, X } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../../../engine/saveParser/index';
import { cn } from '../../../utils/cn';
import { stadiumRewardsData } from '../../../utils/data';

interface EvoReq {
  fromId: number;
  fromName: string;
  method: string;
}

interface EvoTarget {
  id: number;
  name: string;
  method: string;
}

interface BreedingInfo {
  parentIds: number[];
  parentNames: string[];
  method: string;
}

interface PokemonEvolutionsProps {
  evoReq: EvoReq | null;
  evolvesTo: EvoTarget[];
  breedingInfo: BreedingInfo | null;
  hasPreEvo: boolean;
  onNavigate: (id: number, name: string) => void;
  yourPokemonLength: number;
  pokemonId: number;
  gameVersion: string;
  saveData: SaveData | null;
}

export function PokemonEvolutions({
  evoReq,
  evolvesTo,
  breedingInfo,
  hasPreEvo,
  onNavigate,
  yourPokemonLength,
  pokemonId,
  gameVersion,
  saveData,
}: PokemonEvolutionsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {yourPokemonLength === 0 && (
        <div className="glass-card group relative col-span-1 space-y-4 overflow-hidden rounded-[2rem] border-red-500/10 bg-red-500/5 p-6 sm:col-span-2">
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
            <AlertTriangle size={80} />
          </div>
          <h3 className="relative z-10 flex items-center gap-2 font-black text-[10px] text-red-400 uppercase tracking-[0.3em]">
            <AlertTriangle size={14} /> Procurement Strategy
          </h3>
          <div className="relative z-10 pr-12 font-bold text-sm text-zinc-300 leading-relaxed">
            Species missing from Living Dex. Priority retrieval recommended via
            {evoReq ? (
              <>
                {' '}
                <button
                  onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
                  className="text-red-400 underline decoration-red-500/30 underline-offset-4 transition-colors hover:text-white"
                >
                  Evolving {evoReq.fromName.toUpperCase()}
                </button>
                .
              </>
            ) : (
              <> field capture or specialized interaction.</>
            )}
            {(() => {
              const rewardObj = stadiumRewardsData[pokemonId];
              if (!rewardObj) return null;
              const gen = saveData?.generation || (['gold', 'silver', 'crystal'].includes(gameVersion) ? 2 : 1);
              const rewards = gen === 2 ? rewardObj.stadium2 : rewardObj.stadium1;
              if (!rewards || rewards.length === 0) return null;
              return (
                <div className="mt-2 flex flex-wrap gap-2">
                  {rewards.map((r) => (
                    <span
                      key={r}
                      className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-black text-[9px] text-red-500"
                    >
                      STADIUM {gen} REWARD: {r.toUpperCase()}
                    </span>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {evoReq && (
        <div className="glass-card group relative space-y-4 overflow-hidden rounded-[2rem] border-purple-500/10 bg-purple-500/5 p-6">
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:rotate-12">
            <ArrowUpCircle size={80} />
          </div>
          <h3 className="relative z-10 flex items-center gap-2 font-black text-[10px] text-purple-400 uppercase tracking-[0.3em]">
            <ArrowUpCircle size={14} /> Evolution
          </h3>
          <div className="relative z-10 font-bold text-xs text-zinc-300 leading-relaxed">
            FROM{' '}
            <button
              onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
              className="text-white underline decoration-purple-500/30 underline-offset-4 transition-colors hover:text-purple-400"
            >
              {evoReq.fromName.toUpperCase()}
            </button>
            <div className="mt-1 font-black text-[10px] text-purple-400/60 uppercase">METHOD: {evoReq.method}</div>
          </div>
          <div
            className={cn(
              'relative z-10 inline-flex items-center gap-2 rounded-xl px-3 py-1.5 font-black text-[10px] uppercase tracking-widest',
              hasPreEvo ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500',
            )}
          >
            {hasPreEvo ? <Check size={12} /> : <X size={12} />} {hasPreEvo ? 'OWNED' : 'UNAVAILABLE'}
          </div>
        </div>
      )}

      {evolvesTo && evolvesTo.length > 0 && (
        <div className="glass-card group relative space-y-4 overflow-hidden rounded-[2rem] border-blue-500/10 bg-blue-500/5 p-6">
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:-rotate-12">
            <ChevronRight size={80} />
          </div>
          <h3 className="relative z-10 flex items-center gap-2 font-black text-[10px] text-blue-400 uppercase tracking-[0.3em]">
            <ChevronRight size={14} /> Transformations
          </h3>
          <div className="relative z-10 space-y-4">
            {evolvesTo.map((evo) => (
              <div key={evo.id} className="font-bold text-xs text-zinc-300 leading-relaxed">
                TO{' '}
                <button
                  onClick={() => onNavigate(evo.id, evo.name)}
                  className="text-white underline decoration-blue-500/30 underline-offset-4 transition-colors hover:text-blue-400"
                >
                  {evo.name.toUpperCase()}
                </button>
                <div className="mt-1 font-black text-[10px] text-blue-400/60 uppercase">VIA {evo.method}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {breedingInfo && (
        <div className="glass-card group relative col-span-1 space-y-4 overflow-hidden rounded-[2rem] border-pink-500/10 bg-pink-500/5 p-6 sm:col-span-2">
          <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
            <Heart size={80} />
          </div>
          <h3 className="relative z-10 flex items-center gap-2 font-black text-[10px] text-pink-400 uppercase tracking-[0.3em]">
            <Heart size={14} /> Breeding Protocol
          </h3>
          <div className="relative z-10 font-bold text-xs text-zinc-300 leading-relaxed">
            CROSS-REF:{' '}
            {breedingInfo.parentNames.map((name: string, i: number) => (
              <React.Fragment key={name}>
                <button
                  onClick={() => {
                    const id = breedingInfo.parentIds[i];
                    if (id) onNavigate(id, name);
                  }}
                  className="text-white underline decoration-pink-500/30 underline-offset-4 transition-colors hover:text-pink-400"
                >
                  {name.toUpperCase()}
                </button>
                {i < breedingInfo.parentNames.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </div>
          <div className="relative z-10 rounded-xl border border-pink-500/10 bg-pink-500/5 p-3 font-black text-[9px] text-pink-400/60 uppercase italic leading-relaxed tracking-widest">
            {breedingInfo.method}
          </div>
        </div>
      )}
    </div>
  );
}
