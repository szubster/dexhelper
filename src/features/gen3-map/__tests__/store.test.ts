import { beforeEach, describe, expect, it } from 'vitest';
import { useGen3MapStore } from '../store';

describe('Gen 3 Map Zustand Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useGen3MapStore.setState({
      layers: {
        routes: true,
        cities: true,
        pois: true,
      },
      selectedFeatureId: null,
    });
  });

  it('should initialize with default state', () => {
    const state = useGen3MapStore.getState();
    expect(state.layers).toEqual({
      routes: true,
      cities: true,
      pois: true,
    });
    expect(state.selectedFeatureId).toBeNull();
  });

  it('should toggle routes layer', () => {
    useGen3MapStore.getState().toggleLayer('routes');
    expect(useGen3MapStore.getState().layers.routes).toBe(false);

    useGen3MapStore.getState().toggleLayer('routes');
    expect(useGen3MapStore.getState().layers.routes).toBe(true);
  });

  it('should toggle cities layer', () => {
    useGen3MapStore.getState().toggleLayer('cities');
    expect(useGen3MapStore.getState().layers.cities).toBe(false);

    useGen3MapStore.getState().toggleLayer('cities');
    expect(useGen3MapStore.getState().layers.cities).toBe(true);
  });

  it('should toggle pois layer', () => {
    useGen3MapStore.getState().toggleLayer('pois');
    expect(useGen3MapStore.getState().layers.pois).toBe(false);

    useGen3MapStore.getState().toggleLayer('pois');
    expect(useGen3MapStore.getState().layers.pois).toBe(true);
  });

  it('should update selected feature id', () => {
    useGen3MapStore.getState().setSelectedFeatureId('route_101');
    expect(useGen3MapStore.getState().selectedFeatureId).toBe('route_101');

    useGen3MapStore.getState().setSelectedFeatureId(null);
    expect(useGen3MapStore.getState().selectedFeatureId).toBeNull();
  });
});
