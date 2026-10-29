import type React from 'react';
import { useMemo } from 'react';
import { PersonaBadge } from '../../dag/PersonaBadge';
import type { DagNodeData } from '../DagContext';
import { useDagContext } from '../DagContext';

const COLUMNS = ['PENDING', 'READY', 'ACTIVE', 'BLOCKED', 'COMPLETED', 'FAILED', 'CANCELLED'];

export const DagKanbanBoard: React.FC = () => {
  const { nodes, maxRejectionThreshold, activeTypes, activeStatuses, showPermanentFailures } = useDagContext();

  const nodesByStatus = useMemo(() => {
    const grouped: Record<string, DagNodeData[]> = {};
    for (const col of COLUMNS) {
      grouped[col] = [];
    }

    for (const node of nodes) {
      const type = node.data.type;
      const status = node.data.status;

      let shouldInclude = type && status && activeTypes.has(type) && activeStatuses.has(status);

      if (shouldInclude && showPermanentFailures) {
        shouldInclude =
          (node.data.status === 'FAILED' || node.data.status === 'CANCELLED') &&
          node.data.rejection_count >= maxRejectionThreshold;
      }

      if (shouldInclude && grouped[status]) {
        grouped[status].push(node.data);
      }
    }
    return grouped;
  }, [nodes, activeTypes, activeStatuses, showPermanentFailures, maxRejectionThreshold]);

  return (
    <div className="flex h-full w-full gap-4 overflow-x-auto bg-zinc-950 p-4 font-mono">
      {COLUMNS.map((col) => {
        const columnNodes = nodesByStatus[col] ?? [];
        return (
          <div
            key={col}
            className="flex min-w-[300px] flex-col gap-2 rounded-none border border-zinc-800 border-dashed bg-zinc-900 p-2"
          >
            <h3 className="border-zinc-800 border-b border-dashed pb-2 text-sm text-zinc-400">
              {col} ({columnNodes.length})
            </h3>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {columnNodes.map((nodeData) => {
                const isPermanentlyFailed =
                  (nodeData.status === 'FAILED' || nodeData.status === 'CANCELLED') &&
                  nodeData.rejection_count >= maxRejectionThreshold;
                return (
                  <div
                    key={String(nodeData['id'])}
                    className={`flex flex-col border border-dashed p-2 text-xs ${isPermanentlyFailed ? 'border-red-600 bg-red-950/20' : 'border-zinc-800 bg-zinc-950 text-zinc-300'}`}
                  >
                    <span className="font-bold">{String(nodeData['id'])}</span>
                    <span className="text-zinc-500">
                      {String(nodeData.type)} |{' '}
                      <PersonaBadge persona={nodeData.owner_persona} className="inline-flex border-none px-0 py-0" />
                    </span>
                    {isPermanentlyFailed && <span className="mt-1 text-red-500">[ PERMANENTLY FAILED ]</span>}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
