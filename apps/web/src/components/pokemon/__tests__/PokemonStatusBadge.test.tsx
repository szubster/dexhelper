import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokemonStatusBadge } from '../PokemonStatusBadge';

describe('PokemonStatusBadge', () => {
  it('renders SECURED badge for shiny pokemon in storage', async () => {
    await render(<PokemonStatusBadge hasInStorage={true} isOwnedInDex={false} isSeenInDex={false} isShiny={true} />);
    await expect.element(page.getByText('[ SECURED ]')).toBeInTheDocument();
  });

  it('renders SECURED badge for normal pokemon in storage', async () => {
    await render(<PokemonStatusBadge hasInStorage={true} isOwnedInDex={true} isSeenInDex={true} isShiny={false} />);
    await expect.element(page.getByText('[ SECURED ]')).toBeInTheDocument();
  });

  it('renders DEX_ONLY badge', async () => {
    await render(<PokemonStatusBadge hasInStorage={false} isOwnedInDex={true} isSeenInDex={true} isShiny={false} />);
    await expect.element(page.getByText('[ DEX_ONLY ]')).toBeInTheDocument();
  });

  it('renders SEEN badge', async () => {
    await render(<PokemonStatusBadge hasInStorage={false} isOwnedInDex={false} isSeenInDex={true} isShiny={false} />);
    await expect.element(page.getByText('[ SEEN ]')).toBeInTheDocument();
  });

  it('renders UNKNOWN badge when not seen', async () => {
    await render(<PokemonStatusBadge hasInStorage={false} isOwnedInDex={false} isSeenInDex={false} isShiny={false} />);
    await expect.element(page.getByText('[ UNKNOWN ]')).toBeInTheDocument();
  });
});
