import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { AppProvider } from '../state';

export const Route = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
    </AppProvider>
  ),
});
