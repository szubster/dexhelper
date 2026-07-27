import { useLottery } from '../../hooks/useLottery';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalCard } from '../TacticalCard';

export function LotteryPanel() {
  const lottery = useLottery();

  if (!lottery) {
    return null;
  }

  return (
    <TacticalCard className="rounded-none">
      <TacticalBlockHeader
        title="LILYCOVE LOTTERY"
        trackingLabel="MATCHING ENGINE"
        variant={lottery.tier > 0 ? 'primary' : 'red'}
      />
      <div className="space-y-2 p-4 font-mono text-sm">
        <div className="flex justify-between border-gray-600 border-b border-dashed pb-2">
          <span className="text-gray-400">WINNING NUMBER</span>
          <span className="text-green-400">{lottery.winningNumber.toString().padStart(5, '0')}</span>
        </div>

        {lottery.tier > 0 && lottery.winningPokemon ? (
          <>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">BEST MATCH</span>
              <span className="text-white">{lottery.winningPokemon.nickname || 'Unknown'}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">OT ID</span>
              <span className="text-white">{lottery.winningPokemon.otId?.toString().padStart(5, '0')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">MATCHED DIGITS</span>
              <span className="text-white">{lottery.matchedDigits}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-400">PRIZE TIER</span>
              <span className="text-yellow-400">Tier {lottery.tier}</span>
            </div>
          </>
        ) : (
          <div className="py-4 text-center text-red-400">NO WINNING POKEMON FOUND IN PARTY OR PC</div>
        )}
      </div>
    </TacticalCard>
  );
}
