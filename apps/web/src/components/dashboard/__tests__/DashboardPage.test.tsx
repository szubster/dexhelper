import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { Route } from '../../../routes/dashboard';
import { useStore } from '../../../store';

const queryClient = new QueryClient();

describe('DashboardPage', () => {
  beforeEach(() => {
    queryClient.clear();
    useStore.setState({ saveData: null });
  });

  const Component = Route.options.component;

  it('renders unavailable state for gen 1', async () => {
    useStore.setState({
      saveData: { generation: 1 } as SaveData,
    });

    await render(<QueryClientProvider client={queryClient}>{Component ? <Component /> : null}</QueryClientProvider>);

    await expect.element(page.getByText('BATTLE FRONTIER UNAVAILABLE')).toBeVisible();
  });

  it('renders Gen 3 dashboard', async () => {
    useStore.setState({
      saveData: { generation: 3, gameVersion: 'emerald', partyDetails: [], pcDetails: [] } as unknown as SaveData,
    });

    await render(<QueryClientProvider client={queryClient}>{Component ? <Component /> : null}</QueryClientProvider>);

    await expect.element(page.getByText(/BATTLE FRONTIER/i).first()).toBeVisible();
  });

  it('renders Gen 2 dashboard', async () => {
    useStore.setState({
      saveData: { generation: 2, partyDetails: [], pcDetails: [] } as unknown as SaveData,
    });

    await render(<QueryClientProvider client={queryClient}>{Component ? <Component /> : null}</QueryClientProvider>);

    await expect.element(page.getByText(/SHINY CARRIER/i).first()).toBeVisible();
  });
});
