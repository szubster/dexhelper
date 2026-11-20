import { beforeEach, describe, expect, it } from 'vitest';
import type { Gen3MysteryGift, Gen3SaveData } from '../../../engine/saveParser/parsers/common';
import { useStore } from '../../../store';
import { useMysteryGiftStore } from '../store';

describe('useMysteryGiftStore', () => {
  beforeEach(() => {
    // Reset stores before each test
    useStore.setState({ saveData: null });
    useMysteryGiftStore.setState({ data: null });
  });

  it('initializes with null data', () => {
    expect(useMysteryGiftStore.getState().data).toBeNull();
  });

  it('populates data correctly for a Gen 3 save with mystery gift', () => {
    const mockGen3MysteryGift = {
      isWonderCardValid: true,
      isWonderNewsValid: true,
      hasReceivedEvent: [true, false, false],
    } as unknown as Gen3MysteryGift;

    const mockSaveData: Gen3SaveData = {
      generation: 3,
      gen3MysteryGift: mockGen3MysteryGift,
      // stub other required fields minimally or cast
    } as unknown as Gen3SaveData;

    useStore.setState({ saveData: mockSaveData });
    useMysteryGiftStore.getState().loadDataFromAppStore();

    expect(useMysteryGiftStore.getState().data).toEqual(mockGen3MysteryGift);
  });

  it('sets data to null for a Gen 3 save missing mystery gift', () => {
    const mockSaveData: Gen3SaveData = {
      generation: 3,
      gen3MysteryGift: undefined,
    } as unknown as Gen3SaveData;

    useStore.setState({ saveData: mockSaveData });
    useMysteryGiftStore.getState().loadDataFromAppStore();

    expect(useMysteryGiftStore.getState().data).toBeNull();
  });

  it('sets data to null for non-Gen 3 save data', () => {
    const mockSaveData = {
      generation: 1,
    } as unknown as Gen3SaveData;

    useStore.setState({ saveData: mockSaveData });
    useMysteryGiftStore.getState().loadDataFromAppStore();

    expect(useMysteryGiftStore.getState().data).toBeNull();
  });

  it('sets data to null when save data is null', () => {
    useStore.setState({ saveData: null });

    // Set some initial data to ensure it gets cleared
    useMysteryGiftStore.setState({ data: { isWonderCardValid: true } as unknown as Gen3MysteryGift });

    useMysteryGiftStore.getState().loadDataFromAppStore();

    expect(useMysteryGiftStore.getState().data).toBeNull();
  });
});
