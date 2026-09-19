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
          title="Abort purge"
          onClick={() => setIsConfirming(false)}
          variant="secondary"
          className="flex-1"
        >
          <span aria-hidden="true">[ </span>ABORT<span aria-hidden="true"> ]</span>
        </TacticalButton>
        <TacticalButton
          type="button"
          title="Confirm purge"
          onClick={onClear}
          variant="danger"
          className="flex-1"
          hasCrosshairs={true}
        >
          <Trash2 size={14} className="transition-transform group-hover:rotate-12" />
          <span aria-hidden="true">[ </span>CONFIRM.PURGE<span aria-hidden="true"> ]</span>
        </TacticalButton>
      </div>
    );
  }

  return (
    <TacticalButton
      type="button"
      title="Initiate system purge"
      onClick={() => setIsConfirming(true)}
      variant="danger-outline"
      className="fade-in zoom-in-95 w-full animate-in duration-200"
      hasCrosshairs={true}
    >
      <Trash2 size={16} className="transition-transform group-hover:rotate-12" />
      <span aria-hidden="true">[ </span>SYS.PURGE<span aria-hidden="true"> ]</span>
    </TacticalButton>
  );
}
