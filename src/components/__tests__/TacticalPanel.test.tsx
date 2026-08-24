import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalPanel } from '../TacticalPanel';

describe('TacticalPanel', () => {
  it('renders TacticalPanel with default variant and tactical-panel base class', async () => {
    await render(<TacticalPanel data-testid="tactical-panel">Panel Content</TacticalPanel>);
    const panel = page.getByTestId('tactical-panel');
    await expect.element(panel).toBeInTheDocument();
    await expect.element(panel).toHaveTextContent('Panel Content');
    // Ensure tactical-panel class from ADR 024 is applied
    await expect.element(panel).toHaveClass('tactical-panel');
    await expect.element(panel).toHaveClass('border-zinc-500/30');
  });

  it('renders emerald variant classes', async () => {
    await render(
      <TacticalPanel data-testid="emerald-panel" variant="emerald">
        Emerald Content
      </TacticalPanel>,
    );
    const panel = page.getByTestId('emerald-panel');
    await expect.element(panel).toHaveClass('border-emerald-500/30');
    await expect.element(panel).toHaveClass('bg-emerald-500/5');
  });

  it('renders amber variant classes', async () => {
    await render(
      <TacticalPanel data-testid="amber-panel" variant="amber">
        Amber Content
      </TacticalPanel>,
    );
    const panel = page.getByTestId('amber-panel');
    await expect.element(panel).toHaveClass('border-amber-500/30');
    await expect.element(panel).toHaveClass('bg-amber-500/5');
  });

  it('renders children and nested layout correctly', async () => {
    await render(
      <TacticalPanel data-testid="nested-panel">
        <div data-testid="nested-child">Child Element</div>
      </TacticalPanel>,
    );
    const panel = page.getByTestId('nested-panel');
    const child = page.getByTestId('nested-child');
    await expect.element(panel).toBeInTheDocument();
    await expect.element(child).toBeInTheDocument();
    await expect.element(child).toHaveTextContent('Child Element');
  });
});
