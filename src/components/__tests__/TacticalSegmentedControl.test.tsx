import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';

describe('TacticalSegmentedControl', () => {
  it('renders correctly', async () => {
    const items = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    await render(<TacticalSegmentedControl items={items} selectedValue="1" onValueChange={() => {}} />);
    await expect.element(page.getByText('One')).toBeInTheDocument();
    await expect.element(page.getByText('Two')).toBeInTheDocument();
  });

  it('handles keyboard navigation', async () => {
    const onValueChange = () => {};
    const items = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
      { id: '3', label: 'Three' },
    ];
    await render(
      <TacticalSegmentedControl
        items={items}
        selectedValue="1"
        onValueChange={onValueChange}
        ariaLabel="Test Control"
      />,
    );

    const firstButton = page.getByRole('radio', { name: 'One' });
    const secondButton = page.getByRole('radio', { name: 'Two' });

    await firstButton.click();
    await expect.element(firstButton).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    await expect.element(secondButton).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    await expect.element(page.getByRole('radio', { name: 'Three' })).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    await expect.element(secondButton).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    await expect.element(firstButton).toHaveFocus();
  });
});
