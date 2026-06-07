import { createFileRoute } from '@tanstack/react-router';
import { RunDashboard } from '../components/run/RunDashboard';

export const Route = createFileRoute('/run')({
  component: RunPage,
});

function RunPage() {
  return (
    <div className="flex h-full flex-col pt-4">
      <RunDashboard />
    </div>
  );
}
