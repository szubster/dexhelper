import { ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react';
import { getHeatmapColorClass, getSeverity } from '../../features/node-styling/utils/heatmap';
import { cn } from '../../utils/cn';
import { useDagTreeContext } from './DagTreeContext';
import { PersonaBadge } from './PersonaBadge';

export interface DagTreeItemProps {
  nodeId: string;
  label: string;
  status: string;
  persona?: string;
  isPermanentFailure?: boolean;
  rejectionCount?: number;
  showHeatmap?: boolean;
  maxRejectionThreshold?: number;
  children?: React.ReactNode;
}

export function DagTreeItem({
  nodeId,
  label,
  status,
  persona,
  isPermanentFailure,
  rejectionCount = 0,
  showHeatmap = false,
  maxRejectionThreshold = 3,
  children,
}: DagTreeItemProps) {
  const { expandedNodes, toggleNode } = useDagTreeContext();
  const isExpanded = expandedNodes.has(nodeId);
  const heatmapSeverity = getSeverity({
    value: rejectionCount,
    thresholds: { low: 1, medium: 2, high: 3, critical: maxRejectionThreshold },
  });
  const heatmapClass = showHeatmap && heatmapSeverity !== 'none' ? getHeatmapColorClass(heatmapSeverity) : '';
  const hasChildren = React.Children.count(children) > 0;

  let statusColor = 'text-zinc-500';
  switch (status) {
    case 'COMPLETED':
      statusColor = 'text-emerald-500';
      break;
    case 'ACTIVE':
    case 'IN_PROGRESS':
      statusColor = 'text-[var(--theme-primary)]';
      break;
    case 'FAILED':
    case 'BLOCKED':
      statusColor = 'text-red-500';
      break;
    case 'READY':
      statusColor = 'text-amber-500';
      break;
    default:
      if (status === 'CANCELLED' && isPermanentFailure) {
        statusColor = 'text-red-500';
      }
      break;
  }

  return (
    <li className="list-none">
      <div
        className={cn(
          'mb-1 flex items-center gap-2 rounded-none border border-dashed p-2 font-mono text-sm transition-colors',
          showHeatmap && heatmapClass
            ? heatmapClass
            : isPermanentFailure
              ? 'border-2 border-red-500 bg-red-900/40 brightness-125'
              : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800/50',
        )}
      >
        <button
          type="button"
          onClick={() => hasChildren && toggleNode(nodeId)}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-label={hasChildren ? (isExpanded ? `Collapse ${label}` : `Expand ${label}`) : undefined}
          title={hasChildren ? (isExpanded ? `Collapse ${label}` : `Expand ${label}`) : undefined}
          className="focus-visible:tactical-focus flex h-6 w-6 shrink-0 items-center justify-center rounded-none p-1 transition-colors hover:bg-zinc-700/50 disabled:cursor-not-allowed disabled:opacity-30"
          disabled={!hasChildren}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span className="h-[14px] w-[14px]" />
          )}
        </button>

        <span className={cn('w-24 shrink-0 font-bold tracking-widest uppercase', statusColor)}>[{status}]</span>

        <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <span className="truncate text-zinc-300">{label}</span>
          {persona && <PersonaBadge persona={persona} className="shrink-0" />}
        </div>
      </div>

      {hasChildren && isExpanded && <ul className="ml-3 border-l border-dashed border-zinc-700 pl-6">{children}</ul>}
    </li>
  );
}
