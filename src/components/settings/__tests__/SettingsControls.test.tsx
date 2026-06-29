import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { GameVersion, PokeballType } from '../../../store';
import { SettingsControls } from '../SettingsControls';

describe('SettingsControls', () => {
  it('renders correctly', async () => {
    const setManualVersion = vi.fn<(v: GameVersion | null) => void>();
    const setIsLivingDex = vi.fn<(v: boolean) => void>();
    const setGlobalPokeball = vi.fn<(v: PokeballType) => void>();

    await render(
      <SettingsControls
        effectiveVersion="unknown"
        setManualVersion={setManualVersion}
        isLivingDex={false}
        setIsLivingDex={setIsLivingDex}
        globalPokeball="poke"
        setGlobalPokeball={setGlobalPokeball}
        filteredPokeballs={[{ value: 'poke', label: 'Poke Ball' }]}
        genConfig={null}
        nuzlockeGraveyardBox={null}
        setNuzlockeGraveyardBox={vi.fn<(v: string | null) => void>()}
        storageLocations={['Box 1', 'Box 2']}
      />,
    );

    await expect.element(page.getByRole('group', { name: 'Game Version' })).toBeInTheDocument();
    await expect.element(page.getByRole('group', { name: 'Living Dex Mode' })).toBeInTheDocument();
    await expect.element(page.getByRole('group', { name: 'Ball Style' })).toBeInTheDocument();
  });

  it('handles graveyard box change', async () => {
    const setManualVersion = vi.fn<(v: GameVersion | null) => void>();
    const setIsLivingDex = vi.fn<(v: boolean) => void>();
    const setGlobalPokeball = vi.fn<(v: PokeballType) => void>();
    const setNuzlockeGraveyardBox = vi.fn<(v: string | null) => void>();

    await render(
      <SettingsControls
        effectiveVersion="unknown"
        setManualVersion={setManualVersion}
        isLivingDex={false}
        setIsLivingDex={setIsLivingDex}
        globalPokeball="poke"
        setGlobalPokeball={setGlobalPokeball}
        filteredPokeballs={[{ value: 'poke', label: 'Poke Ball' }]}
        genConfig={null}
        nuzlockeGraveyardBox={null}
        setNuzlockeGraveyardBox={setNuzlockeGraveyardBox}
        storageLocations={['Box 1', 'Box 2']}
      />,
    );

    await page.getByText('[ BOX 1 ]').click();
    expect(setNuzlockeGraveyardBox).toHaveBeenCalledWith('Box 1');

    await page.getByText('[ NONE ]').click();
    expect(setNuzlockeGraveyardBox).toHaveBeenCalledWith(null);
  });

  it('handles version change', async () => {
    const setManualVersion = vi.fn<(v: GameVersion | null) => void>();
    const setIsLivingDex = vi.fn<(v: boolean) => void>();
    const setGlobalPokeball = vi.fn<(v: PokeballType) => void>();

    await render(
      <SettingsControls
        effectiveVersion="unknown"
        setManualVersion={setManualVersion}
        isLivingDex={false}
        setIsLivingDex={setIsLivingDex}
        globalPokeball="poke"
        setGlobalPokeball={setGlobalPokeball}
        filteredPokeballs={[{ value: 'poke', label: 'Poke Ball' }]}
        genConfig={{
          id: 1,
          label: 'Gen I',
          shortLabel: 'I',
          maxDex: 151,
          boxCount: 1,
          boxCapacity: 1,
          boxWarningThreshold: 1,
          hasHiddenPower: false,
          hasUnifiedSpecial: true,
          hasBreeding: false,
          pokeballs: ['poke'],
          defaultVersion: 'red',
          spriteUrl: () => '',
          fallbackSpriteUrl: () => '',
          versions: [{ id: 'red', label: 'Red', dotColor: 'bg-red-500', themeClass: 'theme-red' }],
        }}
        nuzlockeGraveyardBox={null}
        setNuzlockeGraveyardBox={vi.fn<(v: string | null) => void>()}
        storageLocations={['Box 1', 'Box 2']}
      />,
    );

    await page.getByText('Red').click();
    expect(setManualVersion).toHaveBeenCalledWith('red');

    await page.getByText('AUTO').click();
    expect(setManualVersion).toHaveBeenCalledWith(null);
  });

  it('handles living dex toggle', async () => {
    const setManualVersion = vi.fn<(v: GameVersion | null) => void>();
    const setIsLivingDex = vi.fn<(v: boolean) => void>();
    const setGlobalPokeball = vi.fn<(v: PokeballType) => void>();

    await render(
      <SettingsControls
        effectiveVersion="unknown"
        setManualVersion={setManualVersion}
        isLivingDex={false}
        setIsLivingDex={setIsLivingDex}
        globalPokeball="poke"
        setGlobalPokeball={setGlobalPokeball}
        filteredPokeballs={[{ value: 'poke', label: 'Poke Ball' }]}
        genConfig={null}
        nuzlockeGraveyardBox={null}
        setNuzlockeGraveyardBox={vi.fn<(v: string | null) => void>()}
        storageLocations={['Box 1', 'Box 2']}
      />,
    );

    await page.getByText('[ LIVING DEX ]').click();
    expect(setIsLivingDex).toHaveBeenCalledWith(true);

    await page.getByText('[ STANDARD ]').click();
    expect(setIsLivingDex).toHaveBeenCalledWith(false);
  });

  it('handles pokeball style change', async () => {
    const setManualVersion = vi.fn<(v: GameVersion | null) => void>();
    const setIsLivingDex = vi.fn<(v: boolean) => void>();
    const setGlobalPokeball = vi.fn<(v: PokeballType) => void>();

    await render(
      <SettingsControls
        effectiveVersion="unknown"
        setManualVersion={setManualVersion}
        isLivingDex={false}
        setIsLivingDex={setIsLivingDex}
        globalPokeball="poke"
        setGlobalPokeball={setGlobalPokeball}
        filteredPokeballs={[
          { value: 'poke', label: 'Poke Ball' },
          { value: 'great', label: 'Great Ball' },
          { value: 'safari', label: 'Safari Ball' },
          { value: 'heavy', label: 'Heavy Ball' },
          { value: 'level', label: 'Level Ball' },
          { value: 'love', label: 'Love Ball' },
        ]}
        genConfig={null}
        nuzlockeGraveyardBox={null}
        setNuzlockeGraveyardBox={vi.fn<(v: string | null) => void>()}
        storageLocations={['Box 1', 'Box 2']}
      />,
    );

    await page.getByText('Great Ball').click();
    expect(setGlobalPokeball).toHaveBeenCalledWith('great');

    await page.getByText('Safari Ball').click();
    expect(setGlobalPokeball).toHaveBeenCalledWith('safari');

    await page.getByText('Heavy Ball').click();
    expect(setGlobalPokeball).toHaveBeenCalledWith('heavy');

    await page.getByText('Level Ball').click();
    expect(setGlobalPokeball).toHaveBeenCalledWith('level');

    await page.getByText('Love Ball').click();
    expect(setGlobalPokeball).toHaveBeenCalledWith('love');
  });
});
