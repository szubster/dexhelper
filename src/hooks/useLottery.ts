import { useMemo } from 'react';
import { getBestLotteryMatch } from '../engine/gen3/lottery/lottery';
import { useStore } from '../store';

export function useLottery() {
  const saveData = useStore((s) => s.saveData);

  return useMemo(() => {
    if (saveData?.generation !== 3 || saveData.gen3LotteryNumber === undefined) {
      return null;
    }

    const allPokemon = [...saveData.partyDetails, ...saveData.pcDetails];
    const { tier, winningPokemon } = getBestLotteryMatch(allPokemon, saveData.gen3LotteryNumber);

    let matchedDigits = 0;
    if (tier === 1) matchedDigits = 5;
    else if (tier === 2) matchedDigits = 4;
    else if (tier === 3) matchedDigits = 3;
    else if (tier === 4) matchedDigits = 2;

    return {
      winningNumber: saveData.gen3LotteryNumber,
      tier,
      winningPokemon,
      matchedDigits,
    };
  }, [saveData]);
}
