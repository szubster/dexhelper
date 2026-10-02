import { cn } from '../utils/cn';

interface FilterBadgeProps {
  isActive: boolean;
  label: string;
}

export function FilterBadge({ isActive, label }: FilterBadgeProps) {
  return (
    <span className="tactical-badge h-10 whitespace-nowrap px-2">
      <div
        className={cn(
          'absolute top-1 right-1 h-1.5 w-1.5 rounded-none',
          isActive ? 'bg-[var(--theme-primary)] shadow-[0_0_5px_var(--theme-primary)]' : 'bg-zinc-800',
        )}
      />
      <span className="inline-flex items-center whitespace-nowrap text-[9px] tracking-wider">
        <span aria-hidden="true">[&nbsp;</span>
        {label}
        <span aria-hidden="true">&nbsp;]</span>
      </span>
    </span>
  );
}
