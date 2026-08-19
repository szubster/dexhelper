import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { ConcurrentGameContextType } from '../../../contexts/ConcurrentGameContext';
import { useConcurrentGame } from '../../../contexts/ConcurrentGameContext';
import { GameSwitcher } from '../GameSwitcher';

vi.mock('../../../contexts/ConcurrentGameContext', () => ({
  useConcurrentGame: vi.fn<() => ConcurrentGameContextType>(),
}));

describe('GameSwitcher', () => {
  const mockSetActivePlaythrough = vi.fn<(id: string | null) => void>();
  const mockRemovePlaythrough = vi.fn<(id: string) => void>();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders null when there are no playthroughs', async () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: { playthroughs: [], activePlaythroughId: null },
      setActivePlaythrough: mockSetActivePlaythrough,
      removePlaythrough: mockRemovePlaythrough,
      addPlaythrough: vi.fn<() => void>(),
    });

    await render(<GameSwitcher />);
    await expect.element(page.getByText('Active PT')).not.toBeInTheDocument();
  });

  it('renders a select dropdown when playthroughs exist', async () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: {
        playthroughs: [{ id: '1', name: 'Emerald PT', gameVersion: 'emerald', lastPlayed: Date.now() }],
        activePlaythroughId: '1',
      },
      setActivePlaythrough: mockSetActivePlaythrough,
      removePlaythrough: mockRemovePlaythrough,
      addPlaythrough: vi.fn<() => void>(),
    });

    await render(<GameSwitcher />);
    await expect.element(page.getByText('Active PT')).toBeVisible();
    await expect.element(page.getByRole('combobox')).toBeVisible();
    // Options are not inherently visible unless dropdown is open in vitest-browser-react/playwright sometimes
    await expect.element(page.getByText('Emerald PT (emerald)')).toBeInTheDocument();
  });

  it('calls setActivePlaythrough on selection change', async () => {
    vi.mocked(useConcurrentGame).mockReturnValue({
      state: {
        playthroughs: [
          { id: '1', name: 'Emerald PT', gameVersion: 'emerald', lastPlayed: Date.now() },
          { id: '2', name: 'Ruby PT', gameVersion: 'ruby', lastPlayed: Date.now() },
        ],
        activePlaythroughId: '1',
      },
      setActivePlaythrough: mockSetActivePlaythrough,
      removePlaythrough: mockRemovePlaythrough,
      addPlaythrough: vi.fn<() => void>(),
    });

    await render(<GameSwitcher />);
    const select = page.getByRole('combobox');
    await userEvent.selectOptions(select, '2');

    expect(mockSetActivePlaythrough).toHaveBeenCalledWith('2');
  });
});
