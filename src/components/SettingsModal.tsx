import { Archive, Check, CircleDot, Ghost, Info, Monitor, Settings2, Trash2, X } from 'lucide-react';
import React from 'react';
import type { GameVersion, PokeballType } from '../store';
import { useStore } from '../store';
import type { GenerationConfig } from '../utils/generationConfig';
import { getGenerationConfig, POKEBALL_LABELS } from '../utils/generationConfig';

function SettingsLegend() {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 font-black text-[10px] text-zinc-500 uppercase tracking-widest">
        <Info size={12} /> Legend
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <CircleDot size={14} className="text-rose-500" />, label: 'In Party' },
          { icon: <Monitor size={14} className="text-blue-400" />, label: 'In PC' },
          { icon: <Check size={14} className="text-emerald-400" />, label: 'Owned' },
          { icon: <Ghost size={14} className="text-purple-400" />, label: 'Lost' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-bold text-[11px]"
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SettingsControlsProps {
  effectiveVersion: string;
  setManualVersion: (v: GameVersion | null) => void;
  isLivingDex: boolean;
  setIsLivingDex: (v: boolean) => void;
  globalPokeball: PokeballType;
  setGlobalPokeball: (v: PokeballType) => void;
  filteredPokeballs: { value: PokeballType; label: string }[];
  genConfig: GenerationConfig | null;
}

function SettingsControls({
  effectiveVersion,
  setManualVersion,
  isLivingDex,
  setIsLivingDex,
  globalPokeball,
  setGlobalPokeball,
  filteredPokeballs,
  genConfig,
}: SettingsControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Settings2 size={18} className="text-blue-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Version</span>
        </div>
        <select
          value={effectiveVersion}
          onChange={(e) => setManualVersion(e.target.value as GameVersion)}
          aria-label="Select Game Version"
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 font-bold text-xs text-zinc-200 outline-none transition-colors focus:border-blue-500"
        >
          <option value="unknown">Auto</option>
          {(genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions]).map(
            (v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-500/10 p-2">
            <Archive size={18} className="text-purple-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Living Dex</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isLivingDex}
          aria-label="Toggle Living Dex Mode"
          onClick={() => setIsLivingDex(!isLivingDex)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${isLivingDex ? 'bg-emerald-600' : 'bg-zinc-800'}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isLivingDex ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/10 p-2">
            <CircleDot size={18} className="text-amber-500" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider">Ball Style</span>
        </div>
        <select
          value={globalPokeball}
          onChange={(e) => setGlobalPokeball(e.target.value as PokeballType)}
          aria-label="Select Ball Style"
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 font-bold text-xs text-zinc-200 outline-none transition-colors focus:border-amber-500"
        >
          {filteredPokeballs.map((pb) => (
            <option key={pb.value} value={pb.value}>
              {pb.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ClearStorageButton({ onClear }: { onClear: () => void }) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  if (isConfirming) {
    return (
      <div className="fade-in zoom-in-95 flex w-full animate-in gap-2 duration-200">
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 p-5 font-bold text-[10px] text-zinc-300 uppercase tracking-widest transition-all hover:bg-zinc-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClear}
          className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500 bg-red-600 p-5 font-bold text-[10px] text-white uppercase tracking-widest transition-all hover:bg-red-500"
        >
          <Trash2 size={14} className="transition-transform group-hover:rotate-12" />
          Confirm Delete
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="group fade-in zoom-in-95 flex w-full animate-in items-center justify-center gap-3 rounded-2xl border border-red-600/20 bg-red-600/10 p-5 font-bold text-[10px] text-red-500 uppercase tracking-widest transition-all duration-200 hover:bg-red-600/20"
    >
      <Trash2 size={16} className="transition-transform group-hover:rotate-12" />
      Clear Stored Save
    </button>
  );
}

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
