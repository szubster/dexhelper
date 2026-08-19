import React from 'react';
import type { ContestRecommendation } from '@dexhelper/engine/gen3/contests/recommendation';
import { cn } from '../utils/cn';
import { HoverScanner } from './HoverScanner';
import { LcdGrid } from './LcdGrid';
import { TacticalPanel } from './TacticalPanel';
import { TelemetryDecoration } from './TelemetryDecoration';

export interface ContestRecommendationPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  recommendations: ContestRecommendation[];
  sheen?: number;
}

function getReasoningCopy(score: number): string {
  if (score >= 400) {
    return 'OPTIMAL TRAJECTORY DETECTED. SYNERGISTIC NATURE/BASE STATS ALIGNED WITH REMAINING POTENTIAL.';
  }
  if (score >= 200) {
    return 'VIABLE PATHWAY. FAVORABLE METRICS DETECTED. SUFFICIENT POTENTIAL FOR COMPETITIVE THRESHOLDS.';
  }
  return 'SUB-OPTIMAL ALLOCATION. PROCEED WITH CAUTION. MARGINAL VIABILITY GIVEN CURRENT STATS.';
}

export const ContestRecommendationPanel = React.forwardRef<HTMLDivElement, ContestRecommendationPanelProps>(
  ({ recommendations, sheen, className, ...props }, ref) => {
    const topScore = recommendations?.length > 0 && recommendations[0] ? recommendations[0].score : 0;
    const isDeadEnd = sheen !== undefined && sheen >= 255 && topScore < 200;

    return (
      <TacticalPanel
        ref={ref}
        variant="default"
        className={cn('relative flex flex-col gap-4 p-6 pt-8', className)}
        {...props}
      >
        <TelemetryDecoration label="SYS.STRATEGY_MATRIX" className="-top-1 left-4" />

        {isDeadEnd && (
          <div className="relative mb-2 flex flex-col gap-2 rounded-none border border-amber-500/50 border-dashed bg-amber-500/10 p-4">
            <LcdGrid />
            <HoverScanner />
            <div className="relative z-10 flex items-center gap-2 border-amber-500/30 border-b border-dashed pb-2">
              <span className="font-bold font-mono text-amber-500 text-sm uppercase tracking-widest drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]">
                [ WARNING: OPTIMIZATION_DEAD_END ]
              </span>
            </div>
            <div className="relative z-10 font-mono text-[10px] text-amber-400/90 uppercase leading-relaxed">
              MAXIMUM SHEEN (255) DETECTED. INSUFFICIENT METRICS FOR MASTER RANK. FURTHER ENHANCEMENT VIA POKÉBLOCKS IS
              IMPOSSIBLE.
            </div>
          </div>
        )}

        {recommendations.length === 0 ? (
          <div className="relative flex h-16 items-center justify-center overflow-hidden rounded-none border border-zinc-800 border-dashed bg-black/40">
            <LcdGrid />
            <HoverScanner />
            <span className="relative z-10 font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
              [ NO_ACTIONABLE_INTELLIGENCE ]
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {recommendations.slice(0, 2).map((rec, idx) => (
              <div
                key={rec.category}
                className="group relative flex flex-col overflow-hidden rounded-none border border-zinc-800 border-dashed bg-black/40 p-4"
              >
                <LcdGrid />
                <HoverScanner />

                {/* Tactical Data Pipe */}
                <div className="absolute top-0 bottom-0 left-0 w-[3px] border-zinc-800 border-r border-dashed bg-zinc-950/80 transition-colors duration-500 group-hover:border-[var(--theme-primary)]/50" />
                <div className="absolute top-4 left-[-1px] h-2 w-[4px] bg-[var(--theme-primary)]/30 transition-all duration-300 group-hover:bg-[var(--theme-primary)] group-hover:shadow-[0_0_8px_var(--theme-primary)]" />

                <div className="relative z-10 pl-3">
                  <div className="mb-3 flex items-center justify-between border-zinc-800/50 border-b border-dashed pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black font-mono text-[9px] text-zinc-500">
                        {idx === 0 ? '[ PRIME_DIR ]' : '[ ALT_DIR ]'}
                      </span>
                      <span className="font-bold font-mono text-[var(--theme-primary)] text-sm uppercase tracking-widest drop-shadow-[0_0_4px_rgba(var(--theme-primary-rgb),0.5)]">
                        {rec.category}
                      </span>
                    </div>
                    <div className="border border-zinc-800 border-dashed bg-zinc-950 px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                      CONF:{Math.round(rec.score)}%
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 uppercase leading-relaxed">
                    {getReasoningCopy(rec.score)}
                  </div>
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
