import { createFileRoute } from '@tanstack/react-router';
import { SafariZoneLayout } from '../components/safari-zone/SafariZoneLayout';
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
      <SafariZoneLayout
        sidePanel={<div className="border border-dashed p-4 font-mono text-zinc-400">Side Panel Area</div>}
      >
        <h1 className="font-mono text-2xl text-white">Safari Zone Main Area</h1>
      </SafariZoneLayout>
    </div>
  );
}
