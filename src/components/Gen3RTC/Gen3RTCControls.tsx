import type React from 'react';
import { useState } from 'react';
import { useGen3RTC } from '../../contexts/Gen3RTCContext';
import { TacticalButton } from '../TacticalButton';

export const Gen3RTCControls: React.FC = () => {
  const { state, setOverride } = useGen3RTC();
  const [inputTime, setInputTime] = useState<string>('');

  const handleOverride = () => {
    if (!inputTime) return;
    const [hours, minutes] = inputTime.split(':').map(Number);
    if (hours === undefined || minutes === undefined) return;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    setOverride(date);
  };

  const handleReset = () => {
    setInputTime('');
    setOverride(null);
  };

  return (
    <div className="flex flex-col gap-4 rounded-none border border-[var(--theme-border)] border-dashed bg-[var(--theme-surface)] p-4 font-mono text-zinc-100">
      <h3 className="font-black text-sm uppercase tracking-widest">RTC Controls</h3>

      <div className="flex items-center gap-2 text-sm">
        <span>Current Time:</span>
        <span className="font-bold text-[var(--theme-primary)]">{state.time.toLocaleTimeString()}</span>
        {state.isOverridden && <span className="text-xs text-yellow-500">(OVERRIDDEN)</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rtc-time-input" className="text-xs text-zinc-400 uppercase tracking-widest">
          Manual Override (HH:MM)
        </label>
        <div className="flex gap-2">
          <input
            id="rtc-time-input"
            type="time"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className="flex-1 rounded-none border border-white/20 border-dashed bg-zinc-900/50 p-2 font-mono text-sm text-white outline-none transition-all focus:border-[var(--theme-primary)]"
            data-testid="rtc-time-input"
          />
          <TacticalButton
            type="button"
            onClick={handleOverride}
            disabled={!inputTime}
            variant="primary"
            className="uppercase tracking-widest"
          >
            Apply
          </TacticalButton>
          <TacticalButton
            type="button"
            onClick={handleReset}
            disabled={!state.isOverridden}
            variant="secondary"
            className="uppercase tracking-widest"
          >
            Reset
          </TacticalButton>
        </div>
      </div>
    </div>
  );
};
