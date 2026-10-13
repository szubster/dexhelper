import type { SpindaSpotCoordinate } from '../../engine/saveParser/parsers/common';

export interface SpindaSpotCoordinates {
  topLeft: SpindaSpotCoordinate;
  topRight: SpindaSpotCoordinate;
  bottomLeft: SpindaSpotCoordinate;
  bottomRight: SpindaSpotCoordinate;
}

export interface SpindaRendererProps {
  coordinates: SpindaSpotCoordinates;
  baseSpriteUrl?: string;
  spotSpriteUrl?: string;
  className?: string;
}
