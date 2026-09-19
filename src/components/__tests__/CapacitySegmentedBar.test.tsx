import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { CapacitySegmentedBar } from '../CapacitySegmentedBar';

describe('CapacitySegmentedBar', () => {
  it('renders correctly with telemetry tag and values', async () => {
    await render(<CapacitySegmentedBar current={12} max={30} />);

    const sysCap = page.getByText('[SYS.CAP]');
    await expect.element(sysCap).toBeInTheDocument();

    const textValue = page.getByText('12/30');
    await expect.element(textValue).toBeInTheDocument();

    const percentageText = page.getByText('(40%)');
    await expect.element(percentageText).toBeInTheDocument();
  });

  it('renders percentage and status indicator for high capacity ratio', async () => {
    await render(<CapacitySegmentedBar current={28} max={30} />);

    const percentageText = page.getByText('(93%)');
    await expect.element(percentageText).toBeInTheDocument();
  });
});
