import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ContestRibbonBadge } from '../ContestRibbonBadge';

describe('ContestRibbonBadge', () => {
  it('renders correctly with Cool type and Normal rank', async () => {
    await render(<ContestRibbonBadge type="Cool" rank="Normal" />);

    const container = page.getByTitle('Cool Contest - Normal Rank Ribbon');
    await expect.element(container).toBeVisible();
    await expect.element(container).toHaveClass('border-dashed');
    await expect.element(container).toHaveClass('rounded-none');
    await expect.element(page.getByText('Cool', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Normal')).toBeVisible();
  });

  it('renders correctly with Beauty type and Super rank', async () => {
    await render(<ContestRibbonBadge type="Beauty" rank="Super" />);

    const container = page.getByTitle('Beauty Contest - Super Rank Ribbon');
    await expect.element(container).toBeVisible();
    await expect.element(page.getByText('Beauty', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Super')).toBeVisible();
  });

  it('renders correctly with Cute type and Hyper rank', async () => {
    await render(<ContestRibbonBadge type="Cute" rank="Hyper" />);

    const container = page.getByTitle('Cute Contest - Hyper Rank Ribbon');
    await expect.element(container).toBeVisible();
    await expect.element(page.getByText('Cute', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Hyper')).toBeVisible();
  });

  it('renders correctly with Smart type and Master rank', async () => {
    await render(<ContestRibbonBadge type="Smart" rank="Master" />);

    const container = page.getByTitle('Smart Contest - Master Rank Ribbon');
    await expect.element(container).toBeVisible();
    await expect.element(page.getByText('Smart', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Master')).toBeVisible();
  });

  it('renders correctly with Tough type and Normal rank', async () => {
    await render(<ContestRibbonBadge type="Tough" rank="Normal" />);

    const container = page.getByTitle('Tough Contest - Normal Rank Ribbon');
    await expect.element(container).toBeVisible();
    await expect.element(page.getByText('Tough', { exact: true })).toBeVisible();
    await expect.element(page.getByText('Normal')).toBeVisible();
  });
});
