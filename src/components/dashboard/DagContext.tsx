import type { Edge, Node } from '@xyflow/react';
import { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

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
  label?: string;
  isHighlighted?: boolean;
  isDimmed?: boolean;
}

export type DagNode = Node<DagNodeData>;
export type DagEdge = Edge;

export type ViewMode = 'graph' | 'board';

export interface DagContextState {
  nodes: DagNode[];
  edges: DagEdge[];
  isLoading: boolean;
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

export function DagProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<DagNode[]>([]);
  const [edges, setEdges] = useState<DagEdge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewMode>('graph');

  const value = useMemo(
    () => ({
      nodes,
      edges,
      isLoading,
      activeView,
      setActiveView,
      setNodes,
      setEdges,
      setIsLoading,
    }),
    [nodes, edges, isLoading, activeView],
  );

  return <DagContext.Provider value={value}>{children}</DagContext.Provider>;
}
