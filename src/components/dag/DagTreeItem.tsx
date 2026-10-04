import { ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react';
import { cn } from '../../utils/cn';
import { useDagTreeContext } from './DagTreeContext';

export interface DagTreeItemProps {
  nodeId: string;
  label: string;
  status: string;
  isPermanentFailure?: boolean;
  children?: React.ReactNode;
}

export function DagTreeItem({ nodeId, label, status, isPermanentFailure, children }: DagTreeItemProps) {
  const { expandedNodes, toggleNode } = useDagTreeContext();
  const isExpanded = expandedNodes.has(nodeId);
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
          isPermanentFailure
            ? 'border-2 border-red-500 bg-red-900/40 brightness-125'
            : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800/50',
        )}
      >
        <button
          type="button"
          onClick={() => hasChildren && toggleNode(nodeId)}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-none p-1 hover:bg-zinc-700/50"
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

        <span className={cn('w-24 shrink-0 font-bold uppercase tracking-widest', statusColor)}>[{status}]</span>

        <span className="flex-1 truncate text-zinc-300">{label}</span>
      </div>

      {hasChildren && isExpanded && <ul className="ml-3 border-zinc-700 border-l border-dashed pl-6">{children}</ul>}
    </li>
  );
}
