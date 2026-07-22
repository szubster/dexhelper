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

## 2026-05-28 - [Accepted] - 🖼️ Canvas: Tactical AppHeader Bezel Redesign
**What:** Redesigned the `AppHeader` component from a floating, rounded "sticky top-2" layout into a rigid, edge-to-edge tactical hardware bezel.
**Outcome:** Accepted
**Why:** Brings the main structural header of the application fully in line with the heavily tactical, specialized hardware motif, eliminating the generic "web-app" floating header feel.
**Pattern:** Ensure structural top-level components adhere strictly to tactical aesthetics (sharp borders, edge-to-edge placement, dense telemetry layouts) rather than generic app-like floating bars to maintain the specialized device illusion.
## 2026-06-25 - [Accepted] - 🖼️ Canvas: Tactical Search Console Redesign
**What:** Wrapped the entire `SearchAndFilters` component in a `<TacticalPanel>`, giving it a `[ SYS.QUERY_TERMINAL ]` telemetry header and redesigning the filter toggles below the search input as an interconnected segmented control to match settings configurations instead of side-scrolling pills.
**Outcome:** Accepted
**Why:** Brings the search console vertically closer to the top-level application aesthetic by eliminating standard layouts in favor of the established sharp-edged, dashed-border hardware terminal layout.
**Pattern:** Combine related navigation and filtering inputs into unified `<TacticalPanel>` structures rather than letting inputs float freely, and utilize segmented controls over generic pill arrays for filters.

## 2026-06-30 - [Accepted] - 🖼️ Canvas: Tactical AliveTeamView Redesign
**What:** Redesigned the `AliveTeamView` component to fully embrace the tactical "snooping" aesthetic by wrapping it in a `<TacticalPanel variant="emerald">`, using `<TelemetryDecoration>` for headers, removing rounded generic cards in favor of sharp, dashed borders with `CornerCrosshairs`, and implementing a segmented HP bar for team members. The Team Wipe state was also upgraded to a massive `<TacticalPanel variant="red">` CRT error screen.
**Outcome:** Accepted
**Why:** Brings the run tracking/team interface in line with the established specialized hardware motif, solidifying the application's unique visual identity. Tactical panels, telemetry decorations, and segmented controls reinforce the snooping fantasy.
**Pattern:** Consistently eliminate generic web UI patterns (rounded corners, standard cards, simple text stats) in favor of sharp, high-contrast, terminal-like telemetry elements and segmented displays to maintain the specialized device illusion.
## 2026-06-26 - [Accepted] - 🖼️ Canvas: Tactical SyncProgress Redesign
**What:** Redesigned the `SyncProgress` component to fully embrace the tactical "snooping" aesthetic by wrapping it in a `<TacticalPanel>` instead of a generic glassmorphism container. Converted the smooth sliding progress bar into a tactical segmented block visual.
**Outcome:** Accepted
**Why:** Brings the loading state interface in line with the heavily tactical, specialized hardware motif. Wrapping loaders and sync views in `TacticalPanel` ensures they fit the "terminal scanning" visual identity of the rest of the application.
**Pattern:** Consistently utilize `TacticalPanel` for utility and overlay elements instead of relying on custom styled divs with generic shadows and blurs, and replace standard progress indicators with segmented, tactical layouts.

