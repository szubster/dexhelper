import { Search } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store';
import { EdgeLabel } from '../EdgeLabel';
import { TacticalButton } from '../TacticalButton';
import { TacticalInput } from '../TacticalInput';
import { TacticalPanel } from '../TacticalPanel';

export function WildItemSelector() {
  const [inputValue, setInputValue] = useState('');

  const selectedItemIds = useStore((s) => s.selectedWildItemIds);
  const addItem = useStore((s) => s.addSelectedWildItemId);
  const removeItem = useStore((s) => s.removeSelectedWildItemId);
  const clearItems = useStore((s) => s.clearSelectedWildItemIds);

  const handleAdd = () => {
    const id = parseInt(inputValue, 10);
    if (!Number.isNaN(id)) {
      addItem(id);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <TacticalPanel className="flex-1 border border-zinc-700 border-dashed bg-black/80 p-5">
      <EdgeLabel className="-top-2 left-5 bg-zinc-950 px-2 text-zinc-400 tracking-[0.2em]">
        WILD_ITEM_SELECTION
      </EdgeLabel>

      <div className="mt-2 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <TacticalInput
            icon={<Search size={14} />}
            placeholder="[ ENTER ITEM ID ]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="font-mono text-zinc-300"
          />
          <TacticalButton variant="primary" onClick={handleAdd}>
            ADD
          </TacticalButton>
          <TacticalButton variant="danger" onClick={clearItems} disabled={selectedItemIds.length === 0}>
            CLEAR
          </TacticalButton>
        </div>

        {selectedItemIds.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2 border border-zinc-700 border-dashed bg-zinc-900/50 p-3">
            {selectedItemIds.map((id) => (
              <div key={id} className="flex items-center gap-2 border border-cyan-500/30 bg-cyan-950/20 px-2 py-1">
                <span className="font-mono text-cyan-400 text-xs">ID:{id}</span>
                <TacticalButton
                  variant="danger-outline"
                  size="icon"
                  className="h-4 w-4 p-0 text-[10px]"
                  onClick={() => removeItem(id)}
                  title="Remove Item"
                >
                  X
                </TacticalButton>
              </div>
            ))}
          </div>
        )}

        {selectedItemIds.length === 0 && (
          <div className="mt-2 border border-zinc-800 border-dashed bg-zinc-900/30 p-3 text-center font-mono text-xs text-zinc-600">
            NO ITEMS SELECTED FOR HUNTING
          </div>
        )}
      </div>
    </TacticalPanel>
  );
}
