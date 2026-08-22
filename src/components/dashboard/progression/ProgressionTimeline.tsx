import type React from 'react';
import { useEffect, useState } from 'react';
import { useConcurrentGame } from '../../../contexts/ConcurrentGameContext';
import { initHistoryDb } from '../../../engine/storage/historyDb';
import { TacticalPanel } from '../../TacticalPanel';

interface TimelineEvent {
  id: string;
  type: string;
  description: string;
  timestamp: number;
}

export const ProgressionTimeline: React.FC = () => {
  const { state } = useConcurrentGame();
  const { playthroughs, activePlaythroughId } = state;
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const activePlaythrough = playthroughs.find((p) => p.id === activePlaythroughId);

  useEffect(() => {
    let mounted = true;

    const fetchHistory = async () => {
      if (!activePlaythroughId) {
        setEvents([]);
        return;
      }

      setIsLoading(true);

      try {
        const db = await initHistoryDb();
        const tx = db.transaction('metadata', 'readonly');
        const metadataStore = tx.objectStore('metadata');
        const index = metadataStore.index('by-playthrough-timestamp');

        const range = IDBKeyRange.bound([activePlaythroughId, -Infinity], [activePlaythroughId, Infinity]);
        const cursor = await index.openCursor(range, 'next'); // Chronological order

        const newEvents: TimelineEvent[] = [];
        let iterCursor = cursor;

        while (iterCursor) {
          const metadata = iterCursor.value;

          newEvents.push({
            id: iterCursor.primaryKey as string,
            type: (metadata['type'] as string) || 'SAVE',
            description: (metadata['description'] as string) || 'Game saved.',
            timestamp: (metadata['timestamp'] as number) || Date.now(),
          });

          iterCursor = await iterCursor.continue();
        }

        if (mounted) {
          setEvents(newEvents);
        }
      } catch (error) {
        console.error('Failed to fetch progression history:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchHistory();

    return () => {
      mounted = false;
    };
  }, [activePlaythroughId]);

  if (!activePlaythrough) {
    return (
      <TacticalPanel className="p-4 text-center">
        <span className="tactical-text font-mono text-zinc-500">NO ACTIVE PLAYTHROUGH FOUND</span>
      </TacticalPanel>
    );
  }

  return (
    <TacticalPanel className="flex flex-col gap-4 rounded-none border-zinc-700 border-dashed p-4">
      <div className="mb-2 border-zinc-700 border-b border-dashed pb-2">
        <h3 className="font-black font-mono text-lg text-white uppercase">
          PROGRESSION TIMELINE: {activePlaythrough.name}
        </h3>
        <p className="font-mono text-xs text-zinc-500">SYS.VERSION: {activePlaythrough.gameVersion.toUpperCase()}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-4 font-mono">
          <div className="w-24 text-xs text-zinc-400">INIT</div>
          <div className="flex-1 border-zinc-700 border-l border-dashed pl-4 text-sm text-zinc-300">
            Adventure started.
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-start gap-4 font-mono">
            <div className="w-24 text-xs text-zinc-400">SYS.WAIT</div>
            <div className="flex-1 animate-pulse border-zinc-700 border-l border-dashed pl-4 text-sm text-zinc-300">
              Fetching history...
            </div>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="flex items-start gap-4 font-mono">
              <div className="w-24 text-xs text-zinc-400 uppercase">{event.type.substring(0, 8)}</div>
              <div className="flex-1 border-zinc-700 border-l border-dashed pl-4 text-sm text-zinc-300">
                {event.description}
              </div>
            </div>
          ))
        )}
      </div>
    </TacticalPanel>
  );
};
