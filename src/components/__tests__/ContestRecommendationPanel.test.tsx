import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { ContestRecommendation } from '../../engine/gen3/contests/recommendation';
import { ContestRecommendationPanel } from '../ContestRecommendationPanel';

test('renders correctly with 0 recommendations', async () => {
  await render(<ContestRecommendationPanel recommendations={[]} />);
  await expect.element(page.getByText('NO RECOMMENDATIONS FOUND')).toBeInTheDocument();
});

test('renders correctly with 1 recommendation', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'cool', score: 450 }];
  await render(<ContestRecommendationPanel recommendations={recommendations} />);

  await expect.element(page.getByText('cool')).toBeInTheDocument();
  await expect.element(page.getByText('[PRIMARY]')).toBeInTheDocument();
  await expect.element(page.getByText(/450/)).toBeInTheDocument();
  await expect.element(page.getByText('[SECONDARY]')).not.toBeInTheDocument();
});

test('renders correctly with 2 recommendations', async () => {
  const recommendations: ContestRecommendation[] = [
    { category: 'beauty', score: 250 },
    { category: 'cute', score: 150 },
  ];
  await render(<ContestRecommendationPanel recommendations={recommendations} />);

  await expect.element(page.getByText('beauty')).toBeInTheDocument();
  await expect.element(page.getByText('[PRIMARY]')).toBeInTheDocument();
  await expect.element(page.getByText(/250/)).toBeInTheDocument();

  await expect.element(page.getByText('cute')).toBeInTheDocument();
  await expect.element(page.getByText('[SECONDARY]')).toBeInTheDocument();
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

test('applies ADR 008 aesthetic classes (rounded-none, border-dashed, font-mono)', async () => {
  const recommendations: ContestRecommendation[] = [{ category: 'smart', score: 500 }];
  const { container } = await render(<ContestRecommendationPanel recommendations={recommendations} />);

  const panel = container.firstElementChild as HTMLElement;
  expect(panel.className).toContain('rounded-none');
  expect(panel.className).toContain('border-dashed');

  const recommendationContainer = container.querySelector('.bg-zinc-900\\/50');
  expect(recommendationContainer?.className).toContain('rounded-none');
  expect(recommendationContainer?.className).toContain('border-dashed');

  const reasonText = container.querySelector('.text-xs');
  expect(reasonText?.className).toContain('font-mono');
});
