import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ContestConditionStats } from '../ContestConditionStats';

test('renders ContestConditionStats with default values', async () => {
  const { container } = await render(<ContestConditionStats />);
  await expect.element(page.getByText('Contest Conditions')).toBeInTheDocument();
  await expect.element(page.getByText('COOL')).toBeInTheDocument();
  await expect.element(page.getByText('BEAUTY')).toBeInTheDocument();
  await expect.element(page.getByText('CUTE')).toBeInTheDocument();
  await expect.element(page.getByText('SMART')).toBeInTheDocument();
  await expect.element(page.getByText('TOUGH')).toBeInTheDocument();

  // All values should default to 0
  const progressBars = container.querySelectorAll('[data-role="progressbar"]');
  expect(progressBars.length).toBe(5);
  for (const bar of progressBars) {
    expect(bar.getAttribute('data-valuenow')).toBe('0');
  }
});

test('renders ContestConditionStats with provided values', async () => {
  const { container } = await render(
    <ContestConditionStats cool={50} beauty={100} cute={150} smart={200} tough={255} />,
  );

  const progressBars = container.querySelectorAll('[data-role="progressbar"]');
  expect(progressBars.length).toBe(5);

  expect(progressBars[0]?.getAttribute('data-valuenow')).toBe('50');
  expect(progressBars[1]?.getAttribute('data-valuenow')).toBe('100');
  expect(progressBars[2]?.getAttribute('data-valuenow')).toBe('150');
  expect(progressBars[3]?.getAttribute('data-valuenow')).toBe('200');
  expect(progressBars[4]?.getAttribute('data-valuenow')).toBe('255');
});

test('handles missing values gracefully', async () => {
  const { container } = await render(<ContestConditionStats cool={10} />);

  const progressBars = container.querySelectorAll('[data-role="progressbar"]');
  expect(progressBars.length).toBe(5);

  expect(progressBars[0]?.getAttribute('data-valuenow')).toBe('10');
  expect(progressBars[1]?.getAttribute('data-valuenow')).toBe('0');
});
