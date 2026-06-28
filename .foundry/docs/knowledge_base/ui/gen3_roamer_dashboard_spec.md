# Gen 3 Roamer Dashboard UI Specification

## Overview

Due to the architectural constraints outlined in ADR 108-027 (impossibility of statically extracting Gen 3 roamer map locations from save files), the Gen 3 Roamer Dashboard shifts its focus from a geographical "Route Radar" to a strictly data-driven "Roamer Dossier".

The UI must present the roamer's internal state as extracted directly from the save file's `Roamer` struct and related event flags, leaning heavily into a tactical, snooping aesthetic as defined in ADR 008.

## Core Components

The dashboard will be composed of the following primary sections:

### 1. Active Status Indicator
A highly visible telemetry indicator showing whether the roamer is currently active on the map.
- **Data Source:** The `active` boolean field at offset `0x13` of the `Roamer` struct, and the corresponding game event flag (e.g., `FLAG_LATIOS_OR_LATIAS_ROAMING`).
- **Visuals:** Use a blinking or high-contrast status dot. When inactive (caught or defeated), the UI should clearly indicate the roamer is no longer at large.

### 2. Roamer Dossier (Stat Breakdown)
A detailed breakdown of the roamer's internal stats, presented as raw intercepted data.
- **Data Displayed:**
  - Species ID (resolved to name, e.g., Latias or Latios)
  - Level (extracted from `0x0C`)
  - HP (extracted from `0x0A`)
  - Status Condition (extracted from `0x0D`)
  - Internal IVs (extracted from `0x00`)
  - Personality Value (extracted from `0x04` for nature calculation)

### 3. Roamer IV Glitch Warning Module
A dedicated alert box that detects and warns the user if their roamer is a victim of the Gen 3 Roamer IV Glitch (where Attack, Defense, Speed, Sp. Atk, and Sp. Def IVs are severely truncated or set to 0 due to a programming error in Ruby/Sapphire and FireRed/LeafGreen).
- **Condition:** If the game version is known to be affected and the IVs match the glitch signature (extremely low non-HP IVs).
- **Visuals:** Use a warning color scheme (e.g., amber or red text), `border-dashed`, and an alert icon to signify data corruption or hardware anomaly.

## Aesthetic Constraints (ADR 008 Compliance)

All components must strictly adhere to the tactical hardware/snooping aesthetic:
- **Borders:** Use dashed borders (`border-dashed`) to simulate terminal or raw data output boxes.
- **Corners:** Sharp edges only. Strictly avoid rounded corners (`rounded-none`).
- **Typography:** Use monospaced telemetry fonts (`font-mono`) for all data values, labels, and headers to emphasize the "raw data extraction" feel.
- **Layout:** Dense, data-heavy layouts are preferred over spacious consumer-facing designs. Use CSS Grid or Flexbox to create a rigid, tabular structure for the dossier.

## Example Component Structure (Conceptual Tailwind)

```html
<div class="border-2 border-dashed border-gray-600 p-4 rounded-none font-mono text-green-500 bg-black">
  <div class="flex justify-between border-b border-dashed border-gray-600 pb-2 mb-4">
    <h2 class="text-xl uppercase">Roamer Dossier</h2>
    <span class="text-red-500 blink">[ ACTIVE ]</span>
  </div>

  <div class="grid grid-cols-2 gap-4">
    <div>
      <p class="text-gray-400">SPECIES:</p>
      <p>LATIOS</p>
    </div>
    <div>
      <p class="text-gray-400">LEVEL:</p>
      <p>40</p>
    </div>
    <!-- ... IVs and other stats ... -->
  </div>

  <!-- IV Glitch Warning (Conditional) -->
  <div class="mt-4 border border-dashed border-amber-500 p-2 text-amber-500">
    <p>WARNING: SEVERE IV TRUNCATION DETECTED (ROAMER GLITCH)</p>
  </div>
</div>
```
