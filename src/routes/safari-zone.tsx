import { createFileRoute } from '@tanstack/react-router';
import { Compass, ShieldAlert } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { SafariZoneLayout } from '../components/safari-zone/SafariZoneLayout';
import { TacticalPanel } from '../components/TacticalPanel';
import { useStore } from '../store';

export const Route = createFileRoute('/safari-zone')({
  component: SafariZonePage,
});

function SafariZonePage() {
  const saveData = useStore((s) => s.saveData);

  if (!saveData) {
    return (
      <EmptyState
        icon={<ShieldAlert size={24} />}
        label="SAFARI ZONE TELEMETRY OFFLINE"
        description="NO ACTIVE SAVE DATA DETECTED. PLEASE LOAD A SAVE FILE VIA [ UPLOAD.SYS ] TO ACCESS FIELD TRACKING."
      />
    );
  }

  return (
    <div className="flex h-full flex-col pt-4 pb-[env(safe-area-inset-bottom,20px)]">
      <SafariZoneLayout
        sidePanel={
          <TacticalPanel className="flex h-full flex-col gap-4 p-4">
            <div className="flex items-center gap-2 border-zinc-800 border-b border-dashed pb-2">
              <Compass size={16} className="text-[var(--theme-primary)]" />
              <span className="font-bold font-mono text-white text-xs uppercase tracking-wider">SECTOR TELEMETRY</span>
            </div>
            <div className="flex-1 font-mono text-xs text-zinc-500 uppercase leading-relaxed">
              [ SECTOR STATUS: MONITORED ]<br />[ WILD ENCOUNTER RATES: NOMINAL ]
            </div>
          </TacticalPanel>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-zinc-800 border-b border-dashed pb-3">
            <div className="flex items-center gap-3">
              <span className="border border-[var(--theme-primary)]/30 border-dashed bg-[var(--theme-primary)]/10 px-1.5 font-mono text-[9px] text-[var(--theme-primary)] uppercase tracking-[0.2em]">
                SYS.SAFARI
              </span>
              <h1 className="font-black font-mono text-lg text-white uppercase tracking-wider sm:text-xl">
                SAFARI ZONE OPERATIONS CORE
              </h1>
            </div>
          </div>
          <p className="font-mono text-xs text-zinc-400 uppercase leading-relaxed">
            SAFARI ZONE FIELD MONITORING ACTIVE. SELECT A REGION ON THE CONTROL PANEL TO AUDIT WILD SPECIES ENCOUNTERS.
          </p>
        </div>
      </SafariZoneLayout>
    </div>
  );
}
