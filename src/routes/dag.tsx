import { createFileRoute } from '@tanstack/react-router';
import { DagDashboard } from '../components/dag';

export const Route = createFileRoute('/dag')({
  component: DagRoute,
});

function DagRoute() {
  return (
    <div className="h-[calc(100vh-140px)] w-full">
      <DagDashboard />
    </div>
  );
}