## 2026-07-05 - [Accepted] - 🖼️ Canvas: Tactical Run Tracker Subcomponents Redesign
**What:** Redesigned `GraveyardView` and `VisitedRoutesChecklist` to fully embrace the tactical "snooping" aesthetic by wrapping them in `<TacticalPanel>` instead of plain `<div>`s or generic classes. The headers were upgraded to use `<TelemetryDecoration>`. Additionally, the inner elements (graveyard cards, route list items) were redesigned with sharp, dashed borders and `<CornerCrosshairs>` to match the `AliveTeamView` components.
**Outcome:** Accepted
**Why:** Brings the run tracker's subcomponents deeply in line with the established specialized hardware motif, eliminating generic web UI shapes. Tactical panels and telemetry decorations reinforce the snooping fantasy and maintain consistency across complex views.
**Pattern:** Ensure even deeply nested subcomponents (like graveyard grids and route lists) adhere strictly to tactical aesthetics (sharp borders, corner crosshairs, telemetry decorations) to maintain absolute visual coherence and prevent reverting to generic structural layouts.
## 2026-07-06 - [Accepted] - 🖼️ Canvas: Tactical Assistant Readout Redesign
**What:** Redesigned `AssistantPanel` and `AssistantSuggestionCard` to fully embrace the tactical "snooping" aesthetic. Wrapped the card background in `<LcdGrid>` for a CRT effect, added a `<HoverScanner>` line animation, used sharp dashed borders, and introduced pulsing "TARGET ACQUIRED" telemetry badges. Upgraded text to strictly uppercase monospace.
**Outcome:** Accepted
**Why:** Brings the Assistant view entirely in line with the terminal scanning and data stream motifs. Eliminates the generic web UI "card" layout by treating smart suggestions like raw intelligence readouts.
**Pattern:** Apply CRT background grids (`<LcdGrid>`), scanning beam animations (`<HoverScanner>`), and strict uppercase monospace typography to dynamic AI/smart suggestion components, treating them as specialized hardware intelligence readouts instead of generic info cards.

## 2026-07-07 - [Accepted] - 🖼️ Canvas: Tactical Data Node Redesign
**What:** Redesigned the `DataPoint` component into a "Tactical Data Node". Replaced the simple flex column text pair with a relative container featuring a dashed left border acting as a data pipe, an absolute positioned marker on the border, and fully monospaced uppercase telemetry typography (`text-[9px]` for labels, `text-[11px]` for values).
**Outcome:** Accepted
**Why:** Brings the granular data display components in line with the established specialized hardware motif. The previous `DataPoint` was too generic and didn't fit the "snooping" fantasy, whereas the new design looks like individual data nodes connected to a larger telemetry stream.
**Pattern:** Apply tactical aesthetics (dashed borders acting as connecting lines, absolute positioning markers, tight monospace typography) even to the smallest, most granular data display elements to maintain absolute visual coherence deep within complex data views.

## 2026-07-08 - [Accepted] - 🖼️ Canvas: Tactical Telemetry Datacube Redesign
**What:** Redesigned the main Pokedex grid (`PokedexCard.tsx` and `PokemonStatusBadge.tsx`) to act as dense, "tactical telemetry datacubes". Replaced rounded corner web cards with edge-to-edge dashed borders, integrated `<LcdGrid>` and `<HoverScanner>`, and added strict telemetry text arrays (`[ DATA.SYS ]`). Converted the status badge from a padded pill to a full-width segmented terminal block.
**Outcome:** Accepted
**Why:** Brings the primary data grid of the application deeply in line with the terminal scanning hardware motif. The original grid felt like a generic web Pokedex, whereas the new implementation solidifies the feeling of looking through a specialized hardware surveillance scanner.
**Pattern:** Eliminate generic web cards entirely. When rendering lists or grids of items, treat each item container as a raw data terminal block, utilizing edge-to-edge dashed borders, CRT grid backgrounds, scanner animations, and segmented blocks for badges instead of floating pill shapes.

## 2026-07-09 - [Accepted] - 🖼️ Canvas: Tactical DiagnosticCard Redesign
**What:** Redesigned the `DiagnosticCard` component to fully embrace the tactical "snooping" aesthetic by turning it into a "Tactical Telemetry Sensor". Replaced the simple static `div` with a complex, interactive read-out component that includes raw dashed borders, an embedded `LcdGrid` and `HoverScanner` for a CRT/scanning feel, a left-aligned data pipe with a pulsing LED on hover, and a faux SVG telemetry graph that fades in. Telemetry headers were styled with mono bracketed fonts (`[ SYS.VER ]`).
**Outcome:** Accepted
**Why:** Brings the debug diagnostics view fully into the tactical specialization motif. The previous cards were simple floating rectangles with shadow, which broke the terminal simulation. Treating system stats as raw telemetry streams with data pipes and faux active graph lines perfectly fits the tactical design language.
**Pattern:** Always elevate simple data readouts (like diagnostics and simple stats) into active "Telemetry Sensors" by utilizing data pipe visuals (solid left borders with pulsing indicators), CRT/Scanline backgrounds, mono brackets, and faux animated graphics (like simple SVG paths) to reinforce the specialized hardware aesthetic instead of settling for static standard cards.

