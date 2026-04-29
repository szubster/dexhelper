import { describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
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
      />,
    );

    await expect.element(page.getByText('Version')).toBeInTheDocument();
    await expect.element(page.getByText('Living Dex')).toBeInTheDocument();
    await expect.element(page.getByText('Ball Style')).toBeInTheDocument();
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
      />,
    );

    await userEvent.selectOptions(page.getByLabelText('Select Game Version'), 'red');
    expect(setManualVersion).toHaveBeenCalledWith('red');
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
      />,
    );

    await page.getByRole('switch', { name: 'Toggle Living Dex Mode' }).click();
    expect(setIsLivingDex).toHaveBeenCalledWith(true);
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
        ]}
        genConfig={null}
      />,
    );

    await userEvent.selectOptions(page.getByLabelText('Select Ball Style'), 'great');
    expect(setGlobalPokeball).toHaveBeenCalledWith('great');
  });
});
