export interface DecorationItem {
  id: number;
  name: string;
  isMysteryGift: boolean;
  isActive: boolean;
  isUnlocked: boolean;
}

export interface DecorationCategory {
  Beds: DecorationItem[];
  Plants: DecorationItem[];
  Posters: DecorationItem[];
  Consoles: DecorationItem[];
  Ornaments: DecorationItem[];
  Dolls: DecorationItem[];
}

export const MysteryGiftExclusives: number[] = [
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
];
