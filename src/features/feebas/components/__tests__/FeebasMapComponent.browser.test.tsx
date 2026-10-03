import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { isGen3Save } from '../../../../engine/saveParser/parsers/common';
import { useStore } from '../../../../store';
import { FeebasMapComponent } from '../FeebasMapComponent';

vi.mock('../../../../store', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: <mock function needs any for typing mockReturnValue>
  useStore: vi.fn<any>(),
}));

vi.mock('../../../../engine/saveParser/parsers/common', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: <mock function needs any for typing mockReturnValue>
  isGen3Save: vi.fn<any>(),
}));

describe('FeebasMapComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when not Gen 3 save', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 1 });
    vi.mocked(isGen3Save).mockReturnValue(false);

    await render(<FeebasMapComponent />);
    await expect.element(page.getByText('NO FEEBAS TILE DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders empty state when no tiles available', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 3, gen3FeebasTiles: [] });
    vi.mocked(isGen3Save).mockReturnValue(true);

    await render(<FeebasMapComponent />);
    await expect.element(page.getByText('NO FEEBAS TILE DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders empty state when tiles are undefined', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 3 });
    vi.mocked(isGen3Save).mockReturnValue(true);

    await render(<FeebasMapComponent />);
    await expect.element(page.getByText('NO FEEBAS TILE DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders tile coordinates correctly', async () => {
    const tiles: [number, number][] = [
      [10, 20],
      [15, 25],
      [5, 30],
    ];
    vi.mocked(useStore).mockReturnValue({ generation: 3, gen3FeebasTiles: tiles });
    vi.mocked(isGen3Save).mockReturnValue(true);

    await render(<FeebasMapComponent />);

    await expect.element(page.getByText('Feebas Tile Locator (Route 119)')).toBeInTheDocument();
    await expect.element(page.getByText('ACTIVE TILES [3]')).toBeInTheDocument();
    await expect.element(page.getByText('X: 10 / Y: 20')).toBeInTheDocument();
    await expect.element(page.getByText('X: 15 / Y: 25')).toBeInTheDocument();
    await expect.element(page.getByText('X: 5 / Y: 30')).toBeInTheDocument();
  });
});
