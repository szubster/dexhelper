/**
 * Output structure for the Smart Route Radar.
 * Maps an areaId to a heatmap data object.
 */
export interface RouteRadarHeatmap {
  [areaId: number]: {
    density: number;
    requiresMachBike: boolean;
    requiresAcroBike: boolean;
  };
}

export interface ItemRequirement {
  type: 'item';
  itemId: string;
}

export interface HMRequirement {
  type: 'hm';
  hmId: string;
}

export interface BikeRequirement {
  type: 'bike';
  bikeType: 'mach' | 'acro' | 'any';
}

export interface LogicalRequirement {
  type: 'logical';
  operator: 'AND' | 'OR';
  requirements: GatingRequirement[];
}

export type GatingRequirement = ItemRequirement | HMRequirement | BikeRequirement | LogicalRequirement;

export interface GatingContext {
  hasItem(itemId: string): boolean;
  hasHM(hmId: string): boolean;
  hasBike(bikeType: 'mach' | 'acro' | 'any'): boolean;
}
