import type { SaveData } from '../engine/saveParser';
import { ScanlineOverlay } from './ScanlineOverlay';

interface RetroBackgroundProps {
  saveData: SaveData | null;
}

export function RetroBackground(_props: RetroBackgroundProps) {
  return (
    <>
      {/* Tactical Hardware Diagnostics Background */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
        <ScanlineOverlay />

        {/* Base Density Grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Major Sector Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Diagnostic Crosshairs & Reticles */}
        {/* Center Target */}
        <div className="absolute top-1/2 left-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-[0.04]">
          <div className="h-full w-[1px] border-white border-l border-dashed bg-white" />
          <div className="absolute h-[1px] w-full border-white border-t border-dashed bg-white" />
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 h-4 w-4 border-white border-t-2 border-l-2" />
          <div className="absolute top-0 right-0 h-4 w-4 border-white border-t-2 border-r-2" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-white border-b-2 border-l-2" />
          <div className="absolute right-0 bottom-0 h-4 w-4 border-white border-r-2 border-b-2" />
        </div>

        {/* Vertical/Horizontal Structural Beams (dashed) */}
        <div className="absolute top-0 left-[20%] h-full w-[1px] border-zinc-500 border-l border-dashed opacity-10" />
        <div className="absolute top-0 right-[20%] h-full w-[1px] border-zinc-500 border-l border-dashed opacity-10" />
        <div className="absolute top-[15%] left-0 h-[1px] w-full border-zinc-500 border-t border-dashed opacity-10" />
        <div className="absolute bottom-[15%] left-0 h-[1px] w-full border-zinc-500 border-t border-dashed opacity-10" />

        {/* Ambient Telemetry Readouts */}
        <div className="absolute top-[16%] left-[21%] font-mono text-[8px] text-zinc-600 uppercase tracking-widest opacity-20">
          [ SYS_DIAGNOSTIC_SECTOR_A ]<br />
          T_OFFSET: 0x000F4
          <br />
          STAT: STABLE
        </div>

        <div className="absolute right-[21%] bottom-[16%] text-right font-mono text-[8px] text-zinc-600 uppercase tracking-widest opacity-20">
          [ HW_OVERRIDE_ACTIVE ]<br />
          MEM_ALLOC: 4096KB
          <br />
          UPLINK: SECURED
        </div>

        {/* Active Scan Band (Pulsing Line) */}
        <div className="absolute top-0 left-0 h-[2px] w-full animate-pulse bg-gradient-to-r from-transparent via-[var(--theme-primary)]/10 to-transparent opacity-30" />

        {/* Hex Data Stream (Left Aligned for hardware look) */}
        <div className="absolute top-0 bottom-0 left-4 flex w-[100px] flex-col items-start overflow-hidden font-mono text-[8px] leading-tight opacity-[0.03]">
          <div className="animate-[scroll-down_120s_linear_infinite]">
            {Array.from({ length: 100 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable representing background items
              <div key={`hex-l-${i}`}>
                {window.crypto.getRandomValues(new Uint32Array(1))[0]?.toString(16).padStart(8, '0').toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* System Watermarks */}
        <div className="pointer-events-none absolute right-10 bottom-10 font-black font-mono text-9xl text-white/5 uppercase tracking-tighter mix-blend-overlay">
          SYS.TER
        </div>

        <div className="absolute top-10 right-10 flex flex-col items-end gap-1 opacity-[0.05]">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 w-2 border border-white bg-white/20" />
            ))}
          </div>
          <div className="font-mono text-[8px] text-white uppercase tracking-widest">SYS.TERMINAL.READY</div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
