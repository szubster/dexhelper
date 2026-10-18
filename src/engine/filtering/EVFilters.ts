export type EVStat = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'total';

export type EVOperator = 'eq' | 'gt' | 'lt' | 'gte' | 'lte';

export interface EVFilterCondition {
  stat: EVStat;
  operator: EVOperator;
  value: number;
}

export interface EVFilterState {
  conditions?: EVFilterCondition[];
}

export interface EVSortState {
  stat: EVStat;
  direction: 'asc' | 'desc';
}
