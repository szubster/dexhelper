import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useStore } from '../../store';
import { getGenerationConfig } from '../../utils/generationConfig';
import { VersionModal } from '../VersionModal';

describe('VersionModal', () => {
  beforeEach(() => {
    useStore.setState({
      isVersionModalOpen: false,
      saveData: null,
      manualVersion: null,
    });
  });

  afterEach(() => {
    useStore.setState({ isVersionModalOpen: false });
  });

  it('should not render anything when isVersionModalOpen is false', async () => {
    await render(<VersionModal />);

    await expect.element(page.getByText('SYS.CONFLICT')).not.toBeInTheDocument();
  });

  it('should render fallback versions when saveData is null', async () => {
    useStore.setState({ isVersionModalOpen: true });
    await render(<VersionModal />);

    // Modal title should exist
    const elements = page.getByText('SYS.CONFLICT');
    await expect.element(elements.first()).toBeInTheDocument();

    // Should have Gen 1 and Gen 2 labels
    const gen1Versions = getGenerationConfig(1).versions;
    const gen2Versions = getGenerationConfig(2).versions;

    for (const v of [...gen1Versions, ...gen2Versions]) {
      await expect.element(page.getByText(v.label, { exact: true })).toBeInTheDocument();
    }
  });

  it('should render proper versions when saveData has generation data', async () => {
    useStore.setState({
      isVersionModalOpen: true,
      // biome-ignore lint/suspicious/noExplicitAny: minimal mock
      saveData: { generation: 1 } as any,
    });

    await render(<VersionModal />);

    const elements = page.getByText('SYS.CONFLICT');
    await expect.element(elements.first()).toBeInTheDocument();

    // Should only have Gen 1 labels
    const gen1Versions = getGenerationConfig(1).versions;
    for (const v of gen1Versions) {
      await expect.element(page.getByText(v.label, { exact: true })).toBeInTheDocument();
    }

    // Gen 2 labels should not exist
    const gen2Versions = getGenerationConfig(2).versions;
    for (const v of gen2Versions) {
      await expect.element(page.getByText(v.label, { exact: true })).not.toBeInTheDocument();
    }
  });

  it('should handle clicking on a version button', async () => {
    useStore.setState({ isVersionModalOpen: true });
    await render(<VersionModal />);

    const redButton = page.getByRole('button', { name: 'Select Red version' });
    await expect.element(redButton).toBeInTheDocument();

    await redButton.click();

    const storeState = useStore.getState();
    expect(storeState.manualVersion).toBe('red');
    expect(storeState.isVersionModalOpen).toBe(false);
  });
});
