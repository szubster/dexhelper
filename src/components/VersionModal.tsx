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
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" />
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-[2.5rem] border border-zinc-800 p-10 space-y-8 text-center animate-in zoom-in-95 duration-300">
        <div className="space-y-2">
          <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-4">
            <AlertTriangle className="text-amber-500" size={24} />
          </div>
          <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white">Select Game Version</h2>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
            We couldn't confidently detect your game version. Please select it manually.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setManualVersion(v.id as GameVersion);
                setIsVersionModalOpen(false);
              }}
              className="group relative overflow-hidden p-6 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-red-500/50 transition-all text-center"
            >
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className={`w-3 h-3 rounded-full shadow-lg ${v.dotColor}`} />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-100 group-hover:text-red-400 transition-colors">
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
