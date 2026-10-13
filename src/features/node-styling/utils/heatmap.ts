export type HeatmapSeverity = 'low' | 'medium' | 'high' | 'critical' | 'none';

export interface TelemetryMetric {
  value: number;
  thresholds: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export function getSeverity(metric: TelemetryMetric): HeatmapSeverity {
  if (metric.value >= metric.thresholds.critical) return 'critical';
  if (metric.value >= metric.thresholds.high) return 'high';
  if (metric.value >= metric.thresholds.medium) return 'medium';
  if (metric.value >= metric.thresholds.low) return 'low';
  return 'none';
}

export function getHeatmapColorClass(severity: HeatmapSeverity): string {
  switch (severity) {
    case 'critical':
      return 'bg-red-900 border-red-500 text-red-100';
    case 'high':
      return 'bg-orange-900 border-orange-500 text-orange-100';
    case 'medium':
      return 'bg-yellow-900 border-yellow-500 text-yellow-100';
    case 'low':
      return 'bg-blue-900 border-blue-500 text-blue-100';
    default:
      return 'bg-slate-900 border-slate-700 text-slate-300';
  }
}
