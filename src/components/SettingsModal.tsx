import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, Settings2, Archive, CircleDot, Trash2, Check, Ghost, Monitor } from 'lucide-react';
import { useStore } from '../store';
import type { PokeballType, GameVersion } from '../store';
import { getGenerationConfig, POKEBALL_LABELS } from '../utils/generationConfig';

import type { GenerationConfig } from '../utils/generationConfig';

function SettingsLegend() {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
        <Info size={12} /> Legend
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: <CircleDot size={14} className="text-rose-500" />, label: 'In Party' },
          { icon: <Monitor size={14} className="text-blue-400" />, label: 'In PC' },
          { icon: <Check size={14} className="text-emerald-400" />, label: 'Owned' },
          { icon: <Ghost size={14} className="text-purple-400" />, label: 'Lost' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-[11px] font-bold">
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
  genConfig
}: SettingsControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg"><Settings2 size={18} className="text-blue-500" /></div>
          <span className="text-xs font-bold uppercase tracking-wider">Version</span>
        </div>
        <select
          value={effectiveVersion}
          onChange={(e) => setManualVersion(e.target.value as GameVersion)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-zinc-200 outline-none focus:border-blue-500 transition-colors"
        >
          <option value="unknown">Auto</option>
          {(genConfig?.versions ?? [...getGenerationConfig(1).versions, ...getGenerationConfig(2).versions]).map(v => (
            <option key={v.id} value={v.id}>{v.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg"><Archive size={18} className="text-purple-500" /></div>
          <span className="text-xs font-bold uppercase tracking-wider">Living Dex</span>
        </div>
        <button
          onClick={() => setIsLivingDex(!isLivingDex)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${isLivingDex ? 'bg-emerald-600' : 'bg-zinc-800'}`}
        >
          <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${isLivingDex ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-lg"><CircleDot size={18} className="text-amber-500" /></div>
          <span className="text-xs font-bold uppercase tracking-wider">Ball Style</span>
        </div>
        <select
          value={globalPokeball}
          onChange={(e) => setGlobalPokeball(e.target.value as PokeballType)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs font-bold text-zinc-200 outline-none focus:border-amber-500 transition-colors"
        >
          {filteredPokeballs.map(pb => (
            <option key={pb.value} value={pb.value}>{pb.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function ClearStorageButton({ onClear }: { onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="w-full flex items-center justify-center gap-3 p-5 bg-red-600/10 text-red-500 rounded-2xl border border-red-600/20 font-bold uppercase tracking-widest text-[10px] hover:bg-red-600/20 transition-all group"
    >
      <Trash2 size={16} className="group-hover:rotate-12 transition-transform" />
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
    .filter(pb => pb !== 'safari') // Safari Ball cannot be a default
    .map(value => ({ value, label: POKEBALL_LABELS[value] }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsSettingsOpen(false)}
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full sm:max-w-md bg-zinc-900 rounded-t-[2.5rem] sm:rounded-[2.5rem] border-t sm:border border-zinc-800 shadow-2xl overflow-hidden"
        >
          <div className="p-8 border-b border-zinc-800 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-black uppercase tracking-tight">Menu</h2>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Configure your experience</p>
            </div>
            <button onClick={() => setIsSettingsOpen(false)} aria-label="Close settings" className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400">
              <X size={20} />
            </button>
          </div>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
