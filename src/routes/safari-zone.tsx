import { createFileRoute } from '@tanstack/react-router';
import { useStore } from '../store';

export const Route = createFileRoute('/safari-zone')({
  component: SafariZonePage,
});

function SafariZonePage() {
  const saveData = useStore((s) => s.saveData);

  if (!saveData) {
    return null;
  }

  return (
    <div className="flex h-full flex-col pt-4">
      <h1 className="font-mono text-2xl text-white">Safari Zone</h1>
    </div>
  );
}
