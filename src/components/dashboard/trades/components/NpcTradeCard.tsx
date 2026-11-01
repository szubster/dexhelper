import React from 'react';
import type { NpcTradeEntry } from '../../../../engine/data/gen1/assistantData';
import { cn } from '../../../../utils/cn';

export type TradeStatus = 'Available' | 'Claimed' | 'Incomplete';

export interface NpcTradeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  trade: NpcTradeEntry;
  status: TradeStatus;
}

export const NpcTradeCard = React.forwardRef<HTMLDivElement, NpcTradeCardProps>(
  ({ trade, status, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('tactical-card relative gap-4 overflow-hidden', className)} {...props}>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="tactical-text text-lg font-black text-white">#{trade.receivedId}</span>
            {trade.nickname && <span className="tactical-text text-xs text-zinc-400">"{trade.nickname}"</span>}
          </div>
          <span
            className={cn('tactical-badge px-2 py-1', {
              'border-emerald-500/50 bg-emerald-500/10 text-emerald-400': status === 'Claimed',
              'border-zinc-500/50 bg-zinc-500/10 text-zinc-400': status === 'Available',
              'border-amber-500/50 bg-amber-500/10 text-amber-400': status === 'Incomplete',
            })}
          >
            {status}
          </span>
        </div>

        <div className="flex flex-col gap-2 border-t border-dashed border-zinc-800 pt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="tactical-text text-zinc-500">OFFER</span>
            <span className="tactical-text text-zinc-300">#{trade.offeredId}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="tactical-text text-zinc-500">RECEIVE</span>
            <span className="tactical-text text-zinc-300">#{trade.receivedId}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="tactical-text text-zinc-500">LOCATION</span>
            <span className="tactical-text truncate text-zinc-300" title={trade.location}>
              {trade.location}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="tactical-text text-zinc-500">OT</span>
            <span className="tactical-text text-zinc-300">{trade.receivedOtName}</span>
          </div>
        </div>
      </div>
    );
  },
);

NpcTradeCard.displayName = 'NpcTradeCard';
