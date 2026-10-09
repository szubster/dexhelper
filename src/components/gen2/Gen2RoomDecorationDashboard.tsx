import type { DecorationItem } from '../../features/decorations/types';
import { useGen2RoomDecorations } from '../../hooks/gen2/useGen2RoomDecorations';

interface Gen2RoomDecorationDashboardProps {
  activeDecorations?: number[];
  unlockedDecorations?: boolean[];
}

export function Gen2RoomDecorationDashboard({
  activeDecorations = [],
  unlockedDecorations = [],
}: Gen2RoomDecorationDashboardProps) {
  const categories = useGen2RoomDecorations({ activeDecorations, unlockedDecorations });

  return (
    <div className="tactical-panel flex flex-col gap-6 p-6">
      <h2 className="tactical-text mb-4 border-zinc-700 border-b border-dashed pb-2 font-bold text-xl">
        Room Decorations
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categories).map(([categoryName, items]) => (
          <DecorationCategorySection key={categoryName} name={categoryName} items={items} />
        ))}
      </div>
    </div>
  );
}

interface DecorationCategorySectionProps {
  name: string;
  items: DecorationItem[];
}

function DecorationCategorySection({ name, items }: DecorationCategorySectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="tactical-card">
      <h3 className="tactical-text mb-3 font-semibold text-sm text-zinc-300">{name}</h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <DecorationItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

interface DecorationItemCardProps {
  item: DecorationItem;
}

function DecorationItemCard({ item }: DecorationItemCardProps) {
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
            <span className="tactical-badge bg-[var(--theme-primary)] px-1 text-[8px] text-white">ACTIVE</span>
          )}
          {item.isMysteryGift && (
            <span className="tactical-badge border-amber-500 px-1 text-[8px] text-amber-500">[MG]</span>
          )}
        </div>
      </div>
      <div className="flex justify-between font-mono text-[10px] text-zinc-500">
        <span>ID: {item.id.toString().padStart(2, '0')}</span>
        <span>{item.isUnlocked ? 'UNLOCKED' : 'LOCKED'}</span>
      </div>
    </div>
  );
}
