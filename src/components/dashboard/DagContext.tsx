import { createContext, type ReactNode, useContext, useEffect, useMemo, useState, useTransition } from 'react';
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

export type DagNode = { id: string; data: DagNodeData };
export type DagEdge = { id: string; source: string; target: string };

export type ViewMode = 'graph' | 'board';

export interface DagContextState {
  nodes: DagNode[];
  maxRejectionThreshold: number;
  edges: DagEdge[];
  isLoading: boolean;
  isPending: boolean;
  activeView: ViewMode;
  setActiveView: (view: React.SetStateAction<ViewMode>) => void;
  showHeatmap: boolean;
  setShowHeatmap: (show: React.SetStateAction<boolean>) => void;
  setNodes: (nodes: React.SetStateAction<DagNode[]>) => void;
  setEdges: (edges: React.SetStateAction<DagEdge[]>) => void;
  setIsLoading: (isLoading: React.SetStateAction<boolean>) => void;
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
    () =>
      nodes.filter(
        (node) =>
          (node.data.status === 'FAILED' || node.data.status === 'CANCELLED') &&
          node.data.rejection_count >= maxRejectionThreshold,
      ),
    [nodes, maxRejectionThreshold],
  );
}

export function DagProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<DagNode[]>([]);
  const [edges, setEdges] = useState<DagEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [activeView, setActiveView] = useState<ViewMode>('graph');
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      maxRejectionThreshold: MAX_REJECTION_THRESHOLD,
      nodes,
      edges,
      isLoading,
      isPending,
      activeView,
      setActiveView: (view: React.SetStateAction<ViewMode>) => startTransition(() => setActiveView(view)),
      showHeatmap,
      setShowHeatmap: (show: React.SetStateAction<boolean>) => startTransition(() => setShowHeatmap(show)),
      setNodes: (newNodes: React.SetStateAction<DagNode[]>) => startTransition(() => setNodes(newNodes)),
      setEdges: (newEdges: React.SetStateAction<DagEdge[]>) => startTransition(() => setEdges(newEdges)),
      setIsLoading,
    }),
    [nodes, edges, isLoading, isPending, activeView, showHeatmap],
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
        }));

        const initialEdges = dagGraph.edges.map((edge) => ({
          id: `e-${edge.source}-${edge.target}`,
          source: edge.source,
          target: edge.target,
        }));

        setNodes(initialNodes);
        setEdges(initialEdges);
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
