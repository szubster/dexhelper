import { DagProvider } from '../dashboard/DagContext';
import { DagDashboard } from './DagDashboard';

export function DagWrapper() {
  return (
    <DagProvider>
      <DagDashboard />
    </DagProvider>
  );
}
