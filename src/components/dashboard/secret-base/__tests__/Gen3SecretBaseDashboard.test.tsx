import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
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
        { battledOwnerToday: false, trainerName: 'Brock' },
        { battledOwnerToday: false, trainerName: 'May' },
      ],
      gen3TrainerRematchFlags: [0, 0, 1, 0],
    } as unknown as SaveData;
    void render(<Gen3SecretBaseDashboard saveData={saveData} />);

    await expect.element(page.getByText('SECRET BASE REMATCHES')).toBeInTheDocument();

    await expect.element(page.getByText('Ash')).toBeInTheDocument();
    await expect.element(page.getByText('Misty')).toBeInTheDocument();
    await expect.element(page.getByText('Brock')).toBeInTheDocument();
    await expect.element(page.getByText('May')).toBeInTheDocument();

    const availableElements = page.getByText('[ BATTLE AVAILABLE ]').elements();
    await expect.poll(() => availableElements.length).toBe(2);

    const battledElements = page.getByText('[ ALREADY BATTLED ]').elements();
    await expect.poll(() => battledElements.length).toBe(2);
  });
});
