import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { Gen3Ribbons } from '../../../../engine/saveParser/parsers/common';
import { ContestRibbonsPanel } from '../ContestRibbonsPanel';

describe('ContestRibbonsPanel', () => {
  it('renders badges when ribbons are present', async () => {
    const ribbons: Gen3Ribbons = {
      cool: 1, // Normal
      beauty: 2, // Super
      cute: 3, // Hyper
      smart: 4, // Master
      tough: 0, // None
      champion: false,
      winning: false,
      victory: false,
      artist: false,
      effort: false,
      battleChampion: false,
      regionalChampion: false,
      nationalChampion: false,
      country: false,
      national: false,
      earth: false,
      world: false,
      obedience: false,
    };

    await render(<ContestRibbonsPanel ribbons={ribbons} />);

    // Renders the header
    await expect.element(page.getByText('[ ACQUIRED_RIBBONS ]')).toBeInTheDocument();

    // Renders the badges with correct type and rank texts based on mappings
    await expect.element(page.getByText('Cool', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Normal')).toBeInTheDocument();

    await expect.element(page.getByText('Beauty', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Super')).toBeInTheDocument();

    await expect.element(page.getByText('Cute', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Hyper')).toBeInTheDocument();

    await expect.element(page.getByText('Smart', { exact: true })).toBeInTheDocument();
    await expect.element(page.getByText('Master')).toBeInTheDocument();

    // Does not render a badge if rank is 0
    await expect.element(page.getByText('Tough', { exact: true })).not.toBeInTheDocument();
  });

  it('renders nothing if all ribbons are 0', async () => {
    const ribbons: Gen3Ribbons = {
      cool: 0,
      beauty: 0,
      cute: 0,
      smart: 0,
      tough: 0,
      champion: false,
      winning: false,
      victory: false,
      artist: false,
      effort: false,
      battleChampion: false,
      regionalChampion: false,
      nationalChampion: false,
      country: false,
      national: false,
      earth: false,
      world: false,
      obedience: false,
    };

    const result = await render(<ContestRibbonsPanel ribbons={ribbons} />);
    expect(result.container.firstChild).toBeNull();
  });
});
