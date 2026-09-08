import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import React, { Suspense } from 'react';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../store';

// ⚡ Bolt: Lazy load generation-specific dashboards to reduce initial bundle size
const _BattleFrontierDashboard = React.lazy(() =>
  import('../components/dashboard/battle-frontier/BattleFrontierDashboard').then((m) => ({
    default: m.BattleFrontierDashboard,
  })),
);
const _ShinyCarrierBreedingDashboard = React.lazy(() =>
  import('../components/dashboard/breeding/ShinyCarrierBreedingDashboard').then((m) => ({
    default: m.ShinyCarrierBreedingDashboard,
  })),
);
const _Gen3SecretBaseDashboard = React.lazy(() =>
  import('../components/dashboard/secret-base/Gen3SecretBaseDashboard').then((m) => ({
    default: m.Gen3SecretBaseDashboard,
  })),
);

const _Gen3TrickHouseDashboard = React.lazy(() =>
  import('../components/dashboard/trick-house/Gen3TrickHouseDashboard').then((m) => ({
    default: m.Gen3TrickHouseDashboard,
  })),
);

const _Gen3NpcTrades = React.lazy(() =>
  import('../components/dashboard/trades/Gen3NpcTrades').then((m) => ({ default: m.Gen3NpcTrades })),
);

const _Gen3RoamerDossier = React.lazy(() =>
  import('../features/roamer/components/Gen3RoamerDossier').then((m) => ({
    default: m.Gen3RoamerDossier,
  })),
);

const _Gen3StaticEncountersDashboard = React.lazy(() =>
  import('../components/dashboard/encounters/Gen3StaticEncountersDashboard').then((m) => ({
    default: m.Gen3StaticEncountersDashboard,
  })),
);

const _Gen3LotteryDashboard = React.lazy(() =>
  import('../components/dashboard/lottery/Gen3LotteryDashboard').then((m) => ({
    default: m.Gen3LotteryDashboard,
  })),
);

const _Gen3EventItemsDashboard = React.lazy(() =>
  import('../components/dashboard/inventory/Gen3EventItemsDashboard').then((m) => ({
    default: m.Gen3EventItemsDashboard,
  })),
);

const _GlobalRibbonChecklistDashboard = React.lazy(() =>
  import('../components/dashboard/ribbons/GlobalRibbonChecklistDashboard').then((m) => ({
    default: m.GlobalRibbonChecklistDashboard,
  })),
);

const _Gen2NpcTrades = React.lazy(() =>
  import('../components/dashboard/trades/Gen2NpcTrades').then((m) => ({ default: m.Gen2NpcTrades })),
);

const _Gen2SavingsDashboard = React.lazy(() =>
  import('../components/dashboard/savings/Gen2SavingsDashboard').then((m) => ({ default: m.Gen2SavingsDashboard })),
);

const _ActiveCallersDashboard = React.lazy(() =>
  import('../components/dashboard/pokegear/ActiveCallersDashboard').then((m) => ({
    default: m.ActiveCallersDashboard,
  })),
);

const _Gen2Checklist = React.lazy(() =>
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
            </Suspense>









              <Suspense fallback={<_div _className="tactical-skeleton h-32" />}>

              </Suspense>


            <Gen3EventItemsDashboard saveData=saveData/>
            <Gen3StaticEncountersDashboard saveData=saveData/>
            <Gen3TrickHouseDashboard saveData=saveData/>
            <Gen3NpcTrades />
          </>
        ) : (
          <>
            <Gen2Checklist />
            <Gen2SavingsDashboard />saveData.gen2PokegearPhone?.highValueContacts && (
              <ActiveCallersDashboard
                contacts=saveData.gen2PokegearPhone.highValueContacts
                timerState=delayMinsRemaining: 0, timeCyclesSinceLastCall: 0
              />
            )
            <Gen2NpcTrades />
            <ShinyCarrierBreedingDashboard />
          </>
        )}
      </Suspense>
    </div>
  );
}
