import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { Gen2DecorationsDashboard } from '../Gen2DecorationsDashboard';

describe('Gen2DecorationsDashboard', () => {
  const mockSaveData = {
    generation: 2,
    gen2RoomDecorations: {
      active: [2, 9, 14, 0], // Pikachu Poster, Red Carpet, Tropic Plant, None
      unlocked: [false, true, false, false, false, false, false, false, true, false, false, false, false, true],
      // Pikachu Poster (idx=1, ID=2), Red Carpet (idx=8, ID=9), Tropic Plant (idx=13, ID=14)
    },
  } as unknown as SaveData;

  it('renders active and unlocked decorations correctly', async () => {
    const screen = await render(<Gen2DecorationsDashboard saveData={mockSaveData} />);

    await expect.element(screen.getByText('ROOM DECORATIONS').first()).toBeVisible();

    // Check Active
    await expect.element(screen.getByText('Pikachu Poster').first()).toBeVisible();
    await expect.element(screen.getByText('Red Carpet').first()).toBeVisible();
    await expect.element(screen.getByText('Tropic Plant').first()).toBeVisible();
  });

  it('renders fallback for unknown decoration ID', async () => {
    const unknownData = {
      generation: 2,
      gen2RoomDecorations: {
        active: [999],
        unlocked: [true], // Deco ID = 1
      },
    } as unknown as SaveData;

    const screen = await render(<Gen2DecorationsDashboard saveData={unknownData} />);

    await expect.element(screen.getByText('DECO 999')).toBeVisible();
    await expect.element(screen.getByText('Town Map')).toBeVisible(); // Deco ID 1
  });
});
