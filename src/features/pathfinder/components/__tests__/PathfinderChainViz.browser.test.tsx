import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { pokeDB } from '../../../../db/PokeDB';
import type { MoveMetadata } from '../../../../db/schema';
import { PathfinderChainViz } from '../PathfinderChainViz';

vi.mock('../../../../db/PokeDB', () => ({
  pokeDB: {
    getMove: vi.fn<(id: number) => Promise<MoveMetadata | Error>>(),
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('PathfinderChainViz', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    queryClient.clear();
  });

  it('renders nothing when chain is empty', async () => {
    expect.hasAssertions();

    const { container } = await render(
      <QueryClientProvider client={queryClient}>
        <PathfinderChainViz chain={[]} />
      </QueryClientProvider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders the chain steps', async () => {
    expect.hasAssertions();

    const mockChain = [
      { speciesId: 1, speciesName: 'Bulbasaur', eggGroups: [1] },
      { speciesId: 2, speciesName: 'Ivysaur', eggGroups: [1], requiredGender: 'Female' as const },
    ];

    await render(
      <QueryClientProvider client={queryClient}>
        <PathfinderChainViz chain={mockChain} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('Bulbasaur', { exact: false })).toBeInTheDocument();
    await expect.element(page.getByText('Ivysaur', { exact: false })).toBeInTheDocument();
    await expect.element(page.getByText('REQ: FEMALE', { exact: false })).toBeInTheDocument();
  });

  it('renders passing move when targetMoveId is provided and fetched', async () => {
    expect.hasAssertions();

    vi.mocked(pokeDB.getMove).mockResolvedValue({ id: 33, name: 'Tackle' } as MoveMetadata);

    const mockChain = [{ speciesId: 1, speciesName: 'Bulbasaur', eggGroups: [1] }];

    await render(
      <QueryClientProvider client={queryClient}>
        <PathfinderChainViz chain={mockChain} targetMoveId={33} />
      </QueryClientProvider>,
    );

    await expect.element(page.getByText('PASSING MOVE:', { exact: false })).toBeInTheDocument();
    await expect.element(page.getByText('Tackle', { exact: false })).toBeInTheDocument();
    expect(pokeDB.getMove).toHaveBeenCalledWith(33);
  });
});
