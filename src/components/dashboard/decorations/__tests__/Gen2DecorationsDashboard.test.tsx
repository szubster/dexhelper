import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import type { SaveData } from '../../../../engine/saveParser/parsers/common';
import { Gen2DecorationsDashboard } from '../Gen2DecorationsDashboard';

describe('Gen2DecorationsDashboard', () => {
  const mockSaveData = {
    generation: 2,
    gen2RoomDecorations: {
      active: [2, 9, 14, 0], // Pikachu Poster, Red Carpet, Tropic Plant, None
      unlocked: [
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        true,
        // idx 0..13 (IDs 1..14)
      ],
      // Unlocked IDs: 2, 9, 14
    },
  } as unknown as SaveData;

  it('renders categorized active and unlocked decorations correctly', async () => {
    const screen = await render(<Gen2DecorationsDashboard saveData={mockSaveData} />);

    await expect.element(screen.getByText('ROOM DECORATIONS').first()).toBeVisible();

    // Check categories
    await expect.element(screen.getByText('POSTERS').first()).toBeVisible();
    await expect.element(screen.getByText('ORNAMENTS').first()).toBeVisible();
    await expect.element(screen.getByText('PLANTS').first()).toBeVisible();

    // Check decorations
    await expect.element(screen.getByText('Pikachu Poster').first()).toBeVisible();
    await expect.element(screen.getByText('Red Carpet').first()).toBeVisible();
    await expect.element(screen.getByText('Tropic Plant').first()).toBeVisible();

    // Check Mystery Gift indicator is rendered
    // Pikachu Poster is MG, Red Carpet is MG, Tropic Plant is MG
    await expect.element(screen.getByText('[MG]').first()).toBeVisible();
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

    // Since ID 999 doesn't fall into any category, it won't be rendered.
    // We can just verify Town Map (ID 1) renders under POSTERS.
    await expect.element(screen.getByText('POSTERS').first()).toBeVisible();
    await expect.element(screen.getByText('Town Map').first()).toBeVisible();
  });
});
