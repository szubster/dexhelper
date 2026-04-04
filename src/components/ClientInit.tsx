import { useEffect } from 'react';
import * as Store from '../store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../queryClient';

export function ClientInit() {
  useEffect(() => {
    Store.loadSaveFromStorage();
  }, []);

  // We mount the QueryClientProvider here so it wraps all client-side React islands
  // uniformly via a global provider. Wait, Astro islands are separate roots.
  // Using a shared QueryClientProvider at the layout level in Astro isn't natively supported
  // because each client island creates its own React root.
  // However, since we define `queryClient` in a shared JS module `queryClient.ts`,
  // React Query will actually use the same client instance across islands as long as each island
  // wraps itself in `<QueryClientProvider client={queryClient}>`, or we wrap the entire Layout
  // if Astro allows it (Astro doesn't wrap islands).

  return null;
}
