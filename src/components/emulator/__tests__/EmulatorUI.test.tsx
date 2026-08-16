import { describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { romDB } from '../../../db/RomDB';
import { EmulatorUI } from '../EmulatorUI';

vi.mock('../../../db/RomDB', () => ({
  romDB: {
    putRom: vi.fn<(id: string, data: Uint8Array) => Promise<void>>(),
  },
}));

describe('EmulatorUI', () => {
  it('renders the drop zone and file input', async () => {
    const { container } = await render(<EmulatorUI />);

    await expect.element(container.querySelector<HTMLElement>('[data-testid="drop-zone"]')).toBeInTheDocument();
    await expect.element(container.querySelector<HTMLElement>('[data-testid="file-input"]')).toBeInTheDocument();
  });

  it('handles file selection via input', async () => {
    const { container } = await render(<EmulatorUI />);

    const file = new File(['dummy content'], 'test.gba', { type: 'application/octet-stream' });

    const inputElement = container.querySelector('[data-testid="file-input"]') as HTMLInputElement;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    Object.defineProperty(inputElement, 'files', {
      value: dataTransfer.files,
      configurable: true,
      writable: true,
    });

    const changeEvent = new Event('change', { bubbles: true, cancelable: true });
    inputElement.dispatchEvent(changeEvent);

    // Wait for React state to update after async handleFile
    await new Promise((resolve) => setTimeout(resolve, 50));

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(romDB.putRom).toHaveBeenCalledWith('test.gba', expect.any(Uint8Array));

    await expect.element(container.querySelector<HTMLElement>('[data-testid="success-message"]')).toBeInTheDocument();
  });
});
