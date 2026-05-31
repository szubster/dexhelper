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

## Cloudflare Native Authentication
- **Finding:** For Cloudflare Pages, `@cloudflare/pages-plugin-cloudflare-access` provides native middleware to validate JWTs from Cloudflare Access.
- **Why it matters:** Generic Node.js OAuth libraries are difficult to maintain in edge environments. Relying on Cloudflare Access to handle the Google SSO flow at the infrastructure level removes the need to write custom callback/session management code. It also allows single-user restrictions to be configured via Zero Trust policies instead of application logic.
