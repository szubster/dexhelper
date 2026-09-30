import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../engine/saveParser/parsers/common';
import SafariZoneEncountersList from './SafariZoneEncountersList';

const queryClient = new QueryClient();

const renderWithQuery = (children: ReactNode) => {
  return render(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
};

describe('SafariZoneEncountersList', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders secured empty state when missingAreas is empty', async () => {
    const saveData = {
      generation: 1,
      gameVersion: 'yellow',
      // Owned contains all Gen 1 Safari Zone species
      owned: new Set(Array.from({ length: 151 }, (_, i) => i + 1)),
      party: [],
      pc: [],
    } as unknown as SaveData;

    await renderWithQuery(<SafariZoneEncountersList saveData={saveData} />);
    await expect.element(page.getByText('ALL SAFARI ENCOUNTERS SECURED')).toBeVisible();
  });

  it('renders Gen 1 missing encounters correctly', async () => {
    const saveData = {
      generation: 1,
      gameVersion: 'yellow',
      owned: new Set<number>(),
      party: [],
      pc: [],
    } as unknown as SaveData;

    await renderWithQuery(<SafariZoneEncountersList saveData={saveData} />);
    await expect.element(page.getByText(/KANTO-SAFARI-ZONE/i).first()).toBeVisible();
    await expect.element(page.getByText(/RATE:/i).first()).toBeVisible();
  });

  it('renders Gen 3 missing encounters correctly', async () => {
    const saveData = {
      generation: 3,
      gameVersion: 'emerald',
      owned: new Set<number>(),
      party: [],
      pc: [],
    } as unknown as SaveData;

    await renderWithQuery(<SafariZoneEncountersList saveData={saveData} />);
    await expect.element(page.getByText(/HOENN-SAFARI-ZONE/i).first()).toBeVisible();
    await expect.element(page.getByText(/RATE:/i).first()).toBeVisible();
  });

  it('returns empty array when generation is not 1 or 3', async () => {
    const saveData = {
      generation: 2,
      gameVersion: 'crystal',
      owned: new Set<number>(),
      party: [],
      pc: [],
    } as unknown as SaveData;

    await renderWithQuery(<SafariZoneEncountersList saveData={saveData} />);
    await expect.element(page.getByText('ALL SAFARI ENCOUNTERS SECURED')).toBeVisible();
  });
});
