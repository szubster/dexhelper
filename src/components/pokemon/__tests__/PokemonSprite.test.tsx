import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { getGenerationConfig } from '../../../utils/generationConfig';
import { PokemonSprite } from '../PokemonSprite';

describe('PokemonSprite', () => {
  it('renders primary sprite URL initially', async () => {
    const genConfig = getGenerationConfig(1);
    const expectedPrimaryUrl = genConfig.spriteUrl(25, false);

    await render(<PokemonSprite pokemonId={25} generation={1} alt="Pikachu" />);

    const img = page.getByAltText('Pikachu');
    await expect.element(img).toBeInTheDocument();
    await expect.element(img).toHaveAttribute('src', expectedPrimaryUrl);
    await expect.element(img).toHaveAttribute('crossorigin', 'anonymous');
  });

  it('falls back to official artwork on first load error', async () => {
    const genConfig = getGenerationConfig(1);
    const expectedFallbackUrl = genConfig.fallbackSpriteUrl(25);
    const handleError = vi.fn<(e: React.SyntheticEvent<HTMLImageElement>) => void>();

    await render(<PokemonSprite pokemonId={25} generation={1} alt="Pikachu" onError={handleError} />);

    const img = page.getByAltText('Pikachu');
    const imgEl = img.element() as HTMLImageElement;

    imgEl.dispatchEvent(new Event('error'));

    expect(handleError).toHaveBeenCalledTimes(1);
    await expect.element(img).toHaveAttribute('src', expectedFallbackUrl);
  });

  it('switches to transparent placeholder on secondary error to prevent infinite loading loop', async () => {
    const genConfig = getGenerationConfig(1);
    const expectedFallbackUrl = genConfig.fallbackSpriteUrl(25);
    const handleError = vi.fn<(e: React.SyntheticEvent<HTMLImageElement>) => void>();

    await render(<PokemonSprite pokemonId={25} generation={1} alt="Pikachu" onError={handleError} />);

    const img = page.getByAltText('Pikachu');
    const imgEl = img.element() as HTMLImageElement;

    // First error: primary fails -> fallback
    imgEl.dispatchEvent(new Event('error'));
    expect(handleError).toHaveBeenCalledTimes(1);
    await expect.element(img).toHaveAttribute('src', expectedFallbackUrl);

    // Second error: fallback fails -> transparent placeholder
    imgEl.dispatchEvent(new Event('error'));
    expect(handleError).toHaveBeenCalledTimes(2);
    await expect
      .element(img)
      .toHaveAttribute('src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>');

    // Third error: placeholder triggers error -> should be ignored (no further onError calls)
    imgEl.dispatchEvent(new Event('error'));
    expect(handleError).toHaveBeenCalledTimes(2);
  });

  it('resets image state when pokemonId prop changes', async () => {
    const genConfig = getGenerationConfig(1);
    const primaryUrlRaichu = genConfig.spriteUrl(26, false);

    const { rerender } = await render(<PokemonSprite pokemonId={25} generation={1} alt="Pikachu" />);

    const imgPikachu = page.getByAltText('Pikachu');
    const imgEl = imgPikachu.element() as HTMLImageElement;

    // Trigger error on Pikachu
    imgEl.dispatchEvent(new Event('error'));

    // Rerender with Raichu (pokemonId 26)
    await rerender(<PokemonSprite pokemonId={26} generation={1} alt="Raichu" />);

    const imgRaichu = page.getByAltText('Raichu');
    await expect.element(imgRaichu).toBeInTheDocument();
    await expect.element(imgRaichu).toHaveAttribute('src', primaryUrlRaichu);
  });
});
