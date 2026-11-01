import { AlertCircle, Archive } from 'lucide-react';
import type React from 'react';
import { useGen3MissedItems } from '../../../contexts/Gen3MissedItemsContext';
import { DataPoint } from '../../DataPoint';
import { TacticalBlockHeader } from '../../TacticalBlockHeader';
import { TacticalPanel } from '../../TacticalPanel';

export const Gen3MissedItemsDashboard: React.FC = () => {
  const { missedItemsData } = useGen3MissedItems();

  if (!missedItemsData) {
    return null;
  }

  const { missedMasterBall, missedLegendaries } = missedItemsData;

  return (
    <TacticalPanel className="flex flex-col gap-4 p-4">
      <TacticalBlockHeader
        title="Missed Items & Milestones"
        trackingLabel="SYS.G3MI.TRACK"
        icon={<Archive size={12} />}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-none border border-dashed border-zinc-700 p-3">
          <DataPoint
            label="Master Ball Status"
            value={
              <div className="flex items-center gap-2">
                {missedMasterBall && <AlertCircle size={12} className="text-red-400" />}
                <span className={missedMasterBall ? 'text-red-400' : 'text-zinc-400'}>
                  {missedMasterBall ? 'Missed' : 'Not Missed (or Acquired)'}
                </span>
              </div>
            }
          />
        </div>
        <div className="flex flex-col gap-2 rounded-none border border-dashed border-zinc-700 p-3">
          <span className="mb-1 font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase">
            Missed Legendaries
          </span>
          {missedLegendaries.length > 0 ? (
            <ul className="list-inside list-disc font-mono text-sm text-red-400">
              {missedLegendaries.map((legendary) => (
                <li key={legendary}>{legendary}</li>
              ))}
            </ul>
          ) : (
            <span className="font-mono text-sm text-zinc-400">None</span>
          )}
        </div>
      </div>
    </TacticalPanel>
  );
};
