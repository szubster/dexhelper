import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { SubDataPoint } from '../SubDataPoint';

describe('SubDataPoint', () => {
  it('renders label and value correctly', async () => {
    expect.hasAssertions();
    const { container } = await render(<SubDataPoint label="OT_ID" value="ASH / 12345" />);
    await expect.element(container).toHaveTextContent('OT_ID');
    await expect.element(container).toHaveTextContent('ASH / 12345');
  });

  it('renders children when value is not provided', async () => {
    expect.hasAssertions();
    const { container } = await render(
      <SubDataPoint label="STATUS">
        <span data-testid="child-status">ACTIVE</span>
      </SubDataPoint>,
    );
    await expect.element(container).toHaveTextContent('STATUS');
    const child = container.querySelector<HTMLElement>('[data-testid="child-status"]');
    expect(child).toBeInTheDocument();
  });

  it('applies custom classNames', async () => {
    expect.hasAssertions();
    const { container } = await render(
      <SubDataPoint
        label="OT_ID"
        value="12345"
        className="custom-container"
        labelClassName="custom-label"
        valueClassName="custom-value"
      />,
    );
    const customContainer = container.querySelector<HTMLElement>('.custom-container');
    const customLabel = container.querySelector<HTMLElement>('.custom-label');
    const customValue = container.querySelector<HTMLElement>('.custom-value');

    await expect.element(customContainer).toBeInTheDocument();
    await expect.element(customLabel).toBeInTheDocument();
    await expect.element(customValue).toBeInTheDocument();
  });
});