## 2026-07-10 - [Accepted] - 🖼️ Canvas: Tactical Server Rack Redesign for StorageGrid
**What:** Redesigned the `StorageGrid` section headers to resemble physical server rack blades. Replaced standard text headers with a `TacticalPanel` layout featuring metallic rack handles, LED capacity indicators (segmented bars), and status warning lights (e.g., Shiny Anomaly, System Error/Quarantine).
**Outcome:** Accepted
**Why:** Transforms the abstract concept of "PC Boxes" into a tangible, specialized hardware interface, reinforcing the app's core "snooping" and tactical terminal fantasy perfectly.
**Pattern:** When presenting grouped data (like boxes or categories), style the containers or headers as physical hardware components (like server blades or memory banks) to ground the data in the physical device illusion.

## 2026-07-15 - [Accepted] - 🖼️ Canvas: Tactical BottomNav Redesign
**What:** Redesigned `BottomNav` and `NavButton` to resemble a rigid, physical instrument panel with chunky membrane switches instead of a generic floating app bar. Added layered borders, inset shadows for depressed states, and mechanical-looking sliding brackets for the active indicator.
**Outcome:** Accepted
**Why:** Brings the mobile bottom navigation fully into the tactical specialized hardware motif. Floating app bars and subtle flicker animations break the illusion of using a rugged, purpose-built device.
**Pattern:** Apply "bracketed" physical hardware layouts and explicit "membrane switch" button designs (using inset shadows, dashed borders, and strict monospaced labels) to navigation structures to maintain the device simulation across all viewports.

## 2026-07-20 - [Accepted] - 🖼️ Canvas: Tactical Global Hardware Frame Redesign
**What:** Redesigned the entire application layout (`AppLayout.tsx` and `RetroBackground.tsx`) to sit inside a physical "Hardware Monitor Frame". Added thick edge bezels, persistent edge telemetry, a CRT vignette overlay, and completely replaced the floating number background with a dense, scrolling tactical hex-grid and radar sweep background.
**Outcome:** Accepted
**Why:** Brings the fundamental app framing into the specialized hardware motif. The application no longer looks like a website occupying the browser window; it looks like a physical CRT terminal monitor displaying a war-room data grid.
**Pattern:** Apply heavy, physical-looking frames and global screen-space overlays (vignettes, scanlines, hex grids) to the root application layout to permanently break the "web page" illusion and enforce the specialized device fantasy at the macro level.

## 2026-07-21 - [Accepted] - 🖼️ Canvas: Tactical Telemetry Datapoints Redesign
**What:** Redesigned the `DataPoint` and `InlineDataPoint` components to fully embrace the tactical "snooping" aesthetic. Added bracketed text (`[ LABEL ]`) for all telemetry headers, included LCD indicator dots and active scanning lines (hover states), and replaced generic flex layouts with rigid, segmented terminal block layouts (e.g. `bg-black/40 px-1 border-b border-dashed`).
**Outcome:** Accepted
**Why:** Brings the most granular, fundamental data readout components in line with the established specialized hardware motif. The previous datapoints were simple flex column text pairs, which broke the terminal simulation on dense screens (like the Header and Details Panel). Treating individual stats as active telemetry nodes reinforces the physical device fantasy.
**Pattern:** Apply tactical aesthetics (bracketed telemetry labels, rigid block backgrounds, dashed borders acting as connection wires, and LCD indicator dots) even to the smallest, most atomic data display elements to maintain absolute visual coherence deep within complex data views.

