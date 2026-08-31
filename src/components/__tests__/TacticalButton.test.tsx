import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalButton } from '../TacticalButton';

describe('TacticalButton', () => {
  it('renders correctly with tactical utility classes', async () => {
    await render(<TacticalButton>Test Button</TacticalButton>);
    const button = page.getByRole('button', { name: 'Test Button' });
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('tactical-button');

    // Get class list to test utility composition indirectly if vitest-browser-react can't resolve @utility expansions natively yet
    const el = button.element() as HTMLButtonElement;
    const classes = el.className;
    expect(classes).toContain('tactical-button');
  });

  it('handles onClick event', async () => {
    const handleClick = vi.fn<() => void>();
    await render(<TacticalButton onClick={handleClick}>Click Me</TacticalButton>);
    const button = page.getByRole('button', { name: 'Click Me' });
    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders primary variant', async () => {
    await render(<TacticalButton variant="primary">Primary Button</TacticalButton>);
    await expect.element(page.getByText('Primary Button')).toBeInTheDocument();
  });

  it('renders danger variant', async () => {
    await render(<TacticalButton variant="danger">Danger Button</TacticalButton>);
    await expect.element(page.getByText('Danger Button')).toBeInTheDocument();
  });

  it('renders danger-outline variant', async () => {
    await render(<TacticalButton variant="danger-outline">Danger Outline Button</TacticalButton>);
    await expect.element(page.getByText('Danger Outline Button')).toBeInTheDocument();
  });

  it('renders with crosshairs', async () => {
    await render(<TacticalButton hasCrosshairs={true}>Crosshairs Button</TacticalButton>);
    await expect.element(page.getByText('Crosshairs Button')).toBeInTheDocument();
  });

  it('renders with corner crosshairs', async () => {
    await render(<TacticalButton hasCrosshairs="corners">Corner Button</TacticalButton>);
    await expect.element(page.getByText('Corner Button')).toBeInTheDocument();
  });

  it('renders sidebar variant', async () => {
    await render(
      <TacticalButton variant="sidebar" hasCrosshairs={true}>
        Sidebar Button
      </TacticalButton>,
    );
    await expect.element(page.getByText('Sidebar Button')).toBeInTheDocument();
  });

  it('renders secondary variant', async () => {
    await render(<TacticalButton variant="secondary">Secondary Button</TacticalButton>);
    await expect.element(page.getByText('Secondary Button')).toBeInTheDocument();
  });

  it('renders different sizes', async () => {
    await render(<TacticalButton size="sm">Small</TacticalButton>);
    await expect.element(page.getByText('Small')).toBeInTheDocument();
    await render(<TacticalButton size="lg">Large</TacticalButton>);
    await expect.element(page.getByText('Large')).toBeInTheDocument();
    await render(<TacticalButton size="icon">Icon</TacticalButton>);
    await expect.element(page.getByText('Icon')).toBeInTheDocument();
  });
});
