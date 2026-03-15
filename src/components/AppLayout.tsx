import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Settings2, RefreshCw, AlertTriangle
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
      <div className="max-w-[1600px] mx-auto">
        <header className="p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center sm:text-left"
          >
            <Link to="/">
              <h1 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
                {saveData ? (saveData.generation === 2 ? 'GEN II' : 'GEN I') : 'RETRO'}
                <span className="text-red-600">DEX</span>
              </h1>
            </Link>
            {saveData && (
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Trainer</span>
                    <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-widest">
                      {saveData.trainerName || '???'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">ID</span>
                    <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono font-bold text-zinc-200 uppercase tracking-widest">
                      {saveData.trainerId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Version</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest ${
                      effectiveVersion === 'unknown' 
                        ? 'bg-amber-900/20 border border-amber-900/30 text-amber-400' 
                        : 'bg-red-900/20 border border-red-900/30 text-red-400'
                    }`}>
                      {effectiveVersion}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {!saveData ? (
            <motion.label 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl cursor-pointer transition-all shadow-xl shadow-red-600/20 font-bold uppercase tracking-widest text-xs"
            >
              <Upload size={20} />
              Upload Save File
              <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
            </motion.label>
          ) : (
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-5 py-3 rounded-xl border border-zinc-800 transition-all font-bold uppercase tracking-widest text-[10px]"
              >
                <Settings2 size={16} />
                Settings
              </button>
              <label className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-5 py-3 rounded-xl border border-zinc-800 cursor-pointer transition-all font-bold uppercase tracking-widest text-[10px]">
                <RefreshCw size={16} />
                Switch
                <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </header>

        {error && (
          <div className="mx-4 mb-4 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20 flex items-center gap-3">
            <AlertTriangle size={20} />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <SearchAndFilters />

        <main className="px-4 pb-12">
          {children}
        </main>
      </div>

      <BottomNav />
      <SettingsModal />
      <VersionModal />
    </div>
  );
}
