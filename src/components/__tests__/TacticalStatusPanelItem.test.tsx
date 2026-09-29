import React from 'react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalStatusPanelItem } from '../TacticalStatusPanelItem';

describe('TacticalStatusPanelItem', () => {
  it('renders default status text when active or inactive', async () => {
    await render(
      <>
        <TacticalStatusPanelItem data-testid="item-inactive" label="Inactive Item" active={false} />
        <TacticalStatusPanelItem data-testid="item-active" label="Active Item" active={true} />
      </>,
    );

    await expect.element(page.getByTestId('item-inactive')).toHaveTextContent('Inactive Item[ ]');
    await expect.element(page.getByTestId('item-active')).toHaveTextContent('Active Item[X]');
  });

  it('renders custom status text when provided', async () => {
    await render(
      <TacticalStatusPanelItem
        data-testid="item-custom"
        label="Custom Item"
        active={false}
        statusText="[ BATTLE AVAILABLE ]"
      />,
    );

    await expect.element(page.getByTestId('item-custom')).toHaveTextContent('Custom Item[ BATTLE AVAILABLE ]');
  });

  it('applies custom active and inactive class names', async () => {
    await render(
      <TacticalStatusPanelItem
        data-testid="item-custom-class"
        label="Custom Class"
        active={true}
        activeClassName="custom-active-class"
      />,
    );

    await expect.element(page.getByTestId('item-custom-class')).toHaveClass('custom-active-class');
  });

  it('forwards ref to the underlying div element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    await render(<TacticalStatusPanelItem ref={ref} label="Ref Item" />);

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('DIV');
  });
});
