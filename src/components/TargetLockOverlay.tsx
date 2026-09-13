import { cn } from '../utils/cn';

interface TargetLockOverlayProps {
  className?: string;
}

export function TargetLockOverlay({ className }: TargetLockOverlayProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-20 border-[1px] border-cyan-400/0 transition-colors duration-300 group-hover/card:border-cyan-400/30 group-focus-visible/card:border-cyan-400/30',
        className,
      )}
    >
      <div className="absolute top-1 left-1 h-2 w-2 border-cyan-400/0 border-t border-l transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
      <div className="absolute top-1 right-1 h-2 w-2 border-cyan-400/0 border-t border-r transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
      <div className="absolute bottom-1 left-1 h-2 w-2 border-cyan-400/0 border-b border-l transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
      <div className="absolute right-1 bottom-1 h-2 w-2 border-cyan-400/0 border-r border-b transition-colors duration-300 group-hover/card:border-cyan-400/80 group-focus-visible/card:border-cyan-400/80" />
    </div>
  );
}
