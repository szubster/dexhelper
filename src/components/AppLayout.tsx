import { Link } from '@tanstack/react-router';
import { AlertTriangle, LayoutGrid, RefreshCw, Settings2, Sparkles, Upload, Zap } from 'lucide-react';
import type React from 'react';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { getGenerationConfig, VERSION_THEMES } from '../utils/generationConfig';
import { BottomNav } from './BottomNav';
import { SettingsModal } from './SettingsModal';
import { VersionModal } from './VersionModal';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const saveData = useStore((s) => s.saveData);
  const setSaveData = useStore((s) => s.setSaveData);
  const error = useStore((s) => s.error);
  const setError = useStore((s) => s.setError);
  const manualVersion = useStore((s) => s.manualVersion);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const buffer = e.target?.result as ArrayBuffer;
        const data = parseSaveFile(buffer, manualVersion || undefined);
        setSaveData(data);
        setError(null);

        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]!);
        }
        localStorage.setItem('last_save_file', window.btoa(binary));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to parse save file.';
        setError(message);
        setSaveData(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';
  const themeClass = VERSION_THEMES[effectiveVersion.toLowerCase()] || '';

  return (
    <div
      className={cn(
        'min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[var(--theme-primary)]/30 pb-24 lg:pb-0 transition-colors duration-500',
        themeClass,
      )}
    >
      {/* Pokedex Top Bar (Status indicators) */}
      <div className="h-2 w-full bg-[var(--theme-primary)] sticky top-0 z-50">
        <div className="absolute inset-0 bg-white/10 lcd-flicker pointer-events-none" />
      </div>

      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col">
        <header className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-white/5 bg-zinc-950/80 sticky top-2 z-40 backdrop-blur-xl">
          <div className="flex items-center justify-between w-full lg:w-auto gap-12">
            <Link to="/">
              <div className="group flex flex-col pt-2 animate-in slide-in-from-left-4 fade-in duration-500">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black tracking-tighter text-white group-hover:text-[var(--theme-primary)] transition-colors">
                    DEX
                    <span className="text-[var(--theme-primary)] group-hover:text-white transition-colors">HELPER</span>
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--theme-primary)] mb-2 animate-pulse" />
                </div>
                <div className="flex items-center gap-2 mt-[-4px]">
                  <span className="text-[10px] font-retro uppercase tracking-[0.2em] text-zinc-500">
                    {saveData ? getGenerationConfig(saveData.generation).label : 'Protocol X'}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-800" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {saveData && (
              <nav className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                <Link
                  to="/"
                  activeProps={{
                    className:
                      'bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{ className: 'text-zinc-500 hover:text-white hover:bg-white/5' }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
                >
                  <LayoutGrid size={16} />
                  Pokedex
                </Link>
                <Link
                  to="/storage"
                  activeProps={{
                    className:
                      'bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{ className: 'text-zinc-500 hover:text-white hover:bg-white/5' }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
                >
                  <LayoutGrid size={16} />
                  Storage
                </Link>
                <Link
                  to="/assistant"
                  activeProps={{
                    className:
                      'bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{ className: 'text-zinc-500 hover:text-white hover:bg-white/5' }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all"
                >
                  <Sparkles size={16} />
                  Assistant
                </Link>
              </nav>
            )}
          </div>

          {saveData ? (
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 sm:gap-6 w-full lg:w-auto">
              <div className="glass-card flex items-center gap-4 px-5 py-2.5 rounded-2xl border-white/10 animate-in zoom-in-95 fade-in duration-500">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Trainer</span>
                  <span className="text-xs font-mono font-black text-[var(--theme-primary)] uppercase tracking-tight">
                    {saveData.trainerName || 'UNKNOWN'}
                  </span>
                </div>
                <div className="w-[1px] h-6 bg-white/5" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">ID</span>
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {String(saveData.trainerId).padStart(5, '0')}
                  </span>
                </div>

                {/* Living Dex Progress */}
                <div className="w-[1px] h-6 bg-white/5 mx-1" />
                <div className="flex flex-col min-w-[120px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Living Dex</span>
                    <span className="text-[10px] font-mono font-black text-[var(--theme-primary)]">
                      {(() => {
                        const securedIds = new Set([...saveData.party, ...saveData.pc]);
                        const total = getGenerationConfig(saveData.generation).maxDex;
                        const percent = Math.floor((securedIds.size / total) * 100);
                        return `${percent}%`;
                      })()}
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div
                      style={{
                        width: `${(() => {
                          const securedIds = new Set([...saveData.party, ...saveData.pc]);
                          const total = getGenerationConfig(saveData.generation).maxDex;
                          return (securedIds.size / total) * 100;
                        })()}%`,
                      }}
                      className="h-full bg-[var(--theme-primary)] shadow-[0_0_10px_var(--theme-primary)] transition-all duration-1000"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsVersionModalOpen(true)}
                className={cn(
                  'group relative px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all overflow-hidden animate-in zoom-in-95 fade-in duration-500',
                  effectiveVersion === 'unknown'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    : 'bg-[var(--theme-primary)]/10 border-[var(--theme-primary)]/20 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white',
                )}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Zap size={12} className="group-hover:animate-bounce" />
                  {effectiveVersion}
                </div>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity lcd-flicker" />
              </button>

              <div className="h-8 w-[1px] bg-white/5 mx-2 hidden lg:block" />

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="System Settings"
                  className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-2xl border border-white/5 transition-all flex items-center justify-center retro-button"
                  title="System Settings"
                >
                  <Settings2 size={20} />
                </button>
                <label
                  className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-2xl border border-white/5 cursor-pointer transition-all flex items-center justify-center retro-button"
                  title="Import New Save"
                >
                  <RefreshCw size={20} />
                  <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          ) : (
            <label className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/90 text-white px-10 py-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(var(--theme-primary-rgb),0.2)] font-black uppercase tracking-widest text-[11px] border-b-4 border-black/20 animate-in slide-in-from-bottom-2 fade-in">
              <Upload size={20} />
              Initialize Pokedex
              <input type="file" accept=".sav" className="hidden" onChange={handleFileUpload} />
            </label>
          )}
        </header>

        {error && (
          <div className="mx-4 mt-4 mb-0 text-red-400 bg-red-400/10 p-5 rounded-2xl border border-red-400/20 flex items-center gap-4 glass-card animate-in fade-in slide-in-from-top-2">
            <AlertTriangle size={24} className="flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-tighter">System Error</span>
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        <main className="px-4 pb-12 flex-1 pt-4">{children}</main>
      </div>

      <BottomNav />
      <SettingsModal />
      <VersionModal />

      {/* Retro Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1] overflow-hidden">
        <div className="absolute inset-0 scanline-overlay" />
        <div className="p-20 flex flex-wrap gap-40 rotate-[30deg] scale-150">
          {Array.from({ length: getGenerationConfig(saveData?.generation ?? 1).maxDex }).map((_, i) => (
            <span key={i} className="text-4xl font-retro text-white">
              #{(i + 1).toString().padStart(3, '0')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
