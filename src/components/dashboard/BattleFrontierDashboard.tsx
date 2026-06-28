import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useMemo } from 'react';
import type { Gen3BattleFrontierProgress } from '../../engine/saveParser/parsers/common';

function FacilityNode({
  data,
}: {
  data: {
    label: string;
    current: number;
    record: number;
    silverFlag: boolean;
    goldFlag: boolean;
    silverTarget: number;
    goldTarget: number;
  };
}) {
  const nextBrain = data.goldFlag ? null : data.silverFlag ? data.goldTarget : data.silverTarget;
  const progress = nextBrain ? Math.min(100, Math.floor((data.current / nextBrain) * 100)) : 100;

  return (
    <div className="tactical-panel w-48 flex-col items-start gap-2 p-3 font-mono">
      <div className="w-full border-zinc-700 border-b border-dashed pb-1 font-bold text-white">{data.label}</div>
      <div className="flex w-full justify-between pt-1 text-xs text-zinc-400">
        <span>Streak:</span>
        <span className="text-white">{data.current}</span>
      </div>
      <div className="flex w-full justify-between text-xs text-zinc-400">
        <span>Record:</span>
        <span className="text-white">{data.record}</span>
      </div>

      {nextBrain && (
        <div className="mt-2 w-full">
          <div className="flex w-full justify-between text-[10px] text-zinc-500">
            <span>NEXT BRAIN:</span>
            <span>{nextBrain}</span>
          </div>
          <div className="mt-1 h-1 w-full border border-zinc-800 border-dashed bg-zinc-900">
            <div className="h-full bg-zinc-400 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      <div className="mt-2 flex w-full gap-2 text-xs">
        <span
          className={`border border-dashed px-1 ${data.silverFlag ? 'border-zinc-100 text-zinc-100' : 'border-zinc-800 text-zinc-600'}`}
        >
          SLV
        </span>
        <span
          className={`border border-dashed px-1 ${data.goldFlag ? 'border-yellow-400 text-yellow-400' : 'border-zinc-800 text-zinc-600'}`}
        >
          GLD
        </span>
      </div>
    </div>
  );
}

const nodeTypes = { facility: FacilityNode };

export function BattleFrontierDashboard({ progress }: { progress: Gen3BattleFrontierProgress }) {
  const initialNodes = useMemo(() => {
    return [
      { id: 'tower', type: 'facility', position: { x: 0, y: 0 }, data: { label: 'BATTLE TOWER', ...progress.tower } },
      { id: 'dome', type: 'facility', position: { x: 220, y: 0 }, data: { label: 'BATTLE DOME', ...progress.dome } },
      {
        id: 'palace',
        type: 'facility',
        position: { x: 440, y: 0 },
        data: { label: 'BATTLE PALACE', ...progress.palace },
      },
      { id: 'arena', type: 'facility', position: { x: 0, y: 120 }, data: { label: 'BATTLE ARENA', ...progress.arena } },
      {
        id: 'factory',
        type: 'facility',
        position: { x: 220, y: 120 },
        data: { label: 'BATTLE FACTORY', ...progress.factory },
      },
      { id: 'pike', type: 'facility', position: { x: 440, y: 120 }, data: { label: 'BATTLE PIKE', ...progress.pike } },
      {
        id: 'pyramid',
        type: 'facility',
        position: { x: 220, y: 240 },
        data: { label: 'BATTLE PYRAMID', ...progress.pyramid },
      },
    ];
  }, [progress]);

  return (
    <div className="relative h-[600px] w-full border border-zinc-800 border-dashed bg-zinc-950">
      <div className="tactical-panel absolute top-4 right-4 z-10 px-4 py-2 font-mono text-sm text-white">
        BP WALLET: <span className="text-[var(--theme-primary)]">{progress.battlePoints}</span>
      </div>
      <ReactFlow nodes={initialNodes} edges={[]} nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }}>
        <Background gap={12} size={1} color="#27272a" />
        <Controls showInteractive={false} className="tactical-panel border border-zinc-800 border-dashed bg-zinc-900" />
      </ReactFlow>
    </div>
  );
}
