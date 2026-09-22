import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { FeatureFlagProvider } from '../../../contexts/FeatureFlagContext';
import { FeatureFlagsUI } from '../FeatureFlagsUI';

describe('FeatureFlagsUI', () => {
  it('renders and toggles feature flags', async () => {
    await render(
      <FeatureFlagProvider env={{ VITE_FF_TEST_FLAG: 'true' }}>
        <FeatureFlagsUI />
      </FeatureFlagProvider>,
    );

    const testFlagButton = page.getByRole('button', { name: /TEST_FLAG/ });
    await expect.element(testFlagButton).toBeInTheDocument();
    await expect.element(testFlagButton).toHaveTextContent('TEST_FLAGON');

    await testFlagButton.click();
    await expect.element(testFlagButton).toHaveTextContent('TEST_FLAGOFF');

    const resetButton = page.getByRole('button', { name: /RESET FLAGS/ });
    await resetButton.click();
    await expect.element(testFlagButton).toHaveTextContent('TEST_FLAGON');
  });
});
