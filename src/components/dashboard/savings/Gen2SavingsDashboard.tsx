import type React from 'react';
import { useStore } from '../../../store';
import { TacticalPanel } from '../../TacticalPanel';
import { TelemetryDecoration } from '../../TelemetryDecoration';

export const Gen2SavingsDashboard: React.FC = () => {
  const saveData = useStore((s) => s.saveData);

  if (saveData?.generation !== 2 || !saveData.gen2MomsSavings) {
    return null;
  }

  const { money, savingActive } = saveData.gen2MomsSavings;

  return (
    <TacticalPanel className="relative mt-6 flex flex-col gap-4 rounded-none border-[var(--theme-primary)]/50 border-t-2 p-4 pt-6">
      <TelemetryDecoration label="SYS.GEN2_SAVINGS" className="-top-[17px] left-[-1px]" />
      <div className="flex items-center justify-between border-[var(--theme-primary)]/30 border-b pb-2">
        <span className="tactical-text font-black text-lg text-white">BANK OF MOM</span>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${savingActive ? 'bg-emerald-500' : 'bg-red-500'}`} />
          <span className="tactical-text text-xs text-zinc-400">
            {savingActive ? 'SAVING ACTIVE' : 'SAVING INACTIVE'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="tactical-text text-xs text-zinc-400">CURRENT BALANCE</span>
        <span className="tactical-text text-2xl text-emerald-400">₽{money.toLocaleString()}</span>
      </div>
    </TacticalPanel>
  );
};
