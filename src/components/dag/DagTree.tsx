import { TacticalButton } from '@dexhelper/ui';
import { useMemo } from 'react';
import { useDagContext } from '../dashboard/DagContext';
import { useDagTreeContext } from './DagTreeContext';
import { DagTreeItem } from './DagTreeItem';

export function DagTree() {
  const { nodes, edges, maxRejectionThreshold, showHeatmap, activeTypes, activeStatuses, showPermanentFailures } =
    useDagContext();
  const { expandAll, collapseAll } = useDagTreeContext();

  const filteredNodes = useMemo(() => {
    return nodes.filter((node) => {
      const type = node.data.type;
      const status = node.data.status;

      let shouldInclude = type && status && activeTypes.has(type) && activeStatuses.has(status);

      if (shouldInclude && showPermanentFailures) {
        shouldInclude =
          (node.data.status === 'FAILED' || node.data.status === 'CANCELLED') &&
          node.data.rejection_count >= maxRejectionThreshold;
      }

      return shouldInclude;
    });
  }, [nodes, activeTypes, activeStatuses, showPermanentFailures, maxRejectionThreshold]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  // Find root nodes (nodes with no incoming edges)
  const rootNodes = useMemo(() => {
    const hasIncomingEdge = new Set(edges.map((e) => e.target));
    return filteredNodes.filter((n) => !hasIncomingEdge.has(n.id));
  }, [filteredNodes, edges]);

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

    const children = (childrenMap.get(nodeId) || []).filter((id) => filteredNodeIds.has(id));
    const isPermanentFailure =
      (node.data.status === 'FAILED' || node.data.status === 'CANCELLED') &&
      node.data.rejection_count >= maxRejectionThreshold;

    return (
      <DagTreeItem
        key={node.id}
        nodeId={node.id}
        label={node.data.title || node.id}
        status={node.data.status}
        persona={node.data.owner_persona as string}
        isPermanentFailure={isPermanentFailure}
        rejectionCount={node.data.rejection_count}
        showHeatmap={showHeatmap}
        maxRejectionThreshold={maxRejectionThreshold}
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
        <TacticalButton size="sm" variant="secondary" onClick={handleExpandAll} title="Expand All Nodes">
          Expand All
        </TacticalButton>
        <TacticalButton size="sm" variant="secondary" onClick={collapseAll} title="Collapse All Nodes">
          Collapse All
        </TacticalButton>
      </div>
      <ul className="m-0 flex flex-col gap-1 p-0">{rootNodes.map((node) => renderNode(node.id))}</ul>
    </div>
  );
}