## 2024-06-19 - Accepted - Canvas: Tactical Sidebar Dossier Redesign
**What:** Redesigned the `PokemonDetails` modal into a "Tactical Sidebar Dossier" layout, shifting from a vertically stacked structure to a dual-pane `flex-row` on large screens. The left pane functions as a sticky ID card (sprite, ID, telemetry, status) with a hard border separator, while the right pane holds catch probabilities, evolutions, and locations. Handled long text overlaps by employing tight, responsive breakpoints with `break-all`/`break-normal`.
**Outcome:** Merged / Accepted
**Why:** Improves spatial efficiency on widescreen displays and heavily reinforces the tactical "database terminal/personnel file" aesthetic established across the application.
**Pattern:** Continue identifying opportunities to transform generic modals/dialogs into structured, specialized interfaces (like dossier panels or telemetry overlays) that use sidebars, borders, and monospaced meta-data fields. Avoid monolithic stacks on large screens.

## 2026-07-22 - [Accepted] - 🖼️ Canvas: Tactical Biometric Data Node Redesign
**What:** Redesigned the `PokemonCaughtDetails` component into a "Biometric Data Node" layout. Replaced the generic grid of standard `TacticalPanel`s with a design that treats each caught instance as a specialized biometric or telemetry read-out node using `LcdGrid`, `HoverScanner`, and `TelemetryDecoration`. Replaced standard text labels with complex dashed telemetry pipes and bracketed monospaced fonts (`[ OT_ID ]`, `[ HELD_ITEM ]`).
**Outcome:** Accepted
**Why:** Brings the "Discovered Units" display fully in line with the tactical, snooping specialized hardware motif. The previous design used standard structural cards, which felt generic. Treating individual caught Pokémon as active biometric scans with anomaly detection (shiny status) and detailed data pipes reinforces the specialized device fantasy.
**Pattern:** Apply tactical aesthetics (telemetry pipes, bracketed labels, scanning background grids, anomaly text) to instance-level data views, transforming them from basic stat lists into active "Biometric Data Nodes" to maintain absolute visual coherence.

## 2026-07-23 - [Accepted] - 🖼️ Canvas: Tactical Command Console Redesign
**What:** Redesigned the `SearchAndFilters` component into a "Tactical Command Console". Transformed the generic flex-col layout into a dual-pane hardware dashboard (`QUERY_UPLINK` and `PARAMETER_MATRIX`). Added a sticky header for persistence, replaced the basic input icon with a simulated hardware radar scanner, and upgraded the filter toggles into physical "membrane switches" with active LED status indicators.
**Outcome:** Accepted
**Why:** The search and filter controls are primary interaction points, but they looked like standard web form inputs. By styling them as a specialized hardware console with distinct labeled panes, radar visualizer, and physical-looking switch states, the user's primary interface for manipulating the data grid now fully aligns with the tactical device simulation.
**Pattern:** When designing dense control clusters (like search bars and filter sets), wrap them in labeled hardware panels (`[ UPLINK ]`, `[ MATRIX ]`). Integrate faux-hardware visualizers (like radar sweeps) near inputs, and treat selectable options as physical membrane switches with LED dots, moving away from generic segmented controls.

## 2026-07-25 - [Accepted] - 🖼️ Canvas: Tactical Contest Stats Redesign
**What:** Redesigned the `ContestConditionStats` component to fully embrace the tactical "snooping" aesthetic. Replaced the generic continuous progress bars with segmented tactical displays, utilizing an array of individual block elements for stats, matching `AliveTeamView` and `StorageGrid`. Also updated the label layout to strictly use bracketed monospaced telemetry fonts (e.g., `[ COOL ]`) and wrapped the stats inside a `<TacticalPanel>` and `<TelemetryDecoration>` (`SYS.CONTEST_STATS`).
**Outcome:** Accepted
**Why:** Brings the contest attribute component in line with the established specialized hardware motif. Continuous smooth progress bars break the "specialized hardware" illusion, whereas segmented terminal bars effectively mimic a rugged, low-resolution CRT display.
**Pattern:** Avoid continuous progress bars for visualizing data distributions. Consistently use segmented bars built from distinct block elements for all health, capacity, or attribute statistics across the application to reinforce the hardware simulation.

