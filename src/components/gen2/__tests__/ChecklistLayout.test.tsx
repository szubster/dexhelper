import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ChecklistLayout } from '../ChecklistLayout';

describe('ChecklistLayout', () => {
  it('renders correctly with title and children', async () => {
    await render(
      <ChecklistLayout title="Gen 2 Checklist" data-testid="checklist-layout">
        <div data-testid="child-item">Child Item</div>
      </ChecklistLayout>,
    );

    await expect.element(page.getByText('Gen 2 Checklist')).toBeInTheDocument();
    await expect.element(page.getByTestId('child-item')).toBeInTheDocument();
  });

  it('applies tactical styling classes', async () => {
    await render(<ChecklistLayout data-testid="checklist-layout" />);

    const element = page.getByTestId('checklist-layout');
    await expect.element(element).toHaveClass('font-mono');
    await expect.element(element).toHaveClass('rounded-none');
    await expect.element(element).toHaveClass('border-dashed');
  });
});
