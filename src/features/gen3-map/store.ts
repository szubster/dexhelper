import { create } from 'zustand';

export interface Gen3MapState {
  layers: {
    routes: boolean;
    cities: boolean;
    pois: boolean;
  };
  selectedFeatureId: string | null;
  toggleLayer: (layer: 'routes' | 'cities' | 'pois') => void;
  setSelectedFeatureId: (id: string | null) => void;
}

export const useGen3MapStore = create<Gen3MapState>((set) => ({
  layers: {
    routes: true,
    cities: true,
    pois: true,
  },
  selectedFeatureId: null,
  toggleLayer: (layer) =>
    set((state) => ({
      layers: {
        ...state.layers,
        [layer]: !state.layers[layer],
      },
    })),
  setSelectedFeatureId: (id) => set({ selectedFeatureId: id }),
}));
