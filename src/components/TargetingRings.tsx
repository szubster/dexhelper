import { cn } from '../utils/cn';

export interface TargetingRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  outerClassName?: string;
  innerClassName?: string;
}

export function TargetingRings({ className, outerClassName, innerClassName, ...props }: TargetingRingsProps) {
  return (
    <div className={cn('pointer-events-none absolute inset-0', className)} {...props}>
      <div
        className={cn(
          'absolute inset-2 rounded-full border border-cyan-500/0 opacity-0 transition-all duration-500 group-hover/card:animate-[spin_4s_linear_infinite] group-hover/card:border-cyan-500/30 group-hover/card:opacity-100',
          outerClassName,
        )}
      />
      <div
        className={cn(
          'absolute inset-4 rounded-full border border-cyan-400/0 border-dashed opacity-0 transition-all duration-500 group-hover/card:animate-[spin_3s_linear_infinite_reverse] group-hover/card:border-cyan-400/20 group-hover/card:opacity-100',
          innerClassName,
        )}
      />
    </div>
  );
}
