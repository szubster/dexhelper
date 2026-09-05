import { cn } from '../utils/cn';

export function HardwareScrews({ className }: { className?: string }) {
  return (
    <>
      <div
        className={cn(
          'absolute top-1 left-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
          className,
        )}
      />
      <div
        className={cn(
          'absolute top-1 right-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
          className,
        )}
      />
      <div
        className={cn(
          'absolute bottom-1 left-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
          className,
        )}
      />
      <div
        className={cn(
          'absolute right-1 bottom-1 h-1 w-1 rounded-full bg-zinc-950/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]',
          className,
        )}
      />
    </>
  );
}
