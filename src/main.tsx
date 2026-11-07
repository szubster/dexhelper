import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FeatureFlagProvider } from './contexts/FeatureFlagContext';
import { Gen3BattleFrontierProvider } from './contexts/Gen3BattleFrontierContext';
import { Gen3MissedItemsProvider } from './contexts/Gen3MissedItemsContext';
import { Gen3RTCProvider } from './contexts/Gen3RTCContext';
import { TimeOverrideProvider } from './contexts/TimeOverrideContext';
import { pokeDB } from './db/PokeDB';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';
import './index.css';

import { getMostRecentSave, getPreviousSave, writeSaveState } from './engine/storage/historyDb';
import { useStore } from './store';

declare global {
  interface Window {
    useStore: typeof useStore;
    writeSaveState: typeof writeSaveState;
    getMostRecentSave: typeof getMostRecentSave;
    getPreviousSave: typeof getPreviousSave;
  }
}

// Expose store and API to window for E2E testing
if (import.meta.env.MODE === 'development' || import.meta.env.MODE === 'test') {
  window.useStore = useStore;
  window.writeSaveState = writeSaveState;
  window.getMostRecentSave = getMostRecentSave;
  window.getPreviousSave = getPreviousSave;
}

// Self-heal stale PWA installs: if a lazy chunk (e.g. save parsers loaded after picking a save)
// 404s because a newer deploy removed it, drop the old service worker/caches and reload once.
const recoverFromStaleBuild = () => {
  const key = 'dexhelper:preload-reload';
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, '1');
  void (async () => {
    try {
      const regs = await navigator.serviceWorker?.getRegistrations();
      await Promise.all((regs ?? []).map((r) => r.unregister()));
      const names = await caches.keys();
      await Promise.all(names.map((n) => caches.delete(n)));
    } finally {
      window.location.reload();
    }
  })();
};
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  recoverFromStaleBuild();
});
window.addEventListener('unhandledrejection', (event) => {
  const message = event.reason instanceof Error ? event.reason.message : String(event.reason);
  if (message.includes('Failed to fetch dynamically imported module')) recoverFromStaleBuild();
});

// Initialize and sync PokeData
pokeDB.sync().catch(() => console.error('System: sync failed'));

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  basepath: import.meta.env.BASE_URL,
  defaultViewTransition: true,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <FeatureFlagProvider>
      <QueryClientProvider client={queryClient}>
        <Gen3RTCProvider>
          <TimeOverrideProvider>
            <Gen3MissedItemsProvider>
              <Gen3BattleFrontierProvider>
                <RouterProvider router={router} />
              </Gen3BattleFrontierProvider>
            </Gen3MissedItemsProvider>
          </TimeOverrideProvider>
        </Gen3RTCProvider>
      </QueryClientProvider>
    </FeatureFlagProvider>
  </StrictMode>,
);
