import React from 'react';
import { getGenerationConfig } from '../../utils/generationConfig';

interface PokemonSpriteProps {
  pokemonId: number;
  generation: number;
  isShiny?: boolean;
  alt?: string;
  className?: string;
  /** Custom CSS styles to apply */
  style?: React.CSSProperties;
  /** Loading strategy for the img element */
  loading?: 'lazy' | 'eager';
  /** Optional error handler */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Shared Pokémon sprite component that always uses the correct generation-specific
 * sprite URL from generationConfig. Eliminates hardcoded sprite URLs across components.
 */
// ⚡ Bolt: Wrapped in React.memo to prevent unnecessary image re-evaluations across large list views (PC storage and Pokedex grids)
export const PokemonSprite = React.memo(function PokemonSprite({
  pokemonId,
  generation,
  isShiny = false,
  alt,
  className = '',
  style,
  loading = 'lazy',
  onError,
}: PokemonSpriteProps) {
  const genConfig = getGenerationConfig(generation);
  const primaryUrl = genConfig.spriteUrl(pokemonId, isShiny);
  const fallbackUrl = genConfig.fallbackSpriteUrl(pokemonId);

  const [prevPrimaryUrl, setPrevPrimaryUrl] = React.useState<string>(primaryUrl);
  const [imgSrc, setImgSrc] = React.useState<string>(primaryUrl);
  const [hasFailedFallback, setHasFailedFallback] = React.useState<boolean>(false);

  if (primaryUrl !== prevPrimaryUrl) {
    setPrevPrimaryUrl(primaryUrl);
    setImgSrc(primaryUrl);
    setHasFailedFallback(false);
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (imgSrc !== fallbackUrl && !hasFailedFallback) {
      setImgSrc(fallbackUrl);
      onError?.(e);
    } else if (!hasFailedFallback) {
      setHasFailedFallback(true);
      setImgSrc('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>');
      onError?.(e);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt ?? `Pokémon #${pokemonId}`}
      className={`pixelated ${className}`}
      style={{ imageRendering: 'pixelated', ...style }}
      loading={loading}
      onError={handleError}
    />
  );
});
