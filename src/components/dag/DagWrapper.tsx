import { DagProvider, useDagContext, type ViewMode } from '../dashboard/DagContext';
import { DagKanbanBoard } from '../dashboard/kanban/DagKanbanBoard';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';
import { DagFilterPanel } from './DagFilterPanel';
import { DagTree } from './DagTree';
import { DagTreeProvider } from './DagTreeContext';

function DagViewSwitcher() {
  const {
    activeView,
    setActiveView,
    activeTypes,
    activeStatuses,
    showPermanentFailures,
    showHeatmap,
    toggleActiveType,
    toggleActiveStatus,
    toggleShowPermanentFailures,
    setShowHeatmap,
  } = useDagContext();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end border-b border-dashed border-zinc-800 bg-zinc-950 p-2">
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
            <DagFilterPanel
              activeTypes={activeTypes}
              activeStatuses={activeStatuses}
              showPermanentFailures={showPermanentFailures}
              showHeatmap={showHeatmap}
              onTypeToggle={toggleActiveType}
              onStatusToggle={toggleActiveStatus}
              onTogglePermanentFailures={toggleShowPermanentFailures}
              onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
            />
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
