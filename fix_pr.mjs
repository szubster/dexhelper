// The user asks about `det: [{}]`.
// Those empty objects appear because the trigger is `level-up` (default `1`, which gets omitted by the `compact` function in the generator script to save space) and there are no other constraints.
// For example, Eevee evolves into Sylveon or Leafeon. Leafeon's evolution condition was "level up near a Moss Rock". Since "location" is not captured in `PokeApiEvolutionDetail` in our code, it just looks like a normal `level-up`.
// We can just reply and explain this!
