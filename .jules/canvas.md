## 2025-04-18 - [Rejected] - 🖼️ Canvas: Holographic dynamic-color hero layout for PokemonDetails
**What:** Redesigned the PokemonDetails component to use a holographic projection hero layout with a dynamic ambient glow backdrop extracted from the Pokemon's sprite.
**Outcome:** Rejected → journaled
**Why:** Maintainer felt the previous design was better as it looked more like "snooping for Pokémon", aligning better with the app's core fantasy/feel than a polished high-tech hologram.
**Pattern:** Avoid overly slick, polished "high-tech" designs. The UI should prioritize the "snooping" / utility-driven feel of an actual Pokédex over flashy holographic effects.

## 2025-05-15 - [Rejected] - 🖼️ Canvas: StorageGrid Terminal Layout
**What:** Redesigned StorageGrid to use a split PC Terminal layout with a sidebar for locations, replacing the endless scrolling list.
**Outcome:** Rejected → journaled
**Why:** Maintainer pointed out that clicking on boxes instead of scrolling is more problematic, especially on mobile devices.
**Pattern:** Avoid replacing vertical scrolling with click-to-navigate tab/sidebar layouts when the number of items is high (like 14+ boxes), as it can degrade the mobile experience.

## 2025-06-25 - [Consolidated Learning] - 🖼️ Canvas: Tactical Hardware UI Aesthetic
**What:** Extensively redesigned major application components (PokemonDetails, PokedexCard, AssistantSuggestionCard, SearchAndFilters, BottomNav, Settings, SyncProgress, AppLayout) to replace generic "glassmorphism" web UI with a unified tactical "snooping" aesthetic.
**Outcome:** Accepted across multiple PRs.
**Why:** This aesthetic—characterized by sharp edges (`rounded-none`), dashed borders, corner crosshairs, radar scanlines, and monospaced telemetry fonts—better reinforces the core fantasy of operating a specialized Pokédex hardware device.
**Pattern:** Consistently apply the tactical hardware motif across all structural and interactive components to maintain the illusion of a specialized device. When extending this pattern to new areas (e.g., StorageGrid), ensure underlying components are refactored for reuse rather than duplicating complex UI markup (violating DRY).
