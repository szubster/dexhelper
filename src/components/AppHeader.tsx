import { Link } from '@tanstack/react-router';
import { Activity, Database, LayoutGrid, RefreshCw, Settings2, Sparkles, Upload, Zap } from 'lucide-react';
import type React from 'react';
import type { SaveData } from '../engine/saveParser';
import { useFileSyncController } from '../hooks/useFileSyncController';
import { cn } from '../utils/cn';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';
import { TacticalButton } from './TacticalButton';

interface AppHeaderProps {
  saveData: SaveData | null;
  effectiveVersion: string;
  setIsSettingsOpen: (open: boolean) => void;
  setIsVersionModalOpen: (open: boolean) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AppHeader({
  saveData,
  effectiveVersion,
  setIsSettingsOpen,
  setIsVersionModalOpen,
  handleFileUpload,
}: AppHeaderProps) {
  const { status: syncStatus, requestSync, resumeSync, hasStoredHandle } = useFileSyncController();
  return (
    <header className="sticky top-0 z-50 flex w-full flex-col border-[var(--theme-primary)]/50 border-b-[3px] border-dashed bg-zinc-950 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:flex-row lg:items-center lg:justify-between lg:px-8">
      {/* Top hardware lip */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--theme-primary)]/20 to-transparent" />

      <div className="flex w-full items-center justify-between gap-8 lg:w-auto">
        <Link
          to="/"
          className="relative flex items-center gap-4 rounded-none px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <CornerCrosshairs className="h-2 w-2 border-[var(--theme-primary)] opacity-50" />
          <div className="group slide-in-from-left-4 fade-in flex animate-in items-center gap-3 duration-500">
            <span className="font-black text-3xl text-white tracking-tighter transition-colors group-hover:text-[var(--theme-primary)]">
              DEX<span className="text-[var(--theme-primary)] transition-colors group-hover:text-white">HELPER</span>
            </span>
            <div className="h-6 w-[1px] bg-zinc-800" />
            <div className="flex flex-col justify-center">
              <span className="font-retro text-[8px] text-zinc-500 uppercase tracking-[0.3em]">
                {saveData ? getGenerationConfig(saveData.generation).label : 'Protocol X'}
              </span>
              <span className="font-mono text-[8px] text-[var(--theme-primary)] uppercase tracking-widest">
                [ ONLINE ]
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation (Segmented Terminal Matrix) */}
        {saveData && (
          <nav className="mt-4 hidden lg:mt-0 lg:flex lg:flex-1 lg:justify-center">
            <div className="flex bg-zinc-900/30">
              <Link
                to="/"
                activeProps={{
                  className: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-b-[var(--theme-primary)]',
                }}
                inactiveProps={{
                  className: 'border-b-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5',
                }}
                className="group relative flex flex-col items-center gap-1 border-b-2 border-dashed px-8 py-3 font-black font-mono text-[10px] uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <CornerCrosshairs className="h-1 w-1 border-current opacity-50" />
                <LayoutGrid size={14} className="mb-1" />[ SYS.DEX ]
              </Link>
              <div className="w-[1px] border-zinc-800 border-r border-dashed bg-zinc-800" />
              <Link
                to="/storage"
                activeProps={{
                  className: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-b-[var(--theme-primary)]',
                }}
                inactiveProps={{
                  className: 'border-b-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5',
                }}
                className="group relative flex flex-col items-center gap-1 border-b-2 border-dashed px-8 py-3 font-black font-mono text-[10px] uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <CornerCrosshairs className="h-1 w-1 border-current opacity-50" />
                <Database size={14} className="mb-1" />[ SYS.STRG ]
              </Link>
              <div className="w-[1px] border-zinc-800 border-r border-dashed bg-zinc-800" />
              <Link
                to="/assistant"
                activeProps={{
                  className: 'bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] border-b-[var(--theme-primary)]',
                }}
                inactiveProps={{
                  className: 'border-b-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5',
                }}
                className="group relative flex flex-col items-center gap-1 border-b-2 border-dashed px-8 py-3 font-black font-mono text-[10px] uppercase tracking-[0.2em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <CornerCrosshairs className="h-1 w-1 border-current opacity-50" />
                <Sparkles size={14} className="mb-1" />[ SYS.ASST ]
              </Link>
            </div>
          </nav>
        )}
      </div>

