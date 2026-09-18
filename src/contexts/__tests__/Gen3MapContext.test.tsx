import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { Gen3MapProvider, useGen3Map } from '../Gen3MapContext';

const TestComponent = () => {
  const { state, setState } = useGen3Map();

  return (
    <div>
      <div data-testid="zoom">{state.zoomLevel}</div>
      <button type="button" onClick={() => setState((prev) => ({ ...prev, zoomLevel: 2 }))} data-testid="zoom-in">
        Zoom In
      </button>
    </div>
  );
};

describe('Gen3MapContext', () => {
  it('provides default state and allows state updates', async () => {
    const screen = await render(
      <Gen3MapProvider>
        <TestComponent />
      </Gen3MapProvider>,
    );

    await expect.element(screen.getByTestId('zoom')).toHaveTextContent('1');

    await screen.getByTestId('zoom-in').click();

    await expect.element(screen.getByTestId('zoom')).toHaveTextContent('2');
  });
});
