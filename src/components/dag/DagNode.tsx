import { Handle, Position } from '@xyflow/react';
import { AlertTriangle } from 'lucide-react';
import React from 'react';
import { cn } from '../../utils/cn';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { useDagContext } from '../dashboard/DagContext';
import { TelemetryDecoration } from '../TelemetryDecoration';

export type DagNodeData = Record<string, unknown> & {
  type: string;
  status: string;
  owner_persona: string;
  rejection_count: number;
  label?: string;
  isHighlighted?: boolean;
  isDimmed?: boolean;
};

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders when parent states or viewports change
export const DagNode = React.memo(function DagNode({ data }: { data: DagNodeData }) {
  const { maxRejectionThreshold } = useDagContext();
  let statusColor = 'text-zinc-500';
  let dotColor = 'text-zinc-500';
  let bgClass = 'bg-zinc-900/50';
  let isPermanentFailure = false;

  switch (data.status) {
    case 'COMPLETED':
      statusColor = 'text-emerald-500';
      dotColor = 'text-emerald-500';
      bgClass = 'bg-emerald-950/20 border-emerald-500/50';
      break;
    case 'ACTIVE':
    case 'IN_PROGRESS':
      statusColor = 'text-[var(--theme-primary)]';
      dotColor = 'text-[var(--theme-primary)]';
      bgClass = 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)]/50';
      break;
    case 'FAILED':
    case 'BLOCKED':
      statusColor = 'text-red-500';
      dotColor = 'text-red-500';
      bgClass = 'bg-red-950/20 border-red-500/50';
      if (data.status === 'FAILED' && data.rejection_count >= maxRejectionThreshold) {
        isPermanentFailure = true;
        bgClass = 'bg-red-900/40 border-red-500 border-2 brightness-125';
      }
      break;
    case 'READY':
      statusColor = 'text-amber-500';
      dotColor = 'text-amber-500';
      bgClass = 'bg-amber-950/20 border-amber-500/50';
      break;
    default:
      // PENDING
      statusColor = 'text-zinc-500';
      bgClass = 'bg-zinc-900/50 border-white/20';
  }

  if (data.isHighlighted) {
    bgClass += ' !border-cyan-500 !border-2 bg-cyan-950/30';
    statusColor += ' brightness-150';
    dotColor += ' brightness-150';
  } else if (data.isDimmed) {
    bgClass += ' opacity-30 grayscale';
  }

  return (
    <div
      data-testid="dag-node"
      className={cn(
        'relative min-w-[200px] max-w-[300px] rounded-none border border-dashed p-3 font-mono transition-all',
        bgClass,
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-zinc-500 !w-2 !h-2 !rounded-none !border-0" />

      <CornerCrosshairs className="h-1.5 w-1.5 border-white/40" />

      <TelemetryDecoration
        label={data.type}
        className="-top-[17px] left-[-1px] rounded-none border-b-0 px-2 py-0.5 text-[8px]"
        dotClassName={dotColor}
      />

      <div className="mt-1 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest">
          <span>{data.owner_persona}</span>
          <span className={cn('font-bold', statusColor)}>{data.status}</span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="break-words font-bold text-white text-xs">{data.label}</div>
          {isPermanentFailure && (
            <div className="flex shrink-0 items-center text-red-500" title="Permanent Failure">
              <AlertTriangle size={14} />
            </div>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-zinc-500 !w-2 !h-2 !rounded-none !border-0" />
    </div>
  );
});
