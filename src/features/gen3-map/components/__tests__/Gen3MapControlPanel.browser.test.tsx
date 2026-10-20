import { beforeEach, describe, expect, it } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { useGen3MapStore } from '../../store';
import { Gen3MapControlPanel } from '../Gen3MapControlPanel';

describe('Gen3MapControlPanel', () => {
  beforeEach(() => {
    // Reset the store state before each test
    const store = useGen3MapStore.getState();
    if (!store.layers.routes) store.toggleLayer('routes');
    if (!store.layers.cities) store.toggleLayer('cities');
    if (!store.layers.pois) store.toggleLayer('pois');
    store.setSelectedFeatureId(null);
  });

  it('renders with initial state', async () => {
    await render(<Gen3MapControlPanel />);

    await expect.element(page.getByTestId('layer-routes')).toBeChecked();
    await expect.element(page.getByTestId('layer-cities')).toBeChecked();
    await expect.element(page.getByTestId('layer-pois')).toBeChecked();
    await expect.element(page.getByTestId('selected-feature')).toHaveTextContent('None');
  });

  it('toggles layers when clicked', async () => {
    await render(<Gen3MapControlPanel />);

    const routesCheckbox = page.getByTestId('layer-routes');
    await userEvent.click(routesCheckbox);
    await expect.element(routesCheckbox).not.toBeChecked();

    // Verify store was updated
    expect(useGen3MapStore.getState().layers.routes).toBe(false);
  });

  it('updates selected feature when button is clicked', async () => {
    await render(<Gen3MapControlPanel />);

    const selectBtn = page.getByRole('button', { name: 'Select Route 101' });
    await userEvent.click(selectBtn);

    await expect.element(page.getByTestId('selected-feature')).toHaveTextContent('Route 101');
    expect(useGen3MapStore.getState().selectedFeatureId).toBe('Route 101');

    const clearBtn = page.getByRole('button', { name: 'Clear' });
    await userEvent.click(clearBtn);

    await expect.element(page.getByTestId('selected-feature')).toHaveTextContent('None');
    expect(useGen3MapStore.getState().selectedFeatureId).toBeNull();
  });
});
