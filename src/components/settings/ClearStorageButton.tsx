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
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800 p-5 font-bold text-[10px] text-zinc-300 uppercase tracking-widest transition-all hover:bg-zinc-700"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onClear}
          className="group flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500 bg-red-600 p-5 font-bold text-[10px] text-white uppercase tracking-widest transition-all hover:bg-red-500"
        >
          <Trash2 size={14} className="transition-transform group-hover:rotate-12" />
          Confirm Delete
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="group fade-in zoom-in-95 flex w-full animate-in items-center justify-center gap-3 rounded-2xl border border-red-600/20 bg-red-600/10 p-5 font-bold text-[10px] text-red-500 uppercase tracking-widest transition-all duration-200 hover:bg-red-600/20"
    >
      <Trash2 size={16} className="transition-transform group-hover:rotate-12" />
      Clear Stored Save
    </button>
  );
}
