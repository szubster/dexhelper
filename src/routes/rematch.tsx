import { createFileRoute } from '@tanstack/react-router';
import { RematchDashboard } from '../components/dashboard/rematch/RematchDashboard';

export const Route = createFileRoute('/rematch')({
  component: RematchDashboard,
});
