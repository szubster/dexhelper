import { afterEach, describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { cleanup, render } from 'vitest-browser-react';
import { TimeOverrideProvider, useTimeOverride } from '../TimeOverrideContext';

const TestComponent = () => {
  const { state, setOverrideTime, setOverrideDay, resetOverride } = useTimeOverride();
  return (
    <div>
      <span data-testid="is-overridden">{state.isOverridden.toString()}</span>
      <span data-testid="time">{state.overrideTime?.toISOString() ?? 'null'}</span>
      <span data-testid="day">{state.overrideDay ?? 'null'}</span>
      <button type="button" onClick={() => setOverrideTime(new Date('2023-01-01T12:00:00.000Z'))}>
        Override Time
      </button>
      <button type="button" onClick={() => setOverrideDay('Monday')}>
        Override Day
      </button>
      <button type="button" onClick={resetOverride}>
        Reset
      </button>
    </div>
  );
};

describe('TimeOverrideContext', () => {
  afterEach(async () => {
    await cleanup();
  });

  test('provides default system state', async () => {
    await render(
      <TimeOverrideProvider>
        <TestComponent />
      </TimeOverrideProvider>,
    );

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('false');
    await expect.element(page.getByTestId('time')).toHaveTextContent('null');
    await expect.element(page.getByTestId('day')).toHaveTextContent('null');
  });

  test('allows overriding time', async () => {
    await render(
      <TimeOverrideProvider>
        <TestComponent />
      </TimeOverrideProvider>,
    );

    await userEvent.click(page.getByText('Override Time'));

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('true');
    await expect.element(page.getByTestId('time')).toHaveTextContent('2023-01-01T12:00:00.000Z');
    await expect.element(page.getByTestId('day')).toHaveTextContent('null');
  });

  test('allows overriding day', async () => {
    await render(
      <TimeOverrideProvider>
        <TestComponent />
      </TimeOverrideProvider>,
    );

    await userEvent.click(page.getByText('Override Day'));

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('true');
    await expect.element(page.getByTestId('time')).toHaveTextContent('null');
    await expect.element(page.getByTestId('day')).toHaveTextContent('Monday');
  });

  test('allows resetting override', async () => {
    await render(
      <TimeOverrideProvider>
        <TestComponent />
      </TimeOverrideProvider>,
    );

    await userEvent.click(page.getByText('Override Time'));
    await userEvent.click(page.getByText('Override Day'));
    await userEvent.click(page.getByText('Reset'));

    await expect.element(page.getByTestId('is-overridden')).toHaveTextContent('false');
    await expect.element(page.getByTestId('time')).toHaveTextContent('null');
    await expect.element(page.getByTestId('day')).toHaveTextContent('null');
  });
});
