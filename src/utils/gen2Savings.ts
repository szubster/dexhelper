export interface SavingsThreshold {
  amount: number;
  decoration: string;
}

export const MOMS_SAVINGS_THRESHOLDS: SavingsThreshold[] = [
  { amount: 10000, decoration: 'Charmander Doll' },
  { amount: 30000, decoration: 'Clefairy Doll' },
  { amount: 50000, decoration: 'Pikachu Doll' },
  { amount: 100000, decoration: 'Big Snorlax' },
];

export interface SavingsProgress {
  nextThresholdAmount: number | null;
  nextDecoration: string | null;
  amountRemaining: number;
  allThresholdsReached: boolean;
}

export function getSavingsProgress(money: number): SavingsProgress {
  for (const threshold of MOMS_SAVINGS_THRESHOLDS) {
    if (money < threshold.amount) {
      return {
        nextThresholdAmount: threshold.amount,
        nextDecoration: threshold.decoration,
        amountRemaining: threshold.amount - money,
        allThresholdsReached: false,
      };
    }
  }

  return {
    nextThresholdAmount: null,
    nextDecoration: null,
    amountRemaining: 0,
    allThresholdsReached: true,
  };
}
