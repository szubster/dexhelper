import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ContestConditionStats } from '../ContestConditionStats';

test('renders ContestConditionStats with default values', async () => {
  const { container } = await render(<ContestConditionStats />);
  await expect.element(page.getByText('SYS.CONTEST_STATS')).toBeInTheDocument();
  await expect.element(page.getByText('[ Cool ]')).toBeInTheDocument();
  await expect.element(page.getByText('[ Beauty ]')).toBeInTheDocument();
  await expect.element(page.getByText('[ Cute ]')).toBeInTheDocument();
  await expect.element(page.getByText('[ Smart ]')).toBeInTheDocument();
  await expect.element(page.getByText('[ Tough ]')).toBeInTheDocument();

  // All values should default to 0
  const progressBars = container.querySelectorAll('[role="progressbar"]');
  expect(progressBars.length).toBe(5);
  for (const bar of progressBars) {
    expect(bar.getAttribute('aria-valuenow')).toBe('0');
  }
});

test('renders ContestConditionStats with provided values', async () => {
  const { container } = await render(
    <ContestConditionStats cool={50} beauty={100} cute={150} smart={200} tough={255} />,
  );

  const progressBars = container.querySelectorAll('[role="progressbar"]');
  expect(progressBars.length).toBe(5);

  expect(progressBars[0]?.getAttribute('aria-valuenow')).toBe('50');
  expect(progressBars[1]?.getAttribute('aria-valuenow')).toBe('100');
  expect(progressBars[2]?.getAttribute('aria-valuenow')).toBe('150');
  expect(progressBars[3]?.getAttribute('aria-valuenow')).toBe('200');
  expect(progressBars[4]?.getAttribute('aria-valuenow')).toBe('255');
});

test('handles missing values gracefully', async () => {
  const { container } = await render(<ContestConditionStats cool={10} />);

  const progressBars = container.querySelectorAll('[role="progressbar"]');
  expect(progressBars.length).toBe(5);

  expect(progressBars[0]?.getAttribute('aria-valuenow')).toBe('10');
  expect(progressBars[1]?.getAttribute('aria-valuenow')).toBe('0');
});
