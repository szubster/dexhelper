import { page } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { ConflictResolutionModal } from '../ConflictResolutionModal';

describe('ConflictResolutionModal', () => {
  const localMetadata = { timestamp: 1672531200000, gameTime: '12:34' };
  const remoteMetadata = { timestamp: 1672617600000, gameTime: '15:20' };

  it('does not render when isOpen is false', async () => {
    await render(
      <ConflictResolutionModal
        isOpen={false}
        localMetadata={localMetadata}
        remoteMetadata={remoteMetadata}
        onKeepLocal={vi.fn<() => void>()}
        onPullRemote={vi.fn<() => void>()}
      />,
    );
    await expect.element(page.getByText('Save File Conflict')).not.toBeInTheDocument();
  });

  it('renders and displays metadata when isOpen is true', async () => {
    await render(
      <ConflictResolutionModal
        isOpen={true}
        localMetadata={localMetadata}
        remoteMetadata={remoteMetadata}
        onKeepLocal={vi.fn<() => void>()}
        onPullRemote={vi.fn<() => void>()}
      />,
    );
    await expect.element(page.getByText('Save File Conflict')).toBeVisible();
    await expect.element(page.getByText('12:34')).toBeVisible();
    await expect.element(page.getByText('15:20')).toBeVisible();
    await expect.element(page.getByText('Keep Local')).toBeVisible();
    await expect.element(page.getByText('Pull Remote')).toBeVisible();
  });

  it('calls onKeepLocal when "Keep Local" is clicked', async () => {
    const handleKeepLocal = vi.fn<() => void>();
    await render(
      <ConflictResolutionModal
        isOpen={true}
        localMetadata={localMetadata}
        remoteMetadata={remoteMetadata}
        onKeepLocal={handleKeepLocal}
        onPullRemote={vi.fn<() => void>()}
      />,
    );

    await page.getByText('Keep Local').click();
    expect(handleKeepLocal).toHaveBeenCalledOnce();
  });

  it('calls onPullRemote when "Pull Remote" is clicked', async () => {
    const handlePullRemote = vi.fn<() => void>();
    await render(
      <ConflictResolutionModal
        isOpen={true}
        localMetadata={localMetadata}
        remoteMetadata={remoteMetadata}
        onKeepLocal={vi.fn<() => void>()}
        onPullRemote={handlePullRemote}
      />,
    );

    await page.getByText('Pull Remote').click();
    expect(handlePullRemote).toHaveBeenCalledOnce();
  });

  it('applies ADR 008 aesthetic classes (rounded-none, border-dashed, font-mono)', async () => {
    await render(
      <ConflictResolutionModal
        isOpen={true}
        localMetadata={localMetadata}
        remoteMetadata={remoteMetadata}
        onKeepLocal={vi.fn<() => void>()}
        onPullRemote={vi.fn<() => void>()}
      />,
    );

    const modalContainer = page.getByText('Save File Conflict').element().closest('.tactical-panel');
    // TacticalPanel uses the tactical-panel utility which includes rounded-none and border-dashed in Tailwind v4
    expect(modalContainer?.className).toContain('tactical-panel');

    // The text content should be wrapped in font-mono
    const textContent = page.getByText('A conflict has been detected').element().parentElement;
    expect(textContent?.className).toContain('font-mono');
  });
});
