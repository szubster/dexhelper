import type { RouteRadarHeatmap } from '../../../engine/radar/types';

export interface HeatmapOverlayConfig {
  /**
   * The opacity of the heatmap overlay layers (0.0 to 1.0).
   */
  opacity: number;
  /**
   * Whether to show glowing effects on high-density areas.
   */
  showGlow: boolean;
  /**
   * Whether to display numerical values of the density on the map.
   */
  showDensityLabels: boolean;
}

export interface HeatmapColorScheme {
  /**
   * Base color for the lowest density (e.g., 'rgba(0, 255, 0, 0.5)')
   */
  low: string;
  /**
   * Mid-tier color (e.g., 'rgba(255, 255, 0, 0.5)')
   */
  medium: string;
  /**
   * High-tier color for maximum density (e.g., 'rgba(255, 0, 0, 0.8)')
   */
  high: string;
}

export interface HeatmapUIOverlayProps {
  /**
   * The heatmap data mapping area IDs to their computed densities.
   */
  heatmapData: RouteRadarHeatmap;
  /**
   * Configuration options for the overlay's appearance.
   */
  config?: Partial<HeatmapOverlayConfig>;
  /**
   * Color scheme for the density rendering.
   * Defaults to a predefined tactical hardware theme if not provided.
   */
  colorScheme?: HeatmapColorScheme;
  /**
   * Optional callback when an area on the heatmap is clicked.
   */
  onAreaClick?: (areaId: number, density: number) => void;
}
