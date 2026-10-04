import { createFileRoute } from '@tanstack/react-router';
import { LayoutGrid, ShieldAlert } from 'lucide-react';

import { EmptyState } from '../components/EmptyState';
import { TacticalBlockHeader } from '../components/TacticalBlockHeader';
import { TacticalPanel } from '../components/TacticalPanel';
import { useStore } from '../store';

export const Route = createFileRoute('/gen3-dashboard')({
  component: Gen3DashboardPage,
});

function Gen3DashboardPage() {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 3) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="GEN 3 DASHBOARD UNAVAILABLE" />;
  }

  return (
    <div className="mb-20 flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)] md:mb-0">
      <TacticalPanel className="flex flex-col gap-4 p-4">
        <TacticalBlockHeader
          title="Gen 3 Transition Dashboard"
          trackingLabel="SYS.G3DB.STATUS"
          icon={<LayoutGrid size={12} />}
        />
        <div className="flex flex-col gap-4">
          {/* Trackers will go here */}
          <div className="flex h-32 items-center justify-center border border-zinc-800 border-dashed bg-zinc-900/50">
            <span className="font-mono text-sm text-zinc-500">[ AWAITING MODULES ]</span>
          </div>
        </div>
      </TacticalPanel>
    </div>
  );
}
