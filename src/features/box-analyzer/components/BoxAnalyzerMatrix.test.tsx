import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { PokemonInstance } from '../../../engine/saveParser/parsers/common';
import type { MatrixColumn, MatrixRow } from '../types/matrix';
import { BoxAnalyzerMatrix } from './BoxAnalyzerMatrix';

const mockColumns: MatrixColumn[] = [
  { key: 'level', label: 'LEVEL', sortable: true },
  { key: 'gender', label: 'GENDER', sortable: true },
  { key: 'dvs', label: 'DVS/IVS', sortable: false },
  { key: 'total', label: 'TOTAL/AVG', sortable: true },
  { key: 'nature', label: 'NATURE', sortable: true },
  { key: 'hiddenPower', label: 'HIDDEN POWER', sortable: true },
  { key: 'shiny', label: 'SHINY', sortable: true },
];

const mockData: MatrixRow[] = [
  {
    pokemon: { speciesId: 1 } as PokemonInstance,
    level: 50,
    gender: 'M',
    dvsIvs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    calculatedIvTotal: 186,
    calculatedIvAverage: 31.0,
    nature: 'Jolly',
    hiddenPower: { type: 'Dark', power: 70 },
    isShiny: true,
  },
  {
    pokemon: { speciesId: 2 } as PokemonInstance,
    level: 100,
    gender: 'F',
    dvsIvs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    calculatedIvTotal: 0,
    calculatedIvAverage: 0.0,
    nature: 'Modest',
    hiddenPower: null,
    isShiny: false,
  },
];

describe('BoxAnalyzerMatrix', () => {
  it('renders columns correctly', async () => {
    await render(<BoxAnalyzerMatrix columns={mockColumns} data={mockData} />);

    await expect.element(page.getByText('LEVEL')).toBeInTheDocument();
    await expect.element(page.getByText('GENDER', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('DVS/IVS')).toBeInTheDocument();
    await expect.element(page.getByText('TOTAL/AVG')).toBeInTheDocument();
    await expect.element(page.getByText('NATURE')).toBeInTheDocument();
    await expect.element(page.getByText('HIDDEN POWER')).toBeInTheDocument();
    await expect.element(page.getByText('SHINY', { exact: true })).toBeInTheDocument();
  });

  it('renders row data correctly', async () => {
    await render(<BoxAnalyzerMatrix columns={mockColumns} data={mockData} />);

    await expect.element(page.getByText('Lvl 50')).toBeInTheDocument();
    await expect.element(page.getByText('M', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Jolly')).toBeInTheDocument();
    await expect.element(page.getByText('★ SHINY')).toBeInTheDocument();
    await expect.element(page.getByText('Dark (70)')).toBeInTheDocument();
  });
});
