import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Gen3RTCProvider } from './contexts/Gen3RTCContext';
import { TimeOverrideProvider } from './contexts/TimeOverrideContext';
import { pokeDB } from './db/PokeDB';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';
import './index.css';
import { checkPhoneCall, chooseRandomCaller } from './engine/saveParser/parsers/gen2/phone/predictor';
import { useStore } from './store';

declare global {
  interface Window {
    useStore: typeof useStore;
    checkPhoneCall: typeof checkPhoneCall;
    chooseRandomCaller: typeof chooseRandomCaller;
  }
}

// Expose store to window for E2E testing
if (import.meta.env.MODE === 'development' || import.meta.env.MODE === 'test') {
  window.useStore = useStore;
  window.checkPhoneCall = checkPhoneCall;
  window.chooseRandomCaller = chooseRandomCaller;
}

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
    <QueryClientProvider client={queryClient}>
      <Gen3RTCProvider>
        <TimeOverrideProvider>
          <RouterProvider router={router} />
        </TimeOverrideProvider>
      </Gen3RTCProvider>
    </QueryClientProvider>
  </StrictMode>,
);
