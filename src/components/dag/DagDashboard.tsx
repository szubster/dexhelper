import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Edge as FlowEdge, Node as FlowNode } from '@xyflow/react';
import { useCallback, useMemo, useState } from 'react';

import { getHighlightPath } from '../../utils/dag/highlighting';
import { useDagContext } from '../dashboard/DagContext';
import { DagFilterPanel } from './DagFilterPanel';
import { DagNode, type DagNodeData } from './DagNode';

export function getMiniMapNodeColor(node: FlowNode<DagNodeData>, maxRejectionThreshold: number): string {
  if (node.data?.status === 'FAILED' && (node.data?.rejection_count ?? 0) >= maxRejectionThreshold) {
    return '#dc2626'; // red-600
  }

  switch (node.data?.status) {
    case 'COMPLETED':
      return '#10b981'; // emerald-500
    case 'ACTIVE':
    case 'IN_PROGRESS':
      return '#ef4444'; // var(--theme-primary) roughly
    case 'FAILED':
    case 'BLOCKED':
      return '#ef4444'; // red-500
    case 'READY':
      return '#f59e0b'; // amber-500
    default:
      return '#52525b'; // zinc-600
  }
}

const nodeTypes = {
  custom: DagNode,
};

export function DagDashboard() {
  const { nodes, edges, isLoading, maxRejectionThreshold } = useDagContext();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set(['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK']));
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(
    new Set(['PENDING', 'READY', 'ACTIVE', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED']),
  );

  // Get URL search parameters to check for permanent_failures_only
  const [showPermanentFailures, setShowPermanentFailures] = useState(
    new URLSearchParams(window.location.search).has('permanent_failures_only'),
  );

  const handleTypeToggle = (type: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const handleStatusToggle = (status: string) => {
    setActiveStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) {
        next.delete(status);
      } else {
        next.add(status);
      }
      return next;
    });
  };

  const activeNodeId = hoveredNodeId || selectedNodeId;
  const highlightSet = useMemo(() => getHighlightPath(activeNodeId, edges), [activeNodeId, edges]);

  const displayNodes = useMemo(() => {
    // ⚡ Bolt: Fused .filter().map() into a single pass to eliminate intermediate array allocations (O(N) -> O(1) memory overhead)
    const result: FlowNode<DagNodeData>[] = [];
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n) {
        const type = n.data.type;
        const status = n.data.status;
        let shouldInclude = type && status && activeTypes.has(type) && activeStatuses.has(status);

        if (shouldInclude && showPermanentFailures) {
          shouldInclude = n.data.status === 'FAILED' && n.data.rejection_count >= maxRejectionThreshold;
        }

        if (shouldInclude) {
          const isHighlighted = activeNodeId ? highlightSet.has(n.id) : false;
          const isDimmed = activeNodeId ? !highlightSet.has(n.id) : false;
          result.push({
            ...n,
            data: {
              ...n.data,
              isHighlighted,
              isDimmed,
            },
          });
        }
      }
    }
    return result;
  }, [nodes, activeTypes, activeStatuses, activeNodeId, highlightSet, showPermanentFailures, maxRejectionThreshold]);

  const displayEdges = useMemo(() => {
    // ⚡ Bolt: Prevent array allocation in Set construction
    const visibleNodeIds = new Set<string>();
    for (let i = 0; i < displayNodes.length; i++) {
      const node = displayNodes[i];
      if (node) visibleNodeIds.add(node.id);
    }

    // ⚡ Bolt: Fused .filter().map() into a single pass to eliminate intermediate array allocations
    const result: FlowEdge[] = [];
    for (let i = 0; i < edges.length; i++) {
      const e = edges[i];
      if (e && visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)) {
        const isHighlighted = activeNodeId ? e.source === activeNodeId || e.target === activeNodeId : false;
        const isDimmed = activeNodeId ? !isHighlighted : false;

        result.push({
          ...e,
          style: {
            ...e.style,
            opacity: isDimmed ? 0.2 : 1,
            stroke: isHighlighted ? '#06b6d4' : (e.style?.stroke ?? '#52525b'), // cyan-500 if highlighted
            strokeWidth: isHighlighted ? 3 : 2,
          },
        });
      }
    }
    return result;
  }, [edges, displayNodes, activeNodeId]);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: FlowNode<DagNodeData>) => {
    setSelectedNodeId((prev) => (prev === node.id ? null : node.id));
  }, []);

  const onNodeMouseEnter = useCallback((_event: React.MouseEvent, node: FlowNode<DagNodeData>) => {
    setHoveredNodeId(node.id);
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  if (isLoading) {
    return (
      <div
        className="flex h-full w-full items-center justify-center font-mono text-zinc-500"
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="status"
        aria-live="polite"
      >
        <span aria-hidden="true">[ SYSTEM.LOADING_DAG ]</span> <span className="sr-only">Loading DAG...</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full border border-zinc-800 border-dashed bg-zinc-950">
      <DagFilterPanel
        activeTypes={activeTypes}
        activeStatuses={activeStatuses}
        showPermanentFailures={showPermanentFailures}
        onTypeToggle={handleTypeToggle}
        onStatusToggle={handleStatusToggle}
        onTogglePermanentFailures={() => setShowPermanentFailures((prev) => !prev)}
      />
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onPaneClick={onPaneClick}
        fitView
        className="tactical-flow"
        minZoom={0.1}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#3f3f46" // zinc-700
        />
        <Controls className="!bg-zinc-900 !border !border-dashed !border-zinc-800 !rounded-none [&>button]:!border-b [&>button]:!border-zinc-800 [&>button]:!bg-transparent [&>button]:!text-zinc-400 hover:[&>button]:!bg-[var(--theme-primary)]/20 hover:[&>button]:!text-[var(--theme-primary)]" />
        <MiniMap
          className="!bg-zinc-900 !border !border-dashed !border-zinc-800 !rounded-none"
          maskColor="rgba(0, 0, 0, 0.7)"
          nodeColor={(node) => getMiniMapNodeColor(node as FlowNode<DagNodeData>, maxRejectionThreshold)}
        />
      </ReactFlow>
    </div>
  );
}
