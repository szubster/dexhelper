import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { EmulatorProvider } from '../../../../contexts/EmulatorContext';
import * as store from '../../../../store';
import { Gen2Checklist } from '../Gen2Checklist';

// Mock the store explicitly since we are dealing with useStore
vi.mock('../../../../store', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../../store')>();
  return {
    ...actual,
    useStore: vi.fn<typeof store.useStore>(),
  };
});

describe('Gen2Checklist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly with gen 2 data', async () => {
    // Mock the store to return valid gen 2 save data
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
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
          gen2NarrativeFlags: {
            EVENT_RIVAL_CHERRYGROVE_CITY: true,
            EVENT_BEAT_FALKNER: true,
            EVENT_RIVAL_AZALEA_TOWN: false,
            EVENT_BEAT_BUGSY: false,
          },
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - Mocking zustand store state
      return selector(state);
    });

    await render(
      <EmulatorProvider>
        <Gen2Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('NARRATIVE EVENTS')).toBeInTheDocument();

    // Completed events
    await expect.element(page.getByText('RIVAL (CHERRYGROVE)')).toBeInTheDocument();
    await expect.element(page.getByText('RIVAL (CHERRYGROVE)')).toHaveClass('line-through');
    await expect.element(page.getByText('FALKNER')).toBeInTheDocument();
    await expect.element(page.getByText('FALKNER')).toHaveClass('line-through');

    // Upcoming event (interactive)
    await expect.element(page.getByText('RIVAL (AZALEA)')).toBeInTheDocument();
    await expect.element(page.getByText('RIVAL (AZALEA)')).not.toHaveClass('line-through');

    // In Vitest browser, the class 'hover:bg-zinc-900/50' is applied to the root element.
    const rivalAzaleaEl = page.getByText('RIVAL (AZALEA)');
    await expect
      .element(rivalAzaleaEl.element().parentElement?.parentElement?.parentElement as HTMLElement)
      .toHaveClass(/hover:bg-zinc-900\/50/);

    // Future event (unavailable/opacity-50)
    await expect.element(page.getByText('BUGSY')).toBeInTheDocument();
    await expect.element(page.getByText('BUGSY')).not.toHaveClass('line-through');
    const bugsyEl = page.getByText('BUGSY');
    await expect
      .element(bugsyEl.element().parentElement?.parentElement?.parentElement as HTMLElement)
      .toHaveClass(/opacity-50/);

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
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: {
          generation: 3,
        },
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - Mocking zustand store state
      return selector(state);
    });

    await render(
      <EmulatorProvider>
        <Gen2Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });

  it('does not render if saveData is null', async () => {
    vi.mocked(store.useStore).mockImplementation((selector) => {
      const state = {
        saveData: null,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - Mocking zustand store state
      return selector(state);
    });

    await render(
      <EmulatorProvider>
        <Gen2Checklist />
      </EmulatorProvider>,
    );

    await expect.element(page.getByText('STATIC ENCOUNTERS')).not.toBeInTheDocument();
  });
});
