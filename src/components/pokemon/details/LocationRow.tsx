import type React from 'react';
import { cn } from '../../../utils/cn';

interface LocationRowProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  iconColorClass: string;
  label: React.ReactNode;
  badge: React.ReactNode;
}

export function LocationRow({ icon, iconColorClass, label, badge, className, ...props }: LocationRowProps) {
  return (
    <div
      className={cn(
        'group flex items-center justify-between rounded-none border border-white/5 border-dashed bg-zinc-900 p-4 transition-all hover:border-[var(--theme-primary)]/30',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className={cn('rounded-none p-2', iconColorClass)}>{icon}</div>
        <span className="font-bold text-xs uppercase tracking-wide transition-colors group-hover:text-white">
          {label}
        </span>
      </div>
      {badge}
    </div>
  );
}
