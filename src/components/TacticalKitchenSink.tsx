import type React from 'react';
import { useState } from 'react';
import { TacticalBadge } from './TacticalBadge';
import { TacticalButton } from './TacticalButton';
import { TacticalCard } from './TacticalCard';
import { TacticalInput } from './TacticalInput';
import { TacticalModal } from './TacticalModal';
import { TacticalPanel } from './TacticalPanel';

export const TacticalKitchenSink: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <TacticalButton size="sm" id="btn-size-sm">
        Small
      </TacticalButton>
      <TacticalButton size="lg" id="btn-size-lg">
        Large
      </TacticalButton>
      <TacticalButton size="icon" id="btn-size-icon">
        I
      </TacticalButton>
      <TacticalButton disabled id="btn-disabled">
        Disabled
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
      <TacticalCard disabled testId="card-disabled">
        Disabled
      </TacticalCard>

      {/* Input */}
      <TacticalInput id="input-default" />
      <TacticalInput disabled id="input-disabled" placeholder="DISABLED" />

      {/* Modal */}
      <TacticalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TacticalPanel variant="emerald" className="p-6">
          <h2 className="font-bold text-xl">Tactical Modal Content</h2>
          <p className="mt-2 text-zinc-300">This is a complex slotted layout inside a modal.</p>
          <div className="mt-4 flex justify-end">
            <TacticalButton variant="secondary" id="btn-close-modal" onClick={() => setIsModalOpen(false)}>
              Close
            </TacticalButton>
          </div>
        </TacticalPanel>
      </TacticalModal>
    </div>
  );
};
