import { DagProvider, useDagContext, type ViewMode } from '../dashboard/DagContext';
import { DagKanbanBoard } from '../dashboard/kanban/DagKanbanBoard';
import { TacticalSegmentedControl } from '../TacticalSegmentedControl';
import { DagDashboard } from './DagDashboard';

function DagViewSwitcher() {
  const { activeView, setActiveView } = useDagContext();

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-end border-zinc-800 border-b border-dashed bg-zinc-950 p-2">
        <TacticalSegmentedControl
          ariaLabel="DAG View Mode"
          selectedValue={activeView}
          onValueChange={(val: string) => setActiveView(val as ViewMode)}
          items={[
            { id: 'graph', label: '[ GRAPH ]', testId: 'view-mode-graph' },
            { id: 'board', label: '[ KANBAN ]', testId: 'view-mode-board' },
          ]}
        />
      </div>
      <div className="relative flex-1 overflow-hidden">
        {activeView === 'board' ? <DagKanbanBoard /> : <DagDashboard />}
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
