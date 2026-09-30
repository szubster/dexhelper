import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/index';
import { useStore } from '../../store';
import { Route } from '../assistant';

const queryClient = new QueryClient();

describe('AssistantPage Route', () => {
  beforeEach(() => {
    queryClient.clear();
    useStore.setState({ saveData: null });
  });

  const Component = Route.options.component;

  it('renders unlinked empty state when saveData is null', async () => {
    await render(<QueryClientProvider client={queryClient}>{Component ? <Component /> : null}</QueryClientProvider>);
    await expect.element(page.getByText('ASSISTANT TELEMETRY UNLINKED')).toBeVisible();
  });

  it('renders assistant panel when saveData is provided', async () => {
    useStore.setState({
      saveData: {
        generation: 3,
        gameVersion: 'emerald',
        owned: new Set<number>(),
        seen: new Set<number>(),
        partyDetails: [],
        pcDetails: [],
      } as unknown as SaveData,
    });
    await render(<QueryClientProvider client={queryClient}>{Component ? <Component /> : null}</QueryClientProvider>);
    await expect.element(page.getByText(/ASSISTANT/i).first()).toBeVisible();
  });
});
