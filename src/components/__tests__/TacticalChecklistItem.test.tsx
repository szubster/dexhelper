import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalChecklistItem } from '../TacticalChecklistItem';

describe('TacticalChecklistItem', () => {
  it('renders label correctly', async () => {
    await render(<TacticalChecklistItem label="Test Item" />);
    await expect.element(page.getByText('Test Item')).toBeInTheDocument();
  });

  it('renders subtitle when provided', async () => {
    await render(<TacticalChecklistItem label="Test Item" subtitle="Optional Subtitle" />);
    await expect.element(page.getByText('Test Item')).toBeInTheDocument();
    await expect.element(page.getByText('Optional Subtitle')).toBeInTheDocument();
  });

  it('shows check icon, [OK] status tag, and strikethrough when acquired', async () => {
    await render(<TacticalChecklistItem label="Acquired Item" acquired={true} />);
    const label = page.getByText('Acquired Item');
    await expect.element(label).toBeInTheDocument();
    await expect.element(label).toHaveClass('line-through');
    await expect.element(page.getByText('[OK]')).toBeInTheDocument();

    const wrapper = page.getByText('Acquired Item').element().closest('.group');
    expect(wrapper?.className).toContain('border-emerald-900/50');
  });

  it('renders pending status tag [PENDING] by default when not acquired', async () => {
    await render(<TacticalChecklistItem label="Pending Item" acquired={false} />);
    await expect.element(page.getByText('[PENDING]')).toBeInTheDocument();
  });

  it('renders custom codeTag when provided', async () => {
    await render(<TacticalChecklistItem label="Item with Custom Tag" codeTag="[OBJ.01]" />);
    await expect.element(page.getByText('[OBJ.01]')).toBeInTheDocument();
  });

  it('does not strikethrough when acquired but strikethroughWhenAcquired is false', async () => {
    await render(
      <TacticalChecklistItem label="No Strikethrough Item" acquired={true} strikethroughWhenAcquired={false} />,
    );
    const label = page.getByText('No Strikethrough Item');
    await expect.element(label).toBeInTheDocument();
    await expect.element(label).not.toHaveClass('line-through');
  });

  it('renders custom icon when provided', async () => {
    await render(
      <TacticalChecklistItem label="Custom Icon Item" customIcon={<span data-testid="custom-icon">ICON</span>} />,
    );
    await expect.element(page.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('adds interactive classes when interactive is true', async () => {
    await render(<TacticalChecklistItem label="Interactive Item" interactive={true} />);
    const wrapper = page.getByText('Interactive Item').element().closest('.group');
    expect(wrapper?.className).toContain('hover:border-zinc-700');
  });
});
