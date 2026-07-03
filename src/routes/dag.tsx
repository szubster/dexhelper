import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { DagProvider } from '../components/dashboard/DagContext';

const LazyDagDashboard = lazyRouteComponent(() => import('../components/dag'), 'DagDashboard');

export const Route = createFileRoute('/dag')({
  component: DagRoute,
});

function DagRoute() {
  return (
    <DagProvider>
      <div className="h-[calc(100vh-140px)] w-full">
        <LazyDagDashboard />
      </div>
    </DagProvider>
  );
}
