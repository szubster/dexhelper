import { Pokedex } from 'pokeapi-js-wrapper';

export const pokeapi = new Pokedex({
  cache: true,
  cacheImages: false
});
