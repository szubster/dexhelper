import { get, set } from 'idb-keyval';
import { useCallback, useEffect, useState } from 'react';

const HANDLE_KEY = 'dexhelper-file-handle';

export interface SyncControllerState {
  fileHandle: FileSystemFileHandle | null;
  isSupported: boolean;
  requestSync: () => Promise<void>;
  restoreSync: () => Promise<boolean>;
}

export function useSyncController(): SyncControllerState {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(
    typeof window !== 'undefined' && 'showOpenFilePicker' in window,
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !('showOpenFilePicker' in window)) {
      setIsSupported(false);
    }
  }, []);

  const requestSync = useCallback(async () => {
    if (!isSupported) {
      throw new Error('File System Access API is not supported in this browser.');
    }

    try {
      const handles = await window.showOpenFilePicker?.({
        types: [
          {
            description: 'Save Files',
            accept: {
              'application/octet-stream': ['.sav'],
            },
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false,
      });

      if (!handles || handles.length === 0) throw new Error('No handle returned');
      const handle = handles[0];

      if (handle) {
        setFileHandle(handle);
        await set(HANDLE_KEY, handle);
      }
    } catch (error) {
      // The user cancelled the picker or another error occurred.
      if (error instanceof DOMException && error.name === 'AbortError') {
        return; // User cancelled
      }
      throw error;
    }
  }, [isSupported]);

  const restoreSync = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      return false;
    }

    try {
      const handle = await get<FileSystemFileHandle>(HANDLE_KEY);
      if (!handle) {
        return false;
      }

      // Check permission
      const options: FileSystemHandlePermissionDescriptor = { mode: 'read' };
      const permission = await handle.queryPermission(options);

      if (permission === 'granted') {
        setFileHandle(handle);
        return true;
      }

      const requestStatus = await handle.requestPermission(options);
      if (requestStatus === 'granted') {
        setFileHandle(handle);
        return true;
      }

      return false;
    } catch (error) {
      console.error('System: sync failed', error);
      return false;
    }
  }, [isSupported]);

  return {
    fileHandle,
    isSupported,
    requestSync,
    restoreSync,
  };
}
