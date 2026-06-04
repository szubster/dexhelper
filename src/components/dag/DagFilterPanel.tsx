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
        containerClassName="gap-2 [&>div]:flex-wrap [&>div]:gap-2 [&>div]:border-none [&>button]:border"
        buttonBaseClassName="!border-dashed !border focus-visible:ring-[var(--theme-primary)] px-2 py-1 text-xs"
        defaultActiveClassName="border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent shadow-none"
        defaultInactiveClassName="border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400"
        selectedValues={activeTypes}
        onValueToggle={(val) => onTypeToggle(val as string)}
        items={ALL_TYPES.map((type) => ({
          id: type,
          label: type,
          testId: type,
          activeClassName: 'border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent shadow-none',
          inactiveClassName: 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400',
          className: activeTypes.has(type)
            ? 'border-[var(--theme-primary)] text-[var(--theme-primary)] bg-transparent shadow-none flex-none'
            : 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 flex-none',
        }))}
      />

      <TacticalMultiSelectControl
        ariaLabel="Filter by status"
        legendLabel="[ SYSTEM.FILTER_STATUS ]"
        containerClassName="gap-2 [&>div]:flex-wrap [&>div]:gap-2 [&>div]:border-none [&>button]:border"
        buttonBaseClassName="!border-dashed !border focus-visible:ring-[var(--theme-primary)] px-2 py-1 text-xs"
        selectedValues={activeStatuses}
        onValueToggle={(val) => onStatusToggle(val as string)}
        items={ALL_STATUSES.map((status) => {
          const isActive = activeStatuses.has(status);
          let activeColorClass = 'border-[var(--theme-primary)] text-[var(--theme-primary)]';

          if (isActive) {
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
          }

          return {
            id: status,
            label: status,
            testId: status,
            activeClassName: `${activeColorClass} bg-transparent shadow-none`,
            inactiveClassName: 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400',
            className: isActive
              ? `${activeColorClass} bg-transparent shadow-none flex-none`
              : 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 flex-none',
          };
        })}
      />
    </div>
  );
}
