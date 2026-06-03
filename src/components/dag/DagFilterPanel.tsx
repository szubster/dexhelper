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
        ariaLabel="Filter by type"
        legendLabel="[ SYSTEM.FILTER_TYPE ]"
        selectedValues={activeTypes}
        onValueToggle={onTypeToggle}
        joined={false}
        defaultActiveClassName="border-[var(--theme-primary)] text-[var(--theme-primary)]"
        defaultInactiveClassName="border-zinc-800 text-zinc-500"
        items={ALL_TYPES.map((type) => ({
          id: type,
          label: type,
          title: `Toggle ${type} type filter`,
        }))}
      />

      <TacticalMultiSelectControl
        ariaLabel="Filter by status"
        legendLabel="[ SYSTEM.FILTER_STATUS ]"
        selectedValues={activeStatuses}
        onValueToggle={onStatusToggle}
        joined={false}
        defaultInactiveClassName="border-zinc-800 text-zinc-500"
        items={ALL_STATUSES.map((status) => {
          let activeColorClass = 'border-[var(--theme-primary)] text-[var(--theme-primary)]';
          switch (status) {
            case 'COMPLETED':
              activeColorClass = 'border-emerald-500 text-emerald-500';
              break;
            case 'READY':
              activeColorClass = 'border-amber-500 text-amber-500';
              break;
            case 'FAILED':
            case 'BLOCKED':
              activeColorClass = 'border-red-500 text-red-500';
              break;
          }
          return {
            id: status,
            label: status,
            title: `Toggle ${status} status filter`,
            activeClassName: activeColorClass,
          };
        })}
      />
    </div>
  );
}
