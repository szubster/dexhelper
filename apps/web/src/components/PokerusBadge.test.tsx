import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokerusBadge } from './PokerusBadge';

describe('PokerusBadge', () => {
  it('renders correctly with strain 0', async () => {
    await render(<PokerusBadge strain={0} />);
    await expect.element(page.getByText('[PKRS STRN: 0]')).toBeInTheDocument();
  });

  it('renders correctly with a non-zero strain', async () => {
    await render(<PokerusBadge strain={3} />);
    await expect.element(page.getByText('[PKRS STRN: 3]')).toBeInTheDocument();
  });
});
