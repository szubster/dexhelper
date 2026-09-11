import React, { createContext, type ReactNode, useContext, useReducer } from 'react';

export type RibbonCategory = 'all' | 'missing' | 'contest';
export type SortOption = 'id' | 'missingCount';

export interface RibbonFilterState {
  filterCategory: RibbonCategory;
  sortBy: SortOption;
}

export type RibbonFilterAction =
  | { type: 'SET_FILTER_CATEGORY'; payload: RibbonCategory }
  | { type: 'SET_SORT_BY'; payload: SortOption };

const initialState: RibbonFilterState = {
  filterCategory: 'all',
  sortBy: 'id',
};

const RibbonFilterContext = createContext<{
  state: RibbonFilterState;
  dispatch: React.Dispatch<RibbonFilterAction>;
} | null>(null);

function ribbonFilterReducer(state: RibbonFilterState, action: RibbonFilterAction): RibbonFilterState {
  switch (action.type) {
    case 'SET_FILTER_CATEGORY':
      return { ...state, filterCategory: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
}

export function RibbonFilterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ribbonFilterReducer, initialState);

  return <RibbonFilterContext.Provider value={{ state, dispatch }}>{children}</RibbonFilterContext.Provider>;
}

export function useRibbonFilter() {
  const context = useContext(RibbonFilterContext);
  if (!context) {
    throw new Error('useRibbonFilter must be used within a RibbonFilterProvider');
  }
  return context;
}
