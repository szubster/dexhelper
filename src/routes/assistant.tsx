import { createFileRoute } from '@tanstack/react-router';
import { AssistantPanel } from '../components/AssistantPanel';
import { useAppState } from '../state';

export const Route = createFileRoute('/assistant')({
  component: AssistantPage,
});

function AssistantPage() {
  const { saveData, isLivingDex, manualVersion } = useAppState();

  if (!saveData) {
    return null;
  }

  return (
    <div className="pt-4 h-full flex flex-col">
      <AssistantPanel saveData={saveData} isLivingDex={isLivingDex} manualVersion={manualVersion} />
    </div>
  );
}
