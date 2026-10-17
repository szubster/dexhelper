import type { SpindaSpotCoordinate } from '../../../engine/saveParser/parsers/common';

export type { SpindaSpotCoordinate };

export interface SpindaSpots {
  topLeft: SpindaSpotCoordinate;
  topRight: SpindaSpotCoordinate;
  bottomLeft: SpindaSpotCoordinate;
  bottomRight: SpindaSpotCoordinate;
}

export interface SpindaRendererProps {
  /** The 4 calculated spot coordinates */
  spots: SpindaSpots;
  /** Optional class name to apply to the container */
  className?: string;
  /** Optional explicit sizing (otherwise defaults to intrinsic sprite size) */
  size?: number;
  /** Opacity for the spots (default: 1.0) */
  spotOpacity?: number;
}
