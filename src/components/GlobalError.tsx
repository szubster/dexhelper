import { AlertTriangle } from 'lucide-react';
import { CornerCrosshairs } from './CornerCrosshairs';

interface GlobalErrorProps {
  error: string | null;
}

export function GlobalError({ error }: GlobalErrorProps) {
  if (!error) return null;

  return (
    <div className="fade-in slide-in-from-top-2 relative mx-4 mt-4 mb-0 flex animate-in items-center gap-4 rounded-none border border-red-500/50 border-dashed bg-red-950/50 p-5 text-red-500">
      <CornerCrosshairs className="h-2 w-2 border-red-500" />
      <AlertTriangle size={24} className="flex-shrink-0" />
      <div className="flex flex-col">
        <span className="font-black font-mono text-[10px] uppercase tracking-tighter">[ SYSTEM.ERROR ]</span>
        <span className="font-medium font-mono text-sm">{error}</span>
      </div>
    </div>
  );
}
