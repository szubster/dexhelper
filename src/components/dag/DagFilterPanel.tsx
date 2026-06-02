import { TacticalMultiSelectControl } from '../TacticalMultiSelectControl';

export interface DagFilterPanelProps {
  activeTypes: Set<string>;
  activeStatuses: Set<string>;
  onTypeToggle: (type: string) => void;
  onStatusToggle: (status: string) => void;
}

const ALL_TYPES = ['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK'];
const ALL_STATUSES = ['PENDING', 'READY', 'ACTIVE', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED'];

export function DagFilterPanel({ activeTypes, activeStatuses, onTypeToggle, onStatusToggle }: DagFilterPanelProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-4 border border-zinc-800 border-dashed bg-zinc-950/90 p-4 font-mono text-xs text-zinc-400 backdrop-blur-sm">
      <TacticalMultiSelectControl
        legend={<div className="mb-2 font-bold tracking-widest">[ SYSTEM.FILTER_TYPE ]</div>}
        ariaLabel="Filter by type"
        wrapperClassName="flex flex-wrap gap-2"
        hideSeparators={true}
        buttonBaseClassName="flex-none px-2 py-1 text-xs"
        defaultActiveClassName="border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent"
        defaultInactiveClassName="border-zinc-800 text-zinc-500 hover:bg-zinc-800"
        items={ALL_TYPES.map((type) => ({
          id: type,
          label: type,
          isActive: activeTypes.has(type),
          title: `Toggle ${type} type filter`,
          ariaLabel: `Toggle ${type} type filter`,
          onClick: () => onTypeToggle(type),
          className: 'rounded-none border border-dashed transition-colors',
        }))}
      />

      <TacticalMultiSelectControl
        legend={<div className="mb-2 font-bold tracking-widest">[ SYSTEM.FILTER_STATUS ]</div>}
        ariaLabel="Filter by status"
        wrapperClassName="flex flex-wrap gap-2"
        hideSeparators={true}
        buttonBaseClassName="flex-none px-2 py-1 text-xs"
        defaultInactiveClassName="border-zinc-800 text-zinc-500 hover:bg-zinc-800"
        items={ALL_STATUSES.map((status) => {
          let activeColorClass = 'border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent';
          if (activeStatuses.has(status)) {
            switch (status) {
              case 'COMPLETED':
                activeColorClass = 'border-emerald-500 text-emerald-500 bg-transparent';
                break;
              case 'READY':
                activeColorClass = 'border-amber-500 text-amber-500 bg-transparent';
                break;
              case 'FAILED':
              case 'BLOCKED':
                activeColorClass = 'border-red-500 text-red-500 bg-transparent';
                break;
            }
          }

          return {
            id: status,
            label: status,
            isActive: activeStatuses.has(status),
            title: `Toggle ${status} status filter`,
            ariaLabel: `Toggle ${status} status filter`,
            onClick: () => onStatusToggle(status),
            activeClassName: activeColorClass,
            className: 'rounded-none border border-dashed transition-colors',
          };
        })}
      />
    </div>
  );
}
