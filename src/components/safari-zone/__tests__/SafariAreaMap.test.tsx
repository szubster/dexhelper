import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SafariArea } from '../../../engine/data/shared/safariZoneTypes';
import { SafariAreaMap } from '../SafariAreaMap';

const mockAreas: SafariArea[] = [
  { name: 'area-1', encounters: {} },
  { name: 'area-2', encounters: {} },
  { name: 'area-3', encounters: {} },
];

describe('SafariAreaMap', () => {
  it('renders all areas', async () => {
    expect.hasAssertions();
    await render(<SafariAreaMap allAreas={mockAreas} availableAreas={[]} />);

    await expect.element(page.getByTestId('safari-area-map')).toBeInTheDocument();
    await expect.element(page.getByTestId('safari-area-area-1')).toBeInTheDocument();
    await expect.element(page.getByTestId('safari-area-area-2')).toBeInTheDocument();
    await expect.element(page.getByTestId('safari-area-area-3')).toBeInTheDocument();
  });

  it('highlights available areas', async () => {
    expect.hasAssertions();
    const availableAreas = [mockAreas[0]] as SafariArea[];
    await render(<SafariAreaMap allAreas={mockAreas} availableAreas={availableAreas} />);

    await expect.element(page.getByTestId('safari-area-area-1')).toHaveAttribute('data-available', 'true');
    await expect.element(page.getByTestId('safari-area-area-1')).toHaveTextContent('TARGET DETECTED');

    await expect.element(page.getByTestId('safari-area-area-2')).toHaveAttribute('data-available', 'false');
    await expect.element(page.getByTestId('safari-area-area-2')).toHaveTextContent('NO SIGNAL');
  });
});
