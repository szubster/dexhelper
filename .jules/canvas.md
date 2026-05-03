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

## 2026-04-21 - [Accepted] - 🖼️ Canvas: Tactical Assistant Target Lock Layout
**What:** Redesigned the AssistantSuggestionCard component to use a tactical "Target Lock" aesthetic, utilizing dashed borders, radar scanlines, corner crosshairs, and monospaced telemetry fonts.
**Outcome:** Accepted
**Why:** The layout reinforces the "snooping" and utility-driven fantasy of a Pokédex, creating a more cohesive, high-contrast, and thematic presentation for the Assistant feature rather than a generic UI card.
**Pattern:** Strive for visual density and maximizing thematic aesthetics (like radar/telemetry) while keeping important data readable through visual separation.

## 2025-05-20 - [Accepted] - 🖼️ Canvas: Tactical Pokedex Card Redesign
**What:** Redesigned the PokedexCard component to use a tactical aesthetic with dashed borders, sharp corners, telemetry fonts, corner crosshairs, and a hover radar scanner effect.
**Outcome:** Accepted
**Why:** The tactical layout fits the overarching "snooping" fantasy of the app perfectly, making the generic grid look more like a specialized piece of hardware.
**Pattern:** Apply tactical aesthetics (sharp borders, corner crosshairs, monospace fonts, scanning effects) to dense grid views to elevate the hardware feel without compromising density.

## 2025-05-24 - [Accepted] - 🖼️ Canvas: Tactical Data Dossier Layout for PokemonDetails
**What:** Redesigned the `PokemonDetails` component to fully lean into the utility-driven tactical aesthetic. Replaced the rounded modal and "glass card" header with sharp, unrounded edges, dashed borders, a grid-overlay target-lock sprite container, and monospace telemetry text/badges.
**Outcome:** Accepted
**Why:** The layout reinforces the "snooping" and utility-driven fantasy of a Pokédex, matching the success of the tactical grid views and correcting the failure of the previous "polished holographic" layout.
**Pattern:** Continue expanding the tactical/hardware UI patterns (sharp borders, dashed outlines, corner crosshairs, monospace fonts) to major components, moving away from generic rounded "glassmorphism" web UI where appropriate.

## 2025-06-01 - [Accepted] - 🖼️ Canvas: Tactical Search Terminal Layout
**What:** Redesigned the `SearchAndFilters` component to use a tactical hardware search terminal design, replacing the rounded generic glassmorphism inputs with sharp dashed outlines, corner crosshairs, telemetry labels ("Database Scan"), and precise hardware-style filter toggles.
**Outcome:** Accepted
**Why:** Continues the successful strategy of establishing a specialized hardware UI aesthetic, improving visual cohesion across the application layout alongside the grid and details views.
**Pattern:** Extend the tactical hardware motif to structural app navigation elements (search bars, filters), replacing rounded forms with sharp utilitarian structures.

## 2025-05-25 - [Rejected] - 🖼️ Canvas: Tactical Storage Grid Redesign
**What:** Redesigned StorageGrid to match the utility-driven tactical "snooping" aesthetic, featuring sharp, dashed-border unit cards, corner crosshairs, monospace telemetry headers ("SYS.DIR"), and radar scanline effects.
**Outcome:** Rejected → journaled
**Why:** The maintainer correctly pointed out that the card UI was largely a duplicate of `PokedexCard.tsx`, violating DRY principles, and requested a refactor to reuse the component instead of copying the layout.
**Pattern:** When applying a successful design pattern to a new area, ensure the underlying components are refactored for reuse rather than duplicating complex UI markup (like the tactical card layout and scanline effects).

