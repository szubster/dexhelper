import { TacticalIconButton } from '@dexhelper/ui';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export interface RngTidSidDisplayProps {
  tid: number;
  sid: number;
  className?: string;
}

export function RngTidSidDisplay({ tid, sid, className = '' }: RngTidSidDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`TID: ${tid}, SID: ${sid}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className={`tactical-panel rounded-none border-dashed border-zinc-700/50 p-4 whitespace-nowrap ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[10px] tracking-widest whitespace-nowrap text-zinc-500 uppercase">
            RNG Trainer Identifiers
          </div>
          <div className="flex items-center gap-6 whitespace-nowrap">
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-mono text-xs text-zinc-400">TID</span>
              <span className="font-mono text-lg text-zinc-100">{tid.toString().padStart(5, '0')}</span>
            </div>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="font-mono text-xs text-zinc-400">SID</span>
              <span className="font-mono text-lg text-zinc-100">{sid.toString().padStart(5, '0')}</span>
            </div>
          </div>
        </div>

        <TacticalIconButton
          type="button"
          onClick={handleCopy}
          title="Copy TID/SID"
          aria-label="Copy TID and SID to clipboard"
        >
          {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
        </TacticalIconButton>
      </div>
    </div>
  );
}
