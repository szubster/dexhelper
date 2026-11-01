import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { NPCList } from './NPCList';

describe('NPCList', () => {
  it('renders a list of NPCs', async () => {
    await render(<NPCList selectedNpcId={null} onSelect={vi.fn<(id: number) => void>()} />);

    await expect.element(page.getByText('Fame Checker Targets')).toBeInTheDocument();
    await expect.element(page.getByText('Prof. Oak')).toBeInTheDocument();
    await expect.element(page.getByText('Brock')).toBeInTheDocument();
  });

  it('calls onSelect when an NPC is clicked', async () => {
    const onSelect = vi.fn<(id: number) => void>();
    await render(<NPCList selectedNpcId={null} onSelect={onSelect} />);

    const oakButton = page.getByRole('button', { name: 'Prof. Oak' });
    await oakButton.click();

    expect(onSelect).toHaveBeenCalledWith(0);
  });
});
