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

## 2026-05-06 - [Accepted] - 🖼️ Canvas: Tactical AssistantPanel Redesign
**What:** Redesigned the `AssistantPanel` component to match the utility-driven tactical "snooping" aesthetic, replacing rounded glassmorphism with sharp borders, corner crosshairs, and monospaced telemetry text.
**Outcome:** Accepted
**Why:** Continues the successful strategy of establishing a specialized hardware UI aesthetic, improving visual cohesion across the application's structural and assistant views.
**Pattern:** Consistently apply the tactical hardware motif (sharp edges, dashed outlines, monospace text) to major panels to maintain the illusion of a specialized device.

## 2026-05-15 - [Accepted] - 🖼️ Canvas: Tactical Details Panel Redesign
**What:** Replaced the rounded generic `GlassCard` with `TacticalPanel` across the Details sub-components (`PokemonLocations`, `PokemonEvolutions`, `PokemonCaughtDetails`, `PokemonCatchProbability`), enforcing sharp edges, dashed borders, and `CornerCrosshairs`. Also deeply redesigned the `PokemonCatchProbability` to use a sharp segmented control interface for HP instead of a rounded slider, and added color-coded dynamic telemetry to the probability output.
**Outcome:** Accepted
**Why:** Brings the rest of the application's details cards perfectly in line with the heavily tactical, snooping-focused aesthetic (like the Grid and Details wrapper), correcting the failure of the previous "glassmorphism" style.
**Pattern:** Ensure structural and navigation components strictly adhere to the tactical aesthetics (sharp edges, corner crosshairs, monospace text) to maintain overall visual coherence. Eliminate rounded native inputs (like range sliders) where possible to lean into specialized hardware terminal designs.

## 2026-05-18 - [Accepted] - 🖼️ Canvas: Tactical Assistant Subcomponents Redesign
**What:** Redesigned the inner subcomponents of the Assistant feature, specifically the `AssistantDebugView` and the inner elements of `AssistantSuggestionCard` (encounter groups, chance badges, rod indicators). Replaced all generic rounded borders, glass effects, and soft pill badges with `TacticalPanel`, sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry headers (e.g. `[ SYS.DIAGNOSTICS ]`, `[ MISSING_ROD ]`).
**Outcome:** Accepted
**Why:** Brings the smaller utility and debugging interfaces within the Assistant tab in line with the rest of the application's heavily tactical, snooping-focused aesthetic. The sharp shapes and telemetry details enhance the illusion of looking at a specialized hardware diagnostic view rather than a generic dashboard.
**Pattern:** Ensure that even nested components, diagnostic views, and small indicator badges adhere to the tactical aesthetics (sharp edges, dashed borders, monospace text) to maintain overall visual coherence deep within complex component trees.

## 2026-05-19 - [Accepted] - 🖼️ Canvas: Tactical Details Subcomponents (Inner Elements)
**What:** Redesigned the inner elements (badges, nested panels) of the `PokemonLocations`, `PokemonEvolutions`, `PokemonCatchProbability`, and `PokemonCaughtDetails` components. Replaced all remaining rounded corners (`rounded-2xl`, `rounded-lg`, `rounded-md`, `rounded-full`, etc.) with sharp edges (`rounded-none`) and replaced generic borders with dashed borders (`border-dashed`).
**Outcome:** Accepted
**Why:** While the outer wrappers were previously updated to the TacticalPanel, many inner elements still retained generic web UI patterns (rounded corners). This change fully commits the deep component tree of the Details view to the project's strict tactical hardware/snooping aesthetic (ADR 008).
**Pattern:** Ensure that even deeply nested elements (like location chips, evolution method badges, and coordinate markers) adhere to the tactical aesthetics (sharp edges, dashed borders) to maintain absolute visual coherence and avoid breaking the hardware illusion.

## 2026-05-20 - [Accepted] - 🖼️ Canvas: Tactical Grid Views (Storage/Pokedex) Redesign
**What:** Redesigned the `StorageGrid` and `PokedexGrid` components to fully embrace the tactical "snooping" aesthetic. Replaced all rounded glassmorphism in empty states with `<TacticalPanel>` and monospace telemetry headers (`[ EMPTY ]`, `[ SYS.QUERY_FAILED ]`). Replaced all rounded badges (`rounded-lg`, `rounded-full`) in `PokedexCard` with sharp, dashed telemetry tags. Removed rounded corners from the `TacticalCard` storage variants.
**Outcome:** Accepted
**Why:** Brings the final remaining generic web UI patterns within the main list and grid views in line with the heavily tactical, specialized hardware motif, solidifying the application's unique visual identity.
**Pattern:** Consistently eliminate generic web UI patterns (rounded corners, soft hover states, circular dot indicators) in favor of sharp, high-contrast, terminal-like telemetry tags and borders to maintain the specialized device illusion.

