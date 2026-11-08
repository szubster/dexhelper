import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Gen3EventFlags } from './Gen3EventFlags';

describe('Gen3EventFlags', () => {
  it('renders correctly', () => {
    const el = render(<Gen3EventFlags />);
    expect(el).toBeDefined();
  });
});
