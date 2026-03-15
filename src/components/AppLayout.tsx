import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Settings2, RefreshCw, AlertTriangle, LayoutGrid, Database
} from 'lucide-react';
import { useAppState } from '../state';
import { parseSaveFile } from '../utils/saveParser';
import { SettingsModal } from './SettingsModal';
import { VersionModal } from './VersionModal';
import { BottomNav } from './BottomNav';
import { SearchAndFilters } from './SearchAndFilters';
import { Link, useLocation } from '@tanstack/react-router';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { 
    saveData, setSaveData, error, setError, manualVersion, setManualVersion,
    setIsSettingsOpen, setIsVersionModalOpen
  } = useAppState();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const data = parseSaveFile(buffer);
        setSaveData(data);
        setError(null);
        
        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        // Save to localStorage
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        localStorage.setItem('last_save_file', window.btoa(binary));
      } catch (err: any) {
        setError(err.message || "Failed to parse save file.");
        setSaveData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30 pb-24 sm:pb-0">
      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col">
        <header className="p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 border-b border-zinc-900/50 bg-zinc-950/50 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center justify-between w-full lg:w-auto gap-8">
            <Link to="/">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl sm:text-3xl font-display font-black tracking-tighter text-white hover:text-red-500 transition-colors"
              >
                {saveData ? (saveData.generation === 2 ? 'GEN II' : 'GEN I') : 'RETRO'}
                <span className="text-red-600">DEX</span>
              </motion.h1>
            </Link>

            {/* Desktop Navigation */}
            {saveData && (
              <nav className="hidden sm:flex items-center gap-1 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/50">
                <Link 
                  to="/" 
                  activeProps={{ className: 'bg-red-500/10 text-red-500 border-red-500/20' }}
                  inactiveProps={{ className: 'text-zinc-500 hover:text-zinc-300 border-transparent shadow-none' }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-500/5"
                >
                  <LayoutGrid size={16} />
                  Dex
                </Link>
                <Link 
                  to="/storage" 
                  activeProps={{ className: 'bg-red-500/10 text-red-500 border-red-500/20' }}
                  inactiveProps={{ className: 'text-zinc-500 hover:text-zinc-300 border-transparent shadow-none' }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-red-500/5"
                >
                  <Database size={16} />
                  Storage
                </Link>
              </nav>
            )}
          </div>

          {saveData ? (
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-4 w-full lg:w-auto">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900/50 border border-zinc-800/50 rounded-xl group"
               >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest group-hover:text-zinc-500 transition-colors">Trainer</span>
                    <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase">
                      {saveData.trainerName || '???'}
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-zinc-800 mx-0.5" />
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest group-hover:text-zinc-500 transition-colors">ID</span>
                    <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase">
                      {saveData.trainerId}
                    </span>
                  </div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className={`px-3 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest border transition-colors ${
                  effectiveVersion === 'unknown' 
                    ? 'bg-amber-500/5 border-amber-500/20 text-amber-500/80' 
                    : 'bg-red-500/5 border-red-500/20 text-red-500/80'
                }`}
               >
                  {effectiveVersion}
                </motion.div>

                <div className="h-6 w-[1px] bg-zinc-900 mx-1 hidden lg:block" />

                <div className="flex gap-2">
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-all flex items-center justify-center"
                    title="Settings"
                  >
                    <Settings2 size={18} />
                  </button>
                  <label 
                    className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 cursor-pointer transition-all flex items-center justify-center"
                    title="Switch Save File"
                  >
                    <RefreshCw size={18} />
                    <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
            </div>
          ) : (
            <motion.label 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-3.5 rounded-2xl cursor-pointer transition-all shadow-xl shadow-red-600/20 font-bold uppercase tracking-widest text-xs"
            >
              <Upload size={20} />
              Upload Save File
              <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
            </motion.label>
          )}
        </header>

        {error && (
          <div className="mx-4 mb-4 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 flex items-center gap-3">
            <AlertTriangle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <SearchAndFilters />

        <main className="px-4 pb-12 flex-1">
          {children}
        </main>
      </div>

      <BottomNav />
      <SettingsModal />
      <VersionModal />
    </div>
  );
}
