import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { pokeDB } from './db/PokeDB';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';
import './index.css';

// Initialize and sync PokeData
pokeDB.sync().catch(console.error);

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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
