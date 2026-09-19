# Visual Routing Constraints

**Pattern:** The `/assistant` route is currently missing or broken, displaying a generic error page during visual audits. A dedicated task (`task-000-001-fix-assistant-route-lens-audit.md`) has been created to track and resolve this issue. Future UI implementations should ensure that all base URL routing configurations (e.g., `/dexhelper/`) correctly map to their respective views.


---

# Visual Routing & Base Path Consistency Across Viewports

## Route Base Path Alignment
In Vite applications hosted on sub-paths (such as `/dexhelper/`), route navigation and visual audit scripts must strictly account for the base path prefix when inspecting routes like `/assistant`, `/storage`, `/dashboard`, `/dag`, `/safari-zone`, and `/box-analyzer`. Direct navigation to absolute paths without the base URL prefix results in 440/404 fallbacks or unrendered components during visual inspection.

## Responsive Layout & Tactical Hardware Aesthetic Safeguards
* **Monospaced Telemetry & Dashed Borders**: Component containers and status overlays across viewports (Desktop FullHD 1080p, 1440p, Mobile Pixel 9) require fixed min-widths on monospaced headers to prevent layout reflow when live data or save state toggles transition between Gen 1, Gen 2, and Gen 3 save states.
* **Strict Rounded-None Usage**: In accordance with ADR 008, sharp corners (`rounded-none`) must be preserved on tactical hardware cards and modal layovers. `rounded-full` is exclusively reserved for status indicator LEDs and reticle targets.
