# Proposal: Exceptions to ADR 008 Tactical Aesthetic

## Context
ADR 008 (`.foundry/archive/docs/adrs/008-graph-rendering-library-selection.md`) mandates a strict "tactical hardware/snooping" aesthetic, specifically enforcing sharp edges (`rounded-none`). The custom linter (`scripts/verify-adr-compliance.ts`) enforces this by forbidding classes like `rounded`, `rounded-md`, `rounded-full`, etc.
However, visual inspection of the codebase reveals that `rounded-full` is currently being used extensively for specific, logically rounded UI elements that fit the tactical aesthetic.

## Findings
The `rounded-full` utility is currently used in the following components for specific purposes:
1. Physical Screws/Hardware Mounts: Used in `src/components/AppLayout.tsx`, `src/components/BottomNav.tsx`, and `src/components/StorageGrid.tsx` to represent physical screws or mount points on the hardware bezel.
2. Targeting Rings/Crosshairs: Used in `src/components/PokedexCard.tsx`, `src/components/VersionModal.tsx`, and `src/components/dashboard/pokegear/ActiveCallersDashboard.tsx` for radar-like pinging animations and circular targeting reticles.
3. Status Indicator Dots: Used in `src/components/AppHeader.tsx`, `src/components/SyncProgress.tsx`, and `src/components/dashboard/pokegear/TacticalCallerCard.tsx` to represent glowing LED status lights or connection signals.

## Proposed Exceptions
We propose an exception to ADR 008 to explicitly allow the `rounded-full` utility class only for the following specific use cases, as they enhance the tactical hardware aesthetic rather than detract from it:
1. Physical hardware screws and mount points.
2. Radar/sonar pings, targeting rings, and circular reticles.
3. Small LED-style status indicator dots.

We should remove `rounded-full` from the globally banned list in the linter to allow these specific hardware elements, while continuing to strictly ban general rounded corners (`rounded-sm`, `rounded-md`, `rounded-lg`, etc.) for generic UI panels and buttons.