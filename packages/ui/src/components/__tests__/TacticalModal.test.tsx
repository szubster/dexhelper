import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { TacticalModal } from '../TacticalModal';

describe('TacticalModal', () => {
  it('renders null when not open', async () => {
    await render(<TacticalModal isOpen={false}>Test Content</TacticalModal>);
    await expect.element(page.getByText('Test Content')).not.toBeInTheDocument();
  });

  it('renders content when open', async () => {
    await render(<TacticalModal isOpen={true}>Test Content</TacticalModal>);
    await expect.element(page.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when escape is pressed', async () => {
    const handleClose = vi.fn<() => void>();
    await render(
      <TacticalModal isOpen={true} onClose={handleClose}>
        Test Content
      </TacticalModal>
    );
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
