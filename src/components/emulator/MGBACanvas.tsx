import { useEffect, useRef, useState } from 'react';
import { MGBAWasmWrapper } from '../../emulator/mgba/MGBAWasmWrapper';
import type { MGBAConfig } from '../../emulator/mgba/types';
import { TacticalButton } from '../TacticalButton';

interface MGBACanvasProps {
  romData: Uint8Array;
}

export function MGBACanvas({ romData: _romData }: MGBACanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setWrapper] = useState<MGBAWasmWrapper | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const config: MGBAConfig = {
      canvas: canvasRef.current,
      onReady: () => setIsReady(true),
      onError: (err) => setError(err.message),
    };

    const newWrapper = new MGBAWasmWrapper(config);
    setWrapper(newWrapper);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 font-mono">
      <div className="relative flex items-center justify-center border border-emerald-500/30 border-dashed bg-black/50 p-2">
        <canvas
          ref={canvasRef}
          width={240}
          height={160}
          className="border border-white/10"
          style={{ imageRendering: 'pixelated' }}
        />
        {!isReady && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-emerald-500">
            [ INITIALIZING... ]
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-red-500">
            [ ERROR: {error} ]
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2">
        <TacticalButton
          variant="primary"
          disabled={!isReady}
          onClick={() => {
            // to be implemented
          }}
        >
          PAUSE
        </TacticalButton>
        <TacticalButton
          variant="default"
          disabled={!isReady}
          onClick={() => {
            // to be implemented
          }}
        >
          RESUME
        </TacticalButton>
      </div>
    </div>
  );
}
