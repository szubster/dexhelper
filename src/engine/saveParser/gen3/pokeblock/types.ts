export const PokeblockColor = {
  None: 0,
  Red: 1,
  Blue: 2,
  Pink: 3,
  Green: 4,
  Yellow: 5,
  Purple: 6,
  Indigo: 7,
  Brown: 8,
  LiteBlue: 9,
  Olive: 10,
  Gray: 11,
  Black: 12,
  White: 13,
  Gold: 14,
} as const;

export type PokeblockColor = (typeof PokeblockColor)[keyof typeof PokeblockColor];

export interface Gen3Pokeblock {
  color: PokeblockColor;
  spicy: number;
  dry: number;
  sweet: number;
  bitter: number;
  sour: number;
  feel: number;
}
