## 2025-02-12 - [Accepted] - 🖼️ Canvas: Empty State Redesign
**What:** Redesigned the `EmptyState.tsx` component from a plain, simple centered text/icon layout into a "Radar/Sonar Signal Lost" visual that perfectly captures the "snooping / tactical terminal" look.
**Outcome:** Accepted -> wait for review
**Why:** The previous EmptyState looked too generic. This radar-style design feels much more diegetic to the terminal operating system.
**Pattern:** Empty states shouldn't feel like missing content; they should feel like intentional system feedback (e.g., "SIGNAL LOST" instead of "No data").

## 2026-08-05-02-22-26 - [Accepted] - 🖼️ Canvas: Terminal Diagnostic Empty State Redesign
**What:** Redesigned the `EmptyState` component from a centralized, circular radar display to a horizontal, left-aligned terminal diagnostic block. Introduced warning stripes, raw error codes, and a pulsing status indicator.
**Outcome:** Accepted -> wait for review
**Why:** The radar animation felt too playful and generic. A horizontal diagnostic block with explicit error codes and warning stripes better aligns with the harsh, data-heavy, "tactical snooping" terminal aesthetic mandated by the project (ADR 008 style). It treats empty states as system faults rather than just missing content.
**Pattern:** Shifting empty/error states from central illustrations to left-aligned, text-heavy diagnostic readouts increases immersion. Use raw hex codes and command-line prefixes (`>`) to emphasize the terminal feel.

## 2026-08-06 - Accepted - 🖼️ Canvas: SearchAndFilters Targeting Array Redesign
**What:** Transformed the SearchAndFilters component into a complex "Targeting Array" with rotating crosshairs, a faux hex-code data stream, and hardware-style toggle switches, fully adhering to the tactical/snooping aesthetic.
**Outcome:** Accepted
**Why:** Ambitious, transformative UI redesign that leans into the hardware/snooping aesthetic, utilizing sharp edges, dashed borders, and monospaced telemetry fonts.
**Pattern:** Continue using hardware-inspired visual metaphors (radars, targeting systems, telemetry streams) with sharp, grid-based layouts and dashed borders. Avoid rounded corners and generic UI elements.

## 2026-08-07 - [Accepted] - 🖼️ Canvas: Redesign PokemonStatusBadge
**What:** Redesigned the `PokemonStatusBadge` to include diagonal warning stripes and a diagnostic light for SECURED states.
**Outcome:** Accepted -> wait for review
**Why:** The previous text-only badge felt too plain for a tactical hardware interface. Adding diagnostic stripes and hardware LED elements increases the realism and density of the tactical aesthetic.
**Pattern:** Shifting from basic text badges to hardware-inspired modules with animated elements (like warning stripes and pulsing LEDs) improves immersion.


## 2025-02-12 - [Accepted] - 🖼️ Canvas: PokemonLocations Geospatial Telemetry Redesign
**What:** Redesigned the `PokemonLocations` component to match the tactical terminal/snooping UI style more closely. Added sweeping animations, hex data traces, restructured the vector grids with tactical styling and probability bars, and added binary/scanline accents to static and evolution components.
**Outcome:** Accepted -> wait for review
**Why:** The previous design had some elements of the snooping UI, but could be pushed further. The new design feels much more like a "Geospatial Telemetry" module, fitting perfectly with the project's overall aesthetic.
**Pattern:** Continue pushing the snooping UI aesthetic by adding diegetic elements (like hex streams, sweep animations, probability bars) and using harsh, grid-based layouts to represent data dense interfaces.

## 2026-08-08 - [Accepted] - 🖼️ Canvas: Hardware Diagnostics Background Redesign
**What:** Replaced the generic concentric circle radar in `RetroBackground.tsx` with a highly tactical, dense "Hardware Diagnostics Overlay" featuring rigid dashed grids and static telemetry readouts.
**Outcome:** Accepted -> wait for review
**Why:** The previous background felt too generic and disconnected from the deep, snooping aesthetic established by newer components. The new rigid grid design reinforces the feeling of operating a complex piece of hardware.
**Pattern:** Always prefer rigid, data-dense layouts over abstract circular shapes for backgrounds to maintain immersion in the tactical aesthetic.

## 2025-02-12 - [Accepted] - 🖼️ Canvas: PokedexCard Target Acquisition Redesign
**What:** Redesigned the `PokedexCard` component to align with the "tactical hardware" and "snooping" aesthetic. Replaced plain solid borders with layered cyan/emerald/amber dashed frames, added hover effects simulating a matrix target lock (glitch overlays, spinning crosshairs, intense scanlines), and refactored the right-side data container to include dynamic status bars and hex stream overlays on hover. Replaced generic `NO.` with `ID.` for increased tactical flavor.
**Outcome:** Accepted -> wait for review
**Why:** The original `PokedexCard` lacked depth and felt generic compared to components like `SearchAndFilters`. This change grounds the card visually in the broader terminal OS theme.
**Pattern:** For interactive display cards, rely on layered dashed frames, raw data streams (hex/binary), and mechanical hover animations (e.g., crosshairs or pulsing LEDs) rather than generic UI scales or shadows. Ensure custom animations referenced in Tailwind arbitrary values are explicitly defined in `index.css`.


## 2026-08-17 - Accepted - 🖼️ Canvas: redesign EmptyState as tactical diagnostic terminal
**What:** Redesigned the `EmptyState` component from a generic centered radar UI to a horizontal, left-aligned terminal diagnostic panel.
**Outcome:** Merged
**Why:** The previous centered radar loop felt too playful and generic ("game UI" rather than "industrial hardware"). Real hardware diagnostics are usually text-heavy, left-aligned, and provide concrete (even if simulated) error states rather than continuous searching animations.
**Pattern:** Avoid centered, floating "widget" components. When indicating no data, use error-like diagnostic layouts with monospace code traces.
