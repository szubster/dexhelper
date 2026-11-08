import { useStore } from '../../../store';
import type { Gen3TrainerCardState } from '../types';

export function useGen3TrainerCard(): Gen3TrainerCardState | null {
  const trainerCard = useStore((state) =>
    state.saveData?.generation === 3 ? state.saveData.gen3TrainerCard : undefined,
  );
  return trainerCard ?? null;
}
