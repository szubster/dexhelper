import { Database } from 'lucide-react';
import type React from 'react';
import { useCallback, useState } from 'react';
import { romDB } from '../../db/RomDB';
import { cn } from '../../utils/cn';
import { TacticalFileInput } from '../TacticalFileInput';

export function EmulatorUI() {
  const [isDragging, setIsDragging] = useState(false);
  const [loadedRomName, setLoadedRomName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    try {
      setError(null);
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      await romDB.putRom(file.name, uint8Array);
      setLoadedRomName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ROM');
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        void handleFile(file);
      }
    },
    [handleFile],
  );

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void handleFile(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 font-mono text-zinc-100">
      <h1 className="font-bold text-2xl text-emerald-500 uppercase tracking-widest">Emulator UI</h1>

      {/* biome-ignore lint/a11y/noStaticElementInteractions: this is a drag and drop zone */}
      <div
        className={cn(
          'group focus-visible:tactical-focus relative flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-none border border-dashed font-mono transition-colors duration-500 hover:scale-[1.02] active:scale-[0.98]',
          isDragging
            ? 'border-emerald-500 bg-emerald-500/10'
            : 'border-white/20 bg-zinc-900/50 hover:border-white/40 hover:bg-zinc-800/80',
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        data-testid="drop-zone"
      >
        <Database size={32} className={isDragging ? 'text-emerald-500' : 'text-zinc-500'} />
        <div className="text-center">
          <p className="mb-2 text-sm text-zinc-400">Drag and drop a ROM file here</p>
          <p className="text-xs text-zinc-500">or</p>
        </div>

        <label
          htmlFor="emulator-file-input"
          className="cursor-pointer border border-emerald-500 border-dashed bg-emerald-500/10 px-4 py-2 font-bold text-emerald-500 text-sm transition-colors hover:bg-emerald-500/20"
        >
          SELECT FILE
        </label>
        <TacticalFileInput
          id="emulator-file-input"
          onChange={onFileInput}
          accept=".gba,.gbc,.gb"
          data-testid="file-input"
        />
      </div>

      {loadedRomName && (
        <div
          className="border border-emerald-500/50 border-dashed bg-emerald-950/20 p-4 text-emerald-400"
          data-testid="success-message"
        >
          <p className="font-bold">✓ ROM LOADED</p>
          <p className="text-sm">{loadedRomName}</p>
        </div>
      )}

      {error && (
        <div className="border border-red-500/50 border-dashed bg-red-950/20 p-4 text-red-400">
          <p className="font-bold">✗ ERROR</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
