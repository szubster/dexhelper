import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokemonCatchProbability } from '../PokemonCatchProbability';

describe('PokemonCatchProbability', () => {
  it('renders correctly and handles interactions with different pokeballs', async () => {
    // Test with poke ball
    const { unmount } = await render(<PokemonCatchProbability catchRate={45} effectivePokeball="poke" />);
    await expect.element(page.getByText('RATING: 45')).toBeVisible();
    await expect.element(page.getByText('100%')).toBeVisible();

    // Changing status to Debuff
    await page.getByText(/Debuff/i).click();
    await page.getByText(/Incapacitated/i).click();

    // Click on HP segment to change HP
    await page.getByRole('button', { name: 'Set HP to 50%' }).click();
    await expect.element(page.getByText('50% HP')).toBeVisible();

    unmount().catch(() => {});
  });

  it('handles great balls', async () => {
    const { unmount } = await render(<PokemonCatchProbability catchRate={45} effectivePokeball="great" />);
    await expect.element(page.getByText('RATING: 45')).toBeVisible();
    unmount().catch(() => {});
  });

  it('handles ultra and safari balls', async () => {
    const { unmount } = await render(<PokemonCatchProbability catchRate={45} effectivePokeball="ultra" />);
    await expect.element(page.getByText('RATING: 45')).toBeVisible();
    unmount().catch(() => {});
  });

  it('handles safari balls', async () => {
    const { unmount } = await render(<PokemonCatchProbability catchRate={45} effectivePokeball="safari" />);
    await expect.element(page.getByText('RATING: 45')).toBeVisible();
    unmount().catch(() => {});
  });
});
