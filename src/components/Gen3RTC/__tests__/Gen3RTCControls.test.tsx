import { afterEach, describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { Gen3RTCProvider } from '../../../contexts/Gen3RTCContext';
import { Gen3RTCControls } from '../Gen3RTCControls';

describe('Gen3RTCControls', () => {
  afterEach(async () => {
    await cleanup();
  });

  test('renders controls and allows interaction', async () => {
    await render(
      <Gen3RTCProvider>
        <Gen3RTCControls />
      </Gen3RTCProvider>,
    );

    await expect.element(page.getByText('RTC Controls')).toBeInTheDocument();

    const input = page.getByTestId('rtc-time-input');
    const applyButton = page.getByText('Apply');
    const resetButton = page.getByText('Reset');

    await expect.element(applyButton).toBeDisabled();
    await expect.element(resetButton).toBeDisabled();

    await userEvent.fill(input, '14:30');
    await expect.element(applyButton).not.toBeDisabled();

    await userEvent.click(applyButton);
    await expect.element(page.getByText('(OVERRIDDEN)')).toBeInTheDocument();
    await expect.element(resetButton).not.toBeDisabled();

    await userEvent.click(resetButton);
    await expect.element(page.getByText('(OVERRIDDEN)')).not.toBeInTheDocument();
    await expect.element(resetButton).toBeDisabled();
  });
});
