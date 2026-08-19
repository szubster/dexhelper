import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { SaveData } from '@dexhelper/engine/saveParser/index';
import { PokemonEvolutions } from '../PokemonEvolutions';

describe('PokemonEvolutions', () => {
  const mockOnNavigate = vi.fn<(id: number, name: string) => void>();

  const baseSaveData: SaveData = {
    generation: 1,
    gameVersion: 'red',
    trainerId: 12345,
    trainerName: 'ASH',
    badges: 0,
    inventory: [],
    pcItems: [],
    party: [],
    pc: [],
    partyDetails: [],
    pcDetails: [],
    owned: new Set(),
    seen: new Set(),
    currentMapId: 0,
    currentBoxCount: 0,
    hallOfFameCount: 0,
  };

  it('renders procurement strategy without evoReq when not owned', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={0}
        pokemonId={1} // Bulbasaur
        gameVersion="red"
        saveData={baseSaveData}
      />,
    );

    await expect.element(page.getByText('Procurement Strategy')).toBeVisible();
    await expect.element(page.getByText('field capture or specialized interaction.')).toBeVisible();
  });

  it('renders procurement strategy with evoReq', async () => {
    await render(
      <PokemonEvolutions
        evoReq={{ fromId: 1, fromName: 'bulbasaur', method: 'level 16' }}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={0}
        pokemonId={2} // Ivysaur
        gameVersion="red"
        saveData={baseSaveData}
      />,
    );

    await expect.element(page.getByText('Evolving BULBASAUR')).toBeVisible();

    await page.getByText('Evolving BULBASAUR').click();
    expect(mockOnNavigate).toHaveBeenCalledWith(1, 'bulbasaur');
  });

  it('renders stadium rewards for gen 1', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={0}
        pokemonId={138} // Omanyte
        gameVersion="red"
        saveData={{ ...baseSaveData, generation: 1 }}
      />,
    );

    await expect.element(page.getByText(/STADIUM 1 REWARD:/)).toBeVisible();
  });

  it('renders stadium rewards for gen 2', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={0}
        pokemonId={201} // Unown
        gameVersion="crystal"
        saveData={{ ...baseSaveData, generation: 2 }}
      />,
    );

    await expect.element(page.getByText(/STADIUM 2 REWARD:/)).toBeVisible();
  });

  it('does not render stadium rewards if there are none', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={0}
        pokemonId={16} // Pidgey (no stadium reward)
        gameVersion="red"
        saveData={baseSaveData}
      />,
    );

    await expect.element(page.getByText(/STADIUM \d REWARD/)).not.toBeInTheDocument();
  });

  it('renders evolution from details with preEvo owned', async () => {
    await render(
      <PokemonEvolutions
        evoReq={{ fromId: 1, fromName: 'bulbasaur', method: 'level 16' }}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={true}
        onNavigate={mockOnNavigate}
        yourPokemonLength={1}
        pokemonId={2}
        gameVersion="red"
        saveData={baseSaveData}
      />,
    );

    await expect.element(page.getByText('PRE-EVOLUTION MATRIX')).toBeVisible();
    await expect.element(page.getByText('BULBASAUR')).toBeVisible();
    await expect.element(page.getByText('METHOD: level 16')).toBeVisible();

    await page.getByRole('button', { name: 'Navigate to bulbasaur details' }).click();
    expect(mockOnNavigate).toHaveBeenCalledWith(1, 'bulbasaur');
  });

  it('renders evolution from details with preEvo unowned', async () => {
    await render(
      <PokemonEvolutions
        evoReq={{ fromId: 1, fromName: 'bulbasaur', method: 'level 16' }}
        evolvesTo={[]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={1}
        pokemonId={2}
        gameVersion="red"
        saveData={baseSaveData}
      />,
    );

    await expect.element(page.getByText('UNAVAILABLE')).toBeVisible();
  });

  it('renders evolution to details', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[
          { id: 2, name: 'ivysaur', method: 'level 16' },
          { id: 3, name: 'venusaur', method: 'level 32' },
        ]}
        breedingInfo={null}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={1}
        pokemonId={1}
        gameVersion="red"
        saveData={baseSaveData}
      />,
    );

    await expect.element(page.getByText('FORWARD EVOLUTION MATRIX')).toBeVisible();
    await expect.element(page.getByText('IVYSAUR')).toBeVisible();
    await expect.element(page.getByText('VIA level 16')).toBeVisible();
    await expect.element(page.getByText('VENUSAUR')).toBeVisible();
    await expect.element(page.getByText('VIA level 32')).toBeVisible();

    await page.getByRole('button', { name: 'Navigate to ivysaur details' }).click();
    expect(mockOnNavigate).toHaveBeenCalledWith(2, 'ivysaur');
  });

  it('renders breeding info', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[]}
        breedingInfo={{
          parentIds: [25, 26],
          parentNames: ['pikachu', 'raichu'],
          method: 'pichu method',
        }}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={1}
        pokemonId={172} // Pichu
        gameVersion="gold"
        saveData={{ ...baseSaveData, generation: 2 }}
      />,
    );

    await expect.element(page.getByText('BREEDING MATRIX')).toBeVisible();
    await expect.element(page.getByText('PIKACHU')).toBeVisible();
    await expect.element(page.getByText('RAICHU')).toBeVisible();
    await expect.element(page.getByText('pichu method')).toBeVisible();

    await page.getByRole('button', { name: 'Navigate to pikachu details' }).click();
    expect(mockOnNavigate).toHaveBeenCalledWith(25, 'pikachu');
  });

  it('renders breeding info without parent ids fallback', async () => {
    await render(
      <PokemonEvolutions
        evoReq={null}
        evolvesTo={[]}
        breedingInfo={{
          parentIds: [],
          parentNames: ['unknown'],
          method: 'unknown method',
        }}
        hasPreEvo={false}
        onNavigate={mockOnNavigate}
        yourPokemonLength={1}
        pokemonId={172} // Pichu
        gameVersion="gold"
        saveData={{ ...baseSaveData, generation: 2 }}
      />,
    );

    await expect.element(page.getByRole('button', { name: 'Navigate to unknown details' })).toBeVisible();

    // Clicking shouldn't navigate without id
    await page.getByRole('button', { name: 'Navigate to unknown details' }).click();
    expect(mockOnNavigate).not.toHaveBeenCalledWith(undefined, 'unknown');
  });
});
