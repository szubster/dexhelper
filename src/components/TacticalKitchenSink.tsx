import { TacticalBadge, TacticalButton, TacticalInput } from '@dexhelper/ui';
import type React from 'react';
import { useState } from 'react';
import { Gen3MapProvider } from '../contexts/Gen3MapContext';
import { Gen3EventFlags } from './Gen3EventFlags/Gen3EventFlags';
import { Gen3MapDashboard } from './map/gen3/Gen3MapDashboard';
import { SubDataPoint } from './SubDataPoint';
import { TacticalCard } from './TacticalCard';
import { TacticalCheckbox } from './TacticalCheckbox';
import { TacticalChip } from './TacticalChip';
import { TacticalModal } from './TacticalModal';
import { TacticalPanel } from './TacticalPanel';
import { TacticalProgressBar } from './TacticalProgressBar';

export const TacticalKitchenSink: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);

  return (
    <div className="flex flex-col gap-4 p-4">
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

      {/* Modal Trigger */}
      <TacticalButton variant="primary" id="btn-open-modal" onClick={() => setIsModalOpen(true)}>
        Open Modal
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

      {/* Checkbox Showcase */}
      <div className="flex flex-col gap-2 border border-dashed border-zinc-800 p-4" id="tacticalcheckbox-showcase">
        <TacticalCheckbox
          id="checkbox-default"
          label="Option Active"
          checked={isCheckboxChecked}
          onChange={(e) => setIsCheckboxChecked(e.target.checked)}
        />
        <TacticalCheckbox id="checkbox-disabled" label="Option Disabled" disabled />
      </div>

      {/* Modal */}
      <TacticalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TacticalPanel variant="emerald" className="p-6">
          <h2 className="text-xl font-bold">Tactical Modal Content</h2>
          <p className="mt-2 text-zinc-300">This is a complex slotted layout inside a modal.</p>
          <div className="mt-4 flex justify-end">
            <TacticalButton variant="secondary" id="btn-close-modal" onClick={() => setIsModalOpen(false)}>
              Close
            </TacticalButton>
          </div>
        </TacticalPanel>
      </TacticalModal>

      {/* SubDataPoint Showcase */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" id="subdatapoint-showcase">
        <SubDataPoint label="OT_ID" value="ASH / 12345" />
        <SubDataPoint label="HELD_ITEM" value="SOOTHE BELL" />
        <SubDataPoint label="SYNC_RATE" value="255 PT" />
        <SubDataPoint label="STATUS" value="ACTIVE_LINK" />
      </div>

      {/* TacticalChip Showcase */}
      <div
        className="flex flex-wrap items-center gap-2 border border-dashed border-zinc-800 p-4"
        id="tacticalchip-showcase"
      >
        <TacticalChip variant="primary" codeTag="SYS.01" sublabel="99%">
          Primary Chip
        </TacticalChip>
        <TacticalChip variant="zinc" codeTag="MEM" sublabel="128MB">
          Zinc Chip
        </TacticalChip>
        <TacticalChip variant="danger" codeTag="WARN" sublabel="CRIT">
          Danger Chip
        </TacticalChip>
        <TacticalChip variant="amber" codeTag="STAT" sublabel="WARN">
          Amber Chip
        </TacticalChip>
        <TacticalChip variant="emerald" codeTag="ITEM" sublabel="100%">
          Emerald Chip
        </TacticalChip>
        <TacticalChip variant="purple" codeTag="MOD" sublabel="SYNC">
          Purple Chip
        </TacticalChip>
        <TacticalChip variant="primary" size="sm" codeTag="MINI">
          Mini Chip
        </TacticalChip>
      </div>

      {/* TacticalProgressBar Showcase */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" id="tacticalprogressbar-showcase">
        <TacticalProgressBar label="POWER" value={210} max={255} codeTag="SYS.PWR" variant="emerald" />
        <TacticalProgressBar label="SYNC_RATE" value={180} max={255} codeTag="NET.LNK" variant="blue" />
        <TacticalProgressBar label="TEMP" value={230} max={255} codeTag="THERM" variant="amber" />
        <TacticalProgressBar label="CORE_OVERLOAD" value={250} max={255} codeTag="WARN" variant="red" />
        {/* Gen3 Event Flags */}
        <div className="flex flex-col gap-2 border border-zinc-800 p-2">
          <h3 className="font-mono text-[10px] text-zinc-500">Gen 3 Event Flags</h3>
          <Gen3EventFlags eonTicket={true} mysticTicket={false} auroraTicket={true} oldSeaMap={false} />
        </div>
      </div>

      {/* Gen 3 Map */}
      <Gen3MapProvider>
        <Gen3MapDashboard />
      </Gen3MapProvider>
    </div>
  );
};
