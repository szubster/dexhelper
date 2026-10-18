import { DagProvider } from '../dashboard/DagContext';
import { DagKanbanBoard } from '../dashboard/kanban/DagKanbanBoard';

export function DagWrapper() {
  return (
    <DagProvider>
      <div className="flex h-full flex-col">
        <div className="relative flex-1 overflow-hidden">
          <DagKanbanBoard />
        </div>
      </div>
    </DagProvider>
  );
}
