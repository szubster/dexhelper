import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalIconButton } from '../TacticalIconButton';

describe('TacticalIconButton', () => {
  it('renders correctly with default props', async () => {
    await render(<TacticalIconButton aria-label="Settings">⚙️</TacticalIconButton>);
    const button = page.getByRole('button', { name: 'Settings' });
    await expect.element(button).toBeInTheDocument();
    await expect.element(button).toHaveClass('tactical-icon-button');
  });

  it('handles onClick callback', async () => {
    const handleClick = vi.fn<() => void>();
    await render(
      <TacticalIconButton aria-label="Action" onClick={handleClick}>
        Click
      </TacticalIconButton>,
    );
    const button = page.getByRole('button', { name: 'Action' });
    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants and sizes', async () => {
    await render(
      <TacticalIconButton variant="primary" size="lg" aria-label="Primary Large">
        P
      </TacticalIconButton>,
    );
    const btn = page.getByRole('button', { name: 'Primary Large' });
    await expect.element(btn).toBeInTheDocument();
    await expect.element(btn).toHaveClass('h-10');
    await expect.element(btn).toHaveClass('w-10');
  });

  it('renders active LED status dot when ledStatus is specified', async () => {
    await render(
      <TacticalIconButton aria-label="Warning Action" ledStatus="warning">
        W
      </TacticalIconButton>,
    );
    const btn = page.getByRole('button', { name: 'Warning Action' });
    await expect.element(btn).toBeInTheDocument();
    const el = btn.element() as HTMLButtonElement;
    const led = el.querySelector('span[aria-hidden="true"].animate-pulse');
    expect(led).not.toBeNull();
  });

  it('omits native title attribute while setting aria-label and rendering tactical tooltip', async () => {
    await render(<TacticalIconButton title="Close Dialog">X</TacticalIconButton>);
    const button = page.getByRole('button', { name: 'Close Dialog' });
    await expect.element(button).toBeInTheDocument();
    const el = button.element() as HTMLButtonElement;
    expect(el.getAttribute('title')).toBeNull();
    expect(el.getAttribute('aria-label')).toBe('Close Dialog');
    expect(el.querySelector('.tactical-tooltip')).not.toBeNull();
  });
});