## 2026-07-28 - [Accepted] - 🖼️ Canvas: Tactical Sync Terminal Redesign
**What:** Redesigned the `SyncProgress` overlay into a "Database Synchronization Terminal". Replaced the simple modal and 10-bar progress line with a wide, dual-pane hardware dashboard (`[ UPLINK_STATUS ]` and `[ DATA_STREAM ]`). Added a faux radar grid with scanner animations, bracketed telemetry labels (`[ DATABASE_PRIMED ]`), and visualized the sync progress using a dense matrix of 100 individual data blocks instead of a single continuous or segmented bar.
**Outcome:** Accepted
**Why:** The previous sync modal felt too much like a standard web loading state, breaking the "specialized hardware" immersion during a critical application action. Evolving it into a multi-pane data terminal with explicit radar and block-matrix visualizations reinforces the fantasy of intercepting and processing raw hardware data.
**Pattern:** For loading states or long-running processes, avoid standard spinners or simple progress bars. Transform them into active "Terminal Operations" featuring multi-pane layouts, explicit data stream visualizations (like block matrices or hex grids), and faux hardware scanners to maintain the specialized device aesthetic.

## 2026-07-15 - [Accepted] - 🖼️ Canvas: Tactical BottomNav Redesign
**What:** Redesigned `BottomNav` and `NavButton` to resemble a rigid, physical instrument panel with chunky membrane switches instead of a generic floating app bar. Added layered borders, inset shadows for depressed states, and mechanical-looking sliding brackets for the active indicator.
**Outcome:** Accepted
**Why:** Brings the mobile bottom navigation fully into the tactical specialized hardware motif. Floating app bars and subtle flicker animations break the illusion of using a rugged, purpose-built device.
**Pattern:** Apply "bracketed" physical hardware layouts and explicit "membrane switch" button designs (using inset shadows, dashed borders, and strict monospaced labels) to navigation structures to maintain the device simulation across all viewports.

## 2026-07-30 - [Accepted] - 🖼️ Canvas: Tactical Strategy Matrix Redesign
**What:** Redesigned the `ContestRecommendationPanel` component into a "Tactical Strategy Matrix". Replaced the simple stacked boxes with a grid layout containing active "telemetry nodes". Added `LcdGrid` backgrounds, `HoverScanner` line sweeps, thick left-aligned data pipes with active LED indicators, and fully capitalized bracketed telemetry copy (e.g. `[ PRIME_DIR ]`).
**Outcome:** Accepted
**Why:** Brings the AI recommendation panel fully into the tactical specialization motif. Standard shaded boxes look like a regular web UI; the new data-pipe nodes feel like an active intelligence analysis readout.
**Pattern:** Always elevate AI or recommendation readouts into active "Strategy Matrices" by utilizing data pipe visuals, CRT/Scanline backgrounds, mono brackets, and strictly capitalized terminal-style copy to reinforce the specialized intelligence fantasy.

## 2025-10-25 - [Accepted] - 🖼️ Canvas: Tactical Battle Frontier Matrix Redesign
**What:** Redesigned the `BattleFrontierDashboard` component into a 'Tactical Combat Simulation Matrix'. Replaced the generic flex-col layout and basic `tactical-panel` div classes with active `TacticalPanel` components featuring `LcdGrid`, `HoverScanner`, and `CornerCrosshairs`. Replaced the basic wallet balance display with a dedicated `DataPoint`. The facility panels dynamically adapt their `TacticalPanel` variants (`amber` for gold, `white` for silver) and use rigid segmented telemetry structures for streaks instead of standard flex layouts.
**Outcome:** Accepted
**Why:** Brings the Battle Frontier dashboard fully in line with the established specialized hardware motif. Standard shaded boxes looked like a regular web UI; treating the facilities as active simulation nodes with scanning grids and physical crosshairs fits the tactical intelligence readouts seen elsewhere.
**Pattern:** Consistently elevate generic dashboard lists into active 'Simulation Matrices' or 'Telemetry Nodes' by wrapping them in `TacticalPanel`, applying `LcdGrid`/`HoverScanner` for CRT effects, and utilizing `DataPoint` components for core stats to reinforce the specialized hardware fantasy.


