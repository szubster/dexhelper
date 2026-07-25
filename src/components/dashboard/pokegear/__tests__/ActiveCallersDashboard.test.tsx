import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Contact, TimerState } from '../../../../engine/saveParser/parsers/gen2/phone/predictor';
import { ActiveCallersDashboard } from '../ActiveCallersDashboard';

const mockContacts: Contact[] = [
  { id: 1, name: 'Mom' },
  { id: 2, name: 'Prof. Elm' },
];

test('renders correctly with contacts and shows 50% probability when active', async () => {
  const timerState: TimerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
  await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);

  await expect.element(page.getByText('ACTIVE CALLERS MATRIX')).toBeInTheDocument();
  await expect.element(page.getByText('ACTIVE', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText(/Mom/i)).toBeInTheDocument();
  await expect.element(page.getByText(/Prof\. Elm/i)).toBeInTheDocument();

  const probabilityElements = page.getByText('PROB: 50%').elements();
  expect(probabilityElements.length).toBe(2);
});

test('shows 0% probability when cooling down', async () => {
  const timerState: TimerState = { delayMinsRemaining: 10, timeCyclesSinceLastCall: 0 };
  await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);

  await expect.element(page.getByText('COOLING_DOWN')).toBeInTheDocument();
  const probabilityElements = page.getByText('PROB: 0%').elements();
  expect(probabilityElements.length).toBe(2);
});

test('renders empty state correctly', async () => {
  const timerState: TimerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
  await render(<ActiveCallersDashboard contacts={[]} timerState={timerState} />);

  await expect.element(page.getByText('[ SEARCHING_FOR_SIGNALS... ]')).toBeInTheDocument();
});

test('applies ADR 008 aesthetic classes', async () => {
  const timerState: TimerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
  const { container } = await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);
  expect(container.innerHTML).toContain('tactical-text');
  expect(container.innerHTML).toContain('border-dashed');
  expect(container.innerHTML).toContain('font-mono');
});
