import { createFileRoute } from '@tanstack/react-router';
import { AssistantPanel } from '../components/AssistantPanel';
import { useStore } from '../store';

export const Route = createFileRoute('/assistant')({
  component: AssistantPage,
});

function AssistantPage() {
  const saveData = useStore((s) => s.saveData);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const manualVersion = useStore((s) => s.manualVersion);

  if (!saveData) {
    return null;
  }

  return (
    <div className="flex h-full flex-col pt-4">
      <AssistantPanel saveData={saveData} isLivingDex={isLivingDex} manualVersion={manualVersion} />
    </div>
  );
}
