import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { saveDB } from '../../db/SaveDB';
import { useStore } from '../../store';
import { SettingsModal } from '../SettingsModal';

vi.mock('../../db/SaveDB', () => ({
  saveDB: {
    deleteSave: vi.fn<(key: string) => Promise<void>>(),
  },
}));

describe('SettingsModal', () => {
  beforeEach(() => {
    useStore.setState({
      isSettingsOpen: false,
      saveData: null,
      manualVersion: null,
      isLivingDex: false,
      globalPokeball: 'poke',
      nuzlockeGraveyardBox: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should not render when isSettingsOpen is false', async () => {
    useStore.setState({ isSettingsOpen: false });
    const { baseElement } = await render(<SettingsModal />);
    expect(baseElement.innerHTML).not.toContain('SYS.CONFIG');
  });

  it('should render when isSettingsOpen is true', async () => {
    useStore.setState({ isSettingsOpen: true });
    await render(<SettingsModal />);

    await expect.element(page.getByRole('heading', { name: 'SYS.CONFIG' })).toBeInTheDocument();
    await expect.element(page.getByText('Configure your experience')).toBeInTheDocument();
  });

  it('should close when the close button is clicked', async () => {
    useStore.setState({ isSettingsOpen: true });
    await render(<SettingsModal />);

    expect(useStore.getState().isSettingsOpen).toBe(true);

    const closeButton = page.getByTitle('Close settings');
    await closeButton.click();

    expect(useStore.getState().isSettingsOpen).toBe(false);
  });

  it('should call deleteSave and reset state when Clear Storage is confirmed', async () => {
    useStore.setState({
      isSettingsOpen: true,
      manualVersion: 'red', // use gen 1 to prevent unknown generation error
      // biome-ignore lint/suspicious/noExplicitAny: allow mock state for test
      saveData: { generation: 1, gameVersion: 'red', owned: new Set(), seen: new Set(), party: [], pc: [] } as any,
    });
    await render(<SettingsModal />);

    // Click SYS.PURGE to open confirmation
    const purgeButton = page.getByText(/SYS\.PURGE/);
    await purgeButton.click();

    // Click CONFIRM.PURGE
    const confirmButton = page.getByText(/CONFIRM\.PURGE/);
    await confirmButton.click();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveDB.deleteSave).toHaveBeenCalledWith('last_save_file');
    expect(useStore.getState().saveData).toBeNull();
    expect(useStore.getState().manualVersion).toBeNull();
    expect(useStore.getState().isSettingsOpen).toBe(false);
  });
});
