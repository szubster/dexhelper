import { useCallback, useEffect, useRef, useState } from 'react';
import { useBinjgb } from '../../../hooks/useBinjgb';

// Bitmask definition for standard joypad
// Right=1, Left=2, Up=4, Down=8, A=16, B=32, Select=64, Start=128
const BUTTONS = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
  A: 16,
  B: 32,
  SELECT: 64,
  START: 128,
};

const KEY_MAP: Record<string, number> = {
  ArrowRight: BUTTONS.RIGHT,
  ArrowLeft: BUTTONS.LEFT,
  ArrowUp: BUTTONS.UP,
  ArrowDown: BUTTONS.DOWN,
  KeyZ: BUTTONS.A,
  KeyX: BUTTONS.B,
  ShiftRight: BUTTONS.SELECT,
  ShiftLeft: BUTTONS.SELECT,
  Enter: BUTTONS.START,
};

export function BinjgbEmulator() {
  const { isReady, error, start, pause, reset, loadRom, setJoypadState } = useBinjgb();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const joypadState = useRef(0);
  const rafRef = useRef<number>(0);

  const updateJoypad = useCallback(
    (mask: number, isDown: boolean) => {
      if (isDown) {
        joypadState.current |= mask;
      } else {
        joypadState.current &= ~mask;
      }
      setJoypadState(joypadState.current);
    },
    [setJoypadState],
  );

  useEffect(() => {
    if (!isPlaying) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const mask = KEY_MAP[e.code];
      if (mask) {
        updateJoypad(mask, true);
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const mask = KEY_MAP[e.code];
      if (mask) {
        updateJoypad(mask, false);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPlaying, updateJoypad]);

  // Gamepad polling
  useEffect(() => {
    if (!isPlaying) return;

    const pollGamepads = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];

      let gpState = 0;
      for (const gp of gamepads) {
        if (gp) {
          if (gp.buttons[0]?.pressed || gp.buttons[1]?.pressed) gpState |= BUTTONS.A; // A/B
          if (gp.buttons[2]?.pressed || gp.buttons[3]?.pressed) gpState |= BUTTONS.B; // X/Y
          if (gp.buttons[8]?.pressed) gpState |= BUTTONS.SELECT;
          if (gp.buttons[9]?.pressed) gpState |= BUTTONS.START;
          if (gp.buttons[12]?.pressed || (gp.axes[1] !== undefined && gp.axes[1] < -0.5)) gpState |= BUTTONS.UP;
          if (gp.buttons[13]?.pressed || (gp.axes[1] !== undefined && gp.axes[1] > 0.5)) gpState |= BUTTONS.DOWN;
          if (gp.buttons[14]?.pressed || (gp.axes[0] !== undefined && gp.axes[0] < -0.5)) gpState |= BUTTONS.LEFT;
          if (gp.buttons[15]?.pressed || (gp.axes[0] !== undefined && gp.axes[0] > 0.5)) gpState |= BUTTONS.RIGHT;
        }
      }

      const finalState = joypadState.current | gpState;
      setJoypadState(finalState);

      rafRef.current = requestAnimationFrame(pollGamepads);
    };

    rafRef.current = requestAnimationFrame(pollGamepads);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, setJoypadState]);

  useEffect(() => {
    if (canvasRef.current) {
      // Setup handled by WASM
    }
  }, []);

  const handleStart = () => {
    start();
    setIsPlaying(true);
  };

  const handlePause = () => {
    pause();
    setIsPlaying(false);
  };

  if (error) {
    return (
      <div className="tactical-panel border-red-500/50 p-4 text-red-500">
        <h3 className="tactical-text mb-2 font-bold">Emulator Error</h3>
        <p className="font-mono text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="tactical-panel mx-auto flex w-full max-w-2xl flex-col items-center gap-4 p-4">
      <div className="flex w-full items-center justify-between border-zinc-800 border-b border-dashed pb-2">
        <h2 className="tactical-text text-lg">BINJGB [GEN 1/2]</h2>
        <div className="flex gap-2">
          <div
            className={`h-2 w-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-zinc-600'} ${isReady && isPlaying ? 'animate-pulse' : ''}`}
          />
          <span className="tactical-text text-xs text-zinc-500">
            {isReady ? (isPlaying ? 'RUNNING' : 'READY') : 'INIT'}
          </span>
        </div>
      </div>

      <div className="scanline-overlay relative flex aspect-[10/9] w-full items-center justify-center border-2 border-zinc-800 bg-black">
        <canvas
          ref={canvasRef}
          id="canvas"
          className="pixelated h-full w-full object-contain"
          width={160}
          height={144}
          data-testid="emulator-canvas"
        />
        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <span className="tactical-text animate-pulse">INITIALIZING SYS...</span>
          </div>
        )}
      </div>

      <div className="flex w-full flex-wrap justify-center gap-2">
        <button
          type="button"
          className="tactical-button"
          onClick={handleStart}
          disabled={!isReady || isPlaying}
          data-testid="btn-start"
        >
          [ START ]
        </button>
        <button
          type="button"
          className="tactical-button"
          onClick={handlePause}
          disabled={!isReady || !isPlaying}
          data-testid="btn-pause"
        >
          [ PAUSE ]
        </button>
        <button type="button" className="tactical-button" onClick={reset} disabled={!isReady} data-testid="btn-reset">
          [ RESET ]
        </button>
        <button
          type="button"
          className="tactical-button"
          onClick={() => loadRom(new Uint8Array([0x00]))}
          disabled={!isReady}
          data-testid="btn-load"
        >
          [ LOAD DUMMY ROM ]
        </button>
      </div>

      <div className="mt-2 w-full border-zinc-800 border-t border-dashed pt-2">
        <h3 className="tactical-text mb-2 text-xs text-zinc-500">CONTROLS (KEYBOARD)</h3>
        <div className="grid grid-cols-2 gap-2 font-mono text-xs text-zinc-400">
          <div>D-PAD: Arrow Keys</div>
          <div>A: Z / B: X</div>
          <div>START: Enter</div>
          <div>SELECT: Shift</div>
        </div>
      </div>
    </div>
  );
}
