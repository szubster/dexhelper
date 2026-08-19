import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ContestSheenDisplay } from '../ContestSheenDisplay';

describe('ContestSheenDisplay', () => {
  it('renders correctly with 0 sheen', async () => {
    await render(<ContestSheenDisplay sheen={0} />);

    await expect.element(page.getByText('Sheen')).toBeVisible();
    await expect.element(page.getByText('0')).toBeVisible();
  });

  it('renders correctly with max sheen', async () => {
    await render(<ContestSheenDisplay sheen={255} />);

    await expect.element(page.getByText('Sheen')).toBeVisible();
    await expect.element(page.getByText('255 (MAX)')).toBeVisible();
  });

  it('renders correctly with partial sheen', async () => {
    await render(<ContestSheenDisplay sheen={127} />);

    await expect.element(page.getByText('Sheen')).toBeVisible();
    await expect.element(page.getByText('127')).toBeVisible();
  });
});
