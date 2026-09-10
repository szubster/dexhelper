import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ChecklistItem } from '../ChecklistItem';

describe('ChecklistItem', () => {
  it('renders correctly', async () => {
    await render(<ChecklistItem label="SUDOWOODO" data-testid="checklist-item" />);

    const element = page.getByTestId('checklist-item');
    await expect.element(element).toBeInTheDocument();
    await expect.element(page.getByText('SUDOWOODO')).toBeInTheDocument();
  });

  it('renders unchecked visual indicators', async () => {
    await render(<ChecklistItem label="SNORLAX" acquired={false} data-testid="unchecked-item" />);

    const element = page.getByTestId('unchecked-item');
    await expect.element(element).toHaveClass('border-zinc-800');
    await expect.element(element).toHaveClass('bg-zinc-950/50');
  });

  it('renders checked visual indicators', async () => {
    await render(<ChecklistItem label="RED GYARADOS" acquired={true} data-testid="checked-item" />);

    const element = page.getByTestId('checked-item');
    await expect.element(element).toHaveClass('border-emerald-900/50');
    await expect.element(element).toHaveClass('bg-emerald-950/10');
  });
});
