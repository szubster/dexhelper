import { HOENN_DEX_ORDER } from '../saveParser/parsers/gen3';
import type { SortingStrategy } from './SortingStrategy';

export class DexNumberSorter {
  private config: { variant: 'national' | 'regional' };

  constructor(config: { variant: 'national' | 'regional' }) {
    this.config = config;
  }

  public sort: SortingStrategy = (a, b) => {
    if (this.config.variant === 'regional') {
      const idxA = HOENN_DEX_ORDER.indexOf(a.instance.speciesId);
      const idxB = HOENN_DEX_ORDER.indexOf(b.instance.speciesId);
      const rankA = idxA !== -1 ? idxA : Infinity;
      const rankB = idxB !== -1 ? idxB : Infinity;
      if (rankA === rankB) {
        return a.instance.speciesId - b.instance.speciesId;
      }
      return rankA - rankB;
    }
    return a.instance.speciesId - b.instance.speciesId;
  };
}

export class LevelSorter {
  private config: { direction: 'asc' | 'desc' };

  constructor(config: { direction: 'asc' | 'desc' }) {
    this.config = config;
  }

  public sort: SortingStrategy = (a, b) => {
    if (this.config.direction === 'asc') {
      return a.instance.level - b.instance.level;
    } else {
      return b.instance.level - a.instance.level;
    }
  };
}

export class TypeSorter {
  public sort: SortingStrategy = (a, b) => {
    const typesA = a.metadata?.types ?? [];
    const typesB = b.metadata?.types ?? [];

    const primaryA = typesA[0] ?? Infinity;
    const primaryB = typesB[0] ?? Infinity;

    if (primaryA !== primaryB) {
      return primaryA - primaryB;
    }

    const secondaryA = typesA[1] ?? Infinity;
    const secondaryB = typesB[1] ?? Infinity;

    if (secondaryA === secondaryB) {
      return 0;
    }

    return secondaryA - secondaryB;
  };
}

export class AlphaSorter {
  public sort: SortingStrategy = (a, b) => {
    const nameA = a.instance.nickname || a.metadata?.n || String(a.instance.speciesId);
    const nameB = b.instance.nickname || b.metadata?.n || String(b.instance.speciesId);

    return nameA.localeCompare(nameB);
  };
}
