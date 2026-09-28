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
    const originalCreateObjectURL = URL.createObjectURL;
    const originalRevokeObjectURL = URL.revokeObjectURL;

    // Instead of mocking the document node and causing appendChild errors,
    // we can spy on window.URL functions and trust that the browser creates and clicks the 'a' tag.
    // The only thing we need to verify is that URL.createObjectURL was called and we await for the export button state to revert.

    URL.createObjectURL = vi.fn<typeof URL.createObjectURL>(() => 'blob:http://localhost/mock');
    URL.revokeObjectURL = vi.fn<typeof URL.revokeObjectURL>();

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

      expect(URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      // Let any async tasks finish
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:http://localhost/mock');
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
