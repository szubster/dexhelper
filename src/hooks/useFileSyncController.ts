import { useCallback, useEffect, useRef, useState } from 'react';
import { saveDB } from '../db/SaveDB';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';

export type SyncStatus = 'disconnected' | 'syncing' | 'live' | 'error';

export function useFileSyncController() {
  const [status, setStatus] = useState<SyncStatus>('disconnected');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const handleRef = useRef<FileSystemFileHandle | null>(null);
  const [hasStoredHandle, setHasStoredHandle] = useState(false);
  const lastModifiedRef = useRef<number>(0);

  const setSaveData = useStore((s) => s.setSaveData);
  const manualVersion = useStore((s) => s.manualVersion);
  const setManualVersion = useStore((s) => s.setManualVersion);
  const setIsVersionModalOpen = useStore((s) => s.setIsVersionModalOpen);

  const processFile = useCallback(
    async (file: File) => {
      try {
        const buffer = await file.arrayBuffer();
        const data = parseSaveFile(buffer, manualVersion || undefined);

        setSaveData(data);

        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        await saveDB.putSave('last_save_file', new Uint8Array(buffer));
        setStatus('live');
        setErrorMsg(null);
      } catch {
        console.error('Failed to parse live save file.');
        setStatus('error');
        setErrorMsg('Failed to parse live save file.');
      }
    },
    [manualVersion, setSaveData, setIsVersionModalOpen, setManualVersion],
  );

  // Request new handle
  const requestSync = useCallback(async () => {
    try {
      if (!('showOpenFilePicker' in window)) {
        throw new Error('File System Access API not supported');
      }

      const [handle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Game Boy Save File',
            accept: { '*/*': ['.sav'] },
          },
        ],
        multiple: false,
      });

      handleRef.current = handle;
      await saveDB.putHandle('live_sync_handle', handle);
      setHasStoredHandle(true);

      setStatus('syncing');

      // Read initial file
      const file = await handle.getFile();
      lastModifiedRef.current = file.lastModified;
      await processFile(file);
    } catch (err) {
      console.error('User cancelled or error');
      // Don't set error status if user just cancelled
      if (err instanceof Error && err.name !== 'AbortError') {
        setStatus('error');
        setErrorMsg('Failed to setup sync.');
      }
    }
  }, [processFile]);

  // Try to restore on mount
  useEffect(() => {
    async function restoreHandle() {
      try {
        const storedHandle = await saveDB.getHandle('live_sync_handle');
        if (storedHandle) {
          setHasStoredHandle(true);
          // Check permissions

          const perm = await storedHandle.queryPermission({ mode: 'read' });
          if (perm === 'granted') {
            handleRef.current = storedHandle;
            setStatus('syncing');
            const file = await storedHandle.getFile();
            lastModifiedRef.current = file.lastModified;
            await processFile(file);
          } else {
            // We have handle but no permission, keep it in ref and wait for user interaction if needed
            // Or prompt for permission ? The ADR says: "The user will not need to use the file picker again, but the browser may natively prompt them to re-verify permission to access the retained handle using handle.requestPermission({ mode: 'read' })."
            setStatus('disconnected');
          }
        }
      } catch {
        console.error('Failed to restore handle');
      }
    }
    void restoreHandle();
  }, [processFile]);

  const resumeSync = useCallback(async () => {
    try {
      const storedHandle = await saveDB.getHandle('live_sync_handle');
      if (storedHandle) {
        const perm = await storedHandle.requestPermission({ mode: 'read' });
        if (perm === 'granted') {
          handleRef.current = storedHandle;
          setStatus('syncing');
          const file = await storedHandle.getFile();
          lastModifiedRef.current = file.lastModified;
          await processFile(file);
        }
      }
    } catch {
      console.error('Failed to resume sync');
      setStatus('error');
    }
  }, [processFile]);

  // Polling loop
  useEffect(() => {
    const interval = setInterval(async () => {
      if (!handleRef.current) return;
      if (status !== 'live' && status !== 'syncing') return;

      try {
        const file = await handleRef.current.getFile();
        if (file.lastModified !== lastModifiedRef.current) {
          setStatus('syncing');
          lastModifiedRef.current = file.lastModified;
          await processFile(file);
        }
      } catch {
        console.error('Polling error');
        // We might have lost permission or file was deleted
        setStatus('disconnected');
      }
    }, 3000); // 3 second interval

    return () => clearInterval(interval);
  }, [status, processFile]);

  return { status, errorMsg, requestSync, resumeSync, hasStoredHandle };
}
