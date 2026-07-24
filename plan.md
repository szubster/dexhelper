I have identified a repeating JSX pattern in `src/components/pokemon/details/PokemonEvolutions.tsx` and `src/components/pokemon/details/PokemonLocations.tsx`.

The pattern is a "Tactical Block Header" that consists of a tracking label with an icon, a large bold title, and an optional trailing icon in a squared box with tactical styling (shadow, border, etc.).

It takes the form:
```tsx
<div className="flex items-start justify-between border-red-500/20 border-b border-dashed pb-3">
  <div className="flex flex-col gap-1">
    <span className="flex items-center gap-1.5 font-mono text-[9px] text-red-500 uppercase tracking-widest">
      <Target size={10} /> [ OBJECTIVE_LINK ]
    </span>
    <span className="font-black font-display text-white text-xl uppercase tracking-tight drop-shadow-[0_0_5px_rgba(255,255,255,0.1)] transition-colors group-hover:text-red-400">
      PROCUREMENT STRATEGY
    </span>
  </div>
  <div className="flex h-8 w-8 items-center justify-center rounded-none border border-red-500/20 bg-red-500/5 shadow-[inset_0_0_10px_rgba(239,68,68,0.1)]">
    <AlertTriangle size={14} className="text-red-500/60 transition-colors group-hover:text-red-500" />
  </div>
</div>
```

The differences between instances are:
1. `variant`: Controls the color (e.g., red, purple, blue, pink, var(--theme-primary)).
2. `icon`: The React node for the leading icon (e.g., `<Target size={10} />`).
3. `trackingLabel`: The text for the tracking label (e.g., `[ OBJECTIVE_LINK ]`).
4. `title`: The main title text (e.g., `PROCUREMENT STRATEGY`).
5. `trailingIcon`: The optional React node for the trailing icon (e.g., `<AlertTriangle size={14} />`).
6. `className`: For any custom classes like `border-zinc-800/50` for the default primary one in `PokemonLocations.tsx`.

I will create a new component `TacticalBlockHeader` in `src/components/TacticalBlockHeader.tsx` to encapsulate this.

Then, I will replace the instances in `PokemonEvolutions.tsx` and `PokemonLocations.tsx` with this new component.

Finally, I will run the tests and linter, add a journal entry, and submit the changes.
