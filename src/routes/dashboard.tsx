import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import { BattleFrontierDashboard } from '../components/dashboard/battle-frontier/BattleFrontierDashboard';
import { GlobalRibbonChecklistDashboard } from '../components/dashboard/ribbons/GlobalRibbonChecklistDashboard';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../store';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 3) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="BATTLE FRONTIER UNAVAILABLE" />;
  }

  return (
    <div className="mb-20 flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)] md:mb-0">
      <BattleFrontierDashboard saveData={saveData} />
      <GlobalRibbonChecklistDashboard />
    </div>
  );
}
