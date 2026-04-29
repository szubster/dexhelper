import { X } from 'lucide-react';
import { useStore } from '../store';
import { getGenerationConfig, POKEBALL_LABELS } from '../utils/generationConfig';
import { ClearStorageButton } from './settings/ClearStorageButton';
import { SettingsControls } from './settings/SettingsControls';
import { SettingsLegend } from './settings/SettingsLegend';

export function SettingsModal() {
  const isSettingsOpen = useStore((s) => s.isSettingsOpen);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const saveData = useStore((s) => s.saveData);
  const setSaveData = useStore((s) => s.setSaveData);
  const manualVersion = useStore((s) => s.manualVersion);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const isLivingDex = useStore((s) => s.isLivingDex);
  const setIsLivingDex = useStore((s) => s.setIsLivingDex);
  const globalPokeball = useStore((s) => s.globalPokeball);
  const setGlobalPokeball = useStore((s) => s.setGlobalPokeball);

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  if (!isSettingsOpen) return null;

  const genConfig = saveData ? getGenerationConfig(saveData.generation) : null;

  const filteredPokeballs = (genConfig?.pokeballs ?? ['poke', 'great', 'ultra'])
    .filter((pb) => pb !== 'safari') // Safari Ball cannot be a default
    .map((value) => ({ value, label: POKEBALL_LABELS[value] }));

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        aria-hidden="true"
        className="fade-in absolute inset-0 animate-in bg-black/80 backdrop-blur-sm duration-300"
        onClick={() => setIsSettingsOpen(false)}
      />
      <div className="slide-in-from-bottom-[100%] sm:zoom-in-95 relative w-full animate-in overflow-hidden border-zinc-800 border-t border-dashed bg-zinc-950 shadow-2xl duration-300 sm:max-w-md sm:border">
        {/* Telemetry decoration */}
        <div className="absolute top-0 left-4 flex gap-1 rounded-b border border-zinc-800 border-t-0 border-dashed bg-zinc-900 px-3 py-1 font-black text-[8px] text-zinc-600 tracking-widest">
          <span className="animate-pulse text-[var(--theme-primary)]">●</span> SYS.CONFIG_ACTIVE
        </div>

        <div className="flex items-center justify-between border-zinc-800 border-b border-dashed p-8 pt-10">
          <div>
            <h2 className="font-black font-mono text-2xl uppercase tracking-tighter">SYS.CONFIG</h2>
            <p className="mt-1 font-bold font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              Configure your experience
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            aria-label="Close settings"
            title="Close settings"
            className="group relative border border-zinc-800 border-dashed bg-zinc-900 p-3 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            <div className="absolute top-0 left-0 h-1 w-1 border-[var(--theme-primary)] border-t border-l opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute top-0 right-0 h-1 w-1 border-[var(--theme-primary)] border-t border-r opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 h-1 w-1 border-[var(--theme-primary)] border-b border-l opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute right-0 bottom-0 h-1 w-1 border-[var(--theme-primary)] border-r border-b opacity-0 transition-opacity group-hover:opacity-100" />
            <X size={20} />
          </button>
        </div>

        <div className="custom-scrollbar max-h-[70vh] space-y-8 overflow-y-auto p-8">
          <SettingsLegend />
          <SettingsControls
            effectiveVersion={effectiveVersion}
            setManualVersion={setManualVersion}
            isLivingDex={isLivingDex}
            setIsLivingDex={setIsLivingDex}
            globalPokeball={globalPokeball}
            setGlobalPokeball={setGlobalPokeball}
            filteredPokeballs={filteredPokeballs}
            genConfig={genConfig}
          />
          <ClearStorageButton
            onClear={() => {
              localStorage.removeItem('last_save_file');
              setSaveData(null);
              setManualVersion(null);
              setIsSettingsOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
