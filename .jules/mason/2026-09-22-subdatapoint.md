## SubDataPoint Extraction

- **What**: Extracted repeated compact tactical key-value cell pattern (`flex flex-col gap-1 bg-zinc-950/80 p-3`) into a reusable `<SubDataPoint>` component in `src/components/SubDataPoint.tsx`.
- **Why**: Reduced duplicated JSX across `PokemonCaughtDetails.tsx` where sub-metrics (`OT_ID`, `HELD_ITEM`, `SYNC_RATE`, `POKERUS_STRAIN`) were styled identically.
- **Key Learnings**:
  - `SubDataPoint` complements `DataPoint` by focusing on secondary grid/table sub-metrics with compact 8px labels and 11px values.
  - Supporting both `value` (for plain strings/numbers) and `children` (for custom JSX like status badges or progress bars) makes small data presentation components extremely flexible.
