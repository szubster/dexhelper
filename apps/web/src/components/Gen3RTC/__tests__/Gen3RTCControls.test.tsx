import { afterEach, describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { Gen3RTCProvider } from '../../../contexts/Gen3RTCContext';
import { TimeOverrideProvider } from '../../../contexts/TimeOverrideContext';
import { Gen3RTCControls } from '../Gen3RTCControls';

describe('Gen3RTCControls', () => {
  afterEach(async () => {
    await cleanup();
  });

  test('renders controls and allows interaction', async () => {
    await render(
      <Gen3RTCProvider>
        <TimeOverrideProvider>
          <Gen3RTCControls />
        </TimeOverrideProvider>
      </Gen3RTCProvider>,
    );

    await expect.element(page.getByText('RTC Controls')).toBeInTheDocument();

    const input = page.getByTestId('rtc-time-input');
    const applyButton = page.getByRole('button', { name: 'Apply Time' });
    const resetButton = page.getByRole('button', { name: 'Reset All' });

    await expect.element(applyButton).toBeDisabled();
    await expect.element(resetButton).toBeDisabled();

    await userEvent.fill(input, '14:30');
    await expect.element(applyButton).not.toBeDisabled();

    await userEvent.click(applyButton);
    await expect.element(page.getByText('(OVERRIDDEN)')).toBeInTheDocument();
    await expect.element(resetButton).not.toBeDisabled();

    // Select a day
    const select = page.getByRole('combobox');
    await userEvent.selectOptions(select, 'Monday');
    await expect.element(page.getByText('Monday 2:30:00 PM')).toBeInTheDocument();

    await userEvent.click(resetButton);
    await expect.element(page.getByText('(OVERRIDDEN)')).not.toBeInTheDocument();
    await expect.element(resetButton).toBeDisabled();
  });
});