## 2025-06-26 - [Rejected] - 🖼️ Canvas: Tactical SideNav Redesign
**What:** Extracted the desktop navigation links from the `AppHeader` into a dedicated, vertically-oriented `SideNav` component. Reconfigured `AppLayout` to display this sidebar alongside the main content area on larger screens (`sm:flex`).
**Outcome:** Rejected → journaled
**Why:** The maintainer preferred the previous look with the navigation items integrated into the top header.
**Pattern:** While vertical sidebars are common for dashboards, avoid moving core navigation out of the top header for desktop layouts, as it changes the structural feel too drastically for the maintainer's preference. Keep navigation integrated into `AppLayout`/`AppHeader` or `BottomNav`.

## 2026-05-20 - [Accepted] - 🖼️ Canvas: Tactical GlobalError Redesign
**What:** Redesigned the `GlobalError` component to fully embrace the tactical "snooping" aesthetic by replacing the generic styled `div` with `<TacticalPanel variant="red">`.
**Outcome:** Accepted
**Why:** Brings the error messaging interface in line with the heavily tactical, specialized hardware motif, solidifying the application's unique visual identity. Tactical panels automatically include dashed borders, LCD grid backgrounds, scanlines, and corner crosshairs.
**Pattern:** Consistently utilize `TacticalPanel` and matching variants (e.g. `red` for errors) instead of building custom styles with raw elements, ensuring a unified UI language across all system notifications.

## 2026-06-05 - [Accepted] - 🖼️ Canvas: Tactical SettingsControls Redesign
**What:** Redesigned the Settings controls (Version, Living Dex, Ball Style) to remove native `<select>` dropdowns and slide toggles, replacing them with tactile, hardware-style button grids and sharp segmented controls.
**Outcome:** Accepted
**Why:** Brings the interactive inputs of the settings panel in line with the rest of the application's heavily tactical, specialized hardware motif, correcting the generic web UI elements previously used.
**Pattern:** Consistently eliminate generic web UI patterns (native `<select>` dropdowns, default sliding toggles) in favor of sharp, high-contrast, terminal-like button grids or segmented controls to maintain the specialized device illusion.

## 2026-06-10 - [Accepted] - 🖼️ Canvas: Tactical BottomNav Redesign
**What:** Redesigned the `BottomNav` component (the mobile bottom navigation bar) to fully embrace the tactical "snooping" hardware aesthetic. Replaced the generic sliding background box with a sharp, dashed-border hardware frame, complete with `CornerCrosshairs` (`border-t-[3px] border-l-[3px]`), a scanning laser line (`animate-[scan_2s_linear_infinite]`), and monospaced bracketed text (e.g. `[ DEX ]`). Added LCD flicker and pulse animations to the active tab to simulate an active terminal state.
**Outcome:** Accepted
**Why:** Brings the mobile navigation interface tightly in line with the rest of the application's established tactical hardware motif (matching `AppLayout`, `Grid`, and `Details`), correcting the previous web-standard smooth transitions.
**Pattern:** Ensure mobile layout structural components adhere to strict tactical aesthetics (sharp borders, corner crosshairs, scanning/flicker animations, monospace telemetry text) rather than generic app-like smoothed navigation bars, to maintain the specialized device illusion.

## 2026-06-25 - [Accepted] - 🖼️ Canvas: Tactical Search Console Redesign
**What:** Wrapped the entire `SearchAndFilters` component in a `<TacticalPanel>`, giving it a `[ SYS.QUERY_TERMINAL ]` telemetry header and redesigning the filter toggles below the search input as an interconnected segmented control to match settings configurations instead of side-scrolling pills.
**Outcome:** Accepted
**Why:** Brings the search console vertically closer to the top-level application aesthetic by eliminating standard layouts in favor of the established sharp-edged, dashed-border hardware terminal layout.
**Pattern:** Combine related navigation and filtering inputs into unified `<TacticalPanel>` structures rather than letting inputs float freely, and utilize segmented controls over generic pill arrays for filters.
