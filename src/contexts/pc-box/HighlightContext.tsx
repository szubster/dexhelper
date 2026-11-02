import { useQuery } from '@tanstack/react-query';
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { NATURES } from '../../engine/gen3/nature';
import type { PokemonInstance as Pokemon } from '../../engine/saveParser/parsers/common';
import { useStore } from '../../store';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';

interface HighlightContextValue {
  isHighlighted: (pokemon: Pokemon | null) => boolean;
  isSearchActive: boolean;
}

const HighlightContext = createContext<HighlightContextValue | undefined>(undefined);

export function HighlightProvider({ children }: { children: ReactNode }) {
  const searchTerm = useStore((s) => s.searchTerm);
  const attributeFilters = useStore((s) => s.attributeFilters);

  const { data: pokemonList } = useQuery(pokemonListQueryOptions);

  const isSearchActive = useMemo(() => {
    if (searchTerm.trim().length > 0) return true;
    if (attributeFilters?.nature) return true;
    if (attributeFilters?.gender) return true;
    if (attributeFilters?.ability) return true;
    if (attributeFilters?.heldItem) return true;
    return false;
  }, [searchTerm, attributeFilters]);

  const isHighlighted = (pokemon: Pokemon | null): boolean => {
    if (!pokemon) return false;
    if (!isSearchActive) return true;

    const speciesName = pokemonList?.find((p) => p.id === pokemon.speciesId)?.name || '';
    const natureString = pokemon.nature !== undefined ? NATURES[pokemon.nature] : '';

    // Search term check
    if (searchTerm.trim().length > 0) {
      const term = searchTerm.toLowerCase();
      const matchesName = pokemon.nickname?.toLowerCase().includes(term) || speciesName.toLowerCase().includes(term);
      if (!matchesName) return false;
    }

    // Attribute filters check
    if (attributeFilters) {
      if (attributeFilters.nature && natureString !== attributeFilters.nature) {
        return false;
      }
    }

    return true;
  };

  return <HighlightContext.Provider value={{ isHighlighted, isSearchActive }}>{children}</HighlightContext.Provider>;
}

export function useHighlight() {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error('useHighlight must be used within a HighlightProvider');
  }
  return context;
}
