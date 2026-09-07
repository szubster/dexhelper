import { beforeAll, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { HiddenCertificate } from './HiddenCertificate';

describe('HiddenCertificate Component', () => {
  const mockRecord = {
    playerName: 'JULES',
    pokemon: [
      { speciesId: 25, level: 50, nickname: 'PIKACHU' },
      { speciesId: 1, level: 5, nickname: 'BULBASAUR' },
    ],
  };

  beforeAll(() => {
    // Only mock it if it's not already defined as a non-configurable property
    if (!document.fonts) {
      Object.defineProperty(document, 'fonts', {
        value: {
          ready: Promise.resolve(),
        },
        configurable: true,
      });
    }
  });

  it('should render the full certificate with provided data once fonts are loaded', async () => {
    if (document.fonts) {
      Object.defineProperty(document.fonts, 'ready', {
        value: Promise.resolve(),
        configurable: true,
      });
    }

    void render(<HiddenCertificate record={mockRecord} gameVersion="emerald" />);

    await expect.element(page.getByText('HALL OF FAME')).toBeInTheDocument();

    await expect.element(page.getByText('TRAINER: JULES')).toBeInTheDocument();
    await expect.element(page.getByText('VERSION: EMERALD')).toBeInTheDocument();
    await expect.element(page.getByText('PIKACHU')).toBeInTheDocument();
    await expect.element(page.getByText('Lvl 50')).toBeInTheDocument();
    await expect.element(page.getByText('#25')).toBeInTheDocument();

    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();
    await expect.element(page.getByText('Lvl 5', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('#1')).toBeInTheDocument();
  });

  it('should not render full certificate while fonts are loading, but render them when loaded', async () => {
    let resolveFonts: () => void = () => {};
    const fontsPromise = new Promise<void>((resolve) => {
      resolveFonts = resolve;
    });

    if (document.fonts) {
      Object.defineProperty(document.fonts, 'ready', {
        value: fontsPromise,
        configurable: true,
      });
    }

    void render(<HiddenCertificate record={mockRecord} gameVersion="emerald" />);

    // Check that HALL OF FAME text is not rendered yet
    await expect.element(page.getByText('HALL OF FAME')).not.toBeInTheDocument();

    // Resolve the fonts promise
    resolveFonts();

    // Now the full certificate should be rendered
    await expect.element(page.getByText('HALL OF FAME')).toBeInTheDocument();
  });
});
