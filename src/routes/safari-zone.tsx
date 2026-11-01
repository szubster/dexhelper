import { TacticalBadge } from '@dexhelper/ui';
import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import React, { Suspense } from 'react';
import { EmptyState } from '../components/EmptyState';
import { SafariBountyBoard } from '../components/safari-zone/SafariBountyBoard';
import { useSafariZoneSelection } from '../components/safari-zone/useSafariZoneSelection';
import { useStore } from '../store';

const SafariZoneEncountersList = React.lazy(() => import('../components/safari-zone/SafariZoneEncountersList'));
const SafariAreaMap = React.lazy(() =>
  import('../components/safari-zone/SafariAreaMap').then((m) => ({ default: m.SafariAreaMap })),
);
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
      <div className="flex items-center justify-between border-b border-dashed border-zinc-800 pb-4">
        <div>
          <span className="border border-dashed border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 px-2 py-0.5 font-mono text-[10px] tracking-widest text-[var(--theme-primary)] uppercase">
            SAFARI_ZONE.SYS
          </span>
          <h1 className="mt-1 font-mono text-2xl font-black tracking-tight text-white uppercase">
            SAFARI ZONE MISSING ENCOUNTERS
          </h1>
        </div>
        <TacticalBadge variant="emerald" dot pulse>
          [ MODE: {saveData.gameVersion.toUpperCase()} ]
        </TacticalBadge>
      </div>

      <Suspense fallback={<EmptyState label="INITIALIZING SAFARI ZONE TELEMETRY..." />}>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <SafariTargetSelection selection={selection} />
            <React.Suspense fallback={<EmptyState label="INITIALIZING MAP..." />}>
              <SafariAreaMap selection={selection} />
            </React.Suspense>
            <SafariZoneEncountersList saveData={saveData} />
          </div>
          <div className="w-full shrink-0 lg:w-80">
            <SafariBountyBoard />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
