import type React from 'react';
import { useState } from 'react';
import { useGen3RTC } from '../../contexts/Gen3RTCContext';
import { useTimeOverride } from '../../contexts/TimeOverrideContext';
import { TacticalButton } from '../TacticalButton';
import { TacticalSelect } from '../TacticalSelect';

const DISPLAY_DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const JS_DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const Gen3RTCControls: React.FC = () => {
  const { state: rtcState } = useGen3RTC();
  const { state, setOverrideTime, setOverrideDay, resetOverride } = useTimeOverride();
  const [inputTime, setInputTime] = useState<string>('');

  const handleOverride = () => {
    if (!inputTime) return;
    const [hours, minutes] = inputTime.split(':').map(Number);
    if (hours === undefined || minutes === undefined) return;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    setOverrideTime(date);
  };

  const handleDayOverride = (day: string) => {
    setOverrideDay(day);
  };

  const handleReset = () => {
    setInputTime('');
    resetOverride();
  };

  const displayTime = state.overrideTime || rtcState.time;
  const displayDay = state.overrideDay || JS_DAYS_OF_WEEK[displayTime.getDay()];

  return (
    <div className="flex flex-col gap-4 rounded-none border border-[var(--theme-border)] border-dashed bg-[var(--theme-surface)] p-4 font-mono text-zinc-100">
      <h3 className="font-black text-sm uppercase tracking-widest">RTC Controls</h3>

      <div className="flex items-center gap-2 text-sm">
        <span>Current Time:</span>
        <span className="font-bold text-[var(--theme-primary)]">
          {displayDay} {displayTime.toLocaleTimeString()}
        </span>
        {state.isOverridden && <span className="text-xs text-yellow-500">(OVERRIDDEN)</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rtc-time-input" className="text-xs text-zinc-400 uppercase tracking-widest">
          Manual Time Override (HH:MM)
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
            Apply Time
          </TacticalButton>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="rtc-day-input" className="text-xs text-zinc-400 uppercase tracking-widest">
          Manual Day Override
        </label>
        <div className="flex gap-2">
          <TacticalSelect
            value={state.overrideDay || ''}
            onChange={(e) => handleDayOverride(e.target.value)}
            className="flex-1"
            data-testid="rtc-day-input"
          >
            <option value="">Select Day</option>
            {DISPLAY_DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </TacticalSelect>
          <TacticalButton
            type="button"
            onClick={handleReset}
            disabled={!state.isOverridden}
            variant="secondary"
            className="uppercase tracking-widest"
          >
            Reset All
          </TacticalButton>
        </div>
      </div>
    </div>
  );
};
