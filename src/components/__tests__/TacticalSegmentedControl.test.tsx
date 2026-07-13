import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
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
});
