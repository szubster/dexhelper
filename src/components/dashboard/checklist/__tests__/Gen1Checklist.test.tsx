import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmulatorProvider } from '../../../../contexts/EmulatorContext';
import { useEmulatorStore } from '../../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../../engine/saveParser';
import { Gen1Checklist } from '../Gen1Checklist';

describe('Gen1Checklist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 1 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 1,
        gen1StaticEncounters: {
          1: true, // Bulbasaur
          4: false, // Charmander
          150: true, // Mewtwo
        },
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen1Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).toBeInTheDocument();
    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();
    await expect.element(page.getByText('BULBASAUR')).toHaveClass('line-through');
    await expect.element(page.getByText('CHARMANDER')).toBeInTheDocument();
    await expect.element(page.getByText('CHARMANDER')).not.toHaveClass('line-through');
    await expect.element(page.getByText('MEWTWO')).toBeInTheDocument();
    await expect.element(page.getByText('MEWTWO')).toHaveClass('line-through');

    // We should see other static encounters as unchecked since they aren't provided in mock flags explicitly as true
    await expect.element(page.getByText('SNORLAX')).toBeInTheDocument();
    await expect.element(page.getByText('SNORLAX')).not.toHaveClass('line-through');
  });

  it('does not render for gen 3 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 3,
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen1Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });

  it('does not render if saveData is null', async () => {
    useEmulatorStore.setState({
      saveData: null,
    });

    await render(
      <EmulatorProvider>
        <Gen1Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });

  it('renders correctly when gen1StaticEncounters is undefined', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 1,
        gen1StaticEncounters: undefined,
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen1Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).toBeInTheDocument();
    await expect.element(page.getByText('BULBASAUR')).toBeInTheDocument();
    await expect.element(page.getByText('BULBASAUR')).not.toHaveClass('line-through');
    await expect.element(page.getByText('MEWTWO')).toBeInTheDocument();
    await expect.element(page.getByText('MEWTWO')).not.toHaveClass('line-through');
  });
});
