import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EdgeLabel } from '../EdgeLabel';

describe('EdgeLabel', () => {
  it('renders children enclosed in brackets with whitespace-nowrap', async () => {
    await render(<EdgeLabel>SYSTEM_STATUS</EdgeLabel>);
    const label = page.getByText(/SYSTEM_STATUS/);
    await expect.element(label).toBeInTheDocument();
    await expect.element(label).toHaveClass('whitespace-nowrap');
    await expect.element(label).toHaveClass('tactical-text');
  });
});
