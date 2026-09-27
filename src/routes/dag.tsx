import { createFileRoute } from '@tanstack/react-router';
import React, { Suspense } from 'react';

const LazyDagWrapper = React.lazy(() => import('../components/dag').then((m) => ({ default: m.DagWrapper })));

export const Route = createFileRoute('/dag')({
  component: DagRoute,
});

function DagRoute() {
  return (
    <div className="h-[calc(100vh-140px)] w-full">
      <Suspense fallback={<div className="tactical-skeleton h-full w-full" />}>
        <LazyDagWrapper />
      </Suspense>
    </div>
  );
}
