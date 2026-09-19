import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ShoalItemTracker } from './ShoalItemTracker';

describe('ShoalItemTracker', () => {
  it('renders correctly with insufficient materials', async () => {
    await render(<ShoalItemTracker shells={2} salts={1} />);

    await expect.element(page.getByText('Shoal Shells')).toBeInTheDocument();
    await expect.element(page.getByText('2 / 4')).toBeInTheDocument();

    await expect.element(page.getByText('Shoal Salts')).toBeInTheDocument();
    await expect.element(page.getByText('1 / 4')).toBeInTheDocument();

    await expect.element(page.getByText('INSUFFICIENT MATERIALS')).toBeInTheDocument();
  });

  it('renders correctly with sufficient materials', async () => {
    await render(<ShoalItemTracker shells={5} salts={4} />);

    await expect.element(page.getByText('Shoal Shells')).toBeInTheDocument();
    await expect.element(page.getByText('5 / 4')).toBeInTheDocument();

    await expect.element(page.getByText('Shoal Salts')).toBeInTheDocument();
    await expect.element(page.getByText('4 / 4')).toBeInTheDocument();

    await expect.element(page.getByText('READY')).toBeInTheDocument();
  });
});
