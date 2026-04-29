import { Trash2 } from 'lucide-react';
import React from 'react';

export function ClearStorageButton({ onClear }: { onClear: () => void }) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  if (isConfirming) {
    return (
      <div className="fade-in zoom-in-95 flex w-full animate-in gap-2 duration-200">
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="flex-1 border border-zinc-700 border-dashed bg-zinc-900 p-5 font-bold font-mono text-[10px] text-zinc-400 uppercase tracking-widest transition-all hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          [ ABORT ]
        </button>
        <button
          type="button"
          onClick={onClear}
          className="group relative flex flex-1 items-center justify-center gap-2 border border-red-500 border-dashed bg-red-950/50 p-5 font-bold font-mono text-[10px] text-red-500 uppercase tracking-widest transition-all hover:bg-red-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <div className="absolute top-0 left-0 h-1.5 w-1.5 border-red-500 border-t border-l" />
          <div className="absolute top-0 right-0 h-1.5 w-1.5 border-red-500 border-t border-r" />
          <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-red-500 border-b border-l" />
          <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-red-500 border-r border-b" />
          <Trash2 size={14} className="transition-transform group-hover:rotate-12" />[ CONFIRM.PURGE ]
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="group fade-in zoom-in-95 relative flex w-full animate-in items-center justify-center gap-3 border border-red-900/50 border-dashed bg-red-950/20 p-5 font-bold font-mono text-[10px] text-red-500/80 uppercase tracking-widest transition-all duration-200 hover:border-red-500/50 hover:bg-red-950/40 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    >
      <div className="absolute top-0 left-0 h-1.5 w-1.5 border-red-900/50 border-t border-l transition-colors group-hover:border-red-500" />
      <div className="absolute top-0 right-0 h-1.5 w-1.5 border-red-900/50 border-t border-r transition-colors group-hover:border-red-500" />
      <div className="absolute bottom-0 left-0 h-1.5 w-1.5 border-red-900/50 border-b border-l transition-colors group-hover:border-red-500" />
      <div className="absolute right-0 bottom-0 h-1.5 w-1.5 border-red-900/50 border-r border-b transition-colors group-hover:border-red-500" />
      <Trash2 size={16} className="transition-transform group-hover:rotate-12" />
      SYS.PURGE {/* ERASE SAVE DATA */}
    </button>
  );
}
