import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import { BattleFrontierDashboard } from '../components/dashboard/battle-frontier/BattleFrontierDashboard';
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
    <div className="flex h-full flex-col pt-4">
      <BattleFrontierDashboard saveData={saveData} />
    </div>
  );
}
