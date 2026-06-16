import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { BattleFrontierDashboard } from '../BattleFrontierDashboard';

describe('BattleFrontierDashboard', () => {
  test('renders the wallet and facilities', async () => {
    await render(<BattleFrontierDashboard />);

    await expect.element(page.getByText('BP WALLET')).toBeInTheDocument();
    await expect.element(page.getByText('Battle Tower')).toBeInTheDocument();
    await expect.element(page.getByText('Battle Pyramid')).toBeInTheDocument();
    await expect.element(page.getByText('Silver').first()).toBeInTheDocument();
  });
});
