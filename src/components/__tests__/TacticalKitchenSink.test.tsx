import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalKitchenSink } from '../TacticalKitchenSink';

describe('TacticalKitchenSink', () => {
  it('renders all components without crashing', async () => {
    await render(<TacticalKitchenSink />);
    await expect.element(page.getByText('Primary').first()).toBeInTheDocument();
    await expect.element(page.getByText('Emerald').first()).toBeInTheDocument();
  });
});
