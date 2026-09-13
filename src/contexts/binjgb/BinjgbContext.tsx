import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { BinjgbWrapper } from '../../emulator/wasm/binjgb/BinjgbWrapper';
import type { BinjgbModule } from '../../emulator/wasm/binjgb/types';

interface BinjgbContextValue {
  emulator: BinjgbWrapper | null;
  isReady: boolean;
  error: Error | null;
  loadRom: (romBuffer: Uint8Array) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const BinjgbContext = createContext<BinjgbContextValue | null>(null);

interface BinjgbProviderProps {
  children: ReactNode;
  moduleFactory: () => Promise<BinjgbModule>;
}

export function BinjgbProvider({ children, moduleFactory }: BinjgbProviderProps) {
  const [emulator, setEmulator] = useState<BinjgbWrapper | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const isInitializing = useRef(false);

  useEffect(() => {
    let mounted = true;

    async function initEmulator() {
      if (isInitializing.current || emulator) return;
      isInitializing.current = true;

      try {
        const wrapper = new BinjgbWrapper();
        await wrapper.init(moduleFactory);
        if (mounted) {
          setEmulator(wrapper);
          setIsReady(true);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (mounted) {
          isInitializing.current = false;
        }
      }
    }

    void initEmulator();

    return () => {
      mounted = false;
      // Depending on Binjgb's lifecycle needs, you might want to call something on unmount
      // if (emulator) { ... }
    };
  }, [moduleFactory, emulator]);

  const loadRom = (romBuffer: Uint8Array) => {
    if (emulator) {
      emulator.loadRom(romBuffer);
    }
  };

  const start = () => {
    if (emulator) {
      emulator.start();
    }
  };

  const pause = () => {
    if (emulator) {
      emulator.pause();
    }
  };

  const reset = () => {
    if (emulator) {
      emulator.reset();
    }
  };

  return (
    <BinjgbContext.Provider value={{ emulator, isReady, error, loadRom, start, pause, reset }}>
      {children}
    </BinjgbContext.Provider>
  );
}

export function useBinjgb(): BinjgbContextValue {
  const context = useContext(BinjgbContext);
  if (!context) {
    throw new Error('useBinjgb must be used within a BinjgbProvider');
  }
  return context;
}
