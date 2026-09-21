import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useGen2RoomDecorations } from './useGen2RoomDecorations';

interface TestComponentProps {
  activeDecorations?: number[];
  unlockedDecorations?: boolean[];
}

function TestComponent({ activeDecorations = [], unlockedDecorations = [] }: TestComponentProps) {
  const result = useGen2RoomDecorations({ activeDecorations, unlockedDecorations });

  return (
    <div>
      <span data-testid="bed-active">{result.Beds.find((b) => b.id === 5)?.isActive ? 'yes' : 'no'}</span>
      <span data-testid="doll-mystery">{result.Dolls.find((d) => d.id === 22)?.isMysteryGift ? 'yes' : 'no'}</span>
      <span data-testid="map-unlocked">{result.Ornaments.find((o) => o.id === 1)?.isUnlocked ? 'yes' : 'no'}</span>
    </div>
  );
}

describe('useGen2RoomDecorations', () => {
  it('should return categorized decorations properly', async () => {
    const activeDecorations = [5, 22];
    const unlockedDecorations = Array.from({ length: 45 }).fill(false) as boolean[];
    unlockedDecorations[4] = true; // ID 5 (Featherly Bed)
    unlockedDecorations[21] = true; // ID 22 (Snorlax Doll)

    void render(<TestComponent activeDecorations={activeDecorations} unlockedDecorations={unlockedDecorations} />);

    await expect.element(page.getByTestId('bed-active')).toHaveTextContent('yes');
    await expect.element(page.getByTestId('doll-mystery')).toHaveTextContent('yes');
    await expect.element(page.getByTestId('map-unlocked')).toHaveTextContent('no');
  });
});
