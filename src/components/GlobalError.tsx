import { AlertTriangle } from 'lucide-react';
import { TacticalPanel } from './TacticalPanel';

interface GlobalErrorProps {
  error: string | null;
}

export function GlobalError({ error }: GlobalErrorProps) {
  if (!error) return null;

  return (
    <TacticalPanel
      variant="red"
      className="fade-in slide-in-from-top-2 relative mx-4 mt-4 mb-0 flex animate-in items-center gap-4 border-red-500/50 p-5 text-red-500"
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle size={24} className="relative z-10 flex-shrink-0" />
      <div className="relative z-10 flex flex-col">
        <span className="font-black font-mono text-[10px] text-red-400 uppercase tracking-tighter">
          <span aria-hidden="true">[ </span>SYSTEM.ERROR<span aria-hidden="true"> ]</span>
        </span>
        <span className="font-medium font-mono text-sm">{error}</span>
      </div>
    </TacticalPanel>
  );
}
