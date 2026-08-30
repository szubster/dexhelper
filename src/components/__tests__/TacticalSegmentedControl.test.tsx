import { describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';

describe('TacticalSegmentedControl', () => {
  it('renders correctly and applies tactical classes', async () => {
    const items = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    await render(
      <TacticalSegmentedControl items={items} selectedValue="1" onValueChange={() => {}} ariaLabel="Test Group" />,
    );

    const group = page.getByRole('radiogroup', { name: 'Test Group' });
    await expect.element(group).toBeInTheDocument();
    await expect.element(group).toHaveClass('border-dashed');

    const firstItem = page.getByText('One');
    await expect.element(firstItem).toBeInTheDocument();
    await expect.element(page.getByRole('radio', { name: 'One' })).toHaveClass('tactical-badge');

    await expect.element(page.getByText('Two')).toBeInTheDocument();
    await expect.element(page.getByRole('radio', { name: 'Two' })).toHaveClass('tactical-badge');
  });

  it('handles interactions and updates state', async () => {
    const items = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    let selected = '1';
    const onValueChange = (val: string) => {
      selected = val;
    };

    const rendered = await render(
      <TacticalSegmentedControl
        items={items}
        selectedValue={selected}
        onValueChange={onValueChange}
        ariaLabel="Test Group"
      />,
    );

    const secondButton = page.getByRole('radio', { name: 'Two' });
    await secondButton.click();

    expect(selected).toBe('2');

    // Rerender to verify class changes upon selection update
    await rendered.rerender(
      <TacticalSegmentedControl
        items={items}
        selectedValue={selected}
        onValueChange={onValueChange}
        ariaLabel="Test Group"
      />,
    );
    await expect.element(secondButton).toHaveAttribute('aria-checked', 'true');
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
