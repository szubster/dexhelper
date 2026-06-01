import { Activity, AlertTriangle, Database, Zap } from 'lucide-react';
import { CornerCrosshairs } from './CornerCrosshairs';
import { LcdGrid } from './LcdGrid';
import { ScanlineOverlay } from './ScanlineOverlay';

export function BootSequence() {
  return (
    <div className="relative flex min-h-[60vh] w-full flex-col items-center justify-center overflow-hidden rounded-none border border-[var(--theme-primary)]/30 border-dashed bg-black/80 p-8 shadow-[0_0_50px_rgba(var(--theme-primary-rgb),0.1)]">
      <ScanlineOverlay />
      <LcdGrid className="opacity-10" color="var(--theme-primary)" />
      <CornerCrosshairs thickness={2} className="h-4 w-4 border-[var(--theme-primary)]/60" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 flex animate-pulse items-center justify-center rounded-none border border-amber-500/50 bg-amber-500/10 p-6 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <AlertTriangle size={64} className="text-amber-500" />
        </div>

        <h2 className="mb-4 font-black font-display text-4xl text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] sm:text-6xl">
          NO_SIGNAL
        </h2>

        <div className="mb-12 flex flex-col items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <Zap size={10} className="text-[var(--theme-primary)]" /> [ SYS.INIT_SEQUENCE ] ...{' '}
            <span className="text-emerald-500">OK</span>
          </span>
          <span className="flex items-center gap-2">
            <Database size={10} className="text-[var(--theme-primary)]" /> [ MOUNT_STORAGE ] ...{' '}
            <span className="text-red-500">FAIL</span>
          </span>
          <span className="flex items-center gap-2">
            <Activity size={10} className="text-[var(--theme-primary)]" /> [ ESTABLISH_UPLINK ] ...{' '}
            <span className="animate-pulse text-amber-500">WAITING</span>
          </span>
        </div>

        <div className="rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-6 py-3 font-black font-mono text-[12px] text-[var(--theme-primary)] uppercase tracking-[0.2em] backdrop-blur-sm">
          PLEASE INITIALIZE DATALINK VIA [ UPLOAD.SYS ] OR [ LIVE_SYNC.SYS ]
        </div>
      </div>
    </div>
  );
}
