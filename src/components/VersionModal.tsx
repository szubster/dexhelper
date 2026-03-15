import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { useAppState, GameVersion } from '../state';

export function VersionModal() {
  const { isVersionModalOpen, setIsVersionModalOpen, setManualVersion, saveData } = useAppState();

  if (!isVersionModalOpen) return null;

  const versions = saveData?.generation === 2 
    ? ['gold', 'silver', 'crystal'] 
    : ['red', 'blue', 'yellow'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-zinc-900 rounded-[2.5rem] border border-zinc-800 p-10 space-y-8 text-center"
        >
          <div className="space-y-2">
            <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-4">
              <AlertTriangle className="text-amber-500" size={24} />
            </div>
            <h2 className="text-2xl font-display font-black uppercase tracking-tight text-white">Select Game Version</h2>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">We couldn't confidently detect your game version. Please select it manually.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {versions.map(v => (
              <button
                key={v}
                onClick={() => {
                  setManualVersion(v as GameVersion);
                  setIsVersionModalOpen(false);
                }}
                className="group relative overflow-hidden p-6 bg-zinc-950 border border-zinc-800 rounded-3xl hover:border-red-500/50 transition-all text-center"
              >
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-3 h-3 rounded-full shadow-lg ${
                    v === 'red' ? 'bg-red-500 shadow-red-500/20' : 
                    v === 'blue' ? 'bg-blue-500 shadow-blue-500/20' : 
                    v === 'yellow' ? 'bg-yellow-400 shadow-yellow-400/20' :
                    v === 'gold' ? 'bg-yellow-500' :
                    v === 'silver' ? 'bg-zinc-400' :
                    v === 'crystal' ? 'bg-cyan-400' : ''
                  }`} />
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-100 group-hover:text-red-400 transition-colors">{v}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
