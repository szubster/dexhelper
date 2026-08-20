# Tactical Checklist Item Extraction

Identified a recurring pattern for checklist items used across:
- `Gen2NpcTrades.tsx`
- `Gen3NpcTrades.tsx`
- `Gen2Checklist.tsx`
- `HiddenItemsChecklist.tsx`
- `VisitedRoutesChecklist.tsx`

The repeated JSX is a div representing an acquired/unacquired state:
```jsx
<div
  className={cn(
    'group relative flex items-center gap-3 rounded-none border border-dashed p-3 transition-colors',
    acquired ? 'border-emerald-900/50 bg-emerald-950/10' : 'border-zinc-800 bg-zinc-950/50',
  )}
>
  {acquired ? <Check className="h-4 w-4 shrink-0 text-emerald-500" /> : <CircleDot className="h-4 w-4 shrink-0 text-zinc-600" />}
  <div className="flex min-w-0 flex-col">
    <span className={cn('truncate font-bold font-mono text-xs uppercase tracking-wider', acquired ? 'text-zinc-500 line-through' : 'text-zinc-300')}>
      {label}
    </span>
  </div>
</div>
```

Created `TacticalChecklistItem` to extract this pattern and applied it to the 5 component files. This enhances component modularity and centralizes styling, conforming perfectly with the tactical theme in ADR 008.

**Learnings**:
Extracting standard dashboard indicator item/checklist item combinations is an effective way to simplify dashboard components. Adding options like `showCrosshairs`, `subtitle` and `interactive` handles the slight variations required across different checklist types (e.g., Hidden Items with sub-labels, vs simple flag checks).
