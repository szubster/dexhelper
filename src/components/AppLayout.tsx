import { Link } from '@tanstack/react-router';
import { AlertTriangle, Database, LayoutGrid, RefreshCw, Settings2, Sparkles, Upload, Zap } from 'lucide-react';
import type React from 'react';
import { useEffect } from 'react';
import { saveDB } from '../db/SaveDB';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { getGenerationConfig, VERSION_THEMES } from '../utils/generationConfig';
import { reloadPage } from '../utils/window';
import { BottomNav } from './BottomNav';
import { CornerCrosshairs } from './CornerCrosshairs';
import { SettingsModal } from './SettingsModal';
import { VersionModal } from './VersionModal';

export function AppLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Catch chunk load errors from Vite
    const handleChunkError = (e: ErrorEvent) => {
      if (e.message?.includes('Failed to fetch dynamically imported module')) {
        reloadPage();
      }
    };
    window.addEventListener('error', handleChunkError);
    return () => window.removeEventListener('error', handleChunkError);
  }, []);

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
        if (!(e.target?.result instanceof ArrayBuffer)) {
          throw new Error('Failed to read file as ArrayBuffer');
        }
        const buffer = e.target.result;
        const data = parseSaveFile(buffer, manualVersion || undefined);
        setSaveData(data);
        setError(null);

        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        saveDB.putSave('last_save_file', new Uint8Array(buffer)).catch(() => console.error('System: sync failed'));
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
            <Link
              to="/"
              className="relative rounded-none px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <CornerCrosshairs className="h-2 w-2 border-[var(--theme-primary)] opacity-50" />
              <div className="group slide-in-from-left-4 fade-in flex animate-in flex-col pt-2 duration-500">
                <div className="flex items-end gap-2">
                  <span className="font-black text-4xl text-white tracking-tighter transition-colors group-hover:text-[var(--theme-primary)]">
                    DEX
                    <span className="text-[var(--theme-primary)] transition-colors group-hover:text-white">HELPER</span>
                  </span>
                  <div className="mb-2 h-1.5 w-1.5 animate-pulse bg-[var(--theme-primary)]" />
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
              <nav className="hidden items-center gap-4 sm:flex">
                <Link
                  to="/"
                  activeProps={{
                    className:
                      'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{
                    className: 'border-transparent text-zinc-500 hover:text-white hover:border-white/20',
                  }}
                  className="group relative flex items-center gap-2 rounded-none border border-dashed px-6 py-2.5 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <CornerCrosshairs className="h-1.5 w-1.5 border-current opacity-50 transition-colors group-hover:opacity-100" />
                  <LayoutGrid size={14} />
                  SYS.DEX
                </Link>
                <Link
                  to="/storage"
                  activeProps={{
                    className:
                      'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{
                    className: 'border-transparent text-zinc-500 hover:text-white hover:border-white/20',
                  }}
                  className="group relative flex items-center gap-2 rounded-none border border-dashed px-6 py-2.5 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <CornerCrosshairs className="h-1.5 w-1.5 border-current opacity-50 transition-colors group-hover:opacity-100" />
                  <Database size={14} />
                  SYS.STRG
                </Link>
                <Link
                  to="/assistant"
                  activeProps={{
                    className:
                      'border-[var(--theme-primary)] bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.3)]',
                  }}
                  inactiveProps={{
                    className: 'border-transparent text-zinc-500 hover:text-white hover:border-white/20',
                  }}
                  className="group relative flex items-center gap-2 rounded-none border border-dashed px-6 py-2.5 font-black font-mono text-[10px] uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <CornerCrosshairs className="h-1.5 w-1.5 border-current opacity-50 transition-colors group-hover:opacity-100" />
                  <Sparkles size={14} />
                  SYS.ASST
                </Link>
              </nav>
            )}
          </div>

          {saveData ? (
            <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-6 lg:w-auto lg:justify-end">
              <div className="zoom-in-95 fade-in relative flex animate-in items-center gap-4 rounded-none border border-white/10 border-dashed bg-zinc-900/50 px-5 py-2.5 duration-500">
                <CornerCrosshairs className="h-1.5 w-1.5 border-white/40" />
                <div className="flex flex-col">
                  <span className="font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    Trainer
                  </span>
                  <span className="font-black font-mono text-[var(--theme-primary)] text-xs uppercase tracking-tight">
                    {saveData.trainerName || 'UNKNOWN'}
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-white/5" />
                <div className="flex flex-col">
                  <span className="font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest">ID</span>
                  <span className="font-bold font-mono text-xs text-zinc-300">
                    {String(saveData.trainerId).padStart(5, '0')}
                  </span>
                </div>

                {/* Living Dex Progress */}
                <div className="mx-1 h-6 w-[1px] bg-white/5" />
                <div className="flex min-w-[120px] flex-col">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-black font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                      Living Dex
                    </span>
                    <span className="font-black font-mono text-[10px] text-[var(--theme-primary)]">
                      {(() => {
                        const securedIds = new Set([...saveData.party, ...saveData.pc]);
                        const total = getGenerationConfig(saveData.generation).maxDex;
                        const percent = Math.floor((securedIds.size / total) * 100);
                        return `${percent}%`;
                      })()}
                    </span>
                  </div>
                  <div className="relative h-1 overflow-hidden border border-white/10 bg-black/50">
                    <div
                      style={{
                        width: `${(() => {
                          const securedIds = new Set([...saveData.party, ...saveData.pc]);
                          const total = getGenerationConfig(saveData.generation).maxDex;
                          return (securedIds.size / total) * 100;
                        })()}%`,
                      }}
                      className="absolute inset-y-0 left-0 bg-[var(--theme-primary)] shadow-[0_0_10px_var(--theme-primary)] transition-all duration-1000"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                data-testid="version-selector"
                aria-label="Select Game Version"
                onClick={() => setIsVersionModalOpen(true)}
                className={cn(
                  'group zoom-in-95 fade-in relative animate-in overflow-hidden rounded-none border border-dashed px-5 py-2.5 font-black font-mono text-[10px] uppercase tracking-widest transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                  effectiveVersion === 'unknown'
                    ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-zinc-950'
                    : 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-zinc-950',
                )}
              >
                <CornerCrosshairs className="h-1.5 w-1.5 border-current opacity-50 transition-colors group-hover:opacity-100" />
                <div className="relative z-10 flex items-center gap-2">
                  <Zap size={12} className="group-hover:animate-bounce" />
                  {effectiveVersion}
                </div>
                <div className="lcd-flicker absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
              </button>

              <div className="mx-2 hidden h-8 w-[1px] bg-white/5 lg:block" />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="System Settings"
                  className="group relative flex items-center justify-center rounded-none border border-white/10 border-dashed bg-zinc-900/50 p-3 text-zinc-400 transition-all hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10 hover:text-[var(--theme-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  title="System Settings"
                >
                  <CornerCrosshairs className="h-1 w-1 border-current opacity-0 transition-opacity group-hover:opacity-100" />
                  <Settings2 size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById('import-save-input')?.click()}
                  className="group relative flex cursor-pointer items-center justify-center rounded-none border border-white/10 border-dashed bg-zinc-900/50 p-3 text-zinc-400 transition-all hover:border-[var(--theme-primary)] hover:bg-[var(--theme-primary)]/10 hover:text-[var(--theme-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                  title="Import New Save"
                  aria-label="Import New Save"
                >
                  <CornerCrosshairs className="h-1 w-1 border-current opacity-0 transition-opacity group-hover:opacity-100" />
                  <RefreshCw size={20} />
                </button>
                <input
                  id="import-save-input"
                  type="file"
                  tabIndex={-1}
                  aria-label="Import New Save"
                  accept=".sav"
                  className="sr-only"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => document.getElementById('init-save-input')?.click()}
                className="group slide-in-from-bottom-2 fade-in relative inline-flex w-full animate-in cursor-pointer items-center justify-center gap-4 rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-10 py-4 font-black font-mono text-[11px] text-[var(--theme-primary)] uppercase tracking-widest transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 sm:w-auto"
              >
                <CornerCrosshairs className="h-2 w-2 border-current" />
                <Upload size={20} />[ INITIALIZE.SYS ]
              </button>
              <input
                id="init-save-input"
                type="file"
                tabIndex={-1}
                aria-label="Initialize Pokedex"
                accept=".sav"
                className="sr-only"
                onChange={handleFileUpload}
              />
            </>
          )}
        </header>

        {error && (
          <div className="fade-in slide-in-from-top-2 relative mx-4 mt-4 mb-0 flex animate-in items-center gap-4 rounded-none border border-red-500/50 border-dashed bg-red-950/50 p-5 text-red-500">
            <CornerCrosshairs className="h-2 w-2 border-red-500" />
            <AlertTriangle size={24} className="flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-black font-mono text-[10px] uppercase tracking-tighter">[ SYSTEM.ERROR ]</span>
              <span className="font-medium font-mono text-sm">{error}</span>
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
