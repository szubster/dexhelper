import type React from 'react';
import { getHeatmapColorClass, getSeverity, type TelemetryMetric } from '../../../features/node-styling/utils/heatmap';
import type { HeatmapUIOverlayProps } from './types';

export const HeatmapOverlay: React.FC<HeatmapUIOverlayProps> = ({ heatmapData, config = {}, onAreaClick }) => {
  const { opacity = 0.8, showGlow = true, showDensityLabels = false } = config;

  return (
    <div className="pointer-events-none absolute inset-0 grid grid-cols-10 grid-rows-10 gap-1 p-2" style={{ opacity }}>
      {Object.entries(heatmapData).map(([areaIdStr, data]) => {
        const areaId = Number.parseInt(areaIdStr, 10);

        // Define standard thresholds for density
        const metric: TelemetryMetric = {
          value: data.density,
          thresholds: {
            low: 10,
            medium: 40,
            high: 70,
            critical: 90,
          },
        };

        const severity = getSeverity(metric);
        const colorClass = getHeatmapColorClass(severity);

        // Render nothing if density is basically zero
        if (severity === 'none') {
          return null;
        }

        const isGlowActive = showGlow && (severity === 'high' || severity === 'critical');

        const interactiveProps = onAreaClick
          ? {
              onClick: () => onAreaClick(areaId, data.density),
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onAreaClick(areaId, data.density);
                }
              },
              tabIndex: 0,
              role: 'button' as const,
            }
          : {
              role: 'presentation' as const,
            };

        return (
          <div
            key={areaId}
            className={`pointer-events-auto relative flex cursor-crosshair items-center justify-center border border-dashed transition-all duration-300 hover:z-10 hover:scale-105 ${colorClass} ${isGlowActive ? 'animate-pulse shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.6)]' : ''}`}
            {...interactiveProps}
          >
            <div className="scanline-overlay absolute inset-0 opacity-50" />

            {showDensityLabels && (
              <span className="tactical-text z-10 font-black text-[8px] text-white mix-blend-difference">
                {Math.round(data.density)}
              </span>
            )}

            {/* Render utility requirements indicators */}
            <div className="absolute right-[-4px] bottom-[-4px] flex gap-0.5">
              {data.requiresMachBike && (
                <div
                  className="h-1.5 w-1.5 rounded-none border-[0.5px] border-black bg-yellow-400"
                  title="Requires Mach Bike"
                />
              )}
              {data.requiresAcroBike && (
                <div
                  className="h-1.5 w-1.5 rounded-none border-[0.5px] border-black bg-blue-400"
                  title="Requires Acro Bike"
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
