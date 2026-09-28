import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { renderCertificate } from '../../../../utils/hof/render';
import { HallOfFameDashboard } from '../HallOfFameDashboard';

vi.mock('../../../../utils/hof/render', () => ({
  renderCertificate: vi.fn<() => Promise<Blob | null>>(),
}));

describe('HallOfFameDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing if no hallOfFameRecords', async () => {
    await render(<HallOfFameDashboard saveData={{ hallOfFameRecords: [] } as unknown as SaveData} />);
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

    await render(<HallOfFameDashboard saveData={saveData} />);

    await expect.element(page.getByText('HALL OF FAME RECORDS')).toBeInTheDocument();
    await expect.element(page.getByText('TOTAL ENTRIES: 1')).toBeInTheDocument();
    await expect.element(page.getByText('LATEST TEAM: ASH')).toBeInTheDocument();
    await expect.element(page.getByText('2 POKÉMON')).toBeInTheDocument();
    await expect.element(page.getByText('EXPORT CERTIFICATE')).toBeInTheDocument();
  });

  it('handles export click and sets state', async () => {
    const originalCreateObjectURL = URL.createObjectURL.bind(URL);
    const originalRevokeObjectURL = URL.revokeObjectURL.bind(URL);

    const mockCreateObjectURL = vi.fn<typeof URL.createObjectURL>(() => 'blob:http://localhost/mock');
    const mockRevokeObjectURL = vi.fn<typeof URL.revokeObjectURL>();

    URL.createObjectURL = mockCreateObjectURL;
    URL.revokeObjectURL = mockRevokeObjectURL;

    try {
      const mockBlob = new Blob(['mock'], { type: 'image/png' });
      vi.mocked(renderCertificate).mockResolvedValue(mockBlob);

      // We need to inject a dummy element so document.getElementById finds it
      let div = document.getElementById('hof-certificate-hidden-container');
      if (!div) {
        div = document.createElement('div');
        div.id = 'hof-certificate-hidden-container';
        document.body.appendChild(div);
      }

      const saveData = {
        gameVersion: 'emerald',
        hallOfFameRecords: [
          {
            playerName: 'ASH',
            pokemon: [{ speciesId: 25, level: 50, nickname: 'PIKACHU' }],
          },
        ],
      } as unknown as SaveData;

      await render(<HallOfFameDashboard saveData={saveData} />);

      await page.getByText('EXPORT CERTIFICATE').click();

      // Wait for it to finish exporting
      await expect.element(page.getByText('EXPORT CERTIFICATE')).toBeInTheDocument();

      // Check if it was called
      expect(renderCertificate).toHaveBeenCalled();

      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);
      // Let any async tasks finish
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/mock');
    } finally {
      URL.createObjectURL = originalCreateObjectURL;
      URL.revokeObjectURL = originalRevokeObjectURL;
      vi.restoreAllMocks();
      const div = document.getElementById('hof-certificate-hidden-container');
      if (div) {
        document.body.removeChild(div);
      }
    }
  });
});
