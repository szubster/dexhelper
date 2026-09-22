import React from 'react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { usePokedexGridVirtualizer } from '../usePokedexGridVirtualizer';

function TestComponent({ width = 800 }: { width?: number }) {
  const { containerRef, columns, virtualizer } = usePokedexGridVirtualizer({ count: 100 });

  React.useEffect(() => {
    if (containerRef.current) {
      Object.defineProperty(containerRef.current, 'offsetWidth', { configurable: true, value: width });
      // Trigger resize event to force update
      window.dispatchEvent(new Event('resize'));
    }
  }, [width, containerRef]);

  return (
    <div ref={containerRef} style={{ width: `${width}px`, height: '400px', display: 'block' }} data-testid="container">
      <div data-testid="columns">{columns}</div>
      <div data-testid="v-length">{virtualizer.getVirtualItems().length}</div>
    </div>
  );
}

describe('usePokedexGridVirtualizer', () => {
  it('calculates columns for mobile', async () => {
    await render(<TestComponent width={400} />);
    const cols = page.getByTestId('columns');
    await expect.element(cols).toHaveTextContent('1');
  });

  it('calculates columns for tablet', async () => {
    await render(<TestComponent width={700} />);
    const cols = page.getByTestId('columns');
    await expect.element(cols).toHaveTextContent('2');
  });

  it('calculates columns for laptop', async () => {
    await render(<TestComponent width={1100} />);
    const cols = page.getByTestId('columns');
    await expect.element(cols).toHaveTextContent('3');
  });

  it('calculates columns for desktop', async () => {
    await render(<TestComponent width={1300} />);
    const cols = page.getByTestId('columns');
    await expect.element(cols).toHaveTextContent('4');
  });
});
