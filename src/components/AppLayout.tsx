import type React from 'react';
import { useEffect } from 'react';
import { saveDB } from '../db/SaveDB';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';
import { cn } from '../utils/cn';
import { VERSION_THEMES } from '../utils/generationConfig';
import { reloadPage } from '../utils/window';
import { AppHeader } from './AppHeader';
import { BottomNav } from './BottomNav';
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
        <div className="absolute top-2 left-6 font-black font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
          [ MODEL: DEX-OS V2 ]
        </div>
        <div className="absolute right-6 bottom-2 font-black font-mono text-[8px] text-zinc-700 uppercase tracking-widest">
          POWER: ONLINE
        </div>

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

        <RetroBackground saveData={saveData} />
      </div>
    </div>
  );
}
