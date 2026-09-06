import { Link } from '@tanstack/react-router';
import { Database, GitGraph, LayoutGrid, Sparkles, Swords } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser';
import { useFileSyncController } from '../hooks/useFileSyncController';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';
import { OfflineControls } from './header/OfflineControls';
import { SystemControls } from './header/SystemControls';
import { TelemetryMatrix } from './header/TelemetryMatrix';
import { NavigationTab } from './NavigationTab';
import { ScanlineOverlay } from './ScanlineOverlay';

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

  const progressPercentage = React.useMemo(() => {
    if (!saveData) return 0;
    const securedIds = new Set([...saveData.party, ...saveData.pc]);
    const total = getGenerationConfig(saveData.generation).maxDex;
    return total > 0 ? (securedIds.size / total) * 100 : 0;
  }, [saveData]);
  return (
    <header className="sticky top-0 z-50 flex w-full flex-col border-[var(--theme-primary)]/40 border-b-[6px] border-dashed bg-black px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] lg:flex-row lg:items-center lg:justify-between lg:px-8">
      {/* Heavy Hazard Stripes Lip */}
      <div
        className="absolute top-0 right-0 left-0 h-2 opacity-80"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, var(--theme-primary) 0px, var(--theme-primary) 10px, transparent 10px, transparent 20px)',
        }}
      />
      {/* Top hardware lip & scanline background */}
      <div className="absolute top-2 right-0 left-0 h-[2px] bg-[var(--theme-primary)]/60" />
      <ScanlineOverlay opacityClass="opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--theme-primary)]/10 to-transparent" />

      {/* Raw text watermark */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[80px] text-white/5 uppercase tracking-[0.5em] opacity-30 blur-[2px]">
        DIAGNOSTIC CONSOLE ACTIVE
      </div>

      <div className="relative z-10 flex w-full items-center justify-between gap-8 lg:w-auto">
        <Link to="/" className="focus-visible:tactical-focus relative flex items-center gap-4 rounded-none p-1">
          <div className="group relative flex items-center gap-4 border border-[var(--theme-primary)]/40 bg-zinc-950 p-3 shadow-[inset_0_0_20px_rgba(var(--theme-primary-rgb),0.1)]">
            <CornerCrosshairs className="h-3 w-3 border-[var(--theme-primary)]" thickness={2} />

            <div className="slide-in-from-left-4 fade-in flex animate-in items-center gap-4 duration-500">
              <span className="font-black text-3xl text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all group-hover:text-[var(--theme-primary)] group-hover:drop-shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.8)]">
                DEX<span className="text-[var(--theme-primary)] transition-colors group-hover:text-white">HELPER</span>
              </span>

              <div className="h-10 w-[2px] border-[var(--theme-primary)]/30 border-l border-dashed" />

              <div className="flex flex-col gap-1">
                <span className="font-retro text-[8px] text-zinc-500 uppercase tracking-[0.3em]">
                  {saveData ? getGenerationConfig(saveData.generation).label : 'Protocol X'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-4 w-4 animate-ping rounded-full bg-[var(--theme-primary)]/40" />
                    <div className="relative h-2 w-2 rounded-full bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)]" />
                  </div>
                  <span className="font-black font-mono text-[9px] text-[var(--theme-primary)] tracking-widest">
                    SYS.PWR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation (Segmented Terminal Matrix) */}
        {saveData && (
          <nav className="relative mt-4 hidden lg:mt-0 lg:flex lg:flex-1 lg:justify-center">
            {/* Structural bracket for nav */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[var(--theme-primary)]/60 tracking-[0.4em]">
              [ DOWNLINK / UPLINK ]
            </div>
            <div className="flex border-2 border-zinc-800 border-dashed bg-zinc-950/80 shadow-2xl">
              <NavigationTab to="/" icon={<LayoutGrid size={14} />} label="SYS.DEX" />
              <NavigationTab to="/storage" icon={<Database size={14} />} label="SYS.STRG" />
              <NavigationTab to="/assistant" icon={<Sparkles size={14} />} label="SYS.ASST" />
              <NavigationTab to="/dag" icon={<GitGraph size={14} />} label="SYS.DAG" />
              {(saveData.generation === 3 || saveData.generation === 2) && (
                <NavigationTab to="/dashboard" icon={<Swords size={14} />} label="SYS.DASH" />
              )}
            </div>
          </nav>
        )}
      </div>

      {saveData ? (
        <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-4 border-zinc-800 border-t border-dashed pt-4 lg:mt-0 lg:w-auto lg:border-t-0 lg:pt-0">
          {/* Dense Telemetry Data Matrix */}
          <TelemetryMatrix saveData={saveData} progressPercentage={progressPercentage} />

          <SystemControls
            effectiveVersion={effectiveVersion}
            syncStatus={syncStatus}
            hasStoredHandle={hasStoredHandle}
            setIsVersionModalOpen={setIsVersionModalOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            resumeSync={resumeSync}
            requestSync={requestSync}
            handleFileUpload={handleFileUpload}
          />
        </div>
      ) : (
        <OfflineControls requestSync={requestSync} handleFileUpload={handleFileUpload} />
      )}
    </header>
  );
}
