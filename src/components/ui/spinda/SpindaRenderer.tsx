import type React from 'react';
import type { SpindaRendererProps } from './types';

/**
 * SpindaRenderer overlays the 4 randomly generated spots on top of a base Spinda sprite.
 *
 * It uses absolute positioning for the spots, relative to the container which houses the base sprite.
 */
export const SpindaRenderer: React.FC<SpindaRendererProps> = ({
  spots,
  className = '',
  size = 64, // Default gen3 sprite size is 64x64
  spotOpacity = 1.0,
}) => {
  return (
    <div
      className={`tactical-panel relative inline-block p-2 ${className}`}
      style={{ width: size + 16, height: size + 16 }} // +16 for tactical-panel padding
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Base Sprite */}
        <div
          className="absolute inset-0 bg-zinc-800"
          style={{
            // In a real app, this would be an `img` or background-image of the Spinda base sprite
            // For now, using a placeholder box that represents the 64x64 canvas
            maskImage: 'url(/assets/sprites/spinda-base.png)',
            WebkitMaskImage: 'url(/assets/sprites/spinda-base.png)',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
          }}
        />

        {/* Top Left Spot */}
        <div
          className="absolute rounded-full bg-red-700/80"
          style={{
            left: spots.topLeft.x,
            top: spots.topLeft.y,
            width: 14,
            height: 14,
            opacity: spotOpacity,
          }}
        />

        {/* Top Right Spot */}
        <div
          className="absolute rounded-full bg-red-700/80"
          style={{
            left: spots.topRight.x,
            top: spots.topRight.y,
            width: 14,
            height: 14,
            opacity: spotOpacity,
          }}
        />

        {/* Bottom Left Spot */}
        <div
          className="absolute rounded-full bg-red-700/80"
          style={{
            left: spots.bottomLeft.x,
            top: spots.bottomLeft.y,
            width: 14,
            height: 14,
            opacity: spotOpacity,
          }}
        />

        {/* Bottom Right Spot */}
        <div
          className="absolute rounded-full bg-red-700/80"
          style={{
            left: spots.bottomRight.x,
            top: spots.bottomRight.y,
            width: 14,
            height: 14,
            opacity: spotOpacity,
          }}
        />
      </div>

      {/* Tactical metadata overlay */}
      <div className="absolute right-1 bottom-1 font-mono text-[8px] text-zinc-500 opacity-50">SPINDA-ID</div>
    </div>
  );
};
