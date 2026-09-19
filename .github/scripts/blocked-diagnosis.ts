export interface BlockedNode {
  nodeId: string;
  reason: 'circular_dependency' | 'unresolvable_path' | 'explicit_hold';
  details: string;
}

export interface BlockedDiagnosis {
  timestamp: string;
  blockedNodes: BlockedNode[];
  cycles?: string[][];
  missingPaths?: string[];
}

export function formatBlockedDiagnosis(diagnosis: BlockedDiagnosis): string {
  return JSON.stringify(diagnosis, null, 2);
}
