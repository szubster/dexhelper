import {
  AlertTriangle,
  ArrowUpCircle,
  Check,
  ChevronRight,
  Heart,
  X,
} from 'lucide-react';
import React from 'react';
import { cn } from '../../../utils/cn';
import { stadiumRewardsData } from '../../../utils/data';

interface PokemonEvolutionsProps {
  evoReq: any;
  evolvesTo: any[];
  breedingInfo: any;
  hasPreEvo: boolean;
  onNavigate: (id: number, name: string) => void;
  yourPokemonLength: number;
  pokemonId: number;
  gameVersion: string;
  saveData: any;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {yourPokemonLength === 0 && (
        <div className="glass-card bg-red-500/5 border-red-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group col-span-1 sm:col-span-2">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <AlertTriangle size={80} />
          </div>
          <h3 className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
            <AlertTriangle size={14} /> Procurement Strategy
          </h3>
          <div className="text-sm font-bold text-zinc-300 leading-relaxed relative z-10 pr-12">
            Species missing from Living Dex. Priority retrieval recommended via
            {evoReq ? (
              <>
                {' '}
                <button
                  onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
                  className="text-red-400 hover:text-white underline decoration-red-500/30 underline-offset-4 transition-colors"
                >
                  Evolving {evoReq.fromName.toUpperCase()}
                </button>
                .
              </>
            ) : (
              <> field capture or specialized interaction.</>
            )}
            {(() => {
              const rewardObj = (stadiumRewardsData as Record<number, any>)[
                pokemonId
              ];
              if (!rewardObj) return null;
              const gen =
                saveData?.generation ||
                (['gold', 'silver', 'crystal'].includes(gameVersion) ? 2 : 1);
              const rewards = (
                gen === 2 ? rewardObj.stadium2 : rewardObj.stadium1
              ) as string[] | undefined;
              if (!rewards || rewards.length === 0) return null;
              return (
                <div className="mt-2 flex flex-wrap gap-2">
                  {rewards.map((r, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-[9px] font-black text-red-500 rounded-md"
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
        <div className="glass-card bg-purple-500/5 border-purple-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
            <ArrowUpCircle size={80} />
          </div>
          <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
            <ArrowUpCircle size={14} /> Evolution
          </h3>
          <div className="text-xs font-bold text-zinc-300 leading-relaxed relative z-10">
            FROM{' '}
            <button
              onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
              className="text-white hover:text-purple-400 underline decoration-purple-500/30 underline-offset-4 transition-colors"
            >
              {evoReq.fromName.toUpperCase()}
            </button>
            <div className="text-[10px] text-purple-400/60 mt-1 uppercase font-black">
              METHOD: {evoReq.method}
            </div>
          </div>
          <div
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest relative z-10',
              hasPreEvo
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-red-500/10 text-red-500',
            )}
          >
            {hasPreEvo ? <Check size={12} /> : <X size={12} />}{' '}
            {hasPreEvo ? 'OWNED' : 'UNAVAILABLE'}
          </div>
        </div>
      )}

      {evolvesTo && evolvesTo.length > 0 && (
        <div className="glass-card bg-blue-500/5 border-blue-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:-rotate-12 transition-transform">
            <ChevronRight size={80} />
          </div>
          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
            <ChevronRight size={14} /> Transformations
          </h3>
          <div className="space-y-4 relative z-10">
            {evolvesTo.map((evo) => (
              <div
                key={evo.id}
                className="text-xs font-bold text-zinc-300 leading-relaxed"
              >
                TO{' '}
                <button
                  onClick={() => onNavigate(evo.id, evo.name)}
                  className="text-white hover:text-blue-400 underline decoration-blue-500/30 underline-offset-4 transition-colors"
                >
                  {evo.name.toUpperCase()}
                </button>
                <div className="text-[10px] text-blue-400/60 mt-1 uppercase font-black">
                  VIA {evo.method}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {breedingInfo && (
        <div className="glass-card bg-pink-500/5 border-pink-500/10 rounded-[2rem] p-6 space-y-4 relative overflow-hidden group col-span-1 sm:col-span-2">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
            <Heart size={80} />
          </div>
          <h3 className="text-[10px] font-black text-pink-400 uppercase tracking-[0.3em] flex items-center gap-2 relative z-10">
            <Heart size={14} /> Breeding Protocol
          </h3>
          <div className="text-xs font-bold text-zinc-300 leading-relaxed relative z-10">
            CROSS-REF:{' '}
            {breedingInfo.parentNames.map((name: string, i: number) => (
              <React.Fragment key={name}>
                <button
                  onClick={() => onNavigate(breedingInfo.parentIds[i]!, name)}
                  className="text-white hover:text-pink-400 underline decoration-pink-500/30 underline-offset-4 transition-colors"
                >
                  {name.toUpperCase()}
                </button>
                {i < breedingInfo.parentNames.length - 1 ? ', ' : ''}
              </React.Fragment>
            ))}
          </div>
          <div className="text-[9px] font-black text-pink-400/60 uppercase tracking-widest bg-pink-500/5 p-3 rounded-xl border border-pink-500/10 leading-relaxed relative z-10 italic">
            {breedingInfo.method}
          </div>
        </div>
      )}
    </div>
  );
}
