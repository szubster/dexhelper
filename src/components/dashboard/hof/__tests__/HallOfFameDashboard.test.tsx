import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { HallOfFameDashboard } from '../HallOfFameDashboard';

vi.mock('../../../../utils/hof/render', () => ({
  renderCertificate: vi.fn<() => Promise<Blob | null>>(),
}));

describe('HallOfFameDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing if no hallOfFameRecords', async () => {
    void render(<HallOfFameDashboard saveData={{ hallOfFameRecords: [] } as unknown as SaveData} />);
    await expect.element(page.getByText('HALL OF FAME RECORDS')).not.toBeInTheDocument();
  });

  it('renders the latest record correctly', async () => {
    const saveData = {
      gameVersion: 'emerald',
      hallOfFameRecords: [
        {
          playerName: 'ASH',
          pokemon: [
            { speciesId: 25, level: 50, nickname: 'PIKACHU' },
            { speciesId: 1, level: 5, nickname: 'BULBASAUR' },
          ],
        },
      ],
    } as unknown as SaveData;

    void render(<HallOfFameDashboard saveData={saveData} />);

    await expect.element(page.getByText('HALL OF FAME RECORDS')).toBeInTheDocument();
    await expect.element(page.getByText('TOTAL ENTRIES: 1')).toBeInTheDocument();
    await expect.element(page.getByText('LATEST TEAM: ASH')).toBeInTheDocument();
    await expect.element(page.getByText('2 POKÉMON')).toBeInTheDocument();
    await expect.element(page.getByText('EXPORT CERTIFICATE')).toBeInTheDocument();
  });
});
