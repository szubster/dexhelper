// eslint-disable-next-line @typescript-eslint/unbound-method
import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { BinjgbModule } from '../../emulator/wasm/binjgb/types';
import { BinjgbProvider, useBinjgb } from './BinjgbContext';

// Mock components to consume the context
function TestComponent() {
  const { isReady, error, loadRom, start, pause, reset } = useBinjgb();

  return (
    <div>
      <div data-testid="status">{isReady ? 'Ready' : 'Not Ready'}</div>
      {error && <div data-testid="error">{error.message}</div>}
      <button type="button" data-testid="btn-load" onClick={() => loadRom(new Uint8Array([1, 2, 3]))}>
        Load ROM
      </button>
      <button type="button" data-testid="btn-start" onClick={start}>
        Start
      </button>
      <button type="button" data-testid="btn-pause" onClick={pause}>
        Pause
      </button>
      <button type="button" data-testid="btn-reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

test('BinjgbProvider initializes correctly', async () => {
  const mockModuleFactory = vi.fn<() => Promise<BinjgbModule>>().mockResolvedValue({} as BinjgbModule);

  const { getByTestId } = await render(
    <BinjgbProvider moduleFactory={mockModuleFactory}>
      <TestComponent />
    </BinjgbProvider>,
  );

  // Wait for the context to become ready
  await expect.element(getByTestId('status')).toHaveTextContent('Ready');
  expect(mockModuleFactory).toHaveBeenCalled();
});

test('BinjgbProvider handles initialization errors', async () => {
  const mockModuleFactory = vi.fn<() => Promise<BinjgbModule>>().mockRejectedValue(new Error('Init failed'));

  const { getByTestId } = await render(
    <BinjgbProvider moduleFactory={mockModuleFactory}>
      <TestComponent />
    </BinjgbProvider>,
  );

  await expect.element(getByTestId('error')).toHaveTextContent('Init failed');
  await expect.element(getByTestId('status')).toHaveTextContent('Not Ready');
});

test('useBinjgb exposes emulator controls', async () => {
  const mockModule: BinjgbModule = {
    HEAPU8: new Uint8Array(10),
    _malloc: vi.fn<(size: number) => number>().mockReturnValue(0),
    _free: vi.fn<(ptr: number) => void>(),
    _emulator_init: vi.fn<(romPtr: number, romSize: number) => number>(),
    _emulator_run: vi.fn<() => void>(),
    _emulator_pause: vi.fn<() => void>(),
    _emulator_reset: vi.fn<() => void>(),
  };
  const mockModuleFactory = vi.fn<() => Promise<BinjgbModule>>().mockResolvedValue(mockModule);

  const { getByTestId } = await render(
    <BinjgbProvider moduleFactory={mockModuleFactory}>
      <TestComponent />
    </BinjgbProvider>,
  );

  await expect.element(getByTestId('status')).toHaveTextContent('Ready');

  await getByTestId('btn-load').click();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(mockModule._malloc).toHaveBeenCalledWith(3);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(mockModule._emulator_init).toHaveBeenCalledWith(0, 3);

  await getByTestId('btn-start').click();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(mockModule._emulator_run).toHaveBeenCalled();

  await getByTestId('btn-pause').click();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(mockModule._emulator_pause).toHaveBeenCalled();

  await getByTestId('btn-reset').click();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(mockModule._emulator_reset).toHaveBeenCalled();
});