## 2026-07-07 - [Accepted] - 🖼️ Canvas: Tactical Geospatial Telemetry Redesign
**What:** Redesigned the `PokemonLocations` component into a "Geospatial Telemetry" dashboard. Transformed the basic static encounter lists into active `GeospatialNode` blocks, featuring `<LcdGrid>`, `<HoverScanner>`, heavy tactical data pipes, and pulsing LEDs. Replaced standard layout rows with specialized `LocationRow` components that mimic database query returns (`[ EVOLUTION ]`, `[ STATIONARY ]`), and added `SAT-LINK` badges and scanning radar icons to reinforce the localized specialized hardware aesthetic.
**Outcome:** Accepted
**Why:** The previous location list looked like a standard web interface list, which broke the immersion of the "Tactical Device" fantasy. By treating each encounter zone as a structured telemetry node and standardizing the UI elements to use active/status LEDs, monospaced fonts, and dashed borders, the component now perfectly aligns with the intelligence readout aesthetic.
**Pattern:** For data lists representing physical coordinates, zones, or nodes, abandon standard web rows. Evolve them into "Telemetry Nodes" featuring dashed borders, data pipes, LcdGrids, and status LEDs. Use capitalized bracketed text (`[ ZONE_ID ]`) for meta-information to maintain absolute visual cohesion with the specialized hardware motif.

## 2026-08-01 - [Accepted] - 🖼️ Canvas: Tactical Evolution Matrix Redesign
**What:** Redesigned the `PokemonEvolutions.tsx` component into a "Tactical Evolution Matrix". Transformed the generic `TacticalPanel` standard layouts into "Evolution Matrix Nodes" utilizing data pipes, `<LcdGrid>`, `<HoverScanner>`, `<TelemetryDecoration>`, and "Active LED" nodes. Evolved the plain text descriptions into structured brackets like `[ PRE_EVOLUTION_LINK: {NAME} ]`, `[ EVOLUTION_TRAJECTORY: {NAME} ]`, and `[ CROSS_REFERENCE: {NAME} ]`.
**Outcome:** Accepted
**Why:** Brings the evolution layout fully in line with the established specialized hardware motif. Standard shaded text layouts break the "specialized hardware" immersion. Elevating the UI to a multi-node matrix reinforces the tactical intelligence readout aesthetic.
**Pattern:** Elevate descriptive/informative sections about connected nodes (like evolutions or breeding) into structured matrix reads with dedicated "Active LEDs", heavy side borders (data pipes), and bracketed telemetry labels.

## 2026-08-10 - [Accepted] - 🖼️ Canvas: Tactical Unown Encryption Matrix
**What:** Redesigned the `UnownDexPanel` component into a "Tactical Unown Encryption Matrix". Replaced the generic flex-grid container with a `TacticalPanel` (cyan variant) featuring `TelemetryDecoration` (`SYS.UNKNOWN_ENCRYPTION_MATRIX`). The individual Unown form displays were upgraded from basic bordered squares to active "Decryption Nodes" with `CornerCrosshairs`, thick dashed data pipes, and bracketed telemetry labels (`[ ACQUIRED ]`, `[ ENCRYPTED ]`).
**Outcome:** Accepted
**Why:** Transforms a simple collectible tracker into an active intelligence deciphering interface, perfectly aligning with the established specialized hardware/snooping motif.
**Pattern:** Elevate simple collection grids (like Unown forms or items) into active "Encryption/Decryption Matrices" by wrapping them in `TacticalPanel`, utilizing data pipe visuals, and adding strict uppercase bracketed telemetry copy to reinforce the tactical intelligence readout aesthetic.

