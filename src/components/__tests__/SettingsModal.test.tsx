import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { saveDB } from '../../db/SaveDB';
import { useStore } from '../../store';
import { SettingsModal } from '../SettingsModal';

vi.mock('../../db/SaveDB', () => ({
  saveDB: {
    deleteSave: vi.fn<() => Promise<void>>().mockResolvedValue(),
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
    });
    vi.clearAllMocks();
  });

  it('does not render when isSettingsOpen is false', async () => {
    await render(<SettingsModal />);
    await expect.element(page.getByRole('heading', { name: 'SYS.CONFIG' })).not.toBeInTheDocument();
  });

  it('renders correctly when isSettingsOpen is true', async () => {
    useStore.setState({ isSettingsOpen: true });
    await render(<SettingsModal />);

    await expect.element(page.getByRole('heading', { name: 'SYS.CONFIG' })).toBeInTheDocument();
    await expect.element(page.getByText('Configure your experience')).toBeInTheDocument();
    await expect.element(page.getByRole('button', { name: 'Close settings' })).toBeInTheDocument();
  });

  it('closes when close button is clicked', async () => {
    useStore.setState({ isSettingsOpen: true });
    await render(<SettingsModal />);

    const closeBtn = page.getByRole('button', { name: 'Close settings' });
    await userEvent.click(closeBtn);

    expect(useStore.getState().isSettingsOpen).toBe(false);
  });

  it('closes when overlay is clicked', async () => {
    useStore.setState({ isSettingsOpen: true });
    const { container } = await render(<SettingsModal />);

    const overlay = container.querySelector('.fade-in.bg-black\\/80');
    if (overlay) {
      // Using regular DOM click since userEvent checks visibility which might be false for absolute overlay
      (overlay as HTMLElement).click();
    }

    expect(useStore.getState().isSettingsOpen).toBe(false);
  });

  it('clears storage and updates store when Clear Storage is clicked', async () => {
    useStore.setState({
      isSettingsOpen: true,
      saveData: { gameVersion: 'red', generation: 1 } as unknown as import('../../engine/saveParser/index').SaveData,
      manualVersion: 'blue',
    });

    await render(<SettingsModal />);

    // Using the button text based on TacticalButton implementation with SYS.PURGE
    const clearDataBtn = page.getByRole('button', { name: 'Initiate system purge' });
    await userEvent.click(clearDataBtn);

    const wipeStorageBtn = page.getByRole('button', { name: 'Confirm purge' });
    await userEvent.click(wipeStorageBtn);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(saveDB.deleteSave).toHaveBeenCalledWith('last_save_file');
    expect(useStore.getState().saveData).toBeNull();
    expect(useStore.getState().manualVersion).toBeNull();
    expect(useStore.getState().isSettingsOpen).toBe(false);
  });
});