      {saveData ? (
        <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 border-zinc-800 border-t border-dashed pt-4 lg:mt-0 lg:w-auto lg:border-t-0 lg:pt-0">
          {/* Dense Telemetry Data Matrix */}
          <div className="zoom-in-95 fade-in relative flex animate-in items-center bg-zinc-900/50 p-2 duration-500">
            <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700" />
            <div className="flex flex-col pr-4 pl-2">
              <div className="flex items-center gap-2">
                <span className="font-black font-mono text-[8px] text-zinc-500 uppercase tracking-widest">TRNR</span>
                <span className="font-black font-mono text-[10px] text-[var(--theme-primary)] uppercase tracking-tight">
                  {saveData.trainerName || 'UNKNOWN'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black font-mono text-[8px] text-zinc-500 uppercase tracking-widest">ID</span>
                <span className="font-bold font-mono text-[10px] text-zinc-300">
                  {String(saveData.trainerId).padStart(5, '0')}
                </span>
              </div>
            </div>

            <div className="h-8 w-[1px] border-zinc-800 border-r border-dashed bg-zinc-800" />

            <div className="flex min-w-[100px] flex-col justify-center px-4">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-black font-mono text-[8px] text-zinc-500 uppercase tracking-widest">L-DEX</span>
                <span className="font-black font-mono text-[9px] text-[var(--theme-primary)]">
                  {(() => {
                    const securedIds = new Set([...saveData.party, ...saveData.pc]);
                    const total = getGenerationConfig(saveData.generation).maxDex;
                    return `${Math.floor((securedIds.size / total) * 100)}%`;
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
                  className="absolute inset-y-0 left-0 bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)] transition-all duration-1000"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              data-testid="version-selector"
              aria-label="Select Game Version"
              onClick={() => setIsVersionModalOpen(true)}
              className={cn(
                'group zoom-in-95 fade-in relative animate-in overflow-hidden rounded-none border border-dashed px-3 py-1.5 font-black font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                effectiveVersion === 'unknown'
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-zinc-950'
                  : 'border-[var(--theme-primary)]/50 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] hover:bg-[var(--theme-primary)] hover:text-zinc-950',
              )}
            >
              <CornerCrosshairs className="h-1 w-1 border-current opacity-50 transition-colors group-hover:opacity-100" />
              <div className="relative z-10 flex items-center gap-1.5">
                <Zap size={10} className="group-hover:animate-bounce" />
                {effectiveVersion}
              </div>
              <div className="lcd-flicker absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <div className="h-6 w-[1px] border-zinc-800 border-r border-dashed bg-zinc-800" />

            <TacticalButton
              onClick={() => setIsSettingsOpen(true)}
              aria-label="System Settings"
              variant="sidebar"
              size="sm"
              hasCrosshairs={true}
              title="System Settings"
              className="p-1.5"
            >
              <Settings2 size={16} />
            </TacticalButton>
            {hasStoredHandle && syncStatus === 'disconnected' ? (
              <TacticalButton
                onClick={resumeSync}
                variant="sidebar"
                size="sm"
                hasCrosshairs={true}
                title="Resume Live Sync"
                aria-label="Resume Live Sync"
                className="p-1.5"
              >
                <Activity size={16} className="text-amber-500" />
              </TacticalButton>
            ) : (
              <TacticalButton
                onClick={requestSync}
                variant="sidebar"
                size="sm"
                hasCrosshairs={true}
                title="Live Auto-Sync"
                aria-label="Live Auto-Sync"
                className="p-1.5"
              >
                <Activity
                  size={16}
                  className={
                    syncStatus === 'live'
                      ? 'text-emerald-500'
                      : syncStatus === 'syncing'
                        ? 'animate-pulse text-blue-500'
                        : ''
                  }
                />
              </TacticalButton>
            )}
            <TacticalButton
              onClick={() => document.getElementById('import-save-input')?.click()}
              variant="sidebar"
              size="sm"
              hasCrosshairs={true}
              title="Import New Save"
              aria-label="Import New Save"
              className="p-1.5"
            >
              <RefreshCw size={16} />
            </TacticalButton>
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
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            aria-label="Upload Save File"
            onClick={() => document.getElementById('init-save-input')?.click()}
            className="group slide-in-from-bottom-2 fade-in relative inline-flex w-full animate-in cursor-pointer items-center justify-center gap-4 rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-10 py-4 font-black font-mono text-[11px] text-[var(--theme-primary)] uppercase tracking-widest transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 sm:w-auto"
          >
            <CornerCrosshairs className="h-2 w-2 border-current" />
            <Upload size={20} />[ UPLOAD.SYS ]
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

          {typeof window !== 'undefined' && 'showOpenFilePicker' in window && (
            <button
              type="button"
              aria-label="Start Live Sync"
              onClick={requestSync}
              className="group slide-in-from-bottom-2 fade-in relative inline-flex w-full animate-in cursor-pointer items-center justify-center gap-4 rounded-none border border-[var(--theme-primary)]/50 border-dashed bg-[var(--theme-primary)]/10 px-10 py-4 font-black font-mono text-[11px] text-[var(--theme-primary)] uppercase tracking-widest transition-all duration-300 hover:bg-[var(--theme-primary)] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95 sm:w-auto"
            >
              <CornerCrosshairs className="h-2 w-2 border-current" />
              <Activity size={20} />[ LIVE_SYNC.SYS ]
            </button>
          )}
        </div>
      )}
    </header>
  );
}
