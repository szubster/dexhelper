import { useCallback, useEffect, useRef, useState } from 'react';
import { saveDB } from '../db/SaveDB';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';

/**
 * Represents the current state of the File System Access API synchronization.
 * - `disconnected`: No active file handle, or permission was revoked.
 * - `syncing`: A file change was detected and is currently being parsed.
 * - `live`: The file is actively being watched and is up-to-date.
 * - `error`: An error occurred during parsing or file access.
 */
export type SyncStatus = 'disconnected' | 'syncing' | 'live' | 'error';

/**
 * A React hook that orchestrates live synchronization of a save file using the
 * HTML5 File System Access API.
 *
 * ## Architecture Overview
 *
 * 1. **Persistent Access:** When the user selects a file, its `FileSystemFileHandle`
 *    is stored in IndexedDB (`saveDB`). This allows the app to request read permission
 *    again on subsequent visits without reopening the file picker.
 * 2. **Polling Mechanism:** The File System Access API does not currently support
 *    events for file modifications. This hook implements a polling loop that checks
 *    the `lastModified` timestamp every 3 seconds to trigger a re-parse.
 * 3. **State Machine:** The hook manages transient UI state (`SyncStatus`) based on
 *    permission grants, polling results, and parsing success/failures.
 *
 * @returns An object containing the current sync status, any error messages, and control functions.
 */
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

  /**
   * Reads and parses the file buffer, updating the global Zustand store.
   * If parsing succeeds, it saves a copy of the buffer to IndexedDB as the latest state.
   */
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

  /**
   * Prompts the user with a file picker to select a save file.
   * If successful, it stores the handle for future sessions and begins polling.
   */
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

  /**
   * On mount, attempts to automatically re-establish the connection using a previously
   * stored file handle. If the browser natively retained permission, it resumes polling.
   * Otherwise, it waits in the 'disconnected' state for the user to manually trigger `resumeSync()`.
   */
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

  /**
   * Requests read permission from the browser for a previously stored file handle.
   * This is typically triggered by a user action (e.g., clicking a "Resume Sync" button)
   * after the initial automatic re-establishment fails due to expired permissions.
   */
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

  /**
   * The core polling loop. Checks the file's `lastModified` timestamp every 3 seconds
   * against the cached value. If a change is detected, it triggers `processFile`.
   */
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
