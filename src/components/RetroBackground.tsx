import type { SaveData } from '../engine/saveParser';

interface RetroBackgroundProps {
  saveData: SaveData | null;
}

export function RetroBackground(_props: RetroBackgroundProps) {
  return (
    <>
      {/* Tactical War Room Background */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-zinc-950">
        <div className="scanline-overlay absolute inset-0 opacity-20" />

        {/* Radar / Topo Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center',
          }}
        />

        {/* Concentric Radar Sweeps */}
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--theme-primary)]/5 opacity-20" />
        <div className="absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--theme-primary)]/5 opacity-10" />

        <div className="absolute top-1/2 left-1/2 h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-[var(--theme-primary)]/5" />
        <div className="absolute top-1/2 left-1/2 h-full w-[1px] -translate-x-1/2 -translate-y-1/2 bg-[var(--theme-primary)]/5" />

        {/* Scrolling Hex Data Streams */}
        <div className="absolute top-0 right-[10%] bottom-0 flex w-[200px] flex-col items-end overflow-hidden font-mono text-[8px] leading-tight opacity-[0.02]">
          <div className="animate-[scroll-up_60s_linear_infinite]">
            {Array.from({ length: 100 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable representing background items
              <div key={`hex-${i}`}>0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</div>
            ))}
          </div>
        </div>

        {/* System Watermarks */}
        <div className="absolute right-10 bottom-10 font-black font-mono text-9xl text-white/5 uppercase tracking-tighter mix-blend-overlay">
          SYS.TER
        </div>

        <div className="absolute top-10 left-10 origin-top-left rotate-90 font-black font-mono text-4xl text-white/[0.02] uppercase tracking-widest">
          [ DEPLOYED ]
        </div>
      </div>

      <style>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </>
  );
}
