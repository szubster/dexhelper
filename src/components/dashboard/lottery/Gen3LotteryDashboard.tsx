import type React from 'react';
import { useLottery } from '../../../contexts/LotteryContext';
import { TacticalPanel } from '../../TacticalPanel';

export const Gen3LotteryDashboard: React.FC = () => {
  const { dailyWinningNumber, tier, winningPokemon } = useLottery();

  if (dailyWinningNumber === null) {
    return null;
  }

  return (
    <TacticalPanel>
      <span className="tactical-text z-10 mb-4 font-black text-lg text-white">LOTTERY STATUS</span>
      <div className="flex flex-col gap-4 font-mono">
        <div className="flex justify-between border-tactical-gray/30 border-b border-dashed pb-2">
          <span className="text-tactical-gray">WINNING NUMBER</span>
          <span className="font-bold text-tactical-cyan">{dailyWinningNumber.toString().padStart(5, '0')}</span>
        </div>

        <div className="flex justify-between border-tactical-gray/30 border-b border-dashed pb-2">
          <span className="text-tactical-gray">BEST TIER</span>
          <span className={tier > 0 ? 'font-bold text-tactical-cyan' : 'text-tactical-gray'}>
            {tier > 0 ? tier : 'NONE'}
          </span>
        </div>

        {winningPokemon && (
          <div className="flex justify-between pb-2">
            <span className="text-tactical-gray">WINNING PKMN</span>
            <span className="font-bold text-tactical-cyan">{winningPokemon.nickname}</span>
          </div>
        )}
      </div>
    </TacticalPanel>
  );
};
