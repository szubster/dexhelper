import type React from 'react';
import type { DecorationItem } from '../../features/decorations/types';
import { TacticalBadge } from '../TacticalBadge';

export interface DecorationItemCardProps {
  item: DecorationItem;
}

export const DecorationItemCard: React.FC<DecorationItemCardProps> = ({ item }) => {
  return (
    <div
      className={`flex flex-col border border-dashed p-2 text-xs ${
        item.isActive
          ? 'border-[var(--theme-primary)] bg-[rgba(var(--theme-primary-rgb),0.1)]'
          : item.isUnlocked
            ? 'border-zinc-700 bg-zinc-900/50'
            : 'border-zinc-800 bg-zinc-950/50 opacity-50'
      }`}
    >
      <div className="mb-1 flex items-start justify-between">
        <span className={`font-mono ${item.isUnlocked ? 'text-zinc-100' : 'text-zinc-500'}`}>{item.name}</span>
        <div className="flex gap-1">
          {item.isActive && (
            <TacticalBadge variant="primary" className="px-1 text-[8px]">
              ACTIVE
            </TacticalBadge>
          )}
          {item.isMysteryGift && (
            <TacticalBadge variant="amber" className="px-1 text-[8px]">
              [MG]
            </TacticalBadge>
          )}
        </div>
      </div>
      <div className="flex justify-between font-mono text-[10px] text-zinc-500">
        <span>ID: {item.id.toString().padStart(2, '0')}</span>
        <span>{item.isUnlocked ? 'UNLOCKED' : 'LOCKED'}</span>
      </div>
    </div>
  );
};
