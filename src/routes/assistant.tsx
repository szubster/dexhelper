import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import { AssistantPanel } from '../components/AssistantPanel';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../store';

export const Route = createFileRoute('/assistant')({
  component: AssistantPage,
});

function AssistantPage() {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const manualVersion = useStore((s) => s.manualVersion);

  if (!saveData) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="ASSISTANT TELEMETRY UNLINKED" />;
  }

  return (
    <div className="flex h-full flex-col pt-4">
      <AssistantPanel saveData={saveData} isLivingDex={isLivingDex} manualVersion={manualVersion} />
    </div>
  );
}
