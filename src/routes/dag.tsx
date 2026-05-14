import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

const LazyDagDashboard = lazyRouteComponent(() => import('../components/dag'), 'DagDashboard');

export const Route = createFileRoute('/dag')({
  component: DagRoute,
});

function DagRoute() {
  return (
    <div className="h-[calc(100vh-140px)] w-full">
      <LazyDagDashboard />
    </div>
  );
}
