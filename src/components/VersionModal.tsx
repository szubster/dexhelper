import { AlertTriangle } from 'lucide-react';
import type { GameVersion } from '../store';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';

export function VersionModal() {
  const isVersionModalOpen = useStore((s) => s.isVersionModalOpen);
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const saveData = useStore((s) => s.saveData);

  if (!isVersionModalOpen) return null;

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;
  const versions = genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="fade-in absolute inset-0 animate-in bg-black/90 backdrop-blur-md duration-300" />
      <div className="zoom-in-95 relative w-full max-w-lg animate-in border border-zinc-800 border-dashed bg-zinc-900 shadow-2xl duration-300">
        <CornerCrosshairs className="h-2 w-2 border-zinc-600" />

        {/* Telemetry decoration */}
        <div className="absolute top-0 left-4 flex gap-1 rounded-b border border-zinc-800 border-t-0 border-dashed bg-zinc-950 px-3 py-1 font-black text-[8px] text-amber-600 tracking-widest">
          <span className="animate-pulse text-amber-500">●</span> SYS.VERSION_CONFLICT
        </div>

        <div className="flex flex-col items-center border-zinc-800 border-b border-dashed p-8 pt-10 text-center">
          <div className="mb-4 inline-flex border border-amber-500/20 border-dashed bg-amber-500/10 p-3">
            <CornerCrosshairs className="h-1 w-1 border-amber-500/40" />
            <AlertTriangle className="text-amber-500" size={24} />
          </div>
          <h2 className="font-black font-mono text-2xl text-white uppercase tracking-tighter">SYS.VERSION_CONFLICT</h2>
          <p className="mt-1 font-bold font-mono text-[10px] text-zinc-500 uppercase leading-relaxed tracking-widest">
            Game version detection failed. Manual override required.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 p-8 sm:grid-cols-3">
          {versions.map((v) => (
            <button
              type="button"
              key={v.id}
              aria-label={`Select ${v.label} version`}
              onClick={() => {
                setManualVersion(v.id as GameVersion);
                setIsVersionModalOpen(false);
              }}
              className="group relative border border-zinc-800 border-dashed bg-zinc-950 p-6 text-center transition-all hover:border-[var(--theme-primary)]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <CornerCrosshairs className="h-1 w-1 border-zinc-700 transition-colors group-hover:border-[var(--theme-primary)]" />

              {/* Radar hover effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--theme-primary)]/10 to-transparent opacity-0 transition-opacity group-hover:animate-[scan_2s_linear_infinite] group-hover:opacity-100" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className={`h-3 w-3 shadow-lg ${v.dotColor}`} />
                <span className="font-black font-mono text-xs text-zinc-100 uppercase tracking-[0.2em] transition-colors group-hover:text-[var(--theme-primary)]">
                  {v.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
