import { create } from 'zustand';
import { useStore } from '../../store';
import type { MysteryGiftState } from './types';

export const useMysteryGiftStore = create<MysteryGiftState>((set) => ({
  data: null,
  loadDataFromAppStore: () => {
    const state = useStore.getState();
    const saveData = state.saveData;

    if (saveData && saveData.generation === 3 && saveData.gen3MysteryGift) {
      set({ data: saveData.gen3MysteryGift });
    } else {
      set({ data: null });
    }
  },
}));
