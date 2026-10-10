import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser';
import { Gen2RoamerDossier } from '../Gen2RoamerDossier';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test('renders active Gen 2 roamer correctly with translated location', async () => {
  const saveData: SaveData = {
    generation: 2,
    roamingLegendaries: [
      {
        speciesId: 243, // Raikou
        level: 40,
        isActive: true,
        hp: 120,
        statusCondition: 0,
        mapGroup: 1,
        mapId: 9, // Route 38
      },
    ],
  } as unknown as SaveData;

  await render(<Gen2RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).toBeVisible();
  await expect.element(page.getByText(/ID: 243/i)).toBeVisible(); // Will render this because pokemonList is empty in mock
  await expect.element(page.getByText('[ TRACKING ACTIVE ]')).toBeVisible();
  await expect.element(page.getByText('LOC: Route 38 (Group 1, ID 9)')).toBeVisible();
});

test('renders inactive roamer correctly', async () => {
  const saveData: SaveData = {
    generation: 2,
    roamingLegendaries: [
      {
        speciesId: 244, // Entei
        level: 40,
        isActive: false,
        hp: 0,
        statusCondition: 0,
        mapGroup: 0,
        mapId: 0,
      },
    ],
  } as unknown as SaveData;

  await render(<Gen2RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).toBeVisible();
  await expect.element(page.getByText('[ INACTIVE ]')).toBeVisible();
});

test('does not render anything if not Gen 2', async () => {
  const saveData: SaveData = {
    generation: 3,
    roamingLegendaries: [
      {
        speciesId: 380, // Latias
        level: 40,
        isActive: true,
        hp: 120,
        statusCondition: 0,
      },
    ],
  } as unknown as SaveData;

  await render(<Gen2RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).not.toBeInTheDocument();
});

test('does not render anything if no roamingLegendaries in Gen 2', async () => {
  const saveData: SaveData = {
    generation: 2,
    roamingLegendaries: [],
  } as unknown as SaveData;

  await render(<Gen2RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).not.toBeInTheDocument();
});
