import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { CornerCrosshairs } from '../CornerCrosshairs';

describe('CornerCrosshairs', () => {
  it('renders decorative corner elements with aria-hidden="true"', async () => {
    const { container } = await render(<CornerCrosshairs />);
    const decorativeDivs = container.querySelectorAll('div[aria-hidden="true"]');
    expect(decorativeDivs.length).toBe(4);
  });
});
