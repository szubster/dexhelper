import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { Gen3MapProvider } from '../../../../contexts/Gen3MapContext';
import { Gen3MapDashboard } from '../Gen3MapDashboard';

test('Gen3MapDashboard renders and displays context state', async () => {
  await render(
    <Gen3MapProvider>
      <Gen3MapDashboard />
    </Gen3MapProvider>,
  );

  await expect.element(page.getByText('Gen 3 Map Dashboard')).toBeVisible();
  await expect.element(page.getByText('Zoom Level:')).toBeVisible();
  await expect.element(page.getByText('1', { exact: true }).first()).toBeVisible(); // Default zoom level
  await expect.element(page.getByText('Selected Location ID:')).toBeVisible();
  await expect.element(page.getByText('None', { exact: true }).first()).toBeVisible(); // Default selected location
});
