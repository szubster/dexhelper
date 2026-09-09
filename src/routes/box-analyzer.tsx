import { createFileRoute } from '@tanstack/react-router';
import { Network } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { useStore } from '../store';

export const Route = createFileRoute('/box-analyzer')({
  component: BoxAnalyzerPage,
});

function BoxAnalyzerPage() {
  const saveData = useStore((s) => s.saveData);

  if (!saveData) {
    return <EmptyState icon={<Network size={24} />} label="SYSTEM OFFLINE" />;
  }

  return (
    <div className="flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)]">
      <div className="tactical-panel flex items-center justify-center p-8">
        <span className="font-mono text-[var(--theme-primary)]">ANALYSIS CORE READY</span>
      </div>
    </div>
  );
}
