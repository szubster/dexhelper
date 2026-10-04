import type React from 'react';
import { ClearFiltersBadge } from './ClearFiltersBadge';
import { FilterBadge } from './FilterBadge';
import { TacticalBadge } from './TacticalBadge';
import { TacticalButton } from './TacticalButton';
import { TacticalCard } from './TacticalCard';
import { TacticalInput } from './TacticalInput';
import { TacticalPanel } from './TacticalPanel';

export const TacticalKitchenSink: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Filter Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <FilterBadge isActive={false} label="SECURED" variant="cyan" />
        <FilterBadge isActive={true} label="MISSING" variant="emerald" count={12} />
        <FilterBadge isActive={true} label="DEX_ONLY" variant="amber" count={5} />
        <ClearFiltersBadge isActive={false} onClick={() => {}} />
        <ClearFiltersBadge isActive={true} onClick={() => {}} />
      </div>

      {/* Badges */}
      <TacticalBadge variant="primary" id="badge-primary">
        Primary
      </TacticalBadge>
      <TacticalBadge variant="amber" id="badge-amber">
        Amber
      </TacticalBadge>
      <TacticalBadge variant="red" id="badge-red">
        Red
      </TacticalBadge>
      <TacticalBadge variant="zinc" id="badge-zinc">
        Zinc
      </TacticalBadge>
      <TacticalBadge variant="blue" id="badge-blue">
        Blue
      </TacticalBadge>
      <TacticalBadge variant="emerald" id="badge-emerald">
        Emerald
      </TacticalBadge>
      <TacticalBadge variant="rose" id="badge-rose">
        Rose
      </TacticalBadge>
      <TacticalBadge variant="pink" id="badge-pink">
        Pink
      </TacticalBadge>

      {/* Buttons */}
      <TacticalButton variant="default" id="btn-default">
        Default
      </TacticalButton>
      <TacticalButton variant="primary" id="btn-primary">
        Primary
      </TacticalButton>
      <TacticalButton variant="danger" id="btn-danger">
        Danger
      </TacticalButton>
      <TacticalButton variant="danger-outline" id="btn-danger-outline">
        Danger Outline
      </TacticalButton>
      <TacticalButton variant="secondary" id="btn-secondary">
        Secondary
      </TacticalButton>
      <TacticalButton variant="sidebar" id="btn-sidebar">
        Sidebar
      </TacticalButton>

      {/* Panels */}
      <TacticalPanel variant="emerald" id="panel-emerald">
        Emerald
      </TacticalPanel>
      <TacticalPanel variant="amber" id="panel-amber">
        Amber
      </TacticalPanel>
      <TacticalPanel variant="cyan" id="panel-cyan">
        Cyan
      </TacticalPanel>
      <TacticalPanel variant="red" id="panel-red">
        Red
      </TacticalPanel>
      <TacticalPanel variant="purple" id="panel-purple">
        Purple
      </TacticalPanel>
      <TacticalPanel variant="blue" id="panel-blue">
        Blue
      </TacticalPanel>
      <TacticalPanel variant="pink" id="panel-pink">
        Pink
      </TacticalPanel>
      <TacticalPanel variant="white" id="panel-white">
        White
      </TacticalPanel>
      <TacticalPanel variant="default" id="panel-default">
        Default
      </TacticalPanel>

      {/* Cards */}
      <TacticalCard variant="default" testId="card-default">
        Default
      </TacticalCard>
      <TacticalCard variant="emerald" testId="card-emerald">
        Emerald
      </TacticalCard>
      <TacticalCard variant="amber" testId="card-amber">
        Amber
      </TacticalCard>
      <TacticalCard variant="storage-cyan" testId="card-storage-cyan">
        Storage Cyan
      </TacticalCard>
      <TacticalCard variant="storage-amber" testId="card-storage-amber">
        Storage Amber
      </TacticalCard>
      <TacticalCard variant="storage-red" testId="card-storage-red">
        Storage Red
      </TacticalCard>

      {/* Input */}
      <TacticalInput id="input-default" />
    </div>
  );
};
