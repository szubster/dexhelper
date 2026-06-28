import React from 'react';
import type { ContestRecommendation } from '../engine/gen3/contests/recommendation';
import { cn } from '../utils/cn';
import { TacticalPanel } from './TacticalPanel';
import { TelemetryDecoration } from './TelemetryDecoration';

export interface ContestRecommendationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  recommendations: ContestRecommendation[];
}

function getReasoningCopy(score: number): string {
  if (score >= 400) {
    return 'Optimal condition trajectory detected. High existing base stats and highly favorable nature synergize well with remaining sheen potential.';
  }
  if (score >= 200) {
    return 'Viable condition trajectory. Favorable base stats and sufficient remaining potential to reach competitive sheen limits.';
  }
  return 'Sub-optimal but recommended path. Acceptable condition given current nature and sheen limits.';
}

export const ContestRecommendationPanel = React.forwardRef<HTMLDivElement, ContestRecommendationPanelProps>(
  ({ recommendations, className, ...props }, ref) => {
    return (
      <TacticalPanel
        ref={ref}
        variant="default"
        className={cn('relative flex flex-col gap-4 p-6 pt-8', className)}
        {...props}
      >
        <TelemetryDecoration label="SYS.RECOMMENDATION" className="-top-1 left-4" />

        {recommendations.length === 0 ? (
          <div className="flex h-16 items-center justify-center rounded-none border border-zinc-800 border-dashed bg-black/20">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              NO RECOMMENDATIONS FOUND
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {recommendations.slice(0, 2).map((rec, idx) => (
              <div
                key={rec.category}
                className="flex flex-col gap-2 rounded-none border border-zinc-800 border-dashed bg-zinc-900/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-black font-mono text-[10px] text-zinc-400">
                      [{idx === 0 ? 'PRIMARY' : 'SECONDARY'}]
                    </span>
                    <span className="font-bold font-mono text-sm text-zinc-200 uppercase tracking-widest">
                      {rec.category}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-500">SCORE: {Math.round(rec.score)}</div>
                </div>
                <div className="border-zinc-800 border-t border-dashed pt-2 font-mono text-xs text-zinc-400 leading-relaxed">
                  {getReasoningCopy(rec.score)}
                </div>
              </div>
            ))}
          </div>
        )}
      </TacticalPanel>
    );
  },
);

ContestRecommendationPanel.displayName = 'ContestRecommendationPanel';
