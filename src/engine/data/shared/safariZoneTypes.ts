export interface SafariEncounter {
  pokemon: number;
  chance: number;
  minLevel: number;
  maxLevel: number;
  method: string;
}

export interface SafariArea {
  name: string;
  encounters: {
    red?: SafariEncounter[];
    blue?: SafariEncounter[];
    yellow?: SafariEncounter[];
    [version: string]: SafariEncounter[] | undefined;
  };
}
