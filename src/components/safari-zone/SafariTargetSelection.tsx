import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Gen1SafariZone } from '../../engine/data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../../engine/data/gen3/safariZone';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { pokemonListQueryOptions } from '../../utils/pokemonQueries';
import { TacticalPanel } from '../TacticalPanel';
import { TacticalSelect } from '../TacticalSelect';
import { type GameVersion, useSafariZoneSelection } from './useSafariZoneSelection';

interface Props {
  selection?: ReturnType<typeof useSafariZoneSelection>;
}

export function SafariTargetSelection({ selection }: Props) {
  // Use provided selection or create one if not provided (useful for isolation/testing)
  const defaultSelection = useSafariZoneSelection();
  const activeSelection = selection || defaultSelection;

  const { version, setVersion, targetPokemon, setTargetPokemon } = activeSelection;

  const { data: pokemonList } = useSuspenseQuery(pokemonListQueryOptions);

  // Get all unique pokemon available in the current version's Safari Zone
  const availablePokemonInSafari = useMemo(() => {
    let allAreas: SafariArea[] = [];
    if (['red', 'blue', 'yellow'].includes(version)) {
      allAreas = Gen1SafariZone;
    } else if (['ruby', 'sapphire', 'emerald'].includes(version)) {
      allAreas = HoennSafariZone;
    } else if (['firered', 'leafgreen'].includes(version)) {
      allAreas = KantoSafariZoneGen3;
    }

    const uniquePokemonIds = new Set<number>();

    allAreas.forEach((area) => {
      const encounters = area.encounters[version];
      if (encounters) {
        encounters.forEach((enc) => {
          uniquePokemonIds.add(enc.pokemon);
        });
      }
    });

    // Map IDs to names and sort alphabetically
    return Array.from(uniquePokemonIds)
      .map((id) => {
        const pokemon = pokemonList.find((p) => p.id === id);
        return {
          id,
          name: pokemon ? pokemon.name : `Pokémon #${id}`,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [version, pokemonList]);

  return (
    <TacticalPanel className="mb-6 flex flex-col gap-4 p-4 md:flex-row" variant="default">
      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="safari-version-select" className="font-bold font-mono text-xs text-zinc-400 uppercase">
          [ Game Version ]
        </label>
        <TacticalSelect
          id="safari-version-select"
          value={version}
          onChange={(e) => {
            setVersion(e.target.value as GameVersion);
            setTargetPokemon(null); // Reset target when version changes
          }}
          className="font-mono text-sm uppercase"
        >
          <option value="emerald">Emerald</option>
          <option value="ruby">Ruby</option>
          <option value="sapphire">Sapphire</option>
          <option value="firered">FireRed</option>
          <option value="leafgreen">LeafGreen</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="yellow">Yellow</option>
        </TacticalSelect>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <label htmlFor="safari-target-select" className="font-bold font-mono text-xs text-zinc-400 uppercase">
          [ Target Pokémon ]
        </label>
        <TacticalSelect
          id="safari-target-select"
          value={targetPokemon === null ? '' : targetPokemon.toString()}
          onChange={(e) => {
            const val = e.target.value;
            setTargetPokemon(val === '' ? null : parseInt(val, 10));
          }}
          className="font-mono text-sm uppercase"
        >
          <option value="">-- ALL POKÉMON --</option>
          {availablePokemonInSafari.map((p) => (
            <option key={p.id} value={p.id.toString()}>
              {p.name.toUpperCase()}
            </option>
          ))}
        </TacticalSelect>
      </div>
    </TacticalPanel>
  );
}
