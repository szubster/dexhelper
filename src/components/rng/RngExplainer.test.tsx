import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RngExplainer } from './RngExplainer';

describe('RngExplainer', () => {
  it('renders the explainer content correctly', async () => {
    await render(<RngExplainer />);

    await expect.element(page.getByText('RNG Tool Integration')).toBeInTheDocument();
    await expect
      .element(page.getByText(/Your Trainer ID \(TID\) and Secret ID \(SID\) are cryptographic keys/))
      .toBeInTheDocument();
  });
});
