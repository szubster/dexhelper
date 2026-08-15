import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { BikeBadge } from '../BikeBadge';

describe('BikeBadge', () => {
  test('renders mach bike badge correctly', async () => {
    await render(<BikeBadge type="mach" />);
    await expect.element(page.getByText('MACH BIKE')).toBeVisible();
  });

  test('renders acro bike badge correctly', async () => {
    await render(<BikeBadge type="acro" />);
    await expect.element(page.getByText('ACRO BIKE')).toBeVisible();
  });

  test('renders both bikes badge correctly', async () => {
    await render(<BikeBadge type="both" />);
    await expect.element(page.getByText('BOTH BIKES')).toBeVisible();
  });
});
