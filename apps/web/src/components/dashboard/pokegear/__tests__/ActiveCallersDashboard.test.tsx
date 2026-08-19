import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Contact, TimerState } from '@dexhelper/engine/saveParser/parsers/gen2/phone/predictor';
import { ActiveCallersDashboard } from '../ActiveCallersDashboard';

const mockContacts: Contact[] = [
  { id: 1, name: 'Mom' },
  { id: 17, name: 'Fisher Ralph' },
  { id: 6, name: 'Pokefan Beverly' },
];

test('renders correctly with contacts and shows 50% probability when active', async () => {
  const timerState: TimerState = { delayMinsRemaining: 0, timeCyclesSinceLastCall: 5 };
  await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);

  await expect.element(page.getByText('ACTIVE CALLERS MATRIX')).toBeInTheDocument();
  await expect.element(page.getByText('ACTIVE', { exact: true })).toBeInTheDocument();
  await expect.element(page.getByText(/Mom/i)).toBeInTheDocument();
  await expect.element(page.getByText(/Fisher Ralph/i)).toBeInTheDocument();
  await expect.element(page.getByText(/Pokefan Beverly/i)).toBeInTheDocument();

  await expect.element(page.getByText('[ SWARM ]')).toBeInTheDocument();
  await expect.element(page.getByText('Qwilfish')).toBeInTheDocument();
  await expect.element(page.getByText('[ ITEM ]')).toBeInTheDocument();
  await expect.element(page.getByText('Nugget')).toBeInTheDocument();

  const probabilityElements = page.getByText('PROB: 50%').elements();
  expect(probabilityElements.length).toBe(3);
});

test('shows 0% probability when cooling down', async () => {
  const timerState: TimerState = { delayMinsRemaining: 10, timeCyclesSinceLastCall: 0 };
  await render(<ActiveCallersDashboard contacts={mockContacts} timerState={timerState} />);

  await expect.element(page.getByText('COOLING_DOWN')).toBeInTheDocument();
  const probabilityElements = page.getByText('PROB: 0%').elements();
  expect(probabilityElements.length).toBe(3);
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
