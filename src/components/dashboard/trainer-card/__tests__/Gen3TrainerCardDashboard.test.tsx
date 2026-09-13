import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { Gen3TrainerCardDashboard } from '../Gen3TrainerCardDashboard';

describe('Gen3TrainerCardDashboard', () => {
  it('renders nothing if not gen3', async () => {
    void render(<Gen3TrainerCardDashboard saveData={{ generation: 2 } as SaveData} />);
    await expect.element(page.getByText('TRAINER CARD UPGRADES')).not.toBeInTheDocument();
  });

  it('renders nothing if gen3TrainerCard is missing', async () => {
    void render(<Gen3TrainerCardDashboard saveData={{ generation: 3 } as SaveData} />);
    await expect.element(page.getByText('TRAINER CARD UPGRADES')).not.toBeInTheDocument();
  });

  it('renders trainer card upgrades accurately', async () => {
    const saveData = {
      generation: 3,
      gen3TrainerCard: {
        hasHallOfFame: true,
        hasHoennDex: false,
        hasNationalDex: true,
        hasContestMaster: false,
        hasBattleFrontier: true,
      },
    } as SaveData;

    void render(<Gen3TrainerCardDashboard saveData={saveData} />);

    await expect.element(page.getByText('TRAINER CARD UPGRADES')).toBeInTheDocument();
    await expect.element(page.getByText('Hall of Fame Debut')).toBeInTheDocument();
    await expect.element(page.getByText('Hoenn Pokédex Complete')).toBeInTheDocument();
    await expect.element(page.getByText('National Pokédex Complete')).toBeInTheDocument();
    await expect.element(page.getByText('Master Rank Contest Won')).toBeInTheDocument();
    await expect.element(page.getByText('Battle Frontier Gold Symbols')).toBeInTheDocument();
  });
});
