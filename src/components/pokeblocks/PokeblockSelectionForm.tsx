import type React from 'react';
import { usePokeblock } from '../../contexts/pokeblock/PokeblockContext';
import type { ContestCondition, Nature } from '../../engine/gen3/contests/types';
import { EdgeLabel } from '../EdgeLabel';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalButton } from '../TacticalButton';
import { TacticalInput } from '../TacticalInput';
import { TacticalPanel } from '../TacticalPanel';
import { TacticalSelect } from '../TacticalSelect';

const NATURES: Nature[] = [
  'hardy',
  'bold',
  'modest',
  'calm',
  'timid',
  'lonely',
  'docile',
  'mild',
  'gentle',
  'hasty',
  'adamant',
  'impish',
  'bashful',
  'careful',
  'rash',
  'jolly',
  'naughty',
  'lax',
  'quirky',
  'naive',
  'brave',
  'relaxed',
  'quiet',
  'sassy',
  'serious',
];

const CONTEST_CONDITIONS: ContestCondition[] = ['cool', 'beauty', 'cute', 'smart', 'tough'];

export const PokeblockSelectionForm: React.FC = () => {
  const {
    currentCondition,
    setCurrentCondition,
    currentSheen,
    setCurrentSheen,
    targetCondition,
    setTargetCondition,
    targetCategory,
    setTargetCategory,
    nature,
    setNature,
    numPlayers,
    setNumPlayers,
    calculateRecommendation,
  } = usePokeblock();

  return (
    <div className="flex flex-col gap-2">
      <TacticalBlockHeader title="Target Settings" trackingLabel="POKEBLOCK TARGET" />
      <TacticalPanel className="p-4">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="group relative">
              <TacticalSelect value={nature} onChange={(e) => setNature(e.target.value as Nature)}>
                {NATURES.map((n) => (
                  <option key={n} value={n}>
                    {n.charAt(0).toUpperCase() + n.slice(1)}
                  </option>
                ))}
              </TacticalSelect>
              <EdgeLabel className="pointer-events-none -top-2 left-4 transition-colors group-focus-within:text-[var(--theme-primary)]">
                Nature
              </EdgeLabel>
            </div>

            <div className="group relative">
              <TacticalSelect
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value as ContestCondition)}
              >
                {CONTEST_CONDITIONS.map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </TacticalSelect>
              <EdgeLabel className="pointer-events-none -top-2 left-4 transition-colors group-focus-within:text-[var(--theme-primary)]">
                Target Category
              </EdgeLabel>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4">
            <TacticalInput
              label="Current Condition"
              type="number"
              min={0}
              max={255}
              value={currentCondition.toString()}
              onChange={(e) => setCurrentCondition(Number(e.target.value))}
            />
            <TacticalInput
              label="Current Sheen"
              type="number"
              min={0}
              max={255}
              value={currentSheen.toString()}
              onChange={(e) => setCurrentSheen(Number(e.target.value))}
            />
          </div>

          <div className="mt-2 grid grid-cols-2 gap-4">
            <TacticalInput
              label="Target Condition"
              type="number"
              min={0}
              max={255}
              value={targetCondition.toString()}
              onChange={(e) => setTargetCondition(Number(e.target.value))}
            />
            <TacticalInput
              label="Num Players"
              type="number"
              min={1}
              max={4}
              value={numPlayers.toString()}
              onChange={(e) => setNumPlayers(Number(e.target.value))}
            />
          </div>

          <TacticalButton onClick={calculateRecommendation} variant="primary" className="mt-4">
            Calculate Recommendation
          </TacticalButton>
        </div>
      </TacticalPanel>
    </div>
  );
};
