import { useCallback, useEffect, useRef, useState } from 'react';
import { AUTH_LOGGED_IN_INDICATOR } from '../contexts/AuthContext';
import { saveDB } from '../db/SaveDB';
import { parseSaveFile } from '../engine/saveParser/index';
import { useStore } from '../store';
import { r2Client } from '../utils/r2/client';

/**
 * Represents the current state of the File System Access API synchronization.
 * - `disconnected`: No active file handle is present, or the browser automatically revoked the background read permission between sessions.
 * - `syncing`: A file change was detected via the polling loop, and the binary `.sav` data is currently being re-parsed.
 * - `live`: The file is actively being watched, the `lastModified` timestamp matches, and the Zustand store is up-to-date.
 * - `error`: A fatal error occurred during parsing or a `DOMException` was thrown during file access (e.g., file deleted externally).
 */
export type SyncStatus = 'disconnected' | 'syncing' | 'live' | 'error';

/**
 * A React hook that orchestrates live synchronization of a Game Boy save file using the
 * HTML5 File System Access API (`window.showOpenFilePicker`).
 *
 * ## Architecture Overview
 *
 * 1. **Persistent Access:** When the user selects a file, its `FileSystemFileHandle`
 *    is stored in IndexedDB (`saveDB`). This prevents the user from needing to manually
 *    re-select the file on subsequent visits.
 * 2. **Permission Lifecycle:** Although the *handle* is saved, browsers automatically revoke
 *    the background *read permission* when the tab is closed for security reasons. This hook
 *    distinguishes between having a stored handle (`hasStoredHandle = true`) and having active
 *    permission (`status = 'live'`).
 * 3. **Polling Mechanism:** Because the modern web lacks a standard `FileSystemObserver` to emit
 *    events on file modifications, this hook implements a manual polling loop that checks the
 *    `file.lastModified` timestamp every 3 seconds to trigger a re-parse.
 *
 * @returns An object containing the current sync status, any error messages, and control functions.
 *
 * @example
 * ```tsx
 * const { status, requestSync, resumeSync, hasStoredHandle } = useFileSyncController();
 *
 * if (status === 'disconnected' && hasStoredHandle) {
 *   return <button onClick={resumeSync}>Resume Live Sync</button>;
 * }
 * ```
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
  const setConflictState = useStore((s) => s.setConflictState);

  /**
   * Reads and parses the file buffer, updating the global Zustand store.
   * If parsing succeeds, it saves a copy of the raw binary buffer to IndexedDB (`saveDB`) as the latest state.
   * This ensures that even if live sync fails later or the user reloads the page, they don't lose their data.
   *
   * @param file - The `File` object returned from the `FileSystemFileHandle`.
   * @throws Will set the `SyncStatus` to `error` if binary parsing fails (e.g., due to a corrupted save file).
   */
  const processFile = useCallback(
    async (file: File) => {
      try {
        const buffer = await file.arrayBuffer();
        const data = await parseSaveFile(buffer, manualVersion || undefined);

        setSaveData(data);

        if (data.gameVersion === 'unknown') {
          setIsVersionModalOpen(true);
        } else {
          setManualVersion(null);
        }

        if (localStorage.getItem(AUTH_LOGGED_IN_INDICATOR) === 'true') {
          try {
            const saves = await r2Client.listSaves();
            const saveId = saves.length > 0 && saves[0] ? saves[0].id : 'save-1';
            const cloudSaveInfo = saves.find((s) => s.id === saveId);

            if (cloudSaveInfo?.lastModified && file.lastModified < cloudSaveInfo.lastModified) {
              // Cloud is newer, trigger conflict resolution
              let cloudSave = null;
              try {
                cloudSave = await r2Client.getSave(saveId);
              } catch {
                console.warn('System: pull from cloud failed');
              }

              if (cloudSave) {
                setConflictState({
                  isOpen: true,
                  localMetadata: { timestamp: file.lastModified },
                  remoteMetadata: { timestamp: cloudSaveInfo.lastModified },
                  localBuffer: new Uint8Array(buffer),
                  remoteBuffer: cloudSave.data,
                  saveId,
                });

                // Keep the live status since polling should still continue
                setStatus('live');
                setErrorMsg(null);
                return; // Abort pushing local until conflict is resolved
              }
            }

            await saveDB.putSave('last_save_file', new Uint8Array(buffer));
            try {
              await r2Client.putSave(saveId, new Uint8Array(buffer), file.lastModified);
            } catch {
              console.warn('System: push to cloud failed');
            }
          } catch {
            console.warn('System: list saves from cloud failed');
            await saveDB.putSave('last_save_file', new Uint8Array(buffer));
          }
        } else {
          await saveDB.putSave('last_save_file', new Uint8Array(buffer));
        }

        setStatus('live');
        setErrorMsg(null);
      } catch {
        console.error('Failed to parse live save file.');
        setStatus('error');
        setErrorMsg('Failed to parse live save file.');
      }
    },
    [manualVersion, setSaveData, setIsVersionModalOpen, setManualVersion, setConflictState],
  );

  /**
   * Prompts the user with the native operating system file picker to select a `.sav` file.
   * If successful, it stores the resulting `FileSystemFileHandle` in IndexedDB for future sessions
   * and immediately begins the polling loop.
   *
   * @remarks
   * This relies on `window.showOpenFilePicker()`, which requires a secure context (HTTPS)
   * and must be triggered directly by a transient user activation (e.g., a button click).
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
   * Requests active read permission from the browser for a previously stored file handle.
   *
   * @remarks
   * **Why is this needed?**
   * Even though the `FileSystemFileHandle` is persisted in IndexedDB, the browser automatically
   * revokes the actual *permission* to read from the disk when the browser session ends.
   * When the user returns to the app, the `useEffect` above checks `handle.queryPermission()`.
   * If it returns 'prompt' or 'denied', the app enters the 'disconnected' state.
   * This function calls `handle.requestPermission()`, which triggers the native browser prompt
   * (e.g., "Let dexhelper.com view files?") to restore access without needing the full file picker.
   * Like `requestSync`, this must be triggered by a user action.
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
   * The core live-sync polling loop.
   *
   * @remarks
   * **Why polling?**
   * The modern web does not yet have a widely supported `FileSystemObserver` API to push
   * events when a file changes on disk. Therefore, we must manually poll the file handle.
   * By calling `handleRef.current.getFile()`, we retrieve a lightweight `File` metadata object.
   * We compare its `lastModified` integer against our `lastModifiedRef` cache. If it differs,
   * we know the emulator has written new save data, and we trigger the heavy `processFile` binary parse.
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
