import { X } from 'lucide-react';
import { clearSaveData } from '../db/secureStorage';
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
      <div className="slide-in-from-bottom-[100%] sm:zoom-in-95 relative w-full animate-in overflow-hidden rounded-t-[2.5rem] border-zinc-800 border-t bg-zinc-900 shadow-2xl duration-300 sm:max-w-md sm:rounded-[2.5rem] sm:border">
        <div className="flex items-center justify-between border-zinc-800 border-b p-8">
          <div>
            <h2 className="font-black font-display text-2xl uppercase tracking-tight">Menu</h2>
            <p className="mt-1 font-bold text-[10px] text-zinc-500 uppercase tracking-widest">
              Configure your experience
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsSettingsOpen(false)}
            aria-label="Close settings"
            className="rounded-full bg-zinc-800 p-3 text-zinc-400 transition-colors hover:bg-zinc-700"
          >
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
              clearSaveData();
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
