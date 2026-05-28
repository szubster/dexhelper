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
        'min-h-screen bg-zinc-950 pb-24 font-sans text-zinc-100 transition-colors duration-500 selection:bg-[var(--theme-primary)]/30 lg:pb-0',
        themeClass,
      )}
    >
      <div className="mx-auto flex min-h-screen flex-col">
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
  );
}
