import { describe, expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { ShinyBadge } from '../ShinyBadge';

describe('ShinyBadge', () => {
  test('returns null when neither isShiny nor isShinyCarrier is true', async () => {
    const { container } = await render(<ShinyBadge isShiny={false} isShinyCarrier={false} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders shiny badge with correct title tooltip when isShiny is true', async () => {
    await render(<ShinyBadge isShiny={true} isShinyCarrier={false} />);
    const badge = page.getByTitle('Shiny Pokémon');
    await expect.element(badge).toBeInTheDocument();
  });

  test('renders shiny carrier badge with correct title tooltip when isShinyCarrier is true', async () => {
    await render(<ShinyBadge isShiny={false} isShinyCarrier={true} />);
    const badge = page.getByTitle('Shiny Carrier');
    await expect.element(badge).toBeInTheDocument();
  });
});
