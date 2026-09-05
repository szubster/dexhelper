import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import React, { Suspense } from 'react';
import { EmptyState } from '../components/EmptyState';

import { useStore } from '../store';

// ⚡ Bolt: Lazy load generation-specific dashboards to reduce initial bundle size
const BattleFrontierDashboard = React.lazy(() =>
  import('../components/dashboard/battle-frontier/BattleFrontierDashboard').then((m) => ({
    default: m.BattleFrontierDashboard,
  })),
);
const ShinyCarrierBreedingDashboard = React.lazy(() =>
  import('../components/dashboard/breeding/ShinyCarrierBreedingDashboard').then((m) => ({
    default: m.ShinyCarrierBreedingDashboard,
  })),
);
const Gen3SecretBaseDashboard = React.lazy(() =>
  import('../components/dashboard/secret-base/Gen3SecretBaseDashboard').then((m) => ({
    default: m.Gen3SecretBaseDashboard,
  })),
);

const Gen3TrickHouseDashboard = React.lazy(() =>
  import('../components/dashboard/trick-house/Gen3TrickHouseDashboard').then((m) => ({
    default: m.Gen3TrickHouseDashboard,
  })),
);

const Gen3NpcTrades = React.lazy(() =>
  import('../components/dashboard/trades/Gen3NpcTrades').then((m) => ({ default: m.Gen3NpcTrades })),
);

const Gen3RoamerDossier = React.lazy(() =>
  import('../features/roamer/components/Gen3RoamerDossier').then((m) => ({
    default: m.Gen3RoamerDossier,
  })),
);

const Gen3StaticEncountersDashboard = React.lazy(() =>
  import('../components/dashboard/encounters/Gen3StaticEncountersDashboard').then((m) => ({
    default: m.Gen3StaticEncountersDashboard,
  })),
);

const Gen3EventItemsDashboard = React.lazy(() =>
  import('../components/dashboard/inventory/Gen3EventItemsDashboard').then((m) => ({
    default: m.Gen3EventItemsDashboard,
  })),
);

const GlobalRibbonChecklistDashboard = React.lazy(() =>
  import('../components/dashboard/ribbons/GlobalRibbonChecklistDashboard').then((m) => ({
    default: m.GlobalRibbonChecklistDashboard,
  })),
);

const Gen2NpcTrades = React.lazy(() =>
  import('../components/dashboard/trades/Gen2NpcTrades').then((m) => ({ default: m.Gen2NpcTrades })),
);

const ActiveCallersDashboard = React.lazy(() =>
  import('../components/dashboard/pokegear/ActiveCallersDashboard').then((m) => ({
    default: m.ActiveCallersDashboard,
  })),
);

const Gen2Checklist = React.lazy(() =>
  import('../components/dashboard/checklist/Gen2Checklist').then((m) => ({
    default: m.Gen2Checklist,
  })),
);

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 3 && saveData?.generation !== 2) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="BATTLE FRONTIER UNAVAILABLE" />;
  }

  return (
    <div className="mb-20 flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)] md:mb-0">
      <Suspense fallback={<div className="tactical-skeleton h-32" />}>
        {saveData.generation === 3 ? (
          <>
            <Gen3RoamerDossier saveData={saveData} />
            <BattleFrontierDashboard saveData={saveData} />
            <GlobalRibbonChecklistDashboard />
            <Gen3SecretBaseDashboard saveData={saveData} />
            <Gen3EventItemsDashboard saveData={saveData} />
            <Gen3StaticEncountersDashboard saveData={saveData} />
            <Gen3TrickHouseDashboard saveData={saveData} />
            <Gen3NpcTrades />
          </>
        ) : (
          <>
            <Gen2Checklist />
            {saveData.gen2PokegearPhone?.highValueContacts && (
              <ActiveCallersDashboard
                contacts={saveData.gen2PokegearPhone.highValueContacts}
                timerState={{ delayMinsRemaining: 0, timeCyclesSinceLastCall: 0 }}
              />
            )}
            <Gen2NpcTrades />
            <ShinyCarrierBreedingDashboard />
          </>
        )}
      </Suspense>
    </div>
  );
}
