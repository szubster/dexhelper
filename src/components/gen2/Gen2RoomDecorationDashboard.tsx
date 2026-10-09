import type { DecorationItem } from '../../features/decorations/types';
import { useGen2RoomDecorations } from '../../hooks/gen2/useGen2RoomDecorations';
import { TacticalCard } from '../TacticalCard';
import { DecorationItemCard } from './DecorationItemCard';

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
    <TacticalCard>
      <h3 className="tactical-text mb-3 font-semibold text-sm text-zinc-300">{name}</h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <DecorationItemCard key={item.id} item={item} />
        ))}
      </div>
    </TacticalCard>
  );
}
