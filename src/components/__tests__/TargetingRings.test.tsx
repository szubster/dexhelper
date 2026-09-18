import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { TargetingRings } from '../TargetingRings';

describe('TargetingRings', () => {
  it('renders default targeting rings structure', async () => {
    const { container } = await render(<TargetingRings data-testid="targeting-rings" />);
    const wrapper = container.querySelector('[data-testid="targeting-rings"]');
    expect(wrapper).toBeDefined();
    expect(wrapper?.children.length).toBe(2);
  });

  it('applies custom className and ring classNames', async () => {
    const { container } = await render(
      <TargetingRings
        data-testid="targeting-rings"
        className="custom-wrapper"
        outerClassName="custom-outer"
        innerClassName="custom-inner"
      />,
    );
    const wrapper = container.querySelector('[data-testid="targeting-rings"]');
    expect(wrapper?.classList.contains('custom-wrapper')).toBe(true);
    expect(wrapper?.children[0]?.classList.contains('custom-outer')).toBe(true);
    expect(wrapper?.children[1]?.classList.contains('custom-inner')).toBe(true);
  });
});
