import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import React, { Suspense } from 'react';
import { EmptyState } from '../components/EmptyState';
import { useSafariZoneSelection } from '../components/safari-zone/useSafariZoneSelection';
import { TacticalBadge } from '../components/TacticalBadge';
import { useStore } from '../store';

const SafariZoneEncountersList = React.lazy(() => import('../components/safari-zone/SafariZoneEncountersList'));
const SafariTargetSelection = React.lazy(() =>
  import('../components/safari-zone/SafariTargetSelection').then((m) => ({ default: m.SafariTargetSelection })),
);

export const Route = createFileRoute('/safari-zone')({
  component: SafariZonePage,
});

function SafariZonePage() {
  const saveData = useStore((s) => s.saveData);
  const selection = useSafariZoneSelection({
    initialVersion:
      saveData?.gameVersion === 'red' ||
      saveData?.gameVersion === 'blue' ||
      saveData?.gameVersion === 'yellow' ||
      saveData?.gameVersion === 'ruby' ||
      saveData?.gameVersion === 'sapphire' ||
      saveData?.gameVersion === 'emerald' ||
      saveData?.gameVersion === 'firered' ||
      saveData?.gameVersion === 'leafgreen'
        ? saveData.gameVersion
        : 'emerald',
  });

  if (!saveData) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="SAFARI ZONE TELEMETRY UNLINKED" />;
  }

  if (saveData.generation === 2) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="SAFARI ZONE UNAVAILABLE IN GEN 2" />;
  }

  return (
    <div className="flex h-full flex-col gap-6 pt-4 pb-20">
      <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-4">
        <div>
          <span className="border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/10 px-2 py-0.5 font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-widest">
            SAFARI_ZONE.SYS
          </span>
          <h1 className="mt-1 font-black font-mono text-2xl text-white uppercase tracking-tight">
            SAFARI ZONE MISSING ENCOUNTERS
          </h1>
        </div>
        <TacticalBadge variant="emerald" dot pulse>
          [ MODE: {saveData.gameVersion.toUpperCase()} ]
        </TacticalBadge>
      </div>

      <Suspense fallback={<EmptyState label="INITIALIZING SAFARI ZONE TELEMETRY..." />}>
        <SafariTargetSelection selection={selection} />
        <SafariZoneEncountersList saveData={saveData} />
      </Suspense>
    </div>
  );
}
