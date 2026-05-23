import { createFileRoute } from '@tanstack/react-router';
import { RunDashboard } from '../components/run';

export const Route = createFileRoute('/run')({
  component: RunDashboardPage,
});

function RunDashboardPage() {
  return <RunDashboard />;
}
