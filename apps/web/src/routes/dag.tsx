import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';

const LazyDagWrapper = lazyRouteComponent(() => import('../components/dag'), 'DagWrapper');

export const Route = createFileRoute('/dag')({
  component: DagRoute,
});

function DagRoute() {
  return (
    <div className="h-[calc(100vh-140px)] w-full">
      <LazyDagWrapper />
    </div>
  );
}
