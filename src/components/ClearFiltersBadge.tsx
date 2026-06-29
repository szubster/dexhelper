import { cn } from '../utils/cn';

interface ClearFiltersBadgeProps {
  isActive: boolean;
  onClick: () => void;
}

export function ClearFiltersBadge({ isActive, onClick }: ClearFiltersBadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      title="Clear filters"
      aria-label="Clear filters"
      className={cn(
        'group tactical-text focus-visible:tactical-focus !border !border-dashed relative flex h-10 min-w-[80px] flex-col items-center justify-center gap-1 font-black text-[10px] transition-all xl:min-w-[100px]',
        isActive
          ? '!border-[var(--theme-primary)] bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shadow-[inset_0_0_15px_rgba(var(--theme-primary-rgb),0.2)]'
          : '!border-zinc-800 hover:!border-zinc-600 bg-zinc-950/80 text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400',
      )}
    >
      <div
        className={cn(
          'absolute top-1 right-1 h-1.5 w-1.5 rounded-none',
          isActive ? 'bg-[var(--theme-primary)] shadow-[0_0_5px_var(--theme-primary)]' : 'bg-zinc-800',
        )}
      />
      [ ALL ]
    </button>
  );
}