## 2026-07-12 - [Accepted] - 🖼️ Canvas: Tactical Sheen Display Redesign
**What:** Redesigned the `ContestSheenDisplay` component to replace the generic continuous progress bar with a segmented tactical display mimicking a low-resolution CRT. Also updated labels to use bracketed monospaced telemetry fonts (e.g., `[ SHEEN ]`).
**Outcome:** Accepted
**Why:** Continuous smooth progress bars break the "specialized hardware" illusion, whereas segmented terminal bars effectively mimic a rugged, low-resolution device.
**Pattern:** Avoid continuous progress bars. Consistently use segmented bars built from distinct block elements for statistics to reinforce the hardware simulation.

## 2025-02-14 - [Accepted] - 🖼️ Canvas: Contest Ribbons Redesign
**What:** Redesigned the `ContestRibbonsPanel` and `ContestRibbonBadge` components to use a heavy tactical layout (CRT effects, structural data-pipe borders, and bracketed telemetry labels like `[ ACQUIRED_RIBBONS ]`).
**Outcome:** Merged
**Why:** Enhances the specialized hardware illusion by converting generic ribbon lists into segmented diagnostic outputs.
**Pattern:** Repeat: Wrapping arrays/lists of badges in a `LcdGrid` and using `HoverScanner` for interactive data points. Avoid: Relying on exact text matches in global tests without updating strict `getByText` locator queries, as tactical bracket formatting (`[ $Label_SYS ]`) breaks basic matchers.

## 2026-08-15 - [Accepted] - 🖼️ Canvas: Tactical Version Arbitration Matrix
**What:** Redesigned the `VersionModal` component into a "Tactical Version Arbitration Matrix". Replaced the simple modal layout with a full dual-pane hardware dashboard (`[ DIAGNOSTIC_READOUT ]` and `[ ARBITRATION_MATRIX ]`) utilizing `TacticalPanel`. Transformed the basic warning icon into an animated `ServerCrash` crosshair. Evolved the version selection buttons from basic grid squares to detailed active hardware nodes featuring data pipes (`SYS.VER`), active scanning radar sweeps, and strict uppercase monospace typography.
**Outcome:** Accepted
**Why:** Brings the version resolution interface fully in line with the tactical specialization motif. Standard modals and flat button grids break the "specialized hardware" immersion during a critical application action. Evolving it into a multi-pane hardware matrix with explicit diagnostics and data stream visualizations reinforces the fantasy of using raw hardware interfaces.
**Pattern:** For critical decision inputs or error state resolutions, avoid standard web modals. Transform them into active "Arbitration Matrices" featuring multi-pane layouts, explicit diagnostic visualizers (like crosshairs or rotating radar elements), and faux hardware selection nodes to maintain the specialized device aesthetic.

## 2026-08-16 - [Accepted] - 🖼️ Canvas: Tactical Reconnaissance Matrix Redesign
**What:** Redesigned the `SearchAndFilters` component into a "Tactical Reconnaissance Matrix". Replaced the default variant of `TacticalPanel` with the cyan variant, added `<LcdGrid>` and `<HoverScanner>` to the container, and restyled the search input area to resemble a "Target Acquisition" radar node featuring an animated crosshair. Modified the filter buttons to resemble physical membrane switches with dedicated status LED indicators.
**Outcome:** Accepted
**Why:** The previous search bar and filter section looked like a standard web form, which broke the "specialized hardware" immersion during regular interaction. Transforming it into an active intelligence dashboard with radar crosshairs and membrane switch filters reinforces the fantasy of using a physical tactical device.
**Pattern:** Always elevate search and filter controls from standard inputs to active "Acquisition Matrices" by incorporating hardware analogies (e.g. radar scans, membrane toggles, status LEDs) and structural paneling (`[ TARGET_ACQUISITION ]`) to maintain the specialized device simulation.
