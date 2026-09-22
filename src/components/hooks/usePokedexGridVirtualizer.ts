import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';

export function usePokedexGridVirtualizer({
  count,
  estimateSize = () => 140,
}: {
  count: number;
  estimateSize?: (index: number) => number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        if (width >= 1280)
          setColumns(4); // xl
        else if (width >= 1024)
          setColumns(3); // lg
        else if (width >= 640)
          setColumns(2); // sm
        else setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // oxlint-disable-next-line react/incompatible-library
  const virtualizer = useVirtualizer({
    count: Math.ceil(count / columns),
    getScrollElement: () => document.documentElement,
    estimateSize,
    overscan: 2,
  });

  return { containerRef, columns, virtualizer };
}
