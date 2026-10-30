import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser';
import { RoamerDossier } from '../RoamerDossier';

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

// --- Gen 2 Roamer Tests ---

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

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).toBeVisible();
  await expect.element(page.getByText(/ID: 243/i)).toBeVisible();
  await expect.element(page.getByText('[ TRACKING ACTIVE ]')).toBeVisible();
  await expect.element(page.getByText('LOC: Route 38 (Group 1, ID 9)')).toBeVisible();
});

test('renders inactive Gen 2 roamer correctly', async () => {
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

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).toBeVisible();
  await expect.element(page.getByText('[ INACTIVE ]')).toBeVisible();
});

// --- Gen 3 Roamer Tests ---

test('renders active Gen 3 roamer data correctly', async () => {
  const saveData: SaveData = {
    generation: 3,
    roamingLegendaries: [
      {
        speciesId: 380, // Latias
        level: 40,
        isActive: true,
        hp: 120,
        statusCondition: 0,
        personalityValue: 0x12345678,
        ivs: { hp: 31, atk: 14, def: 20, spAtk: 15, spDef: 30, spd: 25 },
      },
    ],
  } as unknown as SaveData;

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).toBeVisible();
  await expect.element(page.getByText('[ ACTIVE ]')).toBeVisible();
  await expect.element(page.getByText('40')).toBeVisible();
  await expect.element(page.getByText('0x12345678')).toBeVisible();
});

test('renders inactive Gen 3 roamer correctly', async () => {
  const saveData: SaveData = {
    generation: 3,
    roamingLegendaries: [
      {
        speciesId: 381, // Latios
        level: 40,
        isActive: false,
        hp: 0,
        statusCondition: 0,
        personalityValue: 0,
        ivs: { hp: 0, atk: 0, def: 0, spAtk: 0, spDef: 0, spd: 0 },
      },
    ],
  } as unknown as SaveData;

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).toBeVisible();
  await expect.element(page.getByText('[ INACTIVE ]')).toBeVisible();
});

test('renders Gen 3 IV glitch warning when non-HP IVs are zero', async () => {
  const saveData: SaveData = {
    generation: 3,
    roamingLegendaries: [
      {
        speciesId: 380, // Latias
        level: 40,
        isActive: true,
        hp: 120,
        statusCondition: 0,
        personalityValue: 0x12345678,
        ivs: { hp: 31, atk: 4, def: 0, spAtk: 0, spDef: 0, spd: 0 },
      },
    ],
  } as unknown as SaveData;

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText(/Severe IV Truncation/i)).toBeVisible();
});

// --- General Guard Tests ---

test('does not render anything if not Gen 2 or Gen 3', async () => {
  const saveData: SaveData = {
    generation: 1,
    roamingLegendaries: [
      {
        speciesId: 150,
        level: 70,
        isActive: true,
        hp: 250,
        statusCondition: 0,
      },
    ],
  } as unknown as SaveData;

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).not.toBeInTheDocument();
});

test('does not render anything if no roamingLegendaries', async () => {
  const saveData: SaveData = {
    generation: 3,
    roamingLegendaries: [],
  } as unknown as SaveData;

  await render(<RoamerDossier saveData={saveData} />, { wrapper: createWrapper() });

  await expect.element(page.getByText('Roamer Dossier')).not.toBeInTheDocument();
});
