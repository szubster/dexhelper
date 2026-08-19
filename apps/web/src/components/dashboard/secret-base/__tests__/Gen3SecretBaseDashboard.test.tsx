import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { Gen3SecretBaseDashboard } from '../Gen3SecretBaseDashboard';

describe('Gen3SecretBaseDashboard', () => {
  it('returns null if generation is not 3', async () => {
    const saveData = { generation: 2 } as unknown as SaveData;
    void render(<Gen3SecretBaseDashboard saveData={saveData} />);
    await expect.element(page.getByText('SECRET BASE REMATCHES')).not.toBeInTheDocument();
  });

  it('returns null if no secret bases', async () => {
    const saveData = { generation: 3, gen3SecretBases: [] } as unknown as SaveData;
    void render(<Gen3SecretBaseDashboard saveData={saveData} />);
    await expect.element(page.getByText('SECRET BASE REMATCHES')).not.toBeInTheDocument();
  });

  it('renders secret bases correctly', async () => {
    const saveData = {
      generation: 3,
      gen3SecretBases: [
        { battledOwnerToday: false, trainerName: 'Ash' },
        { battledOwnerToday: true, trainerName: 'Misty' },
      ],
    } as unknown as SaveData;
    void render(<Gen3SecretBaseDashboard saveData={saveData} />);

    await expect.element(page.getByText('SECRET BASE REMATCHES')).toBeInTheDocument();

    await expect.element(page.getByText('Ash')).toBeInTheDocument();
    await expect.element(page.getByText('[ BATTLE AVAILABLE ]')).toBeInTheDocument();

    await expect.element(page.getByText('Misty')).toBeInTheDocument();
    await expect.element(page.getByText('[ ALREADY BATTLED ]')).toBeInTheDocument();
  });
});
