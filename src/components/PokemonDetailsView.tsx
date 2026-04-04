import React, { useEffect, useState } from 'react';
import { PokemonDetails } from './PokemonDetails';
import { useStore } from '@nanostores/react';
import * as Store from '../store';
import { ReactQueryProvider } from './ReactQueryProvider';

interface Props {
  pokemonId: number;
  pokemonName: string;
}

export function PokemonDetailsView({ pokemonId, pokemonName }: Props) {
  const saveData = useStore(Store.saveData);
  const $settings = useStore(Store.settings);
  const { isLivingDex, globalPokeball, manualVersion } = $settings;

  const [from, setFrom] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const fromParam = urlParams.get('from');
      if (fromParam) {
        setFrom(fromParam);
      }
    }
  }, []);

  const effectiveVersion = manualVersion || saveData?.gameVersion || 'unknown';

  return (
    <ReactQueryProvider>
      <PokemonDetails
        pokemonId={pokemonId}
        pokemonName={pokemonName}
        gameVersion={effectiveVersion}
        saveData={saveData}
        isLivingDex={isLivingDex}
        pokeball={globalPokeball}
        onClose={() => { if (typeof window !== 'undefined') window.location.assign(from); }}
        onNavigate={(id) => { if (typeof window !== 'undefined') window.location.assign(`/pokemon/${id}?from=${from}`); }}
      />
    </ReactQueryProvider>
  );
}
