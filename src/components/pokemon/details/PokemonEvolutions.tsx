import { AlertTriangle, ArrowUpCircle, Check, ChevronRight, Heart, X } from 'lucide-react';
import React from 'react';
import { stadiumRewardsData } from '../../../engine/data/shared/staticData';
import type { SaveData } from '../../../engine/saveParser/index';
import { cn } from '../../../utils/cn';
import { InlineLink } from '../../InlineLink';
import { SectionHeader } from '../../SectionHeader';
import { TacticalPanel } from '../../TacticalPanel';

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

function ProcurementStrategy({
  evoReq,
  pokemonId,
  gameVersion,
  saveData,
  onNavigate,
}: {
  evoReq: EvoReq | null;
  pokemonId: number;
  gameVersion: string;
  saveData: SaveData | null;
  onNavigate: (id: number, name: string) => void;
}) {
  return (
    <TacticalPanel
      variant="red"
      className="group col-span-1 space-y-4 rounded-none border border-dashed p-6 sm:col-span-2"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
        <AlertTriangle size={80} />
      </div>
      <SectionHeader
        className="relative z-10"
        colorClass="text-red-400"
        title="Procurement Strategy"
        icon={<AlertTriangle size={14} />}
      />
      <div className="relative z-10 pr-12 font-bold text-sm text-zinc-300 leading-relaxed">
        Species missing from Living Dex. Priority retrieval recommended via
        {evoReq ? (
          <>
            {' '}
            <InlineLink
              aria-label={`Navigate to ${evoReq.fromName} details`}
              onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
              variant="red"
            >
              Evolving {evoReq.fromName.toUpperCase()}
            </InlineLink>
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
                  className="rounded-none border border-red-500/20 border-dashed bg-red-500/10 px-2 py-0.5 font-black text-[9px] text-red-500"
                >
                  STADIUM {gen} REWARD: {r.toUpperCase()}
                </span>
              ))}
            </div>
          );
        })()}
      </div>
    </TacticalPanel>
  );
}

function EvolutionFrom({
  evoReq,
  hasPreEvo,
  onNavigate,
}: {
  evoReq: EvoReq;
  hasPreEvo: boolean;
  onNavigate: (id: number, name: string) => void;
}) {
  return (
    <TacticalPanel variant="purple" className="group space-y-4 rounded-none border border-dashed p-6">
      <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:rotate-12">
        <ArrowUpCircle size={80} />
      </div>
      <SectionHeader
        className="relative z-10"
        colorClass="text-purple-400"
        title="Evolution"
        icon={<ArrowUpCircle size={14} />}
      />
      <div className="relative z-10 font-bold text-xs text-zinc-300 leading-relaxed">
        FROM{' '}
        <InlineLink
          aria-label={`Navigate to ${evoReq.fromName} details`}
          onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
          variant="purple"
        >
          {evoReq.fromName.toUpperCase()}
        </InlineLink>
        <div className="mt-1 font-black text-[10px] text-purple-400/60 uppercase">METHOD: {evoReq.method}</div>
      </div>
      <div
        className={cn(
          'relative z-10 inline-flex items-center gap-2 rounded-none px-3 py-1.5 font-black text-[10px] uppercase tracking-widest',
          hasPreEvo ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500',
        )}
      >
        {hasPreEvo ? <Check size={12} /> : <X size={12} />} {hasPreEvo ? 'OWNED' : 'UNAVAILABLE'}
      </div>
    </TacticalPanel>
  );
}

function EvolutionTo({
  evolvesTo,
  onNavigate,
}: {
  evolvesTo: EvoTarget[];
  onNavigate: (id: number, name: string) => void;
}) {
  if (!evolvesTo || evolvesTo.length === 0) return null;
  return (
    <TacticalPanel variant="blue" className="group space-y-4 rounded-none border border-dashed p-6">
      <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:-rotate-12">
        <ChevronRight size={80} />
      </div>
      <SectionHeader
        className="relative z-10"
        colorClass="text-blue-400"
        title="Evolution"
        icon={<ChevronRight size={14} />}
      />
      <div className="relative z-10 space-y-4">
        {evolvesTo.map((evo) => (
          <div key={evo.id} className="font-bold text-xs text-zinc-300 leading-relaxed">
            TO{' '}
            <InlineLink
              aria-label={`Navigate to ${evo.name} details`}
              onClick={() => onNavigate(evo.id, evo.name)}
              variant="blue"
            >
              {evo.name.toUpperCase()}
            </InlineLink>
            <div className="mt-1 font-black text-[10px] text-blue-400/60 uppercase">VIA {evo.method}</div>
          </div>
        ))}
      </div>
    </TacticalPanel>
  );
}

function BreedingProtocol({
  breedingInfo,
  onNavigate,
}: {
  breedingInfo: BreedingInfo;
  onNavigate: (id: number, name: string) => void;
}) {
  return (
    <TacticalPanel
      variant="pink"
      className="group col-span-1 space-y-4 rounded-none border border-dashed p-6 sm:col-span-2"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform group-hover:scale-110">
        <Heart size={80} />
      </div>
      <SectionHeader
        className="relative z-10"
        colorClass="text-pink-400"
        title="Breeding Protocol"
        icon={<Heart size={14} />}
      />
      <div className="relative z-10 font-bold text-xs text-zinc-300 leading-relaxed">
        CROSS-REF:{' '}
        {breedingInfo.parentNames.map((name: string, i: number) => (
          <React.Fragment key={name}>
            <InlineLink
              aria-label={`Navigate to ${name} details`}
              onClick={() => {
                const id = breedingInfo.parentIds[i];
                if (id) onNavigate(id, name);
              }}
              variant="pink"
            >
              {name.toUpperCase()}
            </InlineLink>
            {i < breedingInfo.parentNames.length - 1 ? ', ' : ''}
          </React.Fragment>
        ))}
      </div>
      <div className="relative z-10 rounded-none border border-pink-500/10 border-dashed bg-pink-500/5 p-3 font-black text-[9px] text-pink-400/60 uppercase italic leading-relaxed tracking-widest">
        {breedingInfo.method}
      </div>
    </TacticalPanel>
  );
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2" data-testid="evolution-section">
      {yourPokemonLength === 0 && (
        <ProcurementStrategy
          evoReq={evoReq}
          pokemonId={pokemonId}
          gameVersion={gameVersion}
          saveData={saveData}
          onNavigate={onNavigate}
        />
      )}

      {evoReq && <EvolutionFrom evoReq={evoReq} hasPreEvo={hasPreEvo} onNavigate={onNavigate} />}

      {evolvesTo && evolvesTo.length > 0 && <EvolutionTo evolvesTo={evolvesTo} onNavigate={onNavigate} />}

      {breedingInfo && <BreedingProtocol breedingInfo={breedingInfo} onNavigate={onNavigate} />}
    </div>
  );
}
