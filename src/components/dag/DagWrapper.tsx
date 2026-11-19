import { DagProvider, useDagContext, type ViewMode } from '../dashboard/DagContext';
import { DagKanbanBoard } from '../dashboard/kanban/DagKanbanBoard';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';
import { DagFilterPanel } from './DagFilterPanel';
import { DagTree } from './DagTree';
import { DagTreeProvider } from './DagTreeContext';

function DagViewSwitcher() {
  const { activeView, setActiveView, showHeatmap, setShowHeatmap } = useDagContext();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-dashed border-zinc-800 bg-zinc-950 p-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle heatmap overlay"
            title="Toggle heatmap overlay"
            aria-pressed={showHeatmap}
            className={`border !border-dashed px-2 py-1 font-mono text-xs focus-visible:ring-[var(--theme-primary)] ${
              showHeatmap
                ? 'border-orange-500 bg-orange-950/20 text-orange-500 shadow-none'
                : 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-400'
            }`}
            onClick={() => setShowHeatmap((prev) => !prev)}
          >
            [ HEATMAP_OVERLAY ]
          </button>
        </div>
        <TacticalSegmentedControl
          ariaLabel="DAG View Mode"
          selectedValue={activeView}
          onValueChange={(val: string) => setActiveView(val as ViewMode)}
          items={[
            { id: 'board', label: '[ KANBAN ]', testId: 'view-mode-board' },
            { id: 'tree', label: '[ TREE ]', testId: 'view-mode-tree' },
          ]}
        />
      </div>
      <div className="relative flex-1 overflow-hidden">
        {activeView === 'board' ? (
          <>
            <DagFilterPanel />
            <DagKanbanBoard />
          </>
        ) : (
          <DagTreeProvider>
            <DagTree />
          </DagTreeProvider>
        )}
      </div>
    </div>
  );
}

export function DagWrapper() {
  return (
    <DagProvider>
      <DagViewSwitcher />
    </DagProvider>
  );
}
