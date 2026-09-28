import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';

export function usePokedexGridVirtualizer({
  count,
  estimateSize = () => 366,
  overscan = 1000,
}: {
  count: number;
  estimateSize?: (index: number) => number;
  overscan?: number;
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
  const virtualizer = useWindowVirtualizer({
    count: Math.ceil(count / columns),
    estimateSize,
    overscan,
  });

  return { containerRef, columns, virtualizer };
}
