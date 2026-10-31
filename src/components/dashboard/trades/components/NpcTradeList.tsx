import React from 'react';
import type { NpcTradeEntry } from '../../../../engine/data/gen1/assistantData';
import { cn } from '../../../../utils/cn';
import { TacticalPanel } from '../../../TacticalPanel';
import { TelemetryDecoration } from '../../../TelemetryDecoration';
import { NpcTradeCard, type TradeStatus } from './NpcTradeCard';

export interface TradeItem {
  trade: NpcTradeEntry;
  status: TradeStatus;
}

export interface NpcTradeListProps extends React.HTMLAttributes<HTMLDivElement> {
  trades: TradeItem[];
  generation: number;
}

export const NpcTradeList = React.forwardRef<HTMLDivElement, NpcTradeListProps>(
  ({ trades, generation, className, ...props }, ref) => {
    if (trades.length === 0) {
      return null;
    }

    return (
      <div ref={ref} className={cn('mt-6 flex flex-col gap-6', className)} {...props}>
        <TacticalPanel className="relative flex flex-col gap-4 border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
          <TelemetryDecoration label={`SYS.GEN${generation}_IN_GAME_TRADES`} className="-top-[17px] left-[-1px]" />
          <div className="flex items-center justify-between">
            <span className="tactical-text z-10 font-black text-lg text-white">IN-GAME TRADES</span>
          </div>

          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {trades.map((item) => (
              <NpcTradeCard
                key={`${item.trade.receivedId}-${item.trade.offeredId}`}
                trade={item.trade}
                status={item.status}
              />
            ))}
          </div>
        </TacticalPanel>
      </div>
    );
  },
);

NpcTradeList.displayName = 'NpcTradeList';
