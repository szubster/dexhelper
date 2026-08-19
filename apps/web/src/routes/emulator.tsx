import { createFileRoute } from '@tanstack/react-router';
import { EmulatorUI } from '../components/emulator/EmulatorUI';

export const Route = createFileRoute('/emulator')({
  component: EmulatorPage,
});

function EmulatorPage() {
  return (
    <div className="flex h-full flex-col">
      <EmulatorUI />
    </div>
  );
}
