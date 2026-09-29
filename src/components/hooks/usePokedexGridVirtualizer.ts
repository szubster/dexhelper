import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';

export function usePokedexGridVirtualizer({
  count,
  estimateSize = () => 366,
  overscan = 2,
}: {
  count: number;
  estimateSize?: (index: number) => number;
  overscan?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);
  const [scrollMargin, setScrollMargin] = useState(0);

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

  useEffect(() => {
    if (containerRef.current) {
      setScrollMargin(containerRef.current.offsetTop);
    }
  }, []);

  // oxlint-disable-next-line react/incompatible-library
  const virtualizer = useWindowVirtualizer({
    count: Math.ceil(count / columns),
    estimateSize,
    overscan,
    scrollMargin,
  });

  return { containerRef, columns, virtualizer };
}
