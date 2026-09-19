import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokerusBadge } from './PokerusBadge';

describe('PokerusBadge', () => {
  it('renders correctly with strain 0', async () => {
    await render(<PokerusBadge strain={0} />);
    await expect.element(page.getByText('[PKRS STRN: 0]')).toBeInTheDocument();
  });

  it('renders correctly with infected strain and days remaining', async () => {
    await render(<PokerusBadge strain={3} daysRemaining={2} />);
    await expect.element(page.getByText('[PKRS INF: 2D]')).toBeInTheDocument();
  });

  it('renders correctly with cured strain (0 days remaining)', async () => {
    await render(<PokerusBadge strain={3} daysRemaining={0} />);
    await expect.element(page.getByText('[PKRS CURED]')).toBeInTheDocument();
  });
});
