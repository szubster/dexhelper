import { expect, test, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import type { BinjgbWrapper } from '../../../emulator/wasm/binjgb/BinjgbWrapper';
import * as useBinjgbModule from '../../../hooks/useBinjgb';
import { BinjgbEmulator } from './BinjgbEmulator';

// Mock the hook
vi.mock('../../../hooks/useBinjgb', () => ({
  useBinjgb: vi.fn<() => ReturnType<typeof useBinjgbModule.useBinjgb>>(),
}));

test('renders correctly when ready', async () => {
  const startMock = vi.fn<() => void>();
  const pauseMock = vi.fn<() => void>();
  const resetMock = vi.fn<() => void>();
  const loadRomMock = vi.fn<(romBuffer: Uint8Array) => void>();

  vi.mocked(useBinjgbModule.useBinjgb).mockReturnValue({
    emulator: {} as BinjgbWrapper,
    isReady: true,
    error: null,
    start: startMock,
    pause: pauseMock,
    reset: resetMock,
    loadRom: loadRomMock,
    extractSaveState: vi.fn<() => Uint8Array | null>(),
    setJoypadState: vi.fn<(state: number) => void>(),
  });

  const { getByTestId, getByText } = await render(<BinjgbEmulator />);

  await expect.element(getByTestId('emulator-canvas')).toBeInTheDocument();
  await expect.element(getByText('BINJGB [GEN 1/2]')).toBeInTheDocument();

  // Test start button
  const startBtn = getByTestId('btn-start');
  await startBtn.click();
  expect(startMock).toHaveBeenCalled();

  // Test pause button
  const pauseBtn = getByTestId('btn-pause');
  await pauseBtn.click();
  expect(pauseMock).toHaveBeenCalled();

  // Test reset button
  const resetBtn = getByTestId('btn-reset');
  await resetBtn.click();
  expect(resetMock).toHaveBeenCalled();
});

test('shows error state', async () => {
  vi.mocked(useBinjgbModule.useBinjgb).mockReturnValue({
    emulator: null,
    isReady: false,
    error: new Error('WASM Load Failed'),
    start: vi.fn<() => void>(),
    pause: vi.fn<() => void>(),
    reset: vi.fn<() => void>(),
    loadRom: vi.fn<(romBuffer: Uint8Array) => void>(),
    extractSaveState: vi.fn<() => Uint8Array | null>(),
    setJoypadState: vi.fn<(state: number) => void>(),
  });

  const { getByText } = await render(<BinjgbEmulator />);

  await expect.element(getByText('Emulator Error')).toBeInTheDocument();
  await expect.element(getByText('WASM Load Failed')).toBeInTheDocument();
});

test('shows initializing state', async () => {
  vi.mocked(useBinjgbModule.useBinjgb).mockReturnValue({
    emulator: null,
    isReady: false,
    error: null,
    start: vi.fn<() => void>(),
    pause: vi.fn<() => void>(),
    reset: vi.fn<() => void>(),
    loadRom: vi.fn<(romBuffer: Uint8Array) => void>(),
    extractSaveState: vi.fn<() => Uint8Array | null>(),
    setJoypadState: vi.fn<(state: number) => void>(),
  });

  const { getByText, getByTestId } = await render(<BinjgbEmulator />);

  await expect.element(getByText('INITIALIZING SYS...')).toBeInTheDocument();

  // Buttons should be disabled
  const startBtn = getByTestId('btn-start');
  await expect.element(startBtn).toBeDisabled();
});

test('handles keyboard input mapping', async () => {
  const setJoypadStateMock = vi.fn<(state: number) => void>();

  vi.mocked(useBinjgbModule.useBinjgb).mockReturnValue({
    emulator: {} as BinjgbWrapper,
    isReady: true,
    error: null,
    start: vi.fn<() => void>(),
    pause: vi.fn<() => void>(),
    reset: vi.fn<() => void>(),
    loadRom: vi.fn<(romBuffer: Uint8Array) => void>(),
    extractSaveState: vi.fn<() => Uint8Array | null>(),
    setJoypadState: setJoypadStateMock,
  });

  const { getByTestId } = await render(<BinjgbEmulator />);

  // Start to enable input
  await getByTestId('btn-start').click();

  // Test KeyDown
  window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
  expect(setJoypadStateMock).toHaveBeenCalledWith(1); // RIGHT

  // Test KeyUp
  window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight' }));
  expect(setJoypadStateMock).toHaveBeenCalledWith(0); // CLEAR
});
