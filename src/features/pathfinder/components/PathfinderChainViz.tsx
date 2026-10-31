import { useQuery } from '@tanstack/react-query';
import type React from 'react';
import { Fragment } from 'react';
import { TacticalPanel } from '../../../components/TacticalPanel';
import { pokeDB } from '../../../db/PokeDB';
import type { PathfinderChainVizProps } from '../types';

export const PathfinderChainViz: React.FC<PathfinderChainVizProps> = ({ chain, targetMoveId }) => {
  const { data: moveData } = useQuery({
    queryKey: ['move', targetMoveId],
    queryFn: () => (targetMoveId ? pokeDB.getMove(targetMoveId) : null),
    enabled: !!targetMoveId && targetMoveId > 0,
  });

  if (!chain || chain.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {chain.map((step, index) => {
        // Safe key generation without relying solely on index
        const stepKey = `chain-step-${step.speciesId}-${step.requiredGender || 'any'}-${index}`;
        return (
          <Fragment key={stepKey}>
            <TacticalPanel className="flex-1 p-4" variant="cyan">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 font-mono text-xs tracking-widest text-cyan-500/70">STEP {index + 1}</div>
                  <div className="text-lg font-bold tracking-wider uppercase">{step.speciesName}</div>

                  {targetMoveId && moveData && !(moveData instanceof Error) && (
                    <div className="mt-2 font-mono text-xs">
                      <span className="text-zinc-500">PASSING MOVE:</span>{' '}
                      <span className="font-bold text-cyan-400">{moveData.name}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {step.requiredGender && (
                    <div className="mb-1 font-mono text-xs text-zinc-400">REQ: {step.requiredGender.toUpperCase()}</div>
                  )}
                </div>
              </div>
            </TacticalPanel>

            {index < chain.length - 1 && (
              <div className="flex justify-center text-cyan-500/50">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
