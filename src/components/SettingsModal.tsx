import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info, Settings2, Archive, CircleDot, Trash2, Check, Ghost, Monitor, AlertTriangle } from 'lucide-react';
import { useAppState, PokeballType, GameVersion } from '../state';

export function SettingsModal() {
  const { 
    isSettingsOpen, setIsSettingsOpen, saveData, setSaveData,
    manualVersion, setManualVersion, isLivingDex, setIsLivingDex,
    globalPokeball, setGlobalPokeball
  } = useAppState();

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  if (!isSettingsOpen) return null;

  const pokeballs: { value: PokeballType; label: string; gen: 1 | 2 }[] = [
    { value: 'poke', label: 'Poké Ball', gen: 1 },
    { value: 'great', label: 'Great Ball', gen: 1 },
    { value: 'ultra', label: 'Ultra Ball', gen: 1 },
    { value: 'safari', label: 'Safari Ball', gen: 1 },
    { value: 'heavy', label: 'Heavy Ball', gen: 2 },
    { value: 'lure', label: 'Lure Ball', gen: 2 },
    { value: 'fast', label: 'Fast Ball', gen: 2 },
    { value: 'friend', label: 'Friend Ball', gen: 2 },
    { value: 'moon', label: 'Moon Ball', gen: 2 },
    { value: 'love', label: 'Love Ball', gen: 2 },
    { value: 'level', label: 'Level Ball', gen: 2 },
  ];

  const filteredPokeballs = pokeballs.filter(pb => {
    // Safari Ball cannot be a default
    if (pb.value === 'safari') return false;
    // Filter by generation
    if (saveData?.generation === 1 && pb.gen === 2) return false;
    return true;
  });

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
            <button onClick={() => setIsSettingsOpen(false)} className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Legend */}
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

            {/* Controls */}
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
                  {(!saveData || saveData.generation === 1) && (
                    <>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                      <option value="yellow">Yellow</option>
                    </>
                  )}
                  {(!saveData || saveData.generation === 2) && (
                    <>
                      <option value="gold">Gold</option>
                      <option value="silver">Silver</option>
                      <option value="crystal">Crystal</option>
                    </>
                  )}
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

            <button 
              onClick={() => {
                localStorage.removeItem('last_save_file');
                setSaveData(null);
                setManualVersion(null);
                setIsSettingsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-3 p-5 bg-red-600/10 text-red-500 rounded-2xl border border-red-600/20 font-bold uppercase tracking-widest text-[10px] hover:bg-red-600/20 transition-all group"
            >
              <Trash2 size={16} className="group-hover:rotate-12 transition-transform" /> 
              Clear Stored Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
