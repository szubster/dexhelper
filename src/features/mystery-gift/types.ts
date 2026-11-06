import type { Gen3MysteryGift } from '../../engine/saveParser/parsers/common';

export interface MysteryGiftState {
  data: Gen3MysteryGift | null;
  loadDataFromAppStore: () => void;
}
