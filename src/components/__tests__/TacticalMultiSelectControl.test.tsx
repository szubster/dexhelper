import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalMultiSelectControl } from '../TacticalMultiSelectControl';

describe('TacticalMultiSelectControl', () => {
  it('renders correctly and applies tactical classes', async () => {
    const items = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    await render(
      <TacticalMultiSelectControl
        items={items}
        selectedValues={new Set(['1'])}
        onValueToggle={() => {}}
        ariaLabel="Multi Test Group"
      />,
    );

    // Group
    const group = page.getByRole('group', { name: 'Multi Test Group' });
    await expect.element(group).toBeInTheDocument();

    // The inner div with tactical border
    // Find item and check parent or check class
    const buttonOne = page.getByRole('button', { name: 'One filter' });
    await expect.element(buttonOne).toBeInTheDocument();
    await expect.element(buttonOne).toHaveClass('tactical-badge');

    const buttonTwo = page.getByRole('button', { name: 'Two filter' });
    await expect.element(buttonTwo).toBeInTheDocument();
    await expect.element(buttonTwo).toHaveClass('tactical-badge');
  });

  it('handles interactions and calls onValueToggle', async () => {
    const items = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    const onValueToggle = vi.fn<(val: string) => void>();

    await render(
      <TacticalMultiSelectControl items={items} selectedValues={new Set(['1'])} onValueToggle={onValueToggle} />,
    );

    const secondButton = page.getByRole('button', { name: 'Two filter' });
    await secondButton.click();

    expect(onValueToggle).toHaveBeenCalledWith('2');
    expect(onValueToggle).toHaveBeenCalledTimes(1);
  });

  it('renders prefix item', async () => {
    const items = [{ id: '1', label: 'One' }];
    const prefix = <div data-testid="prefix-item">Prefix</div>;

    await render(
      <TacticalMultiSelectControl
        items={items}
        selectedValues={new Set<string>()}
        onValueToggle={() => {}}
        renderPrefixItem={() => prefix}
      />,
    );

    await expect.element(page.getByTestId('prefix-item')).toBeInTheDocument();
    await expect.element(page.getByText('Prefix')).toBeInTheDocument();
  });
});
