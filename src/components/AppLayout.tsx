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
          binary += String.fromCharCode(bytes[i] ?? 0);
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
        'min-h-screen bg-zinc-950 pb-24 font-sans text-zinc-100 transition-colors duration-500 selection:bg-[var(--theme-primary)]/30 lg:pb-0',
        themeClass,
      )}
    >
      {/* Pokedex Top Bar (Status indicators) */}
      <div className="sticky top-0 z-50 h-2 w-full bg-[var(--theme-primary)]">
        <div className="lcd-flicker pointer-events-none absolute inset-0 bg-white/10" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col">
        <header className="sticky top-2 z-40 flex flex-col items-center justify-between gap-6 border-white/5 border-b bg-zinc-950/80 px-4 py-6 backdrop-blur-xl sm:px-8 sm:py-10 lg:flex-row">
          <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
            <Link to="/">
              <div className="group slide-in-from-left-4 fade-in flex animate-in flex-col pt-2 duration-500">
                <div className="flex items-end gap-2">
                  <span className="font-black text-4xl text-white tracking-tighter transition-colors group-hover:text-[var(--theme-primary)]">
                    DEX
                    <span className="text-[var(--theme-primary)] transition-colors group-hover:text-white">HELPER</span>
                  </span>
                  <div className="mb-2 h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--theme-primary)]" />
                </div>
                <div className="mt-[-4px] flex items-center gap-2">
                  <span className="font-retro text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                    {saveData ? getGenerationConfig(saveData.generation).label : 'Protocol X'}
                  </span>
                  <div className="h-[1px] flex-1 bg-zinc-800" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {saveData && (
              <nav className="hidden items-center gap-2 rounded-2xl border border-white/5 bg-white/5 p-1 sm:flex">
                <Link
                  to="/"
                  activeProps={{
                    className:
                      'bg-[var(--theme-primary)] text-white shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{ className: 'text-zinc-500 hover:text-white hover:bg-white/5' }}
                  className="flex items-center gap-2 rounded-xl px-6 py-2.5 font-black text-[11px] uppercase tracking-widest transition-all"
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
                  className="flex items-center gap-2 rounded-xl px-6 py-2.5 font-black text-[11px] uppercase tracking-widest transition-all"
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
                  className="flex items-center gap-2 rounded-xl px-6 py-2.5 font-black text-[11px] uppercase tracking-widest transition-all"
                >
                  <Sparkles size={16} />
                  Assistant
                </Link>
              </nav>
            )}
          </div>

          {saveData ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-6 lg:w-auto lg:justify-end">
              <div className="glass-card zoom-in-95 fade-in flex animate-in items-center gap-4 rounded-2xl border-white/10 px-5 py-2.5 duration-500">
                <div className="flex flex-col">
                  <span className="font-black text-[9px] text-zinc-500 uppercase tracking-widest">Trainer</span>
                  <span className="font-black font-mono text-[var(--theme-primary)] text-xs uppercase tracking-tight">
                    {saveData.trainerName || 'UNKNOWN'}
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-white/5" />
                <div className="flex flex-col">
                  <span className="font-black text-[9px] text-zinc-500 uppercase tracking-widest">ID</span>
                  <span className="font-bold font-mono text-xs text-zinc-300">
                    {String(saveData.trainerId).padStart(5, '0')}
                  </span>
                </div>

                {/* Living Dex Progress */}
                <div className="mx-1 h-6 w-[1px] bg-white/5" />
                <div className="flex min-w-[120px] flex-col">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-black text-[9px] text-zinc-500 uppercase tracking-widest">Living Dex</span>
                    <span className="font-black font-mono text-[10px] text-[var(--theme-primary)]">
                      {(() => {
                        const securedIds = new Set([...saveData.party, ...saveData.pc]);
                        const total = getGenerationConfig(saveData.generation).maxDex;
                        const percent = Math.floor((securedIds.size / total) * 100);
                        return `${percent}%`;
                      })()}
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full border border-white/5 bg-white/5">
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
                  'group zoom-in-95 fade-in relative animate-in overflow-hidden rounded-2xl border px-5 py-2.5 font-black text-[11px] uppercase tracking-widest transition-all duration-500',
                  effectiveVersion === 'unknown'
                    ? 'border-amber-500/20 bg-amber-500/10 text-amber-500'
                    : 'border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-white',
                )}
              >
                <div className="relative z-10 flex items-center gap-2">
                  <Zap size={12} className="group-hover:animate-bounce" />
                  {effectiveVersion}
                </div>
                <div className="lcd-flicker absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <div className="mx-2 hidden h-8 w-[1px] bg-white/5 lg:block" />

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="System Settings"
                  className="retro-button flex items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-3 text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
                  title="System Settings"
                >
                  <Settings2 size={20} />
                </button>
                <label
                  className="retro-button flex cursor-pointer items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-3 text-zinc-400 transition-all focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 hover:bg-white/10 hover:text-white"
                  title="Import New Save"
                >
                  <RefreshCw size={20} />
                  <input type="file" accept=".sav" className="sr-only" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          ) : (
            <label className="slide-in-from-bottom-2 fade-in inline-flex w-full animate-in cursor-pointer items-center justify-center gap-4 rounded-2xl border-black/20 border-b-4 bg-[var(--theme-primary)] px-10 py-4 font-black text-[11px] text-white uppercase tracking-widest shadow-[0_20px_40px_rgba(var(--theme-primary-rgb),0.2)] transition-all duration-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--theme-primary)] focus-within:ring-offset-2 focus-within:ring-offset-zinc-950 hover:scale-105 hover:bg-[var(--theme-primary)]/90 active:scale-95 sm:w-auto">
              <Upload size={20} />
              Initialize Pokedex
              <input type="file" accept=".sav" className="sr-only" onChange={handleFileUpload} />
            </label>
          )}
        </header>

        {error && (
          <div className="glass-card fade-in slide-in-from-top-2 mx-4 mt-4 mb-0 flex animate-in items-center gap-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-red-400">
            <AlertTriangle size={24} className="flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-black text-[10px] uppercase tracking-tighter">System Error</span>
              <span className="font-medium text-sm">{error}</span>
            </div>
          </div>
        )}

        <main className="flex-1 px-4 pt-4 pb-12">{children}</main>
      </div>

      <BottomNav />
      <SettingsModal />
      <VersionModal />

      {/* Retro Background Pattern */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden opacity-[0.03]">
        <div className="scanline-overlay absolute inset-0" />
        <div className="flex rotate-[30deg] scale-150 flex-wrap gap-40 p-20">
          {Array.from({ length: getGenerationConfig(saveData?.generation ?? 1).maxDex }).map((_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: Array index is stable representing pokedex number
              key={`dex-bg-${i + 1}`}
              className="font-retro text-4xl text-white"
            >
              #{(i + 1).toString().padStart(3, '0')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
