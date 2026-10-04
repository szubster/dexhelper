import { useMemo } from 'react';
import { useDagContext } from '../dashboard/DagContext';
import { useDagTreeContext } from './DagTreeContext';
import { DagTreeItem } from './DagTreeItem';

export function DagTree() {
  const { nodes, edges, maxRejectionThreshold } = useDagContext();
  const { expandAll, collapseAll } = useDagTreeContext();

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  // Find root nodes (nodes with no incoming edges)
  const rootNodes = useMemo(() => {
    const hasIncomingEdge = new Set(edges.map((e) => e.target));
    return nodes.filter((n) => !hasIncomingEdge.has(n.id));
  }, [nodes, edges]);

  // Build a map of children for each node
  const childrenMap = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const edge of edges) {
      if (!map.has(edge.source)) {
        map.set(edge.source, []);
      }
      map.get(edge.source)?.push(edge.target);
    }
    return map;
  }, [edges]);

  const renderNode = (nodeId: string) => {
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    const children = childrenMap.get(nodeId) || [];
    const isPermanentFailure =
      (node.data.status === 'FAILED' || node.data.status === 'CANCELLED') &&
      node.data.rejection_count >= maxRejectionThreshold;

    return (
      <DagTreeItem
        key={node.id}
        nodeId={node.id}
        label={node.data.title || node.id}
        status={node.data.status}
        isPermanentFailure={isPermanentFailure}
      >
        {children.map(renderNode)}
      </DagTreeItem>
    );
  };

  const handleExpandAll = () => {
    const nodesWithChildren = nodes
      .filter((n) => childrenMap.has(n.id) && (childrenMap.get(n.id)?.length ?? 0) > 0)
      .map((n) => n.id);
    expandAll(nodesWithChildren);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleExpandAll}
          className="rounded-none border border-zinc-700 border-dashed bg-zinc-900 px-3 py-1 font-mono text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Expand All
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="rounded-none border border-zinc-700 border-dashed bg-zinc-900 px-3 py-1 font-mono text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Collapse All
        </button>
      </div>
      <ul className="m-0 flex flex-col gap-1 p-0">{rootNodes.map((node) => renderNode(node.id))}</ul>
    </div>
  );
}
