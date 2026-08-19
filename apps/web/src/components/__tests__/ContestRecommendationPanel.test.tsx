import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { ContestRecommendation } from '@dexhelper/engine/gen3/contests/recommendation';
import { ContestRecommendationPanel } from '../ContestRecommendationPanel';

test('renders correctly with 0 recommendations', async () => {
  await render(<ContestRecommendationPanel recommendations={[]} />);
  await expect.element(page.getByText('NO_ACTIONABLE_INTELLIGENCE')).toBeInTheDocument();
});

test('renders correctly with 1 recommendation', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'cool', score: 450 }];
  await render(<ContestRecommendationPanel recommendations={recommendations} />);

  await expect.element(page.getByText('cool')).toBeInTheDocument();
  await expect.element(page.getByText('[ PRIME_DIR ]')).toBeInTheDocument();
  await expect.element(page.getByText(/450/)).toBeInTheDocument();
  await expect.element(page.getByText('[ ALT_DIR ]')).not.toBeInTheDocument();
});

test('renders correctly with 2 recommendations', async () => {
  const recommendations: ContestRecommendation[] = [
    { category: 'beauty', score: 250 },
    { category: 'cute', score: 150 },
  ];
  await render(<ContestRecommendationPanel recommendations={recommendations} />);

  await expect.element(page.getByText('beauty')).toBeInTheDocument();
  await expect.element(page.getByText('[ PRIME_DIR ]')).toBeInTheDocument();
  await expect.element(page.getByText(/250/)).toBeInTheDocument();

  await expect.element(page.getByText('cute')).toBeInTheDocument();
  await expect.element(page.getByText('[ ALT_DIR ]')).toBeInTheDocument();
  await expect.element(page.getByText(/150/)).toBeInTheDocument();
});

test('renders only the top 2 recommendations if more are provided', async () => {
  const recommendations: ContestRecommendation[] = [
    { category: 'smart', score: 500 },
    { category: 'tough', score: 400 },
    { category: 'cool', score: 300 },
  ];
  await render(<ContestRecommendationPanel recommendations={recommendations} />);

  await expect.element(page.getByText('smart')).toBeInTheDocument();
  await expect.element(page.getByText('tough')).toBeInTheDocument();
  await expect.element(page.getByText('cool')).not.toBeInTheDocument();
});

test('renders warning state when sheen is 255 and score is below 200', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'cool', score: 190 }];
  await render(<ContestRecommendationPanel recommendations={recommendations} sheen={255} />);

  await expect.element(page.getByText(/WARNING: OPTIMIZATION_DEAD_END/)).toBeInTheDocument();
  await expect.element(page.getByText(/MAXIMUM SHEEN \(255\) DETECTED/)).toBeInTheDocument();
});

test('does not render warning state when sheen is below 255', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'cool', score: 190 }];
  await render(<ContestRecommendationPanel recommendations={recommendations} sheen={254} />);

  await expect.element(page.getByText(/WARNING: OPTIMIZATION_DEAD_END/)).not.toBeInTheDocument();
});

test('does not render warning state when sheen is 255 but score is 200 or above', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'cool', score: 200 }];
  await render(<ContestRecommendationPanel recommendations={recommendations} sheen={255} />);

  await expect.element(page.getByText(/WARNING: OPTIMIZATION_DEAD_END/)).not.toBeInTheDocument();
});

test('applies ADR 008 aesthetic classes (rounded-none, border-dashed, font-mono)', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'smart', score: 500 }];
  const { container } = await render(<ContestRecommendationPanel recommendations={recommendations} />);

  const panel = container.firstElementChild as HTMLElement;
  expect(panel.className).toContain('rounded-none');
  expect(panel.className).toContain('border-dashed');

  const recommendationContainer = container.querySelector('.bg-black\\/40');
  expect(recommendationContainer?.className).toContain('rounded-none');
  expect(recommendationContainer?.className).toContain('border-dashed');

  const reasonText = container.querySelector('.leading-relaxed');
  expect(reasonText?.className).toContain('font-mono');
});
