import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '@dexhelper/engine/saveParser/parsers/common';
import { Gen3StaticEncountersDashboard } from '../Gen3StaticEncountersDashboard';

describe('Gen3StaticEncountersDashboard', () => {
  it('renders nothing if generation is not 3', async () => {
    const saveData = { generation: 2 } as SaveData;
    void render(<Gen3StaticEncountersDashboard saveData={saveData} />);
    await expect.element(page.getByText('STATIC ENCOUNTERS DB')).not.toBeInTheDocument();
  });

  it('renders nothing if gen3StaticEncounters is missing', async () => {
    const saveData = { generation: 3 } as SaveData;
    void render(<Gen3StaticEncountersDashboard saveData={saveData} />);
    await expect.element(page.getByText('STATIC ENCOUNTERS DB')).not.toBeInTheDocument();
  });

  it('renders the checklist correctly with claimed and unclaimed encounters', async () => {
    const saveData = {
      generation: 3,
      gen3StaticEncounters: {
        deoxys: true,
        rayquaza: false,
        mewtwo: true,
        snorlaxRoute12: false,
      },
    } as unknown as SaveData;

    void render(<Gen3StaticEncountersDashboard saveData={saveData} />);

    // Header should be present
    await expect.element(page.getByText('STATIC ENCOUNTERS DB')).toBeInTheDocument();

    // The display names should be formatted properly
    await expect.element(page.getByText('Deoxys')).toBeInTheDocument();
    await expect.element(page.getByText('Rayquaza')).toBeInTheDocument();
    await expect.element(page.getByText('Mewtwo')).toBeInTheDocument();
    await expect.element(page.getByText('Snorlax Route 12')).toBeInTheDocument();

    // Check states: 2 claimed ([X]), 2 unclaimed ([ ])
    const claimed = page.getByText('[X]');
    const unclaimed = page.getByText('[ ]');
    expect(claimed.elements().length).toBe(2);
    expect(unclaimed.elements().length).toBe(2);
  });
});
