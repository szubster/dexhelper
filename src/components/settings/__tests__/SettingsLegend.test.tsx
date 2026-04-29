import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { SettingsLegend } from '../SettingsLegend';

describe('SettingsLegend', () => {
  it('renders correctly', async () => {
    await render(<SettingsLegend />);

    await expect.element(page.getByText('SYS.LEGEND')).toBeInTheDocument();
    await expect.element(page.getByText('In Party')).toBeInTheDocument();
    await expect.element(page.getByText('In PC')).toBeInTheDocument();
    await expect.element(page.getByText('Owned')).toBeInTheDocument();
    await expect.element(page.getByText('Lost')).toBeInTheDocument();
  });
});
