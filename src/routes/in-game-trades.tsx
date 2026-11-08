import { createFileRoute } from '@tanstack/react-router';
import { ShieldAlert } from 'lucide-react';
import { NpcTradeList } from '../components/dashboard/trades/components/NpcTradeList';
import { EmptyState } from '../components/EmptyState';
import { useInGameTrades } from '../hooks/useInGameTrades';
import { useStore } from '../store';

export const Route = createFileRoute('/in-game-trades')({
  component: InGameTradesPage,
});

function InGameTradesPage() {
  const saveData = useStore((s) => s.saveData);
  const trades = useInGameTrades();

  if (!saveData || (saveData.generation !== 1 && saveData.generation !== 2 && saveData.generation !== 3)) {
    return <EmptyState icon={<ShieldAlert size={24} />} label="IN-GAME TRADES UNAVAILABLE" />;
  }

  // The NpcTradeList expects a TradeItem[] which is { trade: NpcTradeEntry, status: TradeStatus }
  // Our hook useInGameTrades already returns these fields.
  return (
    <div className="mb-20 flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)] md:mb-0">
      <NpcTradeList trades={trades.map((t) => ({ trade: t, status: t.status }))} generation={saveData.generation} />
    </div>
  );
}
