import type React from 'react';
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
export function PokemonSprite({
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

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Fallback to official artwork if generation-specific sprite fails
    e.currentTarget.src = genConfig.fallbackSpriteUrl(pokemonId);
    // Call custom error handler if provided
    onError?.(e);
  };

  return (
    <img
      src={genConfig.spriteUrl(pokemonId, isShiny)}
      alt={alt ?? `Pokémon #${pokemonId}`}
      className={`pixelated ${className}`}
      style={{ imageRendering: 'pixelated', ...style }}
      loading={loading}
      onError={handleError}
    />
  );
}
