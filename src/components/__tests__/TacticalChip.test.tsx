import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalChip } from '../TacticalChip';

describe('TacticalChip', () => {
  it('renders children correctly', async () => {
    await render(<TacticalChip>TEST ITEM</TacticalChip>);
    await expect.element(page.getByText('TEST ITEM')).toBeVisible();
  });

  it('renders remove button when onRemove is provided and triggers callback on click', async () => {
    const handleRemove = vi.fn<() => void>();
    await render(
      <TacticalChip onRemove={handleRemove} removeButtonTitle="Remove target">
        POTION
      </TacticalChip>,
    );

    const removeBtn = page.getByTitle('Remove target');
    await expect.element(removeBtn).toBeVisible();

    await removeBtn.click();
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('renders codeTag and respects showLed prop', async () => {
    await render(
      <TacticalChip codeTag="ITEM.01" showLed={false}>
        MASTER BALL
      </TacticalChip>,
    );

    await expect.element(page.getByText('ITEM.01')).toBeVisible();
    await expect.element(page.getByText('MASTER BALL')).toBeVisible();
  });

  it('applies custom className, variants, and sizes correctly', async () => {
    const { container } = await render(
      <TacticalChip variant="danger" size="sm" className="custom-test-class">
        DANGER CHIP
      </TacticalChip>,
    );

    const chipElement = container.querySelector('.custom-test-class');
    expect(chipElement).not.toBeNull();
    expect(chipElement?.className).toContain('border-red-500');
    expect(chipElement?.className).toContain('text-[10px]');
  });
});
