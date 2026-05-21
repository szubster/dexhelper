## Gen 3 Location Map Data
- Map IDs are structured as `(GroupIndex << 8) | MapIndex` driven from `data/maps/map_groups.json` which lists map folder names.
- Map topology details for connection (via `connections` array) and indoor parental resolution (via `warp_events` pointing its `dest_map` property to an outdoor hub's string name) are located within each map's specific `map.json` file inside its `data/maps/` folder.
- Map localizations are decoded from `MAPSEC_*` strings found inside the map's `map.json` property `region_map_section` against `src/data/region_map/region_map_sections.json` where `id` equals `MAPSEC_*`.

## Research on Auditor Persona State Machine

When implementing new pipeline states that involve temporary ownership handoffs (like the `VERIFYING` state owned by the `auditor`), it is a critical architectural constraint to **not** modify the `owner_persona` in the node's YAML frontmatter. If the frontmatter is overwritten, the system loses the history of the original implementer (e.g., `coder`). Instead, dynamic ownership should be injected only in the orchestrator's matrix JSON output during dispatch. This preserves the original owner, ensuring that if the temporary owner rejects the work (triggering the Resurrection Loop), the node will correctly route back to the original persona for rework.
