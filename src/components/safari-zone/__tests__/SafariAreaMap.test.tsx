import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SafariArea } from '../../../engine/data/shared/safariZoneTypes';
import { SafariAreaMap } from '../SafariAreaMap';

describe('SafariAreaMap', () => {
  const mockAreas: SafariArea[] = [
    {
      name: 'kanto-safari-zone-area-1-east',
      encounters: {},
    },
    {
      name: 'kanto-safari-zone-area-2-north',
      encounters: {},
    },
  ];

  it('renders all areas for a given game version', async () => {
    await render(<SafariAreaMap version="firered" availableAreas={mockAreas} targetPokemon={null} />);

    // Should display the header
    await expect.element(page.getByText('AREA MAP')).toBeInTheDocument();

    // Should render area names, replacing hyphens with spaces and uppercase
    await expect.element(page.getByText('KANTO SAFARI ZONE AREA 1 EAST')).toBeInTheDocument();
    await expect.element(page.getByText('KANTO SAFARI ZONE AREA 2 NORTH')).toBeInTheDocument();
  });

  it('highlights the correct area when targetPokemon is set', async () => {
    await render(
      <SafariAreaMap
        version="firered"
        availableAreas={[mockAreas[0] as SafariArea]} // Only area 1 is available
        targetPokemon={123} // Scyther
      />,
    );

    // Area 1 should be targeted
    await expect.element(page.getByText('KANTO SAFARI ZONE AREA 1 EAST')).toBeInTheDocument();

    // Test styling via the label text within the area block (which acts as our indicator)
    const container = page.getByTestId('safari-area-map');
    await expect.element(container).toBeInTheDocument();

    // One area has TARGET FOUND, others have NO SIGNAL
    await expect.element(page.getByText(/TARGET FOUND/).first()).toBeInTheDocument();
    await expect.element(page.getByText(/NO SIGNAL/).first()).toBeInTheDocument();
  });

  it('displays STANDBY state when no target is set', async () => {
    await render(<SafariAreaMap version="firered" availableAreas={mockAreas} targetPokemon={null} />);

    // Verify standby labels are rendered
    const standbyElements = page.getByText(/STANDBY/);
    await expect.element(standbyElements.first()).toBeInTheDocument();
  });
});
