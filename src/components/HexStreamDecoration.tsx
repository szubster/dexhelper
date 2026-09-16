import { useEffect, useState } from 'react';

function generateHexStream(length: number) {
  let result = '';
  const characters = '0123456789ABCDEF';
  const randomValues = globalThis.crypto.getRandomValues(new Uint8Array(length));
  for (let i = 0; i < length; i++) {
    result += characters.charAt((randomValues[i] || 0) & 0x0f);
  }
  return result;
}

// ⚡ Bolt: Extracted hex stream animation to a separate component to isolate 100ms re-renders from the main UI
export function HexStreamDecoration({ active }: { active: boolean }) {
  const [hexStream, setHexStream] = useState(generateHexStream(32));

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        setHexStream(generateHexStream(32));
      }, 100);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [active]);

  return <div className="break-all font-mono text-[10px] text-cyan-400 leading-tight">{hexStream.repeat(5)}</div>;
}
