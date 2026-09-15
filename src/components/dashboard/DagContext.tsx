import { type Edge, type Node, Position } from '@xyflow/react';
import dagre from 'dagre';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { MAX_REJECTION_THRESHOLD } from '../../utils/constants';
import type { ParsedNode } from '../../utils/dag/builder';
import { buildDagGraph } from '../../utils/dag/builder';

// REMINDER TO CODER AND QA:
// If you abort or permanently fail a task, you MUST update the YAML frontmatter to status: FAILED or status: CANCELLED with a rejection_reason.
// If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

export interface DagNodeData extends Record<string, unknown> {
  id: string;
  type: string;
  title?: string;
  status: string;
  owner_persona: string;
  depends_on: string[];
  rejection_count: number;
  experiment_variants?: string[] | undefined;
  label?: string;
  isHighlighted?: boolean;
  isDimmed?: boolean;
}

export type DagNode = Node<DagNodeData>;
export type DagEdge = Edge;

export type ViewMode = 'graph' | 'board';

export interface DagContextState {
  nodes: DagNode[];
  maxRejectionThreshold: number;
  edges: DagEdge[];
  isLoading: boolean;
  isPending: boolean;
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  setNodes: (nodes: DagNode[]) => void;
  setEdges: (edges: DagEdge[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const DagContext = createContext<DagContextState | null>(null);

export function useDagContext() {
  const context = useContext(DagContext);
  if (!context) {
    throw new Error('useDagContext must be used within a DagProvider');
  }
  return context;
}

export function usePermanentlyFailedNodes() {
  const { nodes, maxRejectionThreshold } = useDagContext();
  return useMemo(
    () => nodes.filter((node) => node.data.status === 'FAILED' && node.data.rejection_count >= maxRejectionThreshold),
    [nodes, maxRejectionThreshold],
  );
}

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 300;
const nodeHeight = 100;

// Uses Dagre to automatically layout the graph top-to-bottom
function getLayoutedElements(nodes: DagNode[], edges: DagEdge[], direction = 'TB') {
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

export function DagProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<DagNode[]>([]);
  const [edges, setEdges] = useState<DagEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewMode>('graph');
  const [isPending, startTransition] = useTransition();

  const handleSetActiveView = useCallback((view: ViewMode) => {
    startTransition(() => setActiveView(view));
  }, []);

  const handleSetNodes = useCallback((newNodes: DagNode[]) => {
    startTransition(() => setNodes(newNodes));
  }, []);

  const handleSetEdges = useCallback((newEdges: DagEdge[]) => {
    startTransition(() => setEdges(newEdges));
  }, []);

  const value = useMemo(
    () => ({
      maxRejectionThreshold: MAX_REJECTION_THRESHOLD,
      nodes,
      edges,
      isLoading,
      isPending,
      activeView,
      setActiveView: handleSetActiveView,
      setNodes: handleSetNodes,
      setEdges: handleSetEdges,
      setIsLoading,
    }),
    [nodes, edges, isLoading, activeView, isPending, handleSetNodes, handleSetEdges, handleSetActiveView],
  );

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
        const initialNodes: DagNode[] = dagGraph.nodes.map((node) => ({
          id: node.id,
          type: 'custom',
          data: {
            ...node.data,
            label: node.id,
            id: node.id,
            rejection_count: node.data.rejection_count ?? 0,
            depends_on:
              typeof node.data.depends_on === 'object' && Array.isArray(node.data.depends_on)
                ? node.data.depends_on
                : [],
            experiment_variants: node.data.experiment_variants,
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

  return <DagContext value={value}>{children}</DagContext>;
}
