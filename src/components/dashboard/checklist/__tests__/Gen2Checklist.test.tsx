import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmulatorProvider } from '../../../../contexts/EmulatorContext';
import { useEmulatorStore } from '../../../../emulator/state/emulatorStore';
import type { SaveData } from '../../../../engine/saveParser';
import { Gen2Checklist } from '../Gen2Checklist';

describe('Gen2Checklist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 2 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 2,
        gen2StaticEncounters: {
          sudowoodo: true,
          snorlax: false,
          redGyarados: true,
          hoOh: false,
          lugia: false,
        },
        gen2DailyEvents: {
          mysteryGift: true,
          fridayLapras: false,
          bugCatchingContest: true,
        },
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen2Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).toBeInTheDocument();
    await expect.element(page.getByText('SUDOWOODO')).toBeInTheDocument();
    await expect.element(page.getByText('SUDOWOODO')).toHaveClass('line-through');
    await expect.element(page.getByText('SNORLAX')).toBeInTheDocument();
    await expect.element(page.getByText('SNORLAX')).not.toHaveClass('line-through');
    await expect.element(page.getByText('RED GYARADOS')).toBeInTheDocument();
    await expect.element(page.getByText('RED GYARADOS')).toHaveClass('line-through');

    await expect.element(page.getByText('DAILY / WEEKLY EVENTS')).toBeInTheDocument();
    await expect.element(page.getByText('MYSTERY GIFT')).toBeInTheDocument();
    await expect.element(page.getByText('MYSTERY GIFT')).toHaveClass('line-through');
    await expect.element(page.getByText('FRIDAY LAPRAS')).not.toHaveClass('line-through');
  });

  it('does not render for gen 3 data', async () => {
    useEmulatorStore.setState({
      saveData: {
        generation: 3,
      } as unknown as SaveData,
    });

    await render(
      <EmulatorProvider>
        <Gen2Checklist />
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
        <Gen2Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });
});
