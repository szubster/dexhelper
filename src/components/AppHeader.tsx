import { Link } from '@tanstack/react-router';
import { Database, LayoutGrid, Sparkles } from 'lucide-react';
import React from 'react';
import type { SaveData } from '../engine/saveParser';
import { useFileSyncController } from '../hooks/useFileSyncController';
import { getGenerationConfig } from '../utils/generationConfig';
import { CornerCrosshairs } from './CornerCrosshairs';
import { OfflineControls } from './header/OfflineControls';
import { SystemControls } from './header/SystemControls';
import { TelemetryMatrix } from './header/TelemetryMatrix';
import { NavigationTab } from './NavigationTab';
import { VerticalDivider } from './VerticalDivider';

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
    <header className="sticky top-0 z-50 flex w-full flex-col border-[var(--theme-primary)]/50 border-b-[3px] border-dashed bg-zinc-950 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:flex-row lg:items-center lg:justify-between lg:px-8">
      {/* Top hardware lip */}
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--theme-primary)]/20 to-transparent" />

      <div className="flex w-full items-center justify-between gap-8 lg:w-auto">
        <Link to="/" className="focus-visible:tactical-focus relative flex items-center gap-4 rounded-none px-2 py-1">
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
              <span className="tactical-text text-[8px] text-[var(--theme-primary)]">[ ONLINE ]</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation (Segmented Terminal Matrix) */}
        {saveData && (
          <nav className="mt-4 hidden lg:mt-0 lg:flex lg:flex-1 lg:justify-center">
            <div className="flex bg-zinc-900/30">
              <NavigationTab to="/" icon={<LayoutGrid size={14} />} label="SYS.DEX" />
              <VerticalDivider />
              <NavigationTab to="/storage" icon={<Database size={14} />} label="SYS.STRG" />
              <VerticalDivider />
              <NavigationTab to="/assistant" icon={<Sparkles size={14} />} label="SYS.ASST" />
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
