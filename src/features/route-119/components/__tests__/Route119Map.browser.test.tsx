import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { isGen3Save } from '../../../../engine/saveParser/parsers/common';
import { useStore } from '../../../../store';
import { Route119Map } from '../Route119Map';

vi.mock('../../../../store', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: mock
  useStore: vi.fn<any>(),
}));

vi.mock('../../../../engine/saveParser/parsers/common', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: mock
  isGen3Save: vi.fn<any>(),
}));

describe('Route119Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders empty state when not Gen 3 save', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 1 });
    vi.mocked(isGen3Save).mockReturnValue(false);

    await render(<Route119Map />);
    await expect.element(page.getByText('NO FEEBAS TILE DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders empty state when no tiles available', async () => {
    vi.mocked(useStore).mockReturnValue({ generation: 3, gen3FeebasTiles: [] });
    vi.mocked(isGen3Save).mockReturnValue(true);

    await render(<Route119Map />);
    await expect.element(page.getByText('NO FEEBAS TILE DATA AVAILABLE')).toBeInTheDocument();
  });

  it('renders map with active tiles correctly', async () => {
    const tiles: [number, number][] = [
      [9, 7], // A valid tile
    ];
    vi.mocked(useStore).mockReturnValue({ generation: 3, gen3FeebasTiles: tiles });
    vi.mocked(isGen3Save).mockReturnValue(true);

    await render(<Route119Map />);

    await expect.element(page.getByText('Route 119 Layout (Visual Map)')).toBeInTheDocument();
  });
});
