import { EdgeLabel, TacticalInput } from '@dexhelper/ui';
import type React from 'react';
import type { Nature } from '../../../engine/gen3/contests/types';
import { NATURES } from '../../../engine/gen3/nature';
import { useStore } from '../../../store';
import { TacticalSegmentedControl } from '../../TacticalSegmentedControl';
import { TacticalSelect } from '../../TacticalSelect';

export function AttributeFilters() {
  const attributeFilters = useStore((s) => s.attributeFilters) || {};
  const setAttributeFilters = useStore((s) => s.setAttributeFilters);

  if (!setAttributeFilters) return null;

  const handleNatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAttributeFilters({ ...attributeFilters, nature: e.target.value as Nature | '' });
  };

  const handleGenderChange = (value: string) => {
    setAttributeFilters({ ...attributeFilters, gender: value as string });
  };

  const handleAbilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributeFilters({ ...attributeFilters, ability: e.target.value });
  };

  const handleHeldItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttributeFilters({ ...attributeFilters, heldItem: e.target.value });
  };

  return (
    <div className="relative flex w-full flex-col gap-4 border border-dashed border-zinc-700 bg-zinc-950/80 p-4 xl:flex-row xl:flex-wrap">
      <EdgeLabel className="-top-2 left-5 bg-zinc-950 px-2 tracking-[0.2em] text-zinc-400">ATTRIBUTE_FILTERS</EdgeLabel>

      <div className="min-w-[200px] flex-1">
        <div className="mb-1 font-mono text-[10px] text-zinc-500">NATURE</div>
        <TacticalSelect value={attributeFilters.nature || ''} onChange={handleNatureChange}>
          <option value="">Any</option>
          {NATURES.map((nature) => (
            <option key={nature} value={nature}>
              {nature.charAt(0).toUpperCase() + nature.slice(1)}
            </option>
          ))}
        </TacticalSelect>
      </div>

      <div className="min-w-[200px] flex-1">
        <div className="mb-1 font-mono text-[10px] text-zinc-500">GENDER</div>
        <TacticalSegmentedControl
          items={[
            { id: '', label: 'Any' },
            { id: 'Male', label: 'Male', variant: 'blue' },
            { id: 'Female', label: 'Female', variant: 'red' },
            { id: 'Genderless', label: 'None', variant: 'default' },
          ]}
          selectedValue={attributeFilters.gender || ''}
          onValueChange={handleGenderChange}
          containerClassName="h-9"
        />
      </div>

      <div className="min-w-[200px] flex-1">
        <div className="mb-1 font-mono text-[10px] text-zinc-500">ABILITY</div>
        <TacticalInput
          placeholder="Ability name..."
          value={attributeFilters.ability || ''}
          onChange={handleAbilityChange}
          className="h-9 py-0 pl-2 text-xs"
        />
      </div>

      <div className="min-w-[200px] flex-1">
        <div className="mb-1 font-mono text-[10px] text-zinc-500">HELD ITEM</div>
        <TacticalInput
          placeholder="Item name..."
          value={attributeFilters.heldItem || ''}
          onChange={handleHeldItemChange}
          className="h-9 py-0 pl-2 text-xs"
        />
      </div>
    </div>
  );
}
