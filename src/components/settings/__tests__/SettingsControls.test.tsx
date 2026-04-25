import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { SettingsControls } from '../SettingsControls';

describe('SettingsControls', () => {
  it('renders correctly and handles interactions', async () => {
    const setManualVersion = vi.fn();
    const setIsLivingDex = vi.fn();
    const setGlobalPokeball = vi.fn();

    const { getByText, getByRole, getByLabelText } = await render(
      <SettingsControls
        effectiveVersion="scarlet-violet"
        setManualVersion={setManualVersion}
        isLivingDex={false}
        setIsLivingDex={setIsLivingDex}
        globalPokeball="poke"
        setGlobalPokeball={setGlobalPokeball}
        filteredPokeballs={[
          { value: 'poke', label: 'Poké Ball' },
          { value: 'great', label: 'Great Ball' },
        ]}
        genConfig={null}
      />,
    );

    // Verify labels
    await expect.element(getByText('Version')).toBeInTheDocument();
    await expect.element(getByText('Living Dex')).toBeInTheDocument();
    await expect.element(getByText('Ball Style')).toBeInTheDocument();

    // Verify toggling living dex
    const livingDexToggle = getByRole('switch', { name: 'Toggle Living Dex Mode' });
    await userEvent.click(livingDexToggle);
    expect(setIsLivingDex).toHaveBeenCalledWith(true);

    // Verify changing version
    const versionSelect = getByLabelText('Select Game Version');
    await userEvent.selectOptions(versionSelect, 'unknown'); // "Auto" option
    expect(setManualVersion).toHaveBeenCalledWith('unknown');

    // Verify changing ball style
    const ballSelect = getByLabelText('Select Ball Style');
    await userEvent.selectOptions(ballSelect, 'great');
    expect(setGlobalPokeball).toHaveBeenCalledWith('great');
  });
});
