import { Activity, RefreshCw, Settings2, Zap } from 'lucide-react';
import type React from 'react';
import { cn } from '../../utils/cn';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { TacticalButton } from '../TacticalButton';
import { TacticalFileInput } from '../TacticalFileInput';
import { VerticalDivider } from '../VerticalDivider';

interface SystemControlsProps {
  effectiveVersion: string;
  syncStatus: 'disconnected' | 'syncing' | 'live' | 'error';
  hasStoredHandle: boolean;
  setIsVersionModalOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  resumeSync: () => void;
  requestSync: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SystemControls({
  effectiveVersion,
  syncStatus,
  hasStoredHandle,
  setIsVersionModalOpen,
  setIsSettingsOpen,
  resumeSync,
  requestSync,
  handleFileUpload,
}: SystemControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        data-testid="version-selector"
        aria-label="Select Game Version"
        onClick={() => setIsVersionModalOpen(true)}
        className={cn(
          'group zoom-in-95 fade-in focus-visible:tactical-focus relative animate-in overflow-hidden rounded-none border border-dashed px-3 py-1.5 font-black font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500',
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

      <VerticalDivider className="h-6" />

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
      {typeof window !== 'undefined' &&
        'showOpenFilePicker' in window &&
        (hasStoredHandle && syncStatus === 'disconnected' ? (
          <TacticalButton
            onClick={resumeSync}
            variant="sidebar"
            size="sm"
            hasCrosshairs={true}
            title="Resume Live Sync"
            aria-label="Resume Live Sync"
            className="w-35 justify-start p-1.5"
          >
            <Activity size={16} className="text-amber-500" />
            <span className="font-mono text-[9px] text-amber-500 uppercase tracking-wider">RESUME SYNC</span>
          </TacticalButton>
        ) : (
          <TacticalButton
            onClick={requestSync}
            variant="sidebar"
            size="sm"
            hasCrosshairs={true}
            title="Live Auto-Sync"
            aria-label="Live Auto-Sync"
            className={cn(
              'w-35 justify-start p-1.5',
              syncStatus === 'live' ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-500' : '',
              syncStatus === 'error' ? 'border-red-500/50 bg-red-500/10 text-red-500' : '',
            )}
          >
            <Activity
              size={16}
              className={
                syncStatus === 'live'
                  ? 'text-emerald-500'
                  : syncStatus === 'syncing'
                    ? 'animate-pulse text-blue-500'
                    : syncStatus === 'error'
                      ? 'text-red-500'
                      : ''
              }
            />
            <span
              className={cn(
                'font-mono text-[9px] uppercase tracking-wider',
                syncStatus === 'live' ? 'text-emerald-500' : '',
                syncStatus === 'syncing' ? 'animate-pulse text-blue-500' : '',
                syncStatus === 'error' ? 'text-red-500' : '',
              )}
            >
              {syncStatus === 'live'
                ? 'LIVE SYNC'
                : syncStatus === 'syncing'
                  ? 'SYNCING...'
                  : syncStatus === 'error'
                    ? 'SYNC ERROR'
                    : 'AUTO SYNC'}
            </span>
          </TacticalButton>
        ))}
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
      <TacticalFileInput id="import-save-input" aria-label="Import New Save" onChange={handleFileUpload} />
    </div>
  );
}
