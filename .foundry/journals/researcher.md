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
Learned: Execution Plan Groundedness Rule for Markdown Lists: Do not assume the existence of empty checkboxes (`[ ]`) in task or issue descriptions. If the target text uses standard bullet points (`- `), explicitly plan to change them to checked boxes (`- [x] `) rather than replacing non-existent empty checkboxes.
- When tasked with finding memory offsets in Gen 3 (like the roamer released flag), the data is often split between the `SaveBlock1` structure and bitfield `flags`. Ensure you use decompilation code (e.g., `pret/pokeemerald`, `pret/pokeruby`, `pret/pokefirered`) to determine exact structures, array indices, and offsets. Note that offsets and flags can differ between RS, Emerald, and FRLG.

## 2026-06-19: Empty PRs and Phantom Implementation Failures
**Lesson**: When investigating recurring task failures for code that appears to be fully functional, check if the root cause is a pipeline violation rather than a code defect.
- **Example (research-098-189)**: The Gen 3 PV extraction tasks were stuck in a failure/retry loop despite `parseGen3PersonalityValue` already existing and passing tests. The failures were caused by implementers violating the strict Empty PR Policy (ADR 007 and ADR 009) — they submitted empty PRs without checking off the Acceptance Criteria checkboxes in the task markdown, leading to automated rejection and continuous resurrection.
- **Action**: Always adhere strictly to Empty PR protocols. If the code exists, only update the task markdown to check off the boxes and submit an empty PR. Do not modify the YAML frontmatter.

## Gen 2 Breeding Mechanics
In Gen 2, gender is intrinsically linked to the Attack DV. The `gender_rate` from PokeAPI represents the female ratio in eighths. The female Attack DV threshold in Gen 2 is simply `gender_rate * 2`. A Pokemon is female if its Attack DV is less than this threshold. This means a Pokemon with a high Attack DV is more likely to be male, creating interesting constraints when trying to breed physical attackers.

## PokeAPI Egg Groups
Egg groups are retrieved from the `pokemon-species` endpoint. They must be mapped to integer constants to fit within DexHelper's memory-optimized schemas.

## VERIFYING Node State
- **Finding:** The `VERIFYING` state, introduced in ADR 014, functions as a queue state for the `auditor` persona, similar to the `READY` state.
- **Constraint:** When a node transitions to `VERIFYING`, its `jules_session_id` is explicitly stripped (set to `null`). Therefore, pipeline validation logic must not expect or enforce the presence of a `jules_session_id` on `VERIFYING` nodes. Doing so causes false positive system failures.
## Gen 3 DataView RangeError Handling
**Lesson:** When parsing dynamically structured Gen 3 save data like Secret Bases, which iterate across large flat arrays (`3200` bytes inside `SaveBlock1`), we cannot trust the internal offset pointers implicitly. A truncated save file or malformed index will cause standard `DataView.getUint8` calls to throw out-of-bounds errors.
- **Constraint (ADR 010):** We must not crash the application on these bounds errors. Parsers like `parseGen3SecretBases` must explicitly wrap iterating logic in a `try/catch`, filter for `error instanceof RangeError`, and gracefully re-throw the standard normalized error (`Error('The save file is corrupted or incomplete.')`).
- **Why it matters:** Higher-order validation engines rely on matching this exact string to detect bad saves rather than generic JS errors. Failing to handle `RangeError` properly results in unhandled promise rejections that bring down the orchestration pipeline and result in immediate rejection by the QA/Auditor persona.
## Gen 3 Roamer Location Constraints (ADR 108-027)

When designing features for Generation 3 hardware, be aware of the stark difference between persistent save data and dynamic EWRAM data.

**The Lesson:** Data that feels "persistent" to the player (like the exact current location of a roaming legendary) may actually be highly ephemeral and recalculated on the fly. In Gen 3, `sRoamerLocation` and `sLocationHistory` exist exclusively in dynamically allocated EWRAM during gameplay. When the game saves, these precise coordinates are **not** serialized.

**Architectural Constraint:** It is impossible to statically extract a roamer's exact map location from a `.sav` file.

**UI Pivot Strategy:** When faced with impossible geographic extraction, pivot UI designs from "map-based tracking" (e.g., Route Radars) to "stat-based interception dossiers." We can still provide value by exposing the hidden internal state that *is* saved, such as the `Roamer` struct (IVs, HP, Nature) and its overarching `active` boolean flag, presenting it under a tactical "data snooping" aesthetic.

## Lesson: Save File Parsing Reusable Constants
When documenting memory offsets or drafting parser requirements, it is a strict architectural constraint (enforced by QA Validation Rules) that all memory offsets, lengths, bit locations, and shifts must be defined as reusable, descriptive constants at the module level. Inline magic numbers are strictly forbidden and will result in permanent failure.

## Proper Knowledge Storage
**Lesson:** When I uncover universally applicable domain knowledge (e.g., Gen 2 breeding DV overlap rules), I MUST document it in `.foundry/docs/knowledge_base/` rather than adding it to my persona journal. My journal must be reserved for recording recurring pipeline failures, systemic constraints, and meta-lessons to prevent context window bloat.

## Cloudflare Access Integration
For applications utilizing Cloudflare Zero Trust (Cloudflare Access), the built-in authentication flow URLs, relative to the protected domain, are `/cdn-cgi/access/login` (login), `/cdn-cgi/access/logout` (session termination), and `/cdn-cgi/access/get-identity` (user information). These paths provide native integration without requiring complex manual OAuth configuration and callbacks.

