import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { SafariAreaMap } from '../SafariAreaMap';
import type { GameVersion } from '../useSafariZoneSelection';

test('renders SafariAreaMap with provided areas', async () => {
  const selection = {
    version: 'leafgreen' as GameVersion,
    setVersion: () => {},
    targetPokemon: 123,
    setTargetPokemon: () => {},
    availableAreas: [{ name: 'kanto-safari-zone-area-2-north', encounters: {} }],
  };

  await render(<SafariAreaMap selection={selection} />);

  await expect.element(page.getByText('AREA MAP')).toBeVisible();
  await expect.element(page.getByText('kanto safari zone area 2 north', { exact: false })).toBeVisible();
});
