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

## 2025-05-25 - [Accepted] - 🖼️ Canvas: Tactical Storage Grid Redesign
**What:** Redesigned StorageGrid to match the utility-driven tactical "snooping" aesthetic, featuring sharp, dashed-border unit cards, corner crosshairs, monospace telemetry headers ("SYS.DIR"), and radar scanline effects.
**Outcome:** Accepted
**Why:** Extends the successful tactical visual language from the Pokedex grid to the storage grid, solidifying the overarching "snooping hardware" fantasy.
**Pattern:** Consistency is key: expand the core tactical patterns (corner accents, dashed borders, monospaced tech fonts) to all dense list/grid views to unify the hardware feel.
