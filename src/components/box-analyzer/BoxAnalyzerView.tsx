import { Network } from 'lucide-react';
import { useStore } from '../../store';
import { TacticalBlockHeader } from '../TacticalBlockHeader';
import { TacticalPanel } from '../TacticalPanel';

export function BoxAnalyzerView() {
  const saveData = useStore((s) => s.saveData);

  return (
    <div className="flex h-full flex-col gap-6 pt-4 pb-[env(safe-area-inset-bottom,16px)]">
      <TacticalPanel className="p-4" variant="cyan">
        <TacticalBlockHeader
          title="Box Analyzer"
          trackingLabel="SYS.ANALYSIS.CORE"
          icon={<Network size={14} />}
          variant="primary"
        />
        <div className="mt-4">
          <span className="font-mono text-[var(--theme-primary)] uppercase">
            {saveData ? 'ANALYSIS CORE READY' : 'AWAITING DATA SYNC'}
          </span>
        </div>
      </TacticalPanel>
    </div>
  );
}
