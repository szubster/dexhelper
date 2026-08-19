import type { GameVersion } from '../saveParser/parsers/common';
import { HOENN_DEX_ORDER } from '../saveParser/parsers/gen3';
import type { SortingStrategy } from './SortingStrategy';

export interface DexNumberSorterConfig {
  variant: 'national' | 'regional';
  generation?: number;
  gameVersion?: GameVersion;
}

export class DexNumberSorter {
  private config: DexNumberSorterConfig;

  constructor(config: DexNumberSorterConfig) {
    this.config = config;
  }

  public sort: SortingStrategy = (a, b) => {
    const aId = a.instance?.speciesId ?? Infinity;
    const bId = b.instance?.speciesId ?? Infinity;

    if (this.config.variant === 'regional') {
      // Gen 3 Hoenn Games
      if (
        this.config.generation === 3 &&
        this.config.gameVersion &&
        ['ruby', 'sapphire', 'emerald'].includes(this.config.gameVersion)
      ) {
        const idxA = HOENN_DEX_ORDER.indexOf(aId);
        const idxB = HOENN_DEX_ORDER.indexOf(bId);
        const rankA = idxA !== -1 ? idxA : Infinity;
        const rankB = idxB !== -1 ? idxB : Infinity;
        if (rankA === rankB) {
          return aId - bId;
        }
        return rankA - rankB;
      }

      // Fallback for Gen 1 (Kanto), Gen 2 (Johto), and Gen 3 (FRLG) is National Dex (speciesId)
      return aId - bId;
    }
    return aId - bId;
  };
}

export class LevelSorter {
  private config: { direction: 'asc' | 'desc' };

  constructor(config: { direction: 'asc' | 'desc' }) {
    this.config = config;
  }

  public sort: SortingStrategy = (a, b) => {
    const levelA = a.instance?.level ?? 0;
    const levelB = b.instance?.level ?? 0;

    if (this.config.direction === 'asc') {
      return levelA - levelB;
    } else {
      return levelB - levelA;
    }
  };
}

export class TypeSorter {
  private config: { generation?: number };

  constructor(config: { generation?: number } = {}) {
    this.config = config;
  }

  public sort: SortingStrategy = (a, b) => {
    let typesA = a.metadata?.types ?? [];
    let typesB = b.metadata?.types ?? [];

    if (this.config.generation === 1) {
      // Remove Steel (9) and Dark (17) types for Gen 1
      typesA = typesA.filter((t) => t !== 9 && t !== 17);
      typesB = typesB.filter((t) => t !== 9 && t !== 17);
    }

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
    const nameA = a.instance?.nickname || a.metadata?.n || String(a.instance?.speciesId ?? Infinity);
    const nameB = b.instance?.nickname || b.metadata?.n || String(b.instance?.speciesId ?? Infinity);

    return nameA.localeCompare(nameB);
  };
}
