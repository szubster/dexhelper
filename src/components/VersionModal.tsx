import { AlertTriangle } from 'lucide-react';
import type { GameVersion } from '../store';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';

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
      <div className="zoom-in-95 relative w-full max-w-lg animate-in space-y-8 rounded-[2.5rem] border border-zinc-800 bg-zinc-900 p-10 text-center duration-300">
        <div className="space-y-2">
          <div className="mb-4 inline-flex rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3">
            <AlertTriangle className="text-amber-500" size={24} />
          </div>
          <h2 className="font-black font-display text-2xl text-white uppercase tracking-tight">Select Game Version</h2>
          <p className="font-bold text-xs text-zinc-500 uppercase leading-relaxed tracking-widest">
            We couldn't confidently detect your game version. Please select it manually.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {versions.map((v) => (
            <button
              type="button"
              key={v.id}
              aria-label={`Select ${v.label} version`}
              onClick={() => {
                setManualVersion(v.id as GameVersion);
                setIsVersionModalOpen(false);
              }}
              className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-center transition-all hover:border-red-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className={`h-3 w-3 rounded-full shadow-lg ${v.dotColor}`} />
                <span className="font-black text-xs text-zinc-100 uppercase tracking-[0.2em] transition-colors group-hover:text-red-400">
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
