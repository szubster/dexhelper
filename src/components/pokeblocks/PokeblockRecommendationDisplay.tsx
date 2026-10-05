import type React from 'react';
import { usePokeblock } from '../../contexts/pokeblock/PokeblockContext';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalPanel } from '../TacticalPanel';

export const PokeblockRecommendationDisplay: React.FC = () => {
  const { recommendationResult } = usePokeblock();

  if (!recommendationResult) {
    return (
      <div className="flex flex-col gap-2">
        <TacticalBlockHeader title="Recommendation Results" trackingLabel="RESULTS" />
        <TacticalPanel className="flex h-full min-h-[200px] items-center justify-center p-4">
          <div className="py-4 text-center font-mono text-gray-400 text-sm">
            No recommendation calculated yet. Adjust settings and click calculate.
          </div>
        </TacticalPanel>
      </div>
    );
  }

  const { isPossible, finalCondition, finalSheen, blends } = recommendationResult;

  return (
    <div className="flex flex-col gap-2">
      <TacticalBlockHeader title="Recommendation Results" trackingLabel="RESULTS" />
      <TacticalPanel className="p-4">
        <div className="flex flex-col gap-4">
          <div
            className={`border border-dashed p-2 ${isPossible ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}
          >
            <div className="font-bold font-mono text-sm">STATUS: {isPossible ? 'POSSIBLE' : 'NOT POSSIBLE'}</div>
            <div className="mt-1 font-mono text-xs">Final Condition: {finalCondition} / 255</div>
            <div className="font-mono text-xs">Final Sheen: {finalSheen} / 255</div>
          </div>

          {blends.length > 0 ? (
            <div className="mt-2 flex flex-col gap-2">
              <h4 className="mb-2 border-blue-900 border-b border-dashed pb-1 font-mono text-blue-400 text-sm">
                RECOMMENDED SEQUENCE
              </h4>
              <div className="custom-scrollbar max-h-[300px] overflow-y-auto pr-2">
                {blends.map((blend, idx) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: React re-renders fine here
                    key={idx}
                    className="mb-2 flex flex-col border border-gray-700 border-dashed bg-black/40 p-2"
                  >
                    <div className="font-mono text-gray-300 text-xs">
                      Step {idx + 1}: Blend {blend.berries.map((b) => b.id).join(', ')}
                    </div>
                    <div className="mt-2 grid grid-cols-5 gap-1 text-center font-mono text-[10px] text-gray-400">
                      <div className="flex flex-col">
                        <span className="text-red-400">SP</span>
                        <span>{blend.profile.spicy}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-blue-400">DR</span>
                        <span>{blend.profile.dry}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-pink-400">SW</span>
                        <span>{blend.profile.sweet}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-green-400">BI</span>
                        <span>{blend.profile.bitter}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-yellow-400">SO</span>
                        <span>{blend.profile.sour}</span>
                      </div>
                    </div>
                    <div className="mt-2 border-gray-800 border-t border-dashed pt-1 font-mono text-[10px] text-gray-500">
                      Feel: {blend.profile.feel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-gray-800 border-dashed py-4 text-center font-mono text-gray-400 text-sm">
              No blends required or possible.
            </div>
          )}
        </div>
      </TacticalPanel>
    </div>
  );
};
