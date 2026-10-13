import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import * as storeModule from '../../../store';
import { Gen3PokeblocksDashboard } from '../Gen3PokeblocksDashboard';

vi.mock('../../../store', () => {
  return {
    // biome-ignore lint/suspicious/noExplicitAny: Mocking zustand selector
    useStore: vi.fn<any>(),
  };
});

describe('Gen3PokeblocksDashboard', () => {
  it('renders nothing when not Gen 3', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Mocking zustand selector
    vi.mocked(storeModule.useStore).mockImplementation((selector: any) => selector({ saveData: { generation: 1 } }));
    await render(<Gen3PokeblocksDashboard />);
    await expect.element(page.getByText('POKÉBLOCKS')).not.toBeInTheDocument();
  });

  it('renders nothing when Gen 3 but no pokeblocks', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Mocking zustand selector
    vi.mocked(storeModule.useStore).mockImplementation((selector: any) =>
      selector({ saveData: { generation: 3, gen3Pokeblocks: [] } }),
    );
    await render(<Gen3PokeblocksDashboard />);
    await expect.element(page.getByText('POKÉBLOCKS')).not.toBeInTheDocument();
  });

  it('renders pokeblocks when Gen 3 and pokeblocks exist', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Mocking zustand selector
    vi.mocked(storeModule.useStore).mockImplementation((selector: any) =>
      selector({
        saveData: {
          generation: 3,
          gen3Pokeblocks: [
            {
              color: 1,
              spicy: 10,
              dry: 20,
              sweet: 30,
              bitter: 40,
              sour: 50,
              feel: 60,
            },
          ],
        },
      }),
    );

    await render(<Gen3PokeblocksDashboard />);
    await expect.element(page.getByText('POKÉBLOCKS')).toBeInTheDocument();
    await expect.element(page.getByText('Pokéblock #1 - Color: 1')).toBeInTheDocument();
    await expect.element(page.getByText('10')).toBeInTheDocument();
    await expect.element(page.getByText('20')).toBeInTheDocument();
    await expect.element(page.getByText('30')).toBeInTheDocument();
    await expect.element(page.getByText('40')).toBeInTheDocument();
    await expect.element(page.getByText('50')).toBeInTheDocument();
    await expect.element(page.getByText('Feel: 60')).toBeInTheDocument();
  });
});
