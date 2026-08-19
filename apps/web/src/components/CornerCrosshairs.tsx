import { cn } from '../utils/cn';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CornerCrosshairsProps {
  className?: string;
  thickness?: 1 | 2;
  corners?: Corner[];
}

const ALL_CORNERS: Corner[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export function CornerCrosshairs({ className, thickness = 1, corners = ALL_CORNERS }: CornerCrosshairsProps) {
  const t = thickness === 2 ? 'border-t-2' : 'border-t';
  const r = thickness === 2 ? 'border-r-2' : 'border-r';
  const b = thickness === 2 ? 'border-b-2' : 'border-b';
  const l = thickness === 2 ? 'border-l-2' : 'border-l';

  return (
    <>
      {corners.includes('top-left') && (
        <div className={cn(`pointer-events-none absolute top-0 left-0 ${t} ${l}`, className)} />
      )}
      {corners.includes('top-right') && (
        <div className={cn(`pointer-events-none absolute top-0 right-0 ${t} ${r}`, className)} />
      )}
      {corners.includes('bottom-left') && (
        <div className={cn(`pointer-events-none absolute bottom-0 left-0 ${b} ${l}`, className)} />
      )}
      {corners.includes('bottom-right') && (
        <div className={cn(`pointer-events-none absolute right-0 bottom-0 ${r} ${b}`, className)} />
      )}
    </>
  );
}
