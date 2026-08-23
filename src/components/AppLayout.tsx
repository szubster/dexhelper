import type React from 'react';
import { useEffect } from 'react';
import { AUTH_LOGGED_IN_INDICATOR } from '../contexts/AuthContext';
import { saveDB } from '../db/SaveDB';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { VERSION_THEMES } from '../utils/generationConfig';
import { r2Client } from '../utils/r2/client';
import { reloadPage } from '../utils/window';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
import { ConflictResolutionModal } from './ConflictResolutionModal';
import { GlobalError } from './GlobalError';
import { RetroBackground } from './RetroBackground';
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
  const conflictState = useStore((s) => s.conflictState);
  const resolveConflict = useStore((s) => s.resolveConflict);
  const setConflictState = useStore((s) => s.setConflictState);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        if (!(e.target?.result instanceof ArrayBuffer)) {
          throw new Error('Failed to read file as ArrayBuffer');
        }
        const buffer = e.target.result;

        let cloudSave = null;
        let cloudSaveInfo = null;
        let saveId = 'save-1';

        if (localStorage.getItem(AUTH_LOGGED_IN_INDICATOR) === 'true') {
          try {
            const saves = await r2Client.listSaves();
            saveId = saves.length > 0 && saves[0] ? saves[0].id : 'save-1';
            cloudSaveInfo = saves.find((s) => s.id === saveId);

            if (cloudSaveInfo?.lastModified && file.lastModified < cloudSaveInfo.lastModified) {
              cloudSave = await r2Client.getSave(saveId).catch(() => null);
            }
          } catch {
            console.warn('System: list saves from cloud failed');
          }
        }

        if (cloudSave && cloudSaveInfo?.lastModified) {
          setConflictState({
            isOpen: true,
            localMetadata: { timestamp: file.lastModified },
            remoteMetadata: { timestamp: cloudSaveInfo.lastModified },
            localBuffer: new Uint8Array(buffer),
            remoteBuffer: cloudSave.data,
            saveId,
          });
          return;
        }

        const data = await parseSaveFile(buffer, manualVersion || undefined);
        setSaveData(data);
        setError(null);

        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        await saveDB
          .putSave('last_save_file', new Uint8Array(buffer))
          .catch(() => console.error('System: sync failed'));

        if (localStorage.getItem(AUTH_LOGGED_IN_INDICATOR) === 'true') {
          try {
            await r2Client.putSave(saveId, new Uint8Array(buffer), file.lastModified);
          } catch {
            console.warn('System: push to cloud failed');
          }
        }
      } catch {
        setError('Failed to parse save file.');
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
        'relative h-screen w-full overflow-hidden bg-black font-sans text-zinc-100 transition-colors duration-500 selection:bg-[var(--theme-primary)]/30',
        themeClass,
      )}
    >
      {/* Outer Physical Hardware Frame */}
      <div className="pointer-events-none absolute inset-0 z-50">
        {/* Thick Bezel */}
        <div className="absolute inset-0 border-[24px] border-zinc-950 shadow-[inset_0_0_50px_rgba(0,0,0,1)]" />
        <div className="absolute inset-0 border-[26px] border-black/80" />

        {/* Hardware details in bezel */}
        <div className="tactical-text absolute top-2 left-6 font-black text-[8px] text-zinc-700">
          [ MODEL: DEX-OS V2 ]
        </div>
        <div className="tactical-text absolute right-6 bottom-2 font-black text-[8px] text-zinc-700">POWER: ONLINE</div>

        {/* Physical Screws */}
        <div className="absolute top-2 left-2 flex h-2 w-2 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
          <div className="h-[1px] w-full rotate-45 bg-zinc-800" />
        </div>
        <div className="absolute top-2 right-2 flex h-2 w-2 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
          <div className="h-[1px] w-full rotate-12 bg-zinc-800" />
        </div>
        <div className="absolute bottom-2 left-2 flex h-2 w-2 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
          <div className="h-[1px] w-full -rotate-45 bg-zinc-800" />
        </div>
        <div className="absolute right-2 bottom-2 flex h-2 w-2 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 shadow-[inset_0_1px_1px_rgba(0,0,0,1)]">
          <div className="h-[1px] w-full -rotate-12 bg-zinc-800" />
        </div>

        {/* Global CRT Curvature & Vignette Overlay */}
        <div className="pointer-events-none absolute inset-[24px] z-50 rounded-[4px] shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
        <div className="pointer-events-none absolute inset-[24px] z-50 rounded-[4px] border border-white/5" />
      </div>

      {/* Screen Area */}
      <div className="custom-scrollbar absolute inset-[24px] overflow-y-auto overflow-x-hidden rounded-[4px] bg-zinc-950 pb-24 lg:pb-0">
        <div className="relative z-10 mx-auto flex min-h-full flex-col">
          <AppHeader
            saveData={saveData}
            effectiveVersion={effectiveVersion}
            setIsSettingsOpen={setIsSettingsOpen}
            setIsVersionModalOpen={setIsVersionModalOpen}
            handleFileUpload={handleFileUpload}
          />

          <GlobalError error={error} />

          <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 pt-6 pb-12">{children}</main>
        </div>

        <BottomNav />
        <SettingsModal />
        <VersionModal />
        {conflictState && (
          <ConflictResolutionModal
            isOpen={conflictState.isOpen}
            localMetadata={conflictState.localMetadata}
            remoteMetadata={conflictState.remoteMetadata}
            onKeepLocal={() => resolveConflict('keep_local')}
            onPullRemote={() => resolveConflict('pull_remote')}
          />
        )}

        <RetroBackground saveData={saveData} />
      </div>
    </div>
  );
}
