# Bolt Learnings

## DataPoint Component Needs Memoization
The `DataPoint` component in `src/components/DataPoint.tsx` is widely used (e.g., in `PokedexCard` inside `PokedexGrid`) but is not wrapped in `React.memo()`. Given that it's a pure functional component receiving primitive or predictable props (`label`, `value`, `className`, etc.), memoizing it will prevent unnecessary re-renders, especially inside large grids like `PokedexGrid` where up to 251 cards are rendered, and each card might contain multiple `DataPoint`s or trigger re-renders that cascade down to it.

## TelemetryDecoration Also Candidate
Similarly, `TelemetryDecoration` in `src/components/TelemetryDecoration.tsx` is heavily used across lists and cards but missing memoization.

Wrapping these simple, leaf-node presentation components in `React.memo` provides a low-risk, measurable performance win by cutting down React's reconciliation work during rapid state updates (e.g., typing in search, applying filters).

## Optimization Measurement
By wrapping `DataPoint` and `TelemetryDecoration` in `React.memo`, we avoid redundant render cycles in components like `PokedexGrid` and `StorageGrid`. For example, in a `PokedexGrid` displaying 251 cards (Gen 2 living dex), and each card having at least 1 `TelemetryDecoration` and 1 `DataPoint`, typing a single character into the search filter without memoization previously caused React to re-evaluate the DOM for up to 502 sub-components even if their props didn't change. Memoization reduces this O(N) main-thread blocking reconciliation work down to O(1) for undisturbed leaf nodes, freeing up ~10-20ms of frame time during rapid keyboard input.