- Learned: When researching specific Gen 2 Pokegear phone call mechanics in pret/pokecrystal, core timer and RNG logic are deeply coupled across `engine/overworld/time.asm` (`CheckReceiveCallTimer`) and `engine/phone/phone.asm` (`CheckPhoneCall`). Memory offsets such as `wPhoneList`, `wSwarmFlags`, and `wDailyPhoneItemFlags` control the states, found in `ram/wram.asm`. This knowledge was extracted into the knowledge base to avoid redundant decompilation analysis in future implementation tasks.

## Bash Timeout Enforcement
**Finding:** Modifying the `run_in_bash_session` platform tool from within the repository to enforce timeouts is impossible. The previous task (`task-267-262-bash-timeout-wrapper-impl`) failed permanently because of this.
**Why it matters:** When addressing problems with sandbox execution environments (e.g., preventing infinite hangs on `tail -f`), we cannot build wrapper scripts and expect them to be seamlessly adopted.
**Constraint:** The most reliable way to enforce tool behavior constraints is through **instructional policy enforcement**. The rules must be added to `.foundry/docs/knowledge_base/agents/core_policies.md` so that the agent context is explicitly updated to forbid blocking commands and recommend `cat`, `tail -n`, or backgrounding with `&`.

## 2026-07-15: Gen 3 Save File Relative Offsets
When parsing Gen 3 save files, `SaveBlock1` is divided into four 4KB sections (Section IDs 0-3). Due to the A/B bank flash memory architecture, absolute offsets cannot be reliably used. When extracting data that resides in Section 2 (like the Feebas seed, which is at absolute offsets 0x2DD6 for RS and 0x2E66 for Emerald), the relative offsets must be calculated against the start of Section 2 data (0x1F00), resulting in relative offsets of 0x0ED6 (RS) and 0x0F66 (Emerald). Never assume Section 2 starts at 0x2000.
## Gen 3 Static Encounter Offsets

When parsing Gen 3 event flags for static encounters (like legendaries or Snorlax), the flag IDs map to byte and bit offsets within the Event Flags block (which starts at `0x1270` in `SaveBlock1`). To calculate the exact offset, divide the flag ID by 8 for the byte offset, and use modulo 8 for the bit position (e.g. `Flag_ID / 8` and `Flag_ID % 8`). Note that Pokémon FireRed/LeafGreen often track `FOUGHT` instead of `DEFEATED`, and Ruby/Sapphire uses `HIDE` flags for static encounters like the Regis.

## 2026-07-19: Gen 2 Event Flag Assembly Constants
**Failure Pattern:** Developers tasked with finding byte/bit offsets from `pokecrystal`'s `constants/event_flags.asm` are naively using the line number of the flag to determine its value (e.g., `EVENT_FOUGHT_SUDOWOODO` is on line 51, so they use 51). This breaks because the assembly file dynamically increments the constant counter using directives like `const_skip` and `const_next`.
**Architectural Rule:** Never use line numbers to guess memory offsets or bit indices from an assembly file. You must explicitly evaluate the directives (`const_def`, `const_skip`, `const_next`) to compute the true parsed integer value of the constant. This has been documented in `.foundry/docs/knowledge_base/engine/save_parsing/gen2_event_flags.md`.

## 2026-07-20 - Diff Engine Hash Failure Analysis
Investigated the failure of `task-294-316-diff-engine-impl`. The root cause is a missing `hash` property on the `PokemonInstance` interface in `src/engine/saveParser/parsers/common.ts`. Downstream logic (`calculateBoxDiff`) implemented a fallback hash generator instead of relying on the contract. Moving forward, ensure that data interfaces (like `PokemonInstance`) strictly define necessary properties for downstream operations (like diffing) to prevent silent fallback behavior.


## Session Extract: 12219787187610158486.md

# Session 12219787187610158486

* **Task**: Investigate Gen 2 Pokegear Phone Memory Offsets
* **Target Node**: `research-283-336-gen2-phone-memory-offsets`

## Findings
I investigated the Pokegear memory offsets for Gen 2 (Gold, Silver, and Crystal). I discovered that:
* In Gold/Silver, `wPhoneListIndex` is located at `0xCF2A`, `wSpecialPhoneCallID` is at `0xD97B`, and `wPhoneList` is at `0xD9C6`.
* Unlike Crystal, Gold/Silver does not possess tracked distinct arrays for `wSwarmFlags`, `wDailyPhoneItemFlags`, or `wDailyPhoneTimeOfDayFlags`.
* In Crystal, `wPhoneListIndex` is at `0xD03F`, `wSwarmFlags` is at `0xDC20`, `wSpecialPhoneCallID` is at `0xDC31`, `wDailyPhoneItemFlags` is at `0xDC50`, `wDailyPhoneTimeOfDayFlags` is at `0xDC54`, and `wPhoneList` is at `0xDC7C`.

## Critical Policy Reminder
When researching external codebases by building dependencies (like rgbds) or cloning git repositories (like pokecrystal and pokegold), **all temporary files and artifacts must be deleted and removed from git cache** before finishing the session. Failure to do so will severely pollute the root repository space, and the PR will be rejected.

## Session Extract: 2026-07-29-investigate-sorting-failure.md

---
trigger: `story-136-295-sorting-standard-strategies`
---
Founding issue: The task failed because it asks to sort by type, and `PokemonMetadata` doesn't have type info.

## Session Extract: 7509224859674163249.md

# Session 7509224859674163249

## Save File Parsing - Magic Numbers
When reviewing the Hall of Fame parsing implementation, it was rejected for using inline magic numbers (e.g. `4` for bytes per stat, and `8` for bits per byte). The "No Magic Numbers" architectural rule requires explicitly defining module-level constants (like `BYTES_PER_GAME_STAT` and `BITS_PER_BYTE`). I have documented these specific constants in `.foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md` to prevent future implementers from repeating this violation during offset and bitwise calculations.
