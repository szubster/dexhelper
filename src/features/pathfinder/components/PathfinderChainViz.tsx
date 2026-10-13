import { ArrowRight } from 'lucide-react';
import type React from 'react';
import { DataPoint } from '../../../components/DataPoint';
import { PokemonSprite } from '../../../components/pokemon/PokemonSprite';
import { TacticalBlockHeader } from '../../../components/TacticalBlockHeader';
import { TacticalCard } from '../../../components/TacticalCard';
import type { PathfinderChainStep, PathfinderChainVizProps } from '../types';

export const PathfinderChainViz: React.FC<PathfinderChainVizProps> = ({ chain, targetMoveId }) => {
  if (!chain || chain.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <TacticalBlockHeader title="BREEDING CHAIN ROUTE" trackingLabel="SYS.ROUTE_CALC" />

      <div className="relative flex flex-col gap-4">
        {/* Connection Line */}
        <div className="absolute top-12 bottom-12 left-8 z-0 hidden w-0.5 border-cyan-500/20 border-l border-dashed bg-cyan-900/30 md:block" />

        {chain.map((step, index) => (
          <ChainStepCard
            // biome-ignore lint/suspicious/noArrayIndexKey: Chain steps do not have unique IDs and index is stable here
            key={`${step.speciesId}-${index}`}
            step={step}
            index={index}
            isLast={index === chain.length - 1}
            isFirst={index === 0}
            targetMoveId={targetMoveId ?? null}
          />
        ))}
      </div>
    </div>
  );
};

const ChainStepCard = ({
  step,
  index,
  isLast,
  isFirst,
  targetMoveId,
}: {
  step: PathfinderChainStep;
  index: number;
  isLast: boolean;
  isFirst: boolean;
  targetMoveId?: number | null;
}) => {
  return (
    <TacticalCard
      variant="default"
      className="!cursor-default relative z-10 flex flex-col items-center gap-4 p-4 hover:scale-100 active:scale-100 md:flex-row"
    >
      {/* Generation/Step Indicator */}
      <div className="group relative flex h-[60px] min-w-[60px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-none border border-cyan-900/50 bg-black/40">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(34,211,238,0.05)_2px,rgba(34,211,238,0.05)_4px)] opacity-50" />
        <span className="relative z-10 mb-1 font-mono text-[10px] text-cyan-600 uppercase tracking-widest">
          {isFirst ? 'SOURCE' : isLast ? 'TARGET' : `STEP ${index}`}
        </span>
        <span className="relative z-10 font-bold font-mono text-cyan-400 text-xl drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Decorative Corner Ticks */}
        <div className="absolute top-0 left-0 h-1.5 w-1.5 border-cyan-500/50 border-t border-l" />
        <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-cyan-500/50 border-r border-b" />
      </div>

      {/* Arrow indicator between steps for mobile */}
      {!isFirst && <ArrowRight className="shrink-0 text-cyan-600/50 md:hidden" size={24} />}

      <div className="flex w-full flex-1 flex-col items-center gap-4 border border-zinc-800/80 border-dashed bg-zinc-950/60 p-3 sm:flex-row">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center border border-zinc-800/80 bg-black/40">
          {/* Generation hardcoded to 3 for Emerald/RS/FRLG context */}
          <PokemonSprite
            pokemonId={step.speciesId}
            generation={3}
            isShiny={false}
            className="h-[80%] w-[80%] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          />
          <div className="absolute right-0 bottom-0 p-1">
            {step.requiredGender === 'Male' ? (
              <span className="font-bold font-mono text-[10px] text-blue-400">♂</span>
            ) : step.requiredGender === 'Female' ? (
              <span className="font-bold font-mono text-[10px] text-pink-400">♀</span>
            ) : null}
          </div>
        </div>

        <div className="flex w-full flex-1 flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-bold font-mono text-lg text-white uppercase tracking-tight">{step.speciesName}</span>
            <span className="font-mono text-[10px] text-zinc-500 uppercase">
              ID.{String(step.speciesId).padStart(3, '0')}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            <DataPoint
              label="EGG GROUPS"
              value={step.eggGroups.join(', ')}
              className="min-w-0 flex-1 px-2 py-1"
              valueClassName="text-[11px]"
            />

            {step.learnedMoves && step.learnedMoves.length > 0 && targetMoveId && (
              <DataPoint
                label="PASSES MOVE"
                value={`ID.${targetMoveId}`}
                className="min-w-0 flex-1 border-cyan-900/50 px-2 py-1"
                labelClassName="text-cyan-500"
                valueClassName="text-[11px] text-cyan-400"
              />
            )}
          </div>
        </div>
      </div>
    </TacticalCard>
  );
};
