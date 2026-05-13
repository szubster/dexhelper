import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type Edge as FlowEdge, type Node as FlowNode, Position } from '@xyflow/react';
import dagre from 'dagre';
import { useEffect, useState } from 'react';
import type { ParsedNode } from '../../utils/dag/builder';
import { buildDagGraph } from '../../utils/dag/builder';
import { DagNode } from './DagNode';

const nodeTypes = {
  custom: DagNode,
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 100;

// Uses Dagre to automatically layout the graph top-to-bottom
function getLayoutedElements(nodes: FlowNode[], edges: FlowEdge[], direction = 'TB') {
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
  const [nodes, setNodes] = useState<FlowNode[]>([]);
  const [edges, setEdges] = useState<FlowEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const initialNodes = dagGraph.nodes.map((node) => ({
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
      } catch (error) {
        console.error('Error loading DAG data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center font-mono text-zinc-500">
        [ SYSTEM.LOADING_DAG ]
      </div>
    );
  }

  return (
    <div className="h-full w-full border border-zinc-800 border-dashed bg-zinc-950">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView className="tactical-flow" minZoom={0.1}>
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
          nodeColor={(node: FlowNode) => {
            // biome-ignore lint/complexity/useLiteralKeys: TSConfig requires bracket notation
            switch (node.data?.['status']) {
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
          }}
        />
      </ReactFlow>
    </div>
  );
}
