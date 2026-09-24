import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { DecorationCategory } from '../../features/decorations/types';
import { MysteryGiftExclusives } from '../../features/decorations/types';
import { useGen2RoomDecorations } from './useGen2RoomDecorations';

interface TestComponentProps {
  activeDecorations?: number[];
  unlockedDecorations?: boolean[];
  onRender: (result: DecorationCategory) => void;
}

function TestComponent({ activeDecorations = [], unlockedDecorations = [], onRender }: TestComponentProps) {
  const result = useGen2RoomDecorations({ activeDecorations, unlockedDecorations });
  onRender(result);
  return null;
}

describe('useGen2RoomDecorations', () => {
  it('should categorize decorations properly and handle active/unlocked states', async () => {
    let hookResult: DecorationCategory | undefined;
    const onRender = vi.fn<(result: DecorationCategory) => void>((result) => {
      hookResult = result;
    });

    const activeDecorations = [5, 22]; // ID 5 (Bed), ID 22 (Doll)
    const unlockedDecorations = Array.from({ length: 45 }).fill(false) as boolean[];
    unlockedDecorations[4] = true; // ID 5 (Featherly Bed)
    unlockedDecorations[21] = true; // ID 22 (Snorlax Doll)

    await render(
      <TestComponent
        activeDecorations={activeDecorations}
        unlockedDecorations={unlockedDecorations}
        onRender={onRender}
      />,
    );

    expect(hookResult).toBeDefined();

    // Beds
    const bed = hookResult?.Beds.find((b) => b.id === 5);
    expect(bed?.isActive).toBe(true);
    expect(bed?.isUnlocked).toBe(true);

    // Dolls
    const doll = hookResult?.Dolls.find((d) => d.id === 22);
    expect(doll?.isActive).toBe(true);
    expect(doll?.isUnlocked).toBe(true);
    expect(doll?.isMysteryGift).toBe(true);

    // Ornaments
    const map = hookResult?.Ornaments.find((o) => o.id === 1);
    expect(map?.isActive).toBe(false);
    expect(map?.isUnlocked).toBe(false);
  });

  it('should correctly flag Mystery Gift exclusives', async () => {
    let hookResult: DecorationCategory | undefined;
    const onRender = vi.fn<(result: DecorationCategory) => void>((result) => {
      hookResult = result;
    });

    await render(<TestComponent onRender={onRender} />);
    expect(hookResult).toBeDefined();

    if (!hookResult) return;

    const allItems = [
      ...hookResult.Beds,
      ...hookResult.Plants,
      ...hookResult.Posters,
      ...hookResult.Consoles,
      ...hookResult.Ornaments,
      ...hookResult.Dolls,
    ];

    MysteryGiftExclusives.forEach((id) => {
      const item = allItems.find((i) => i.id === id);
      expect(item?.isMysteryGift).toBe(true);
    });

    // Check a non-mystery gift item
    const townMap = hookResult.Ornaments.find((o) => o.id === 1);
    expect(townMap?.isMysteryGift).toBe(false);
  });

  it('should handle edge cases where decorations are active but not unlocked or neither', async () => {
    let hookResult: DecorationCategory | undefined;
    const onRender = vi.fn<(result: DecorationCategory) => void>((result) => {
      hookResult = result;
    });

    const activeDecorations = [6]; // Pink Bed active
    const unlockedDecorations = Array.from({ length: 45 }).fill(false) as boolean[];
    // Notice we DO NOT set unlockedDecorations[5] to true

    await render(
      <TestComponent
        activeDecorations={activeDecorations}
        unlockedDecorations={unlockedDecorations}
        onRender={onRender}
      />,
    );
    expect(hookResult).toBeDefined();

    // Active but not unlocked
    const pinkBed = hookResult?.Beds.find((b) => b.id === 6);
    expect(pinkBed?.isActive).toBe(true);
    expect(pinkBed?.isUnlocked).toBe(false);

    // Neither active nor unlocked
    const polkadotBed = hookResult?.Beds.find((b) => b.id === 7);
    expect(polkadotBed?.isActive).toBe(false);
    expect(polkadotBed?.isUnlocked).toBe(false);

    // Unlocked but not active
    const pikachuBed = hookResult?.Beds.find((b) => b.id === 8);
    expect(pikachuBed?.isActive).toBe(false);
    expect(pikachuBed?.isUnlocked).toBe(false);
  });
});
