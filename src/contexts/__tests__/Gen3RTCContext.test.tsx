import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { Gen3RTCProvider, useGen3RTC } from '../Gen3RTCContext';

const TestComponent = () => {
  const { state, setOverride } = useGen3RTC();
  return (
    <div>
      <span data-testid="is-overridden">{state.isOverridden.toString()}</span>
      <span data-testid="time">{state.time.toISOString()}</span>
      <button type="button" onClick={() => setOverride(new Date('2023-01-01T12:00:00.000Z'))}>
        Override
      </button>
      <button type="button" onClick={() => setOverride(null)}>
        Reset
      </button>
    </div>
  );
};

describe('Gen3RTCContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(async () => {
    vi.useRealTimers();
    await cleanup();
  });

  test('provides default system time', async () => {
    const fakeDate = new Date('2023-01-01T10:00:00.000Z');
    vi.setSystemTime(fakeDate);

    await render(
      <Gen3RTCProvider>
        <TestComponent />
      </Gen3RTCProvider>,
    );

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('false');
    await expect.element(page.getByTestId('time')).toHaveTextContent(fakeDate.toISOString());
  });

  test('allows overriding time', async () => {
    await render(
      <Gen3RTCProvider>
        <TestComponent />
      </Gen3RTCProvider>,
    );

    await userEvent.click(page.getByText('Override'));

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('true');
    await expect.element(page.getByTestId('time')).toHaveTextContent('2023-01-01T12:00:00.000Z');
  });

  test('allows resetting override', async () => {
    const fakeDate = new Date('2023-01-01T10:00:00.000Z');
    vi.setSystemTime(fakeDate);

    await render(
      <Gen3RTCProvider>
        <TestComponent />
      </Gen3RTCProvider>,
    );

    await userEvent.click(page.getByText('Override'));
    await userEvent.click(page.getByText('Reset'));

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('false');
    await expect.element(page.getByTestId('time')).toHaveTextContent(fakeDate.toISOString());
  });

  test('updates time automatically when not overridden', async () => {
    const fakeDate = new Date('2023-01-01T10:00:00.000Z');
    vi.setSystemTime(fakeDate);

    await render(
      <Gen3RTCProvider>
        <TestComponent />
      </Gen3RTCProvider>,
    );

    await expect.element(page.getByTestId('time')).toHaveTextContent(fakeDate.toISOString());

    vi.advanceTimersByTime(2000);

    await expect.element(page.getByTestId('time')).not.toHaveTextContent(fakeDate.toISOString());
  });
});
