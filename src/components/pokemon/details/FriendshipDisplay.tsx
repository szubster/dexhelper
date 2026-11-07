import { calculateFrustrationBasePower, calculateReturnBasePower } from '../../../engine/combat/friendshipPower';
import { TacticalBlockHeader } from '../../TacticalBlockHeader';
import { TacticalPanel } from '../../TacticalPanel';
import { TacticalProgressBar } from '../../TacticalProgressBar';

export interface FriendshipDisplayProps {
  friendship: number;
}

export const FriendshipDisplay = ({ friendship }: FriendshipDisplayProps) => {
  const returnPower = calculateReturnBasePower(friendship);
  const frustrationPower = calculateFrustrationBasePower(friendship);

  return (
    <TacticalPanel className="flex flex-col gap-2 p-3">
      <TacticalBlockHeader trackingLabel="SYNC_RATE" title="FRIENDSHIP STATUS" />
      <TacticalProgressBar
        label="SYNC_RATE"
        value={friendship}
        max={220}
        valueDisplay={
          <span className="font-mono text-zinc-400">
            <span className="font-bold text-zinc-200">{friendship}</span>/255
          </span>
        }
        variant="purple"
        codeTag="SYNC"
      />
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1 border border-dashed border-zinc-800 p-2">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">RETURN_POWER</span>
          <span className="font-mono text-sm text-zinc-200">{returnPower}</span>
        </div>
        <div className="flex flex-col gap-1 border border-dashed border-zinc-800 p-2">
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">FRUSTRATION_POWER</span>
          <span className="font-mono text-sm text-zinc-200">{frustrationPower}</span>
        </div>
      </div>
    </TacticalPanel>
  );
};
