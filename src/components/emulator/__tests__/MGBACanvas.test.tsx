import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { MGBACanvas } from '../MGBACanvas';

describe('MGBACanvas', () => {
  it('renders canvas and controls', async () => {
    const romData = new Uint8Array([1, 2, 3]);
    const { container } = await render(<MGBACanvas romData={romData} />);

    await expect.element(container.querySelector('canvas')).toBeInTheDocument();
    await expect.element(container.querySelector('button')).toBeInTheDocument();
  });
});
