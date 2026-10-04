import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ClearFiltersBadge } from '../ClearFiltersBadge';
import { FilterBadge } from '../FilterBadge';

describe('FilterBadge', () => {
  it('renders label and default code tag when inactive', async () => {
    await render(<FilterBadge isActive={false} label="SECURED" />);

    await expect.element(page.getByText('SECURED')).toBeInTheDocument();
    await expect.element(page.getByText('[SYS.FLT]')).toBeInTheDocument();
  });

  it('renders active state with custom codeTag, count, and variant', async () => {
    await render(<FilterBadge isActive={true} label="MISSING" variant="emerald" codeTag="[SYS.MISS]" count={42} />);

    await expect.element(page.getByText('MISSING')).toBeInTheDocument();
    await expect.element(page.getByText('[SYS.MISS]')).toBeInTheDocument();
    await expect.element(page.getByText('42')).toBeInTheDocument();
  });
});

describe('ClearFiltersBadge', () => {
  it('renders active clear filter badge and handles click events', async () => {
    const handleClick = vi.fn<() => void>();
    await render(<ClearFiltersBadge isActive={true} onClick={handleClick} />);

    const button = page.getByRole('button', { name: 'Clear filters' });
    await expect.element(button).toBeInTheDocument();
    await expect.element(page.getByText('[SYS.ALL]')).toBeInTheDocument();

    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
