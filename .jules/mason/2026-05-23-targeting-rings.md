## TargetingRings Component Extraction

- **What**: Extracted the repeated dual concentric rotating targeting rings pattern into a reusable `<TargetingRings>` component.
- **Why**: Reduced duplicated JSX across `PokedexCard.tsx` and `StorageGrid.tsx`.
- **Key Learnings**:
  - Encapsulating visual hover decorations into a dedicated component with `pointer-events-none absolute inset-0` standardizes the card hover experience without interfering with card click listeners.
  - Exposing `outerClassName` and `innerClassName` props alongside standard `className` (`cn`) ensures flexibility if specific cards need distinct ring styling or colors.
