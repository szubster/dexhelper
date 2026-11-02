import type { DAGNode, DAGEdge } from '../dag-utils';

/**
 * Detects cycles in a directed graph using Depth First Search (DFS).
 * Returns the exact path of the cycle (array of node IDs) if a cycle is found,
 * otherwise returns null. Time complexity: O(V + E).
 */
export function detectCycle(nodes: DAGNode[], edges: DAGEdge[]): string[] | null {
  // Build adjacency list
  const adjList = new Map<string, string[]>();

  // Initialize adjacency list for all known nodes
  for (const node of nodes) {
    if (!adjList.has(node.id)) {
      adjList.set(node.id, []);
    }
  }

  // Populate edges, gracefully handling missing nodes
  for (const edge of edges) {
    if (!adjList.has(edge.source)) {
      adjList.set(edge.source, []);
    }
    // Only care about the target if it actually exists as a known edge relationship
    adjList.get(edge.source)!.push(edge.target);
  }

  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const path: string[] = [];

  for (const startNode of adjList.keys()) {
    if (!visited.has(startNode)) {
      const cyclePath = dfs(startNode, adjList, visited, recursionStack, path);
      if (cyclePath) {
        return cyclePath;
      }
    }
  }

  return null;
}

function dfs(
  nodeId: string,
  adjList: Map<string, string[]>,
  visited: Set<string>,
  recursionStack: Set<string>,
  path: string[]
): string[] | null {
  visited.add(nodeId);
  recursionStack.add(nodeId);
  path.push(nodeId);

  const neighbors = adjList.get(nodeId) || [];

  for (const neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      const cyclePath = dfs(neighbor, adjList, visited, recursionStack, path);
      if (cyclePath) return cyclePath;
    } else if (recursionStack.has(neighbor)) {
      // Cycle detected!
      const cycleStartIndex = path.indexOf(neighbor);
      // Return the cyclic portion of the path, plus the neighbor again to close it
      return [...path.slice(cycleStartIndex), neighbor];
    }
  }

  recursionStack.delete(nodeId);
  path.pop();

  return null;
}
