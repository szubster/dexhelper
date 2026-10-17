export type Gen2ApricornItemId =
  | 84 // Red Apricorn
  | 88 // Blu Apricorn
  | 91 // Ylw Apricorn
  | 92 // Grn Apricorn
  | 96 // Wht Apricorn
  | 98 // Blk Apricorn
  | 99; // Pnk Apricorn

export type Gen2KurtBallItemId =
  | 164 // Heavy Ball
  | 166 // Level Ball
  | 167 // Lure Ball
  | 168 // Fast Ball
  | 171 // Friend Ball
  | 172 // Moon Ball
  | 173; // Love Ball

export interface KurtApricornState {
  apricornId: Gen2ApricornItemId;
  ballId: Gen2KurtBallItemId;
  quantity: number;
  isCrafting: boolean;
  dayOfWeek?: number;
}

export type ApricornType = 'RED' | 'BLU' | 'YLW' | 'GRN' | 'WHT' | 'BLK' | 'PNK';

export interface ApricornBallMapping {
  apricornId: Gen2ApricornItemId;
  ballId: Gen2KurtBallItemId;
  ballName: string;
}
