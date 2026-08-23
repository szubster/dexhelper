import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalCard } from '../TacticalCard';

describe('TacticalCard', () => {
  it('renders TacticalCard with default variant and tactical-card base class', async () => {
    await render(<TacticalCard testId="tactical-card">Test Content</TacticalCard>);
    const card = page.getByTestId('tactical-card');
    await expect.element(card).toBeInTheDocument();
    await expect.element(card).toHaveTextContent('Test Content');
    // Ensure tactical-card class from ADR 024 is applied
    await expect.element(card).toHaveClass('tactical-card');
  });

  it('renders with custom props', async () => {
    await render(
      <TacticalCard ariaLabel="test-label" title="test-title" testId="test-id" pokemonId={1} className="custom-class">
        Content
      </TacticalCard>,
    );

    const button = page.getByTestId('test-id');
    await expect.element(button).toHaveAttribute('aria-label', 'test-label');
    await expect.element(button).toHaveAttribute('title', 'test-title');
    await expect.element(button).toHaveAttribute('data-pokemon-id', '1');
    await expect.element(button).toHaveClass('custom-class');
  });

  it('calls onClick handler', async () => {
    const handleClick = vi.fn<() => void>();
    await render(
      <TacticalCard testId="click-card" onClick={handleClick}>
        Click Me
      </TacticalCard>,
    );

    const card = page.getByTestId('click-card');
    await card.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders emerald variant classes', async () => {
    await render(
      <TacticalCard testId="emerald-card" variant="emerald">
        Emerald
      </TacticalCard>,
    );
    const card = page.getByTestId('emerald-card');
    await expect.element(card).toHaveClass('border-emerald-500/50');
  });

  it('renders storage-cyan variant classes and checks scale/translate classes', async () => {
    await render(
      <TacticalCard testId="storage-cyan-card" variant="storage-cyan">
        Storage Cyan
      </TacticalCard>,
    );
    const card = page.getByTestId('storage-cyan-card');
    await expect.element(card).toHaveClass('bg-cyan-900/10');
    // For storage variants, tactical-card adds specific interaction classes
    await expect.element(card).toHaveClass('hover:scale-100');
  });
});
