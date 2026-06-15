import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type Edge as FlowEdge, type Node as FlowNode, Position } from '@xyflow/react';
import dagre from 'dagre';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ParsedNode } from '../../utils/dag/builder';
import { buildDagGraph } from '../../utils/dag/builder';
import { getHighlightPath } from '../../utils/dag/highlighting';
import { DagFilterPanel } from './DagFilterPanel';
import { DagNode, type DagNodeData } from './DagNode';

export function getMiniMapNodeColor(node: FlowNode<DagNodeData>): string {
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

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 100;

// Uses Dagre to automatically layout the graph top-to-bottom
function getLayoutedElements(nodes: FlowNode<DagNodeData>[], edges: FlowEdge[], direction = 'TB') {
  dagreGraph.setGraph({ rankdir: direction, ranksep: 150, nodesep: 150 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
    return newNode;
  });

  return { nodes: newNodes, edges };
}

export function DagDashboard() {
  const [nodes, setNodes] = useState<FlowNode<DagNodeData>[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set(['IDEA', 'PRD', 'EPIC', 'STORY', 'TASK']));
  const [activeStatuses, setActiveStatuses] = useState<Set<string>>(
    new Set(['PENDING', 'READY', 'ACTIVE', 'COMPLETED', 'FAILED', 'BLOCKED', 'CANCELLED']),
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

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/foundry.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch DAG data');
        }
        const parsedNodes: ParsedNode[] = await response.json();
        const dagGraph = buildDagGraph(parsedNodes);

        // Convert the DAG build output to React Flow format
        const initialNodes: FlowNode<DagNodeData>[] = dagGraph.nodes.map((node) => ({
          id: node.id,
          type: 'custom',
          data: {
            ...node.data,
            label: node.id,
          },
          position: { x: 0, y: 0 }, // Initial position, layout will overwrite
        }));

        const initialEdges = dagGraph.edges.map((edge) => ({
          id: `e-${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
          animated: true,
          style: { stroke: '#52525b', strokeWidth: 2, strokeDasharray: '4 4' }, // Zinc-600 dashed
        }));

        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
      } catch {
        console.error('System: DAG loading failed');
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, []);

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
        if (type && status && activeTypes.has(type) && activeStatuses.has(status)) {
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
  }, [nodes, activeTypes, activeStatuses, activeNodeId, highlightSet]);

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
        onTypeToggle={handleTypeToggle}
        onStatusToggle={handleStatusToggle}
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
          nodeColor={getMiniMapNodeColor}
        />
      </ReactFlow>
    </div>
  );
}
