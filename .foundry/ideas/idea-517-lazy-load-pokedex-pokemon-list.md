---
type: IDEA
status: READY
owner_persona: product_manager
depends_on: []
---

# Idea: Lazy Load Pokedex Grid Items and Virtualization

## Context
Currently, `PokedexGrid.tsx` renders the full list of Pokemon (up to the max dex of a generation, e.g. 251 for Gen 2, 386 for Gen 3) simultaneously into the DOM using `PokedexCard` components.
While some decoupling has been implemented using `useDeferredValue` for searches and `React.memo` on the `PokedexCard`, rendering hundreds of non-trivial React components upfront can block the main thread, increase initial memory footprint, and slow down TTI (Time to Interactive). There is currently no lazy loading or virtualization of this list.

## Proposal
1. Implement list virtualization (using a library like `@tanstack/react-virtual` which is already in dependencies) for the `PokedexGrid` component.
2. Only render the `PokedexCard`s that are currently in the viewport, which reduces DOM node count drastically.
3. Potentially split/lazy load some heavy SVGs or sub-components inside `PokedexCard` (like `PokemonSprite`) if they continue to cause bundle bloat, though virtualization should solve the immediate DOM render bottleneck.

## Value Proposition
- Massive reduction in initial DOM rendering time.
- Smoother scrolling experience on mobile and low-end devices.
- Less memory usage, avoiding Garbage Collection pauses when navigating away from the Pokedex grid.

## Next Steps
- [ ] prd-517-lazy-load-pokedex-pokemon-list
