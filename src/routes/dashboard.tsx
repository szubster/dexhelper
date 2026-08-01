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
const GlobalRibbonChecklistDashboard = React.lazy(() =>
  import('../components/dashboard/ribbons/GlobalRibbonChecklistDashboard').then((m) => ({
    default: m.GlobalRibbonChecklistDashboard,
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
      <Suspense fallback={<div className="h-32 animate-pulse rounded-lg bg-zinc-900/50" />}>
        {saveData.generation === 3 ? (
          <>
            <BattleFrontierDashboard saveData={saveData} />
            <GlobalRibbonChecklistDashboard />
          </>
        ) : (
          <ShinyCarrierBreedingDashboard />
        )}
      </Suspense>
    </div>
  );
}
