import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmulatorProvider } from '../../../contexts/EmulatorContext';
import { useEmulatorStore } from '../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../engine/saveParser/index';
import { Route } from '../../../routes/dashboard';

const queryClient = new QueryClient();

describe('DashboardPage', () => {
  beforeEach(() => {
    queryClient.clear();
    useEmulatorStore.setState({ saveData: null } as unknown as ReturnType<typeof useEmulatorStore.getState>, true);
  });

  const Component = Route.options.component;

  it('renders checklist for gen 1', async () => {
    useEmulatorStore.setState({
      saveData: { generation: 1 } as SaveData,
    });

    await render(
      <QueryClientProvider client={queryClient}>
        <EmulatorProvider>{Component ? <Component /> : null}</EmulatorProvider>
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).toBeVisible();
  });

  it('renders Gen 3 dashboard', async () => {
    useEmulatorStore.setState({
      saveData: { generation: 3, gameVersion: 'emerald', partyDetails: [], pcDetails: [] } as unknown as SaveData,
    });

    await render(
      <QueryClientProvider client={queryClient}>
        <EmulatorProvider>{Component ? <Component /> : null}</EmulatorProvider>
      </QueryClientProvider>,
    );

    await expect.element(page.getByText(/BATTLE FRONTIER/i).first()).toBeVisible();
  });

  it('renders Gen 2 dashboard', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 2,
        partyDetails: [],
        pcDetails: [],
        gen2PokegearPhone: {
          highValueContacts: [],
        },
      } as unknown as SaveData,
    });

    await render(
      <QueryClientProvider client={queryClient}>
        <EmulatorProvider>{Component ? <Component /> : null}</EmulatorProvider>
      </QueryClientProvider>,
    );

    await expect.element(page.getByText(/SHINY CARRIER/i).first()).toBeVisible();
  });
});
