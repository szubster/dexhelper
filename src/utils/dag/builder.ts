import type { FoundryNodeData } from './parser';

export interface ParsedNode {
  filePath: string;
  data: FoundryNodeData;
}

export interface GraphNode {
  id: string;
  data: {
    type: string;
    status: string;
    owner_persona: string;
    rejection_count: number;
    depends_on: string[];
    experiment_variants?: string[] | undefined;
  };
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface DagGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function buildDagGraph(parsedNodes: ParsedNode[]): DagGraph {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const pathToIdMap = new Map<string, string>();

  // First pass: Build nodes and the path-to-ID map
  for (const node of parsedNodes) {
    const id = node.data.id;

    // Some paths in depends_on might not include the leading `./` or might vary slightly.
    // Assuming parsedNodes provides paths consistent with depends_on.
    // If not, path normalization might be needed. We map exactly what's given.
    pathToIdMap.set(node.filePath, id);
    // Also try to map without leading ./ if present, or add if not, to handle variations
    if (node.filePath.startsWith('./')) {
      pathToIdMap.set(node.filePath.slice(2), id);
    } else {
      pathToIdMap.set(`./${node.filePath}`, id);
    }

    // Also map the direct ID to support the DAG ID Strictness rule
    pathToIdMap.set(id, id);

    nodes.push({
      id,
      data: {
        type: node.data.type,
        status: node.data.status,
        owner_persona: node.data.owner_persona,
        rejection_count: node.data.rejection_count,
        depends_on: node.data.depends_on,
        experiment_variants: node.data.experiment_variants,
      },
    });
  }

  // Second pass: Build edges using the path-to-ID map
  for (const node of parsedNodes) {
    const targetId = node.data.id;

    for (const depPath of node.data.depends_on) {
      const sourceId = pathToIdMap.get(depPath);

      if (sourceId) {
        edges.push({
          source: sourceId,
          target: targetId,
        });
      }
      // If a dependency path is not found in the map, we skip creating an edge.
      // This matches the test requirement "ignore edge if dependency path does not exist".
    }
  }

  return {
    nodes,
    edges,
  };
}
