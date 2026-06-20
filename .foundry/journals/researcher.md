## Gen 3 Location Map Data
- Map IDs are structured as `(GroupIndex << 8) | MapIndex` driven from `data/maps/map_groups.json` which lists map folder names.
- Map topology details for connection (via `connections` array) and indoor parental resolution (via `warp_events` pointing its `dest_map` property to an outdoor hub's string name) are located within each map's specific `map.json` file inside its `data/maps/` folder.
- Map localizations are decoded from `MAPSEC_*` strings found inside the map's `map.json` property `region_map_section` against `src/data/region_map/region_map_sections.json` where `id` equals `MAPSEC_*`.

### Battle Stats in PC Storage (Gen 1 & Gen 2)
- **Constraint**: Gen 1 and Gen 2 games do not store battle stats (such as current HP) for Pokémon deposited in the PC. The data structures are physically smaller.
- **Why it matters**: Any auxiliary logic (like a Nuzlocke Tracker) attempting to determine the fainted/dead state of a deposited Pokémon by reading a "0 HP" value will fail. The Pokémon is effectively healed upon deposit, and its stats are recalculated fully healed upon withdrawal.
- **Adaptation**: For features like Graveyards or death tracking, the logic must completely rely on checking the `storageLocation` property against a designated Graveyard Box string, rather than attempting to read `currentHP`. The previous implementation task for Death Tracking failed precisely because it attempted to use HP as the source of truth for deposited Pokémon.
## Research on Auditor Persona State Machine

When implementing new pipeline states that involve temporary ownership handoffs (like the `VERIFYING` state owned by the `auditor`), it is a critical architectural constraint to **not** modify the `owner_persona` in the node's YAML frontmatter. If the frontmatter is overwritten, the system loses the history of the original implementer (e.g., `coder`). Instead, dynamic ownership should be injected only in the orchestrator's matrix JSON output during dispatch. This preserves the original owner, ensuring that if the temporary owner rejects the work (triggering the Resurrection Loop), the node will correctly route back to the original persona for rework.

### Empty PR Compliance and Checkboxes
- **Failure**: `task-071-140-visited-routes-checklist-retry-impl` failed with `Merged with unfulfilled acceptance criteria`.
- **Constraint**: The orchestrator checks for `/^\s*-\s*\[\s\]/m` to enforce task completeness (ADR 007, ADR 009).
- **Why it matters**: When an agent determines the target codebase components are already completed (e.g., `VisitedRoutesChecklist` exists) and decides to submit an empty PR to advance the pipeline, they *must* edit the task's markdown file to check off the acceptance criteria boxes (`- [x]`). Submitting an empty PR while leaving the markdown boxes unchecked will cause the orchestrator to fail the node.
## Cloudflare Native Authentication
- **Finding:** For Cloudflare Pages, `@cloudflare/pages-plugin-cloudflare-access` provides native middleware to validate JWTs from Cloudflare Access.
- **Why it matters:** Generic Node.js OAuth libraries are difficult to maintain in edge environments. Relying on Cloudflare Access to handle the Google SSO flow at the infrastructure level removes the need to write custom callback/session management code. It also allows single-user restrictions to be configured via Zero Trust policies instead of application logic.

## Missing Architectural Integration & Data Schema Violations
**Lesson**: When investigating implementation failures, look beyond whether utility functions exist and unit tests pass.
- **Example (`story-048-089-route-radar-density-aggregation`)**: The heatmap logic implementation failed permanently for two structural reasons:
  1.  **Missing Architectural Integration (ADR 018)**: `RouteRadarController` was created as an isolated class but was never integrated into the application's data flow (`Save State -> suggestionEngine -> RouteRadarController -> Heatmap State`) nor passed as props to the Map UI component.
  2.  **Data Schema Violation (ADR 015)**: The implementation continued to use the shortened data property `aid` (as seen in `encounter.aid`) instead of the fully expanded `areaId` property mandated by ADR 015 ("Revert Data Format Optimizations").
Agents must ensure actual structural integration and strict adherence to data schema ADRs, not just isolated utility completion.

### Lesson: Save File Offsets Trust
When performing research on save file offsets, never blindly trust task descriptions or previous documentation if it conflicts with the disassembly. In task-095-157, the PM/author confused the Party Data offsets (0x283E/0x281A) with Event Flag offsets. Always cross-reference the WRAM memory map directly and calculate offsets by subtracting relative to known anchors (e.g., wCurBox).

### Gen 3 Roamer Location Memory Offset Investigation
- **Date**: 2026-06-18
- **Observation**: Roamer locations (`sRoamerLocation` and `sLocationHistory`) are kept in dynamic `EWRAM_DATA` and are not directly saved to the `.sav` file; they re-initialize dynamically upon startup.
- **Pattern/Constraint**: It is mathematically impossible to extract the exact current route of a roaming Pokémon directly from a static Gen 3 `.sav` file unless the player saved while the roamer was active on their current route.
- When tasked with finding memory offsets in Gen 3 (like the roamer released flag), the data is often split between the `SaveBlock1` structure and bitfield `flags`. Ensure you use decompilation code (e.g., `pret/pokeemerald`, `pret/pokeruby`, `pret/pokefirered`) to determine exact structures, array indices, and offsets. Note that offsets and flags can differ between RS, Emerald, and FRLG.
