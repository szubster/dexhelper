# Grid Image Loading & Scroll Virtualization

## Overview
This document outlines the architecture, root causes, and solutions for sprite loading and virtual scroll synchronization across Dexhelper grids (`PokedexGrid` and `StorageGrid`).

## 1. Root Cause Analysis: Missing / Stalled Sprites
When loading a game save and viewing the Pokédex or Storage grids on mobile and desktop, images appeared to never show or stay permanently loading due to three compounded issues:

1. **Sprite Invisibility from CSS Filters (`brightness-0 opacity-10`)**:
   - In `PokedexCard.tsx`, when no save was loaded, `isUnseen` evaluated to `false`, rendering full-contrast sprites.
   - Once a save file was uploaded, any Pokémon not recorded as seen or owned was flagged with `isUnseen = true`.
   - The card applied `isUnseen ? 'opacity-10 brightness-0' : ...`.
   - In CSS, `filter: brightness(0)` turns every pixel pitch black (#000000), and `opacity: 0.1` renders it 10% opaque.
   - Placed on top of the card's dark background (`bg-black/40` and `to-black/80`), the sprite became completely invisible to the human eye. Accompanied by the scanning ambient animation, this was perceived by users as a broken/hanging image loader.

2. **Native Lazy Loading Stalls in Custom Scroll Containers**:
   - `PokemonSprite.tsx` previously defaulted to `loading = 'lazy'`.
   - In Chromium and WebKit browsers, when `loading="lazy"` is used inside an element with `overflow-y: auto` (`.custom-scrollbar`) and items are positioned using CSS `transform: translateY(...)` within TanStack Virtualizer, intersection observer heuristics for lazy loading often fail to register intersections during fast or touched scrolling.
   - Because TanStack Virtualizer already virtualizes DOM elements (only rendering 6–10 visible rows at any given time), secondary lazy-loading inside the virtualized slice is unnecessary and counterproductive.
   - Setting `PokemonSprite` default to `loading="eager"` ensures images are immediately requested and rendered the moment a virtual row is mounted.

3. **StorageGrid Virtualizer Scroll Element Mismatch**:
   - `StorageGrid.tsx` used `useWindowVirtualizer`, which registers event listeners on `window`.
   - In Dexhelper, the main scrolling viewport is not `window`, but rather `<div className="custom-scrollbar ...">` in `AppLayout.tsx`.
   - Because `window.scrollY` never changes when scrolling `.custom-scrollbar`, `useWindowVirtualizer` never received scroll events and could not update its virtual items properly during scroll.
   - Migrating `StorageGrid` to `useVirtualizer` with `getScrollElement: () => containerNode?.closest('.custom-scrollbar') ?? document.documentElement` aligns `StorageGrid` with `usePokedexGridVirtualizer`.

## 2. Best Practices & Guidelines
- Always use `useVirtualizer` with `closest('.custom-scrollbar')` for any virtualized list inside `AppLayout`.
- Default sprites in virtualized list cards to `loading="eager"`.
- Communicate Pokémon status (secured, dex-only, seen, unknown) via tactical badges (`[ SECURED ]`, `[ DEX_ONLY ]`, `[ SEEN ]`, `[ UNKNOWN ]`) and card border/accent variants per ADR 008, rather than obliterating image visibility with `brightness-0` or extreme opacity.
