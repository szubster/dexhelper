import type React from 'react';
import { Suspense } from 'react';

export interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  height?: string;
  width?: string;
}

export function LazyLoadWrapper({ children, fallback, height = 'h-full', width = 'w-full' }: LazyLoadWrapperProps) {
  return (
    <Suspense
      fallback={
        fallback || <div data-testid="tactical-skeleton-fallback" className={`tactical-skeleton ${width} ${height}`} />
      }
    >
      {children}
    </Suspense>
  );
}
