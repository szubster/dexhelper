import { AlertTriangle, ArrowUpCircle, Check, ChevronRight, Heart, RadioReceiver, Target, X } from 'lucide-react';
import React from 'react';
import { stadiumRewardsData } from '../../../engine/data/shared/staticData';
import type { SaveData } from '../../../engine/saveParser/index';
import { cn } from '../../../utils/cn';
import { DataLabel } from '../../DataLabel';
import { InlineLink } from '../../InlineLink';
import { TacticalBadge } from '../../TacticalBadge';
import { TacticalBlockHeader } from '../../TacticalBlockHeader';
import { TacticalNode } from '../../TacticalNode';
import { TelemetryDecoration } from '../../TelemetryDecoration';

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
  const stadiumRewards = React.useMemo(() => {
    const rewardObj = stadiumRewardsData[pokemonId];
    if (!rewardObj) return null;
    const gen = saveData?.generation || (['gold', 'silver', 'crystal'].includes(gameVersion) ? 2 : 1);
    const rewards = gen === 2 ? rewardObj.stadium2 : rewardObj.stadium1;
    return rewards && rewards.length > 0 ? { gen, rewards } : null;
  }, [pokemonId, saveData, gameVersion]);

  return (
    <TacticalNode variant="red" className="col-span-1 sm:col-span-2">
      <TelemetryDecoration
        label="PROCUREMENT_RATING: CRITICAL"
        className="top-0 right-0 left-0 justify-center border-r-0 border-l-0"
        textClassName="text-red-500"
      />
      <div className="flex flex-col gap-4 p-4 pt-6 pl-6">
        <TacticalBlockHeader
          variant="red"
          icon={<Target size={10} />}
          trackingLabel="[ OBJECTIVE_LINK ]"
          title="PROCUREMENT STRATEGY"
          trailingIcon={<AlertTriangle size={14} />}
        />

        <div className="relative z-10 flex flex-col gap-2">
          <DataLabel>STATUS REPORT</DataLabel>
          <div className="border border-red-500/30 border-dashed bg-zinc-950/80 p-3">
            <div className="font-bold text-sm text-zinc-300 leading-relaxed">
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
            </div>
          </div>
          {stadiumRewards && (
            <div className="mt-2 flex flex-col gap-2">
              <DataLabel>ALTERNATE_EXTRACTION</DataLabel>
              <div className="flex flex-wrap gap-2">
                {stadiumRewards.rewards.map((r) => (
                  <TacticalBadge
                    key={r}
                    variant="red"
                    className="border-red-500/20 bg-red-500/10 py-0.5 text-[9px] text-red-500"
                  >
                    [ STADIUM {stadiumRewards.gen} REWARD: {r.toUpperCase()} ]
                  </TacticalBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </TacticalNode>
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
    <TacticalNode variant="purple" className="col-span-1">
      <TelemetryDecoration
        label="PRE-EVOLUTION MATRIX"
        className="top-0 right-0 left-0 justify-center border-r-0 border-l-0"
        textClassName="text-purple-400"
      />
      <div className="flex h-full flex-col gap-4 p-4 pt-6 pl-6">
        <TacticalBlockHeader
          variant="purple"
          icon={<ArrowUpCircle size={10} />}
          trackingLabel="[ LINEAGE_LINK ]"
          title="ORIGIN SPECIES"
        />

        <div className="relative z-10 flex flex-1 flex-col gap-2">
          <DataLabel>PRE_EVOLUTION_LINK</DataLabel>
          <div className="flex flex-1 flex-col justify-center border border-purple-500/30 border-dashed bg-zinc-950/80 p-3">
            <div className="mb-2 font-bold text-sm text-zinc-300 leading-relaxed">
              <InlineLink
                aria-label={`Navigate to ${evoReq.fromName} details`}
                onClick={() => onNavigate(evoReq.fromId, evoReq.fromName)}
                variant="purple"
                className="font-mono text-[11px] text-purple-400"
              >
                [ {evoReq.fromName.toUpperCase()} ]
              </InlineLink>
            </div>
            <div className="font-black text-[10px] text-purple-400/60 uppercase">METHOD: {evoReq.method}</div>
            <div className="mt-4 flex items-center justify-between border-zinc-800 border-t border-dashed pt-2">
              <DataLabel>ASSET_STATUS</DataLabel>
              <div
                className={cn(
                  'relative z-10 inline-flex items-center gap-2 rounded-none border border-dashed px-2 py-1 font-black text-[9px] uppercase tracking-widest',
                  hasPreEvo
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                    : 'border-red-500/30 bg-red-500/10 text-red-500',
                )}
              >
                {hasPreEvo ? <Check size={10} /> : <X size={10} />} {hasPreEvo ? 'SECURED' : 'UNAVAILABLE'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TacticalNode>
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
    <TacticalNode variant="blue" className="col-span-1">
      <TelemetryDecoration
        label="FORWARD EVOLUTION MATRIX"
        className="top-0 right-0 left-0 justify-center border-r-0 border-l-0"
        textClassName="text-blue-400"
      />
      <div className="flex h-full flex-col gap-4 p-4 pt-6 pl-6">
        <TacticalBlockHeader
          variant="blue"
          icon={<ChevronRight size={10} />}
          trackingLabel="[ TRAJECTORY_LINK ]"
          title="NEXT PHASE"
        />

        <div className="relative z-10 flex flex-1 flex-col gap-2">
          <DataLabel>EVOLUTION_TRAJECTORY</DataLabel>
          <div className="flex flex-col gap-2">
            {evolvesTo.map((evo) => (
              <div
                key={evo.id}
                className="relative flex flex-col gap-1.5 border border-zinc-800 border-dashed bg-zinc-950/80 p-2 transition-colors hover:border-blue-500/40"
              >
                <div className="flex items-center justify-between">
                  <InlineLink
                    aria-label={`Navigate to ${evo.name} details`}
                    onClick={() => onNavigate(evo.id, evo.name)}
                    variant="blue"
                    className="font-bold font-mono text-blue-400 text-sm tracking-tight"
                  >
                    [ {evo.name.toUpperCase()} ]
                  </InlineLink>
                </div>
                <div className="border border-blue-500/20 bg-blue-500/10 px-2 py-1 font-black font-mono text-[9px] text-blue-400 uppercase">
                  VIA {evo.method}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TacticalNode>
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
    <TacticalNode variant="pink" className="col-span-1 sm:col-span-2">
      <TelemetryDecoration
        label="BREEDING MATRIX"
        className="top-0 right-0 left-0 justify-center border-r-0 border-l-0"
        textClassName="text-pink-400"
      />
      <div className="flex flex-col gap-4 p-4 pt-6 pl-6">
        <TacticalBlockHeader
          variant="pink"
          icon={<RadioReceiver size={10} />}
          trackingLabel="[ REPRODUCTION_LINK ]"
          title="BREEDING PROTOCOL"
          trailingIcon={<Heart size={14} />}
        />

        <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <DataLabel>CROSS_REFERENCE</DataLabel>
            <div className="flex flex-wrap gap-2 border border-pink-500/30 border-dashed bg-zinc-950/80 p-3">
              {breedingInfo.parentNames.map((name: string, i: number) => (
                <React.Fragment key={name}>
                  <InlineLink
                    aria-label={`Navigate to ${name} details`}
                    onClick={() => {
                      const id = breedingInfo.parentIds[i];
                      if (id) onNavigate(id, name);
                    }}
                    variant="pink"
                    className="font-mono text-[11px] text-pink-400"
                  >
                    [ {name.toUpperCase()} ]
                  </InlineLink>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <DataLabel>METHODOLOGY</DataLabel>
            <div className="relative z-10 rounded-none border border-pink-500/30 border-dashed bg-pink-500/10 p-3 font-black text-[10px] text-pink-400 uppercase leading-relaxed tracking-widest">
              {breedingInfo.method}
            </div>
          </div>
        </div>
      </div>
    </TacticalNode>
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
