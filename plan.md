1. Write the new file `src/components/dashboard/missed-items/Gen3MissedItemsDashboard.tsx` with the following content:
```tsx
import { AlertCircle, Archive } from 'lucide-react';
import React from 'react';
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
      <TacticalBlockHeader title="Missed Items & Milestones" trackingLabel="SYS.G3MI.TRACK" icon={<Archive size={12} />} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-none border border-dashed border-zinc-700 p-3">
          <DataPoint
            label="Master Ball Status"
            value={missedMasterBall ? 'Missed' : 'Not Missed (or Acquired)'}
            valueColor={missedMasterBall ? 'text-red-400' : 'text-zinc-400'}
            icon={missedMasterBall ? <AlertCircle size={12} className="text-red-400" /> : undefined}
          />
        </div>
        <div className="flex flex-col gap-2 rounded-none border border-dashed border-zinc-700 p-3">
          <span className="text-xs font-bold text-zinc-500 font-mono tracking-widest uppercase mb-1">
            Missed Legendaries
          </span>
          {missedLegendaries.length > 0 ? (
            <ul className="list-inside list-disc text-sm text-red-400 font-mono">
              {missedLegendaries.map((legendary) => (
                <li key={legendary}>{legendary}</li>
              ))}
            </ul>
          ) : (
            <span className="text-sm text-zinc-400 font-mono">None</span>
          )}
        </div>
      </div>
    </TacticalPanel>
  );
};
```
2. Verify the creation of `src/components/dashboard/missed-items/Gen3MissedItemsDashboard.tsx` using `head -n 20 src/components/dashboard/missed-items/Gen3MissedItemsDashboard.tsx`.
3. Modify `src/routes/gen3-dashboard.tsx` to integrate `Gen3MissedItemsDashboard` into `Gen3DashboardPage`.
4. Verify the integration of `Gen3MissedItemsDashboard` in `src/routes/gen3-dashboard.tsx` using `head -n 30 src/routes/gen3-dashboard.tsx`.
5. Modify `.foundry/tasks/task-563-681-gen3-missed-items-ui-components.md` to check off the acceptance criteria checkboxes.
6. Verify the modifications to `.foundry/tasks/task-563-681-gen3-missed-items-ui-components.md` using `cat .foundry/tasks/task-563-681-gen3-missed-items-ui-components.md`.
7. Verify system health and remove any scratchpad files by running `export NODE_OPTIONS="--max-old-space-size=4096" && pnpm lint && pnpm test && rm -f plan.md`.
8. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
9. Use the `submit` tool to create a Pull Request.
