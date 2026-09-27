import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { TacticalHeaderDivider } from '../TacticalHeaderDivider';

describe('TacticalHeaderDivider', () => {
  it('renders children correctly', async () => {
    expect.hasAssertions();
    const { container } = await render(
      <TacticalHeaderDivider data-testid="header-divider">
        <span>Header Title</span>
        <span>Header Action</span>
      </TacticalHeaderDivider>,
    );

    await expect.element(container).toHaveTextContent('Header Title');
    await expect.element(container).toHaveTextContent('Header Action');
  });

  it('applies default and custom classes correctly', async () => {
    expect.hasAssertions();
    const { container } = await render(
      <TacticalHeaderDivider className="mb-4 text-zinc-400">Header Content</TacticalHeaderDivider>,
    );

    const divider = container.querySelector<HTMLElement>('.mb-4');
    expect(divider).toBeInTheDocument();
    expect(divider?.className).toContain('border-b');
    expect(divider?.className).toContain('border-dashed');
  });
});
