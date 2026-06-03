import { cn } from '../../utils/cn';

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
      <fieldset>
        <legend className="sr-only">Filter by type</legend>
        <div className="mb-2 font-bold tracking-widest">[ SYSTEM.FILTER_TYPE ]</div>
        <div className="flex flex-wrap gap-2">
          {ALL_TYPES.map((type) => {
            const isActive = activeTypes.has(type);
            return (
              <button
                key={type}
                type="button"
                aria-pressed={isActive}
                title={`${type} type filter`}
                onClick={() => onTypeToggle(type)}
                className={cn(
                  'rounded-none border border-dashed px-2 py-1 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                  isActive
                    ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                    : 'border-zinc-800 text-zinc-500',
                )}
              >
                {type}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Filter by status</legend>
        <div className="mb-2 font-bold tracking-widest">[ SYSTEM.FILTER_STATUS ]</div>
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map((status) => {
            const isActive = activeStatuses.has(status);
            // Default styling
            let activeColorClass = 'border-[var(--theme-primary)] text-[var(--theme-primary)]';

            // Map statuses to appropriate colors similar to DagNode
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

            return (
              <button
                key={status}
                type="button"
                aria-pressed={isActive}
                title={`${status} status filter`}
                onClick={() => onStatusToggle(status)}
                className={cn(
                  'rounded-none border border-dashed px-2 py-1 transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                  isActive ? activeColorClass : 'border-zinc-800 text-zinc-500',
                )}
              >
                {status}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