## 2025-06-05 - [Accepted] - 🖼️ Canvas: Tactical Bottom Navigation Redesign
**What:** Redesigned the `BottomNav` component on mobile devices to use a tactical hardware interface. Replaced generic icons and rounded shapes with a squared-off bottom dock containing a gradient lip, dashed top border, corner crosshairs on the active indicator, pulsating "● LINK_ACTIVE" telemetry label, and monospace `SYS.DEX`, `SYS.STRG`, `SYS.ASST`, `SYS.MENU` text.
**Outcome:** Accepted
**Why:** Brings the mobile bottom navigation in line with the rest of the application's heavily tactical, snooping-focused aesthetic (like the Grid, Details, and Search). The sharp shapes and telemetry details enhance the illusion of holding a specialized hardware device instead of a generic web app.
**Pattern:** Ensure structural and navigation components strictly adhere to the tactical aesthetics (sharp edges, corner crosshairs, monospace text) to maintain overall visual coherence.
## 2025-06-10 - [Accepted] - 🖼️ Canvas: Tactical Settings Terminal Redesign
**What:** Redesigned the Settings modal and its child components to match the utility-driven tactical "snooping" aesthetic, replacing rounded "glassmorphism" with sharp, dashed borders, corner crosshairs, and monospace telemetry text (e.g., `SYS.CONFIG`, `SYS.PURGE`).
**Outcome:** Accepted
**Why:** Continues the successful strategy of establishing a specialized hardware UI aesthetic, improving visual cohesion across the application's structural and configuration menus.
**Pattern:** Consistently apply the tactical hardware motif (sharp edges, dashed outlines, monospace text) to all modal and configuration interfaces to maintain the illusion of a specialized device.

## 2025-06-15 - [Accepted] - 🖼️ Canvas: Tactical SyncProgress Redesign
**What:** Redesigned the `SyncProgress` component to match the utility-driven tactical "snooping" aesthetic, replacing rounded glassmorphism with sharp, dashed borders, corner crosshairs, and a horizontal segmented progress bar with monospace telemetry text.
**Outcome:** Accepted
**Why:** Continues the successful strategy of establishing a specialized hardware UI aesthetic, improving visual cohesion across the application's loading and synchronization interfaces.
**Pattern:** Consistently apply the tactical hardware motif (sharp edges, dashed outlines, monospace text, linear progress over smooth circles) to loading screens to maintain the illusion of a specialized device.

## 2025-06-20 - [Accepted] - 🖼️ Canvas: Tactical Location Suggestions Redesign
**What:** Redesigned the `LocationSuggestions` component (search dropdown and selected location chip) to fully embrace the utility-driven tactical "snooping" aesthetic. Replaced all rounded glassmorphism with sharp edges (`rounded-none`), dashed borders, `CornerCrosshairs`, scanline overlays, and monospaced telemetry fonts (e.g. `[ SCAN RESULTS ]`).
**Outcome:** Accepted
**Why:** Brings the location search interface in line with the rest of the application's tactical hardware motif (matching grid views, Search & Filters, and BottomNav).
**Pattern:** Consistently eliminate generic web UI patterns (rounded corners, soft hover states) in favor of sharp, high-contrast, terminal-like aesthetics for search components.

## 2025-06-25 - [Accepted] - 🖼️ Canvas: Tactical AppLayout Redesign
**What:** Redesigned the `AppLayout` component to match the utility-driven tactical "snooping" aesthetic, replacing rounded glassmorphism with sharp, dashed borders, corner crosshairs, and monospaced telemetry text for all navigation and settings controls.
**Outcome:** Accepted
**Why:** Brings the main structural shell of the application in line with the rest of the application's heavily tactical, snooping-focused aesthetic (like the Grid, Details, Search, BottomNav, and Settings).
**Pattern:** Ensure the top-level structural components adhere to the tactical aesthetics (sharp edges, corner crosshairs, monospace text) to maintain overall visual coherence.

## 2025-06-30 - [Accepted] - 🖼️ Canvas: Tactical VersionModal Redesign
**What:** Redesigned the `VersionModal` component to fully embrace the utility-driven tactical "snooping" aesthetic. Replaced all rounded glassmorphism with sharp edges (`rounded-none`), dashed borders, `CornerCrosshairs`, radar scanline hover effects, and monospaced telemetry fonts (`SYS.VERSION_CONFLICT`).
**Outcome:** Accepted
**Why:** Brings the version conflict resolution interface in line with the rest of the application's tactical hardware motif (matching AppLayout, Settings, and SyncProgress).
**Pattern:** Consistently eliminate generic web UI patterns (rounded corners, soft hover states) in favor of sharp, high-contrast, terminal-like aesthetics for modals.
