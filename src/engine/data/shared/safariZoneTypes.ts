export interface SafariEncounter {
  pokemon: number;
  chance: number;
  minLevel: number;
  maxLevel: number;
  method: string;
}

export interface SafariArea {
  name: string;
  encounters: Record<string, SafariEncounter[]>;
}
