import React from 'react';
import type { PokemonInstance } from '../engine/saveParser/index';
import { useStore } from '../store';
import { getGenerationConfig } from '../utils/generationConfig';
import { StorageLocationSection } from './storage/StorageLocationSection';

export function StorageGrid({ pokemonList }: { pokemonList: { id: number; name: string }[] }) {
  const saveData = useStore((s) => s.saveData);

  const pokemonMap = React.useMemo(() => {
    const map = new Map<number, { id: number; name: string }>();
    pokemonList.forEach((p) => {
      map.set(p.id, p);
    });
    return map;
  }, [pokemonList]);

  const pokemonByLocation = React.useMemo(() => {
    const map = new Map<string, PokemonInstance[]>();
    if (!saveData) return map;

    // Group all pokemon by their storage location in a single pass O(N)
    const allPokemon = [...saveData.partyDetails, ...saveData.pcDetails];
    for (const p of allPokemon) {
      if (!p.storageLocation) continue;
      let current = map.get(p.storageLocation);
      if (!current) {
        current = [];
        map.set(p.storageLocation, current);
      }
      current.push(p);
    }
    return map;
  }, [saveData]);

  if (!saveData) return null;

  const genConfig = getGenerationConfig(saveData.generation);
  const storageLocations = [
    'Party',
    'Daycare',
    ...Array.from({ length: genConfig.boxCount }, (_, i) => `Box ${i + 1}`),
  ];

  return (
    <div className="fade-in animate-in space-y-16 duration-500">
      {storageLocations.map((location) => {
        const pokemonInLocation = pokemonByLocation.get(location) || [];

        return (
          <StorageLocationSection
            key={location}
            location={location}
            pokemonInLocation={pokemonInLocation}
            pokemonMap={pokemonMap}
            genConfig={genConfig}
          />
        );
      })}
    </div>
  );
}
