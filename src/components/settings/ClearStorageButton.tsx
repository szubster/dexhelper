import { Trash2 } from 'lucide-react';
import React from 'react';
import { TacticalButton } from '../TacticalButton';

export function ClearStorageButton({ onClear }: { onClear: () => void }) {
  const [isConfirming, setIsConfirming] = React.useState(false);

  if (isConfirming) {
    return (
      <div className="fade-in zoom-in-95 flex w-full animate-in gap-2 duration-200">
        <TacticalButton
          type="button"
          aria-label="Abort purge"
          onClick={() => setIsConfirming(false)}
          variant="secondary"
          className="flex-1"
        >
          [ ABORT ]
        </TacticalButton>
        <TacticalButton
          type="button"
          aria-label="Confirm purge"
          onClick={onClear}
          variant="danger"
          className="flex-1"
          hasCrosshairs={true}
        >
          <Trash2 size={14} className="transition-transform group-hover:rotate-12" />[ CONFIRM.PURGE ]
        </TacticalButton>
      </div>
    );
  }

  return (
    <TacticalButton
      type="button"
      aria-label="Initiate system purge"
      onClick={() => setIsConfirming(true)}
      variant="danger-outline"
      className="fade-in zoom-in-95 w-full animate-in duration-200"
      hasCrosshairs={true}
    >
      <Trash2 size={16} className="transition-transform group-hover:rotate-12" />
      SYS.PURGE {/* ERASE SAVE DATA */}
    </TacticalButton>
  );
}
