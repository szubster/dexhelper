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

  await expect.element(page.getByText('Active Callers')).toBeInTheDocument();
  await expect.element(page.getByText('Status: ACTIVE')).toBeInTheDocument();
  await expect.element(page.getByText('Mom')).toBeInTheDocument();
  await expect.element(page.getByText('Prof. Elm')).toBeInTheDocument();

  const probabilityElements = page.getByText('PROBABILITY: 50%').elements();
  expect(probabilityElements.length).toBe(2);
});

test('shows 0% probability when cooling down', async () => {
  const timerState: TimerState = { delayMinsRemaining: 10, timeCyclesSinceLastCall: 0 };
  await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);

  await expect.element(page.getByText('Status: COOLING DOWN')).toBeInTheDocument();
  const probabilityElements = page.getByText('PROBABILITY: 0%').elements();
  expect(probabilityElements.length).toBe(2);
});

test('renders empty state correctly', async () => {
  const timerState: TimerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
  await render(<ActiveCallersDashboard contacts={[]} timerState={timerState} />);

  await expect.element(page.getByText('NO SIGNAL')).toBeInTheDocument();
});

test('applies ADR 008 aesthetic classes', async () => {
  const timerState: TimerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
  const { container } = await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);
  const mainDiv = container.firstChild as HTMLElement;
  expect(mainDiv.className).toContain('rounded-none');
  expect(mainDiv.className).toContain('border-dashed');
  expect(mainDiv.className).toContain('font-mono');
});
