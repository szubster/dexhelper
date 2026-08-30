import type { SaveData } from '../../engine/saveParser';
import { CornerCrosshairs } from '../CornerCrosshairs';
import { InlineDataPoint } from '../InlineDataPoint';
import { RngTidSidDisplay } from '../RngTidSidDisplay';
import { VerticalDivider } from '../VerticalDivider';

interface TelemetryMatrixProps {
  saveData: SaveData;
  progressPercentage: number;
}

export function TelemetryMatrix({ saveData, progressPercentage }: TelemetryMatrixProps) {
  return (
    <div className="zoom-in-95 fade-in relative flex animate-in items-center bg-zinc-900/50 p-2 duration-500">
      <CornerCrosshairs className="h-1.5 w-1.5 border-zinc-700" />
      <div className="flex flex-col pr-4 pl-2">
        <InlineDataPoint label="TRNR" value={saveData.trainerName || 'UNKNOWN'} />
        <InlineDataPoint
          label="ID"
          value={String(saveData.trainerId).padStart(5, '0')}
          valueClassName="font-bold text-[10px] text-zinc-300"
        />
      </div>

      <VerticalDivider className="h-8" />

      <div className="flex min-w-[100px] flex-col justify-center px-4">
        <InlineDataPoint
          label="L-DEX"
          value={`${Math.floor(progressPercentage)}%`}
          className="mb-1 justify-between"
          valueClassName="text-[9px]"
        />
        <div className="relative h-1 overflow-hidden border border-white/10 bg-black/50">
          <div
            style={{
              width: `${progressPercentage}%`,
            }}
            className="absolute inset-y-0 left-0 bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary)] transition-all duration-1000"
          />
        </div>
      </div>
      {'secretId' in saveData && typeof saveData.secretId === 'number' && (
        <>
          <VerticalDivider className="h-8" />
          <div className="flex h-full items-center justify-center pl-4">
            <RngTidSidDisplay
              tid={saveData.trainerId}
              sid={saveData.secretId}
              className="!p-0 h-full border-none bg-transparent"
            />
          </div>
        </>
      )}
    </div>
  );
}
