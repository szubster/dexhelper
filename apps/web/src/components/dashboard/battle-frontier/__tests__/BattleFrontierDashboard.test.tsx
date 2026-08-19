import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { BattleFrontierDashboard } from '../BattleFrontierDashboard';

const mockSaveData: Partial<SaveData> = {
  generation: 3,
  gen3BattlePoints: 1234,
  gen3BattleFrontierWinStreaks: {
    tower: { current: 35, record: 70 },
    dome: { current: 4, record: 9 },
    palace: { current: 0, record: 0 },
    arena: { current: 0, record: 0 },
    factory: { current: 0, record: 0 },
    pike: { current: 0, record: 0 },
    pyramid: { current: 0, record: 0 },
  },
  gen3BattleFrontierSymbols: {
    tower: { silver: true, gold: true },
    dome: { silver: true, gold: false },
    palace: { silver: false, gold: false },
    arena: { silver: false, gold: false },
    factory: { silver: false, gold: false },
    pike: { silver: false, gold: false },
    pyramid: { silver: false, gold: false },
  },
};

test('returns null if generation is not 3', async () => {
  const data = { ...mockSaveData, generation: 2 } as SaveData;
  const { container } = await render(<BattleFrontierDashboard saveData={data} />);
  expect(container.innerHTML).toBe('');
});

test('renders empty state if battle frontier data is missing', async () => {
  const data = { generation: 3 } as SaveData;
  await render(<BattleFrontierDashboard saveData={data} />);
  await expect.element(page.getByText('NO BATTLE FRONTIER DATA FOUND')).toBeInTheDocument();
});

test('renders dashboard with correct data', async () => {
  const data = mockSaveData as SaveData;
  await render(<BattleFrontierDashboard saveData={data} />);

  await expect.element(page.getByText('COMBAT SIMULATION MATRIX')).toBeInTheDocument();
  await expect.element(page.getByText('1234 BP')).toBeInTheDocument();

  await expect.element(page.getByText('[ BATTLE TOWER ]')).toBeInTheDocument();
  await expect.element(page.getByText('[ BATTLE DOME ]')).toBeInTheDocument();

  const streak35Elements = page.getByText('35').elements();
  expect(streak35Elements.length).toBeGreaterThan(0);

  const targetElements = page.getByText('TARGET').elements();
  expect(targetElements.length).toBeGreaterThan(0);

  const silverSymbolElements = page.getByText('SILVER SYMBOL ACQUIRED').elements();
  expect(silverSymbolElements.length).toBeGreaterThan(0);

  const goldSymbolElements = page.getByText('GOLD SYMBOL ACQUIRED').elements();
  expect(goldSymbolElements.length).toBeGreaterThan(0);
});

test('does not throw an error if no symbols or win streaks exist', async () => {
  const data = { generation: 3, gen3BattlePoints: 100 } as SaveData;
  await render(<BattleFrontierDashboard saveData={data} />);
  await expect.element(page.getByText('NO BATTLE FRONTIER DATA FOUND')).toBeInTheDocument();
});

test('does not throw an error if no battle points exist', async () => {
  const data = {
    generation: 3,
    gen3BattleFrontierWinStreaks: mockSaveData.gen3BattleFrontierWinStreaks,
    gen3BattleFrontierSymbols: mockSaveData.gen3BattleFrontierSymbols,
  } as SaveData;
  await render(<BattleFrontierDashboard saveData={data} />);
  await expect.element(page.getByText('NO BATTLE FRONTIER DATA FOUND')).toBeInTheDocument();
});

test('renders with no facilities safely', async () => {
  const data = {
    generation: 3,
    gen3BattlePoints: 100,
    gen3BattleFrontierWinStreaks: {},
    gen3BattleFrontierSymbols: {},
  } as unknown as SaveData;
  await render(<BattleFrontierDashboard saveData={data} />);
  await expect.element(page.getByText('COMBAT SIMULATION MATRIX')).toBeInTheDocument();
});
