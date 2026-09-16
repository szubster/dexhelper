import { createContext, type ReactNode, useCallback, useContext, useState } from 'react';

export interface DagTreeContextState {
  expandedNodes: Set<string>;
  toggleNode: (nodeId: string) => void;
  expandAll: (nodeIds: string[]) => void;
  collapseAll: () => void;
}

const DagTreeContext = createContext<DagTreeContextState | null>(null);

export function useDagTreeContext() {
  const context = useContext(DagTreeContext);
  if (!context) {
    throw new Error('useDagTreeContext must be used within a DagTreeProvider');
  }
  return context;
}

export function DagTreeProvider({ children }: { children: ReactNode }) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = useCallback((nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback((nodeIds: string[]) => {
    setExpandedNodes(new Set(nodeIds));
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes(new Set());
  }, []);

  const value = {
    expandedNodes,
    toggleNode,
    expandAll,
    collapseAll,
  };

  return <DagTreeContext.Provider value={value}>{children}</DagTreeContext.Provider>;
}
