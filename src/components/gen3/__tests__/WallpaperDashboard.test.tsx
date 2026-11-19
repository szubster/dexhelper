import { beforeEach, describe, expect, test, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { generateWallpaperPhrases, WALLPAPER_THEMES } from '../../../engine/gen3/wallpaper/phraseGenerator';
import { isGen3Save } from '../../../engine/saveParser/parsers/common';
import { useStore } from '../../../store';
import { WallpaperDashboard } from '../WallpaperDashboard';

// Mock the Zustand store
vi.mock('../../../store', () => ({
  useStore: vi.fn<(...args: unknown[]) => unknown>(),
}));

// Mock the isGen3Save utility
vi.mock('../../../engine/saveParser/parsers/common', () => ({
  isGen3Save: vi.fn<(...args: unknown[]) => boolean>(),
}));

describe('WallpaperDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders correctly with default fallback TID', async () => {
    const mockStore = {
      saveData: null,
      unlockedWallpapers: {},
      toggleWallpaperUnlocked: vi.fn<(tid: number, index: number) => void>(),
    };
    vi.mocked(useStore).mockImplementation((selector: unknown) =>
      (selector as (state: typeof mockStore) => unknown)(mockStore),
    );
    vi.mocked(isGen3Save).mockReturnValue(false);

    await render(<WallpaperDashboard />);

    await expect.element(page.getByText('PC Box Wallpapers')).toBeInTheDocument();

    // Check if the placeholder TID text is in the document
    await expect.element(page.getByText(/12345/)).toBeInTheDocument();

    const phrases = generateWallpaperPhrases(12345);

    // Let's test only a few themes to make it faster
    const themeName0 = WALLPAPER_THEMES[0]?.name ?? '';
    const themeName1 = WALLPAPER_THEMES[1]?.name ?? '';
    const themeName2 = WALLPAPER_THEMES[2]?.name ?? '';

    await expect.element(page.getByText(themeName0, { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(themeName1, { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(themeName2, { exact: true })).toBeInTheDocument();

    await expect.element(page.getByText(phrases[themeName0] ?? '', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(phrases[themeName1] ?? '', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(phrases[themeName2] ?? '', { exact: true })).toBeInTheDocument();
  });

  test('renders correctly with specific TID from save data', async () => {
    const mockStore = {
      saveData: { trainerId: 54321 }, // mock save data
      unlockedWallpapers: {},
      toggleWallpaperUnlocked: vi.fn<(tid: number, index: number) => void>(),
    };
    vi.mocked(useStore).mockImplementation((selector: unknown) =>
      (selector as (state: typeof mockStore) => unknown)(mockStore),
    );
    vi.mocked(isGen3Save).mockReturnValue(true);

    await render(<WallpaperDashboard />);

    await expect.element(page.getByText(/54321/)).toBeInTheDocument();

    const phrases = generateWallpaperPhrases(54321);

    const themeName0 = WALLPAPER_THEMES[0]?.name ?? '';
    const themeName1 = WALLPAPER_THEMES[1]?.name ?? '';
    const themeName2 = WALLPAPER_THEMES[2]?.name ?? '';

    await expect.element(page.getByText(phrases[themeName0] ?? '', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(phrases[themeName1] ?? '', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText(phrases[themeName2] ?? '', { exact: true })).toBeInTheDocument();
  });

  test('calls toggleWallpaperUnlocked when a checklist item is clicked', async () => {
    const toggleWallpaperUnlockedMock = vi.fn<(tid: number, index: number) => void>();
    const mockStore = {
      saveData: null,
      unlockedWallpapers: {},
      toggleWallpaperUnlocked: toggleWallpaperUnlockedMock,
    };
    vi.mocked(useStore).mockImplementation((selector: unknown) =>
      (selector as (state: typeof mockStore) => unknown)(mockStore),
    );
    vi.mocked(isGen3Save).mockReturnValue(false);

    await render(<WallpaperDashboard />);

    const themeName = WALLPAPER_THEMES[0]?.name ?? '';
    const firstThemeItem = page.getByText(themeName, { exact: true });
    await firstThemeItem.click();

    expect(toggleWallpaperUnlockedMock).toHaveBeenCalledWith(12345, 0);
  });

  test('displays acquired state correctly', async () => {
    const mockStore = {
      saveData: null,
      unlockedWallpapers: {
        12345: {
          0: true, // first item acquired
          1: false, // second item not acquired
        },
      },
      toggleWallpaperUnlocked: vi.fn<(tid: number, index: number) => void>(),
    };
    vi.mocked(useStore).mockImplementation((selector: unknown) =>
      (selector as (state: typeof mockStore) => unknown)(mockStore),
    );
    vi.mocked(isGen3Save).mockReturnValue(false);

    await render(<WallpaperDashboard />);

    const themeName = WALLPAPER_THEMES[0]?.name ?? '';
    const firstThemeItem = page.getByText(themeName, { exact: true });
    await expect.element(firstThemeItem).toBeInTheDocument();
  });
});
