import { AlertTriangle } from 'lucide-react';

interface GlobalErrorProps {
  error: string | null;
}

export function GlobalError({ error }: GlobalErrorProps) {
  if (!error) return null;

  return (
    <div
      className="fade-in slide-in-from-top-2 relative mx-4 mt-4 mb-0 flex animate-in flex-col overflow-hidden border border-red-900/80 border-dashed bg-black/80"
      role="alert"
      aria-live="assertive"
    >
      {/* Hazard Stripes Lip */}
      <div
        className="h-2 w-full opacity-80"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #7f1d1d 0px, #7f1d1d 10px, transparent 10px, transparent 20px)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-6 p-8 sm:flex-row sm:p-10">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-red-900/50 bg-red-950/30">
          <AlertTriangle size={40} className="animate-pulse text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-ping rounded-none bg-red-500" />
            <span className="font-black font-mono text-red-400 text-xs uppercase tracking-[0.3em]">
              [ CRITICAL_SYSTEM_FAULT ]
            </span>
          </div>
          <span className="font-black font-mono text-2xl text-white uppercase tracking-wider">{error}</span>
          <div className="mt-4 border border-red-900/30 bg-red-950/20 p-4 font-mono text-[10px] text-red-500/80 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span>{'>'}</span>
              <span>ERR_CODE: 0xDEADBEEF - KERNEL_PANIC</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{'>'}</span>
              <span>DUMP: 01001001 01001110 01010110 01000001 01001100 01001001 01000100</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-red-400">
              <span className="animate-pulse">{'>'}</span>
              <span>PLEASE REBOOT TERMINAL OR CHECK UPLINK CONNECTION.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
