import type { Edge as FlowEdge } from '@xyflow/react';

/**
 * Calculates the set of node IDs to highlight based on a selected node ID.
 * Returns a Set containing the target node ID, its direct upstream node IDs,
 * and its direct downstream node IDs.
 */
export function getHighlightPath(selectedNodeId: string | null, edges: FlowEdge[]): Set<string> {
  if (!selectedNodeId) {
    return new Set();
  }

  const highlightSet = new Set<string>();
  highlightSet.add(selectedNodeId);

  // Traverse all edges to find incoming and outgoing connections
  for (const edge of edges) {
    if (edge.source === selectedNodeId) {
      // Outgoing edge: target is downstream
      highlightSet.add(edge.target);
    } else if (edge.target === selectedNodeId) {
      // Incoming edge: source is upstream
      highlightSet.add(edge.source);
    }
  }

  return highlightSet;
}
