import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Gen3SaveData } from '../../../../engine/saveParser/parsers/common';
import { Gen3TrickHouseDashboard } from '../Gen3TrickHouseDashboard';

describe('Gen3TrickHouseDashboard', () => {
  it('renders nothing if trickHouse data is not present', async () => {
    const saveData = {} as Gen3SaveData;
    void render(<Gen3TrickHouseDashboard saveData={saveData} />);
    await expect.element(page.getByText('TRICK HOUSE')).not.toBeInTheDocument();
  });

  it('renders correctly and maps HM requirements based on level', async () => {
    const saveData = {
      gen3TrickHouse: {
        level: 3,
        entranceState: 0,
        enterFromCorridor: 0,
        prizePickup: 0,
        puzzles: {
          puzzle1: 0,
          puzzle2: 0,
          puzzle3: 0,
          puzzle4: 0,
          puzzle5: 0,
          puzzle6: 0,
          puzzle7: 0,
          puzzle8: 0,
        },
        landmarkFlag: true,
      },
    } as unknown as Gen3SaveData;

    void render(<Gen3TrickHouseDashboard saveData={saveData} />);

    await expect.element(page.getByText('TRICK HOUSE')).toBeInTheDocument();

    // Level 3 should require Rock Smash
    await expect.element(page.getByText('HM REQUIREMENT')).toBeInTheDocument();
    await expect.element(page.getByText('Rock Smash')).toBeInTheDocument();
  });

  it('renders the PRIZE WAITING indicator when prizePickup is 2', async () => {
    const saveData = {
      gen3TrickHouse: {
        level: 1,
        entranceState: 0,
        enterFromCorridor: 0,
        prizePickup: 2,
        puzzles: {
          puzzle1: 0,
          puzzle2: 0,
          puzzle3: 0,
          puzzle4: 0,
          puzzle5: 0,
          puzzle6: 0,
          puzzle7: 0,
          puzzle8: 0,
        },
        landmarkFlag: true,
      },
    } as unknown as Gen3SaveData;

    void render(<Gen3TrickHouseDashboard saveData={saveData} />);

    await expect.element(page.getByText('PRIZE WAITING')).toBeInTheDocument();
  });
});
