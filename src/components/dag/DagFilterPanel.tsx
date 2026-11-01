import React from 'react';
import { TacticalMultiSelectControl } from '../TacticalMultiSelectControl';

export interface DagFilterPanelProps {
  activeTypes: Set<string>;
  activeStatuses: Set<string>;
  showPermanentFailures: boolean;
  showHeatmap: boolean;
  onTypeToggle: (type: string) => void;
  onStatusToggle: (status: string) => void;
  onTogglePermanentFailures: () => void;
  onToggleHeatmap: () => void;
}

const ALL_TYPES = ['RESEARCH', 'IDEA', 'ADR', 'PRD', 'EPIC', 'STORY', 'TASK'];
const ALL_STATUSES = ['PENDING', 'READY', 'ACTIVE', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'];

// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary re-renders of the filter panel during DAG pan/zoom
export const DagFilterPanel = React.memo(function DagFilterPanel({
  activeTypes,
  activeStatuses,
  showPermanentFailures,
  showHeatmap,
  onTypeToggle,
  onStatusToggle,
  onTogglePermanentFailures,
  onToggleHeatmap,
}: DagFilterPanelProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-4 border border-dashed border-zinc-800 bg-zinc-950/90 p-4 font-mono text-xs text-zinc-400 backdrop-blur-sm">
      <TacticalMultiSelectControl
        ariaLabel="Filter by type"
        legendLabel="[ SYSTEM.FILTER_TYPE ]"
        variant="ghost"
        containerClassName="gap-2 [&>div]:flex-wrap [&>div]:gap-2 [&>div]:border-none [&>button]:border"
        buttonBaseClassName="!border-dashed !border focus-visible:ring-[var(--theme-primary)] px-2 py-1 text-xs"
        selectedValues={activeTypes}
        onValueToggle={(val) => onTypeToggle(val)}
        items={ALL_TYPES.map((type) => ({
          id: type,
          label: type,
          testId: type,
          className: activeTypes.has(type) ? 'flex-none' : 'flex-none',
        }))}
      />

      <TacticalMultiSelectControl
        ariaLabel="Filter by status"
        legendLabel="[ SYSTEM.FILTER_STATUS ]"
        containerClassName="gap-2 [&>div]:flex-wrap [&>div]:gap-2 [&>div]:border-none [&>button]:border"
        buttonBaseClassName="!border-dashed !border focus-visible:ring-[var(--theme-primary)] px-2 py-1 text-xs"
        selectedValues={activeStatuses}
        onValueToggle={(val) => onStatusToggle(val)}
        items={ALL_STATUSES.map((status) => {
          let itemVariant: 'emerald' | 'amber' | 'red' | 'ghost' = 'ghost';

          switch (status) {
            case 'COMPLETED':
              itemVariant = 'emerald';
              break;
            case 'READY':
              itemVariant = 'amber';
              break;
            case 'FAILED':
            case 'BLOCKED':
              itemVariant = 'red';
              break;
          }

          return {
            id: status,
            label: status,
            testId: status,
            variant: itemVariant,
            className: 'flex-none',
          };
        })}
      />
      <div className="flex gap-2">
        <button
          type="button"
          aria-label="Toggle permanent failures only"
          title="Toggle permanent failures only"
          aria-pressed={showPermanentFailures}
          className={`border !border-dashed px-2 py-1 text-xs focus-visible:ring-[var(--theme-primary)] ${
            showPermanentFailures
              ? 'border-red-500 bg-red-950/20 text-red-500 shadow-none'
              : 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400'
          }`}
          onClick={onTogglePermanentFailures}
        >
          [ PERMANENT_FAILURES_ONLY ]
        </button>

        <button
          type="button"
          aria-label="Toggle heatmap overlay"
          title="Toggle heatmap overlay"
          aria-pressed={showHeatmap}
          className={`border !border-dashed px-2 py-1 text-xs focus-visible:ring-[var(--theme-primary)] ${
            showHeatmap
              ? 'border-amber-500 bg-amber-950/20 text-amber-500 shadow-none'
              : 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400'
          }`}
          onClick={onToggleHeatmap}
        >
          [ HEATMAP_OVERLAY ]
        </button>
      </div>
    </div>
  );
});
