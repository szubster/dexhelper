export interface NPC {
  id: number;
  name: string;
}

export const MOCK_NPCS: NPC[] = [
  { id: 0, name: 'Prof. Oak' },
  { id: 1, name: 'Daisy' },
  { id: 2, name: 'Brock' },
  { id: 3, name: 'Misty' },
  { id: 4, name: 'Lt. Surge' },
  { id: 5, name: 'Erika' },
  { id: 6, name: 'Koga' },
  { id: 7, name: 'Sabrina' },
  { id: 8, name: 'Blaine' },
  { id: 9, name: 'Giovanni' },
  { id: 10, name: 'Lorelei' },
  { id: 11, name: 'Bruno' },
  { id: 12, name: 'Agatha' },
  { id: 13, name: 'Lance' },
  { id: 14, name: 'Bill' },
  { id: 15, name: 'Mr. Fuji' },
];

export interface NPCListProps {
  npcs?: NPC[];
  selectedNpcId: number | null;
  onSelect: (id: number) => void;
}

export function NPCList({ npcs = MOCK_NPCS, selectedNpcId, onSelect }: NPCListProps) {
  return (
    <div className="tactical-panel flex flex-col gap-2 p-4">
      <h2 className="tactical-text mb-2 border-b border-dashed border-zinc-700 pb-2 text-xl">Fame Checker Targets</h2>
      <div className="flex flex-col gap-2">
        {npcs.map((npc) => (
          <button
            key={npc.id}
            type="button"
            onClick={() => onSelect(npc.id)}
            className={`tactical-button w-full text-left ${
              selectedNpcId === npc.id ? 'border-red-500 bg-red-500/20 text-red-500' : ''
            }`}
          >
            {npc.name}
          </button>
        ))}
      </div>
    </div>
  );
}
