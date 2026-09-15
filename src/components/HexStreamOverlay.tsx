import React, { useMemo } from 'react';
import { cn } from '../utils/cn';

interface HexStreamOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional classes for the text container.
   */
  textClassName?: string;
  /**
   * Static string to display. If not provided, random hex bytes will be generated based on randomLength.
   */
  staticString?: string;
  /**
   * Number of random hex bytes to generate if staticString is not provided.
   * Default: 32
   */
  randomLength?: number;
  /**
   * Number of times to repeat the string.
   * Default: 1
   */
  repeat?: number;
}

const generateHexStream = (length: number) =>
  Array.from({ length })
    .map(() =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase(),
    )
    .join(' ');

/**
 * Tactical UI element that renders a decorative "hexadecimal stream" text overlay in the background.
 * Matches ADR 008 aesthetic requirements for "snooping / tactical hardware" interfaces.
 */
export const HexStreamOverlay = React.memo(
  React.forwardRef<HTMLDivElement, HexStreamOverlayProps>(
    ({ textClassName, staticString, randomLength = 32, repeat = 1, className, ...props }, ref) => {
      // Use memo to ensure random static text doesn't re-render unpredictably unless props change
      const hexStream = useMemo(() => {
        if (staticString !== undefined) return staticString;
        return generateHexStream(randomLength);
      }, [staticString, randomLength]);

      return (
        <div
          ref={ref}
          className={cn('pointer-events-none absolute inset-0 z-0 flex flex-col justify-end p-2 opacity-10', className)}
          {...props}
        >
          <div className={cn('break-all font-mono text-[10px] text-cyan-400 leading-tight', textClassName)}>
            {hexStream.repeat(repeat)}
          </div>
        </div>
      );
    },
  ),
);

HexStreamOverlay.displayName = 'HexStreamOverlay';
