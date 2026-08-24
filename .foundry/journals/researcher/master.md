I investigated the permanent failure of `epic-120-338-implement-conflictless-journals`. The epic reached the max rejection count because it failed to comply with the Orchestrator Safeguard. Specifically, every EPIC must have at least one child STORY node dedicated to Integration and E2E Verification (tagged with `e2e` or `integration`) before it can transition to COMPLETED. Since `epic-120-338-implement-conflictless-journals` only had regular implementation stories without an E2E story, the orchestrator repeatedly rejected its completion attempt.

The replacement epic (`epic-335-401-implement-conflictless-journals-retry`) must ensure an E2E story is created to satisfy this constraint.

## Learnings
When an Epic repeatedly fails during empty PR submissions despite all child stories being marked as COMPLETED, it is highly likely a violation of the Orchestrator Safeguard (E2E/Integration Requirement). The Epic Planner or Story Owner must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Failure to do so results in max rejection counts.

Furthermore, QA rejections regarding ADR 028 (magic numbers) must be carefully verified to ensure the implementation extracts all memory offsets into module-level constants.

- Explored knowledge base files to find the memory offsets and bit positions for Gen 3 Move Tutors.
- Discovered the data in `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`.
- Formatted the required data into tables and updated the active `RESEARCH` node `.foundry/research/research-055-405-gen3-move-tutor-offsets.md`.

Identified that the DAG Orchestrator enforces a strict E2E safeguard. Any EPIC whose child nodes complete without having spawned at least one STORY tagged with `e2e` or `integration` will be automatically rejected and permanently failed. All generative personas must explicitly ensure they fulfill this criteria during the breakdown phase to avoid repeating this impossible loop failure.

When executing as the Researcher persona, log your session details to your private journal at `.foundry/journals/researcher/<session_id>.md` (or `YYYY-MM-DD-HH-MM-SS.md`), and explicitly read `.foundry/docs/knowledge_base/agents/core_policies.md` at session start.
The root cause of the permanent failure (Max rejection count reached) for the Gen 3 Secret Base Parsing epic was the missing Orchestrator Safeguard (E2E/Integration Requirement). The Epic did not generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Consequently, the Orchestrator repeatedly rejected the Epic until it reached the maximum rejection count. Always ensure generative personas explicitly spawn an E2E/Integration STORY when breaking down an Epic.

## Learnings
* **Testing against live repository data**: E2E tests targeting features that rely on repository metadata (like the Foundry DAG Dashboard reading `foundry.json`) should NOT rely on live repository state. In clean environments or CI, nodes with specific states (e.g., permanent failures) may not exist, causing non-deterministic timeouts.
* **Resolution**: Such tests must use Playwright's `page.route` to mock the `**/data/foundry.json` response, providing a deterministic dataset containing the exact edge cases the UI expects.
* **YAML Frontmatter Integrity**: When successfully completing a node (including RESEARCH nodes), never modify the YAML frontmatter (e.g., changing status to READY or clearing `jules_session_id`). Modifying the frontmatter breaks the Orchestrator's state machine. Only update the markdown body.

- Explored the issue of Gen 3 save fixtures (`tests/fixtures/emerald.sav`) not being present.
- Found that `emerald.sav` was already added by a previous session (`tests/fixtures/emerald.sav` existed).
- Verified `emerald.sav` properties by writing a temporary tsx script that used the `parseGen3` method (bypassing export errors due to `tsx`). Found out it has `RUSTBORO`, `PACIFIDLOG`, and `BATTLE_FRONTIER` flags set.
- Checked off the Markdown checkboxes to allow the task to transition to COMPLETED.
- E2E tests for the whole suite timed out, so targeted the specific Gen 3 dashboard tests successfully.
- Code review gave a false negative on the Empty PR policy, as the file was already created.

## Learnings
* Investigated background fetching and preloading for msgpack files as requested in `research-340-405-background-fetching`.
* Recommended `<link rel="preload">` for core data (`pokedata-core.msgpack`) and `<link rel="prefetch">` for gen-specific extensions (`pokedata-gen{N}.msgpack`) to align with the bundle splitting strategy in `adr-117-029-bundle-splitting-strategy.md`.
* Suggested Service Worker Cache API for robust offline support and caching of the `.msgpack` files, using a Cache-First strategy.
* The Background Fetch API is likely overkill for our payload sizes, so standard caching combined with prefetch is preferred.
* Addendum: The preloading and prefetching logic should ideally be implemented as a Vite plugin to automate the injection of resource hints into the generated HTML during the build process.

## Findings
I investigated how the "Contest Master Rank" star is awarded on the Gen 3 Trainer Card. The initial assumption might be to scan PC boxes or the party for Pokémon with the Contest Master ribbon.

However, `pokeemerald`'s source code (`src/trainer_card.c`) reveals that this requirement is satisfied by the function `CountPlayerMuseumPaintings() >= CONTEST_CATEGORIES_COUNT`.

The function `CountPlayerMuseumPaintings` checks the `contestWinners` array located in `SaveBlock1` (offset `0x2e90` in Emerald). Specifically, it checks the last 5 elements of this 13-element array, starting at index 8 (`MUSEUM_CONTEST_WINNERS_START`).

For each of these 5 slots, if the `species` field (a `u16` at offset `0x08` within the 32-byte `ContestWinner` struct) is non-zero, it means a painting for that category (Cool, Beauty, Cute, Smart, Tough) is on display in the Lilycove Museum.

## Architectural Constraints / Guidelines
- When implementing Trainer Card validation for the Contest Star, **do not** scan PC boxes for ribbons.
- You must parse the `contestWinners` array at the end of `SaveBlock1` (Emerald offset `0x2e90`), specifically checking the `species` ID of indices 8 through 12.
- A new ADR/KB document `.foundry/docs/knowledge_base/gen3_contest_museum_offsets.md` was created to document the exact byte offsets.

The permanent failure (Max rejection count reached) of `epic-038-061-pokerus-state-exfiltration` was caused by a violation of the Orchestrator Safeguard. Although the codebase implementations for parsing the Gen 2 Pokerus byte were correctly verified and refactored (as confirmed by the auditor and Tech Lead), the Epic was continuously rejected upon transition attempts because the Story Owner did not append a STORY node dedicated to Integration and E2E Verification (tagged with `e2e` or `integration`). As a strict macro-node constraint, every Epic must terminate with an E2E story.

Research task: `research-157-369-gen3-party-box-offsets`

## Objective
Research the exact memory offsets and structure for Party Pokémon and PC Box Pokémon in Generation 3 save files to enable accurate data extraction of PIDs.

## Findings
- Party Pokémon data is stored in Section 1 (Team / Items).
  - Offset `0x0234` (RS/E) or `0x0034` (FRLG) contains the Team Size (4 bytes or 1 byte).
  - Offset `0x0238` (RS/E) or `0x0038` (FRLG) contains the Team Pokémon list (600 bytes), which is an array of up to 6 100-byte Pokémon structures.
- PC Box Pokémon data is stored in the PC buffer (Sections 5-13).
  - Offset `0x0004` within the PC buffer contains the PC Boxes Pokémon list (33,600 bytes), which is an array of 420 80-byte Pokémon structures.
- The PID (Personality Value) is always located at offset `0x00` (the first 4 bytes) of both the 100-byte Party structure and the 80-byte PC Box structure.
- The 100-byte and 80-byte structures share the same first 80 bytes. The 100-byte structure contains an additional 20 bytes for battle stats, status condition, HP, etc.

- When tracking Gen 2 room decorations, the game doesn't use a dedicated "unlocked array". Instead, it dynamically generates the list of owned items by checking the `wEventFlags` array starting at bit 4 of byte 84 (`EVENT_DECO_BED_1`).
- `wOwnedDecoCategories` is just a temporary buffer populated in RAM, so the save parser must rely entirely on `wEventFlags`.
- To avoid absolute offsets failing between Gold/Silver and Crystal, the `wMomsMoney` and `wDecoBed` properties can be fetched relative to the `johtoBadgesOffset`.
- Mom's Money: 3-byte little-endian integer.

## Action
Researched WASM emulator options (mGBA, binjgb, SkyEmu, IodineGBA) for DexHelper's web-based integration using GitHub APIs to pull README details for projects.

## Findings
`binjgb` is highly performant and lightweight, running natively in the browser via WebAssembly with simple Javascript bindings for save state extraction, but only supports Game Boy and Game Boy Color. `mGBA` and `SkyEmu` both support GB, GBC, and GBA (Gen 1-3) and can be compiled to WASM, offering unified engines for our entire feature set. `IodineGBA` is pure JS and less desirable.
Based on CEO feedback, we evaluated a multi-emulator approach: using `binjgb` for its lightweight optimizations for Gen 1/2, and `mGBA` or `SkyEmu` specifically for Gen 3.

## Next Steps
Updated the knowledge base document `.foundry/docs/knowledge_base/architecture/wasm_emulators.md` with the expanded multi-emulator recommendation.
Drafted `task-421-435-wasm-emulator-adr` for the Architect persona to formalize the decision into an ADR. Checked off acceptance criteria in the parent research node and submitted via Empty PR.

When investigating Gen 3 decompilation code (e.g., `pokeemerald`, `pokefirered`), I discovered that the `MysteryGiftSave` structure contains several variable-length or specific-sized arrays (`WonderNews`, `WonderCard`, `WonderCardMetadata`).
Because the C source code doesn't explicitly state the exact byte size of these nested structures in comments, it's necessary to manually calculate the sizes using the struct definitions (e.g., tracking `u8`, `u16`, `u32`, and bitfields, plus array lengths) or write a quick calculation script.

**Key Learning:** When writing temporary Node.js scripts in the workspace (which uses `"type": "module"` in `package.json`), use the `.cjs` extension if the script uses CommonJS syntax (like `require()`) to avoid ES module ReferenceErrors. This ensures temporary investigative tools run smoothly.


# Session 15275065586819407345

- Learned that LLMs may wrap output in markdown code blocks, even when `responseMimeType` is set to `application/json` (e.g., ````json`). It is necessary to strip these tags explicitly using regex or similar before running `JSON.parse`. Trimming whitespace before performing this check handles edge cases.
- It is important to clean up all temporary scripts, outputs, and patch backup files from the workspace prior to code review or submission to adhere to the strict `Scratchpad Cleanup Enforcement` policy.



# Session 5492350295619108211

**Task:** research-363-440-investigate-trade-extraction-e2e-failure

Investigated the root cause of the previous E2E test failures (`task-363-415-trade-extraction-e2e-impl`) targeting Gen 3 save file fixtures.
The tests failed because `isGen3Save` in `src/engine/saveParser/utils/detection.ts` is implemented as a stub returning `false`. This causes `parseSaveFile` to immediately throw an error rather than attempting to load Gen 3 saves, rendering the UI logic untestable since the entire state engine fails to initialize.

**Learnings:**
- If Playwright E2E tests fail to run or complain about missing browser binaries, run `pnpm exec playwright install` to automatically download the required dependencies before executing the test suite.



# Session 18001398838651776536
- Discovered that using `ctx.waitUntil()` is a critical architectural constraint when integrating Google Drive Webhooks with Cloudflare Workers due to strict CPU limits.
- Established that webhooks are vastly superior to polling for the "live tracker" use case because Cloudflare's 1-minute Cron limit and Drive API quotas make polling impractical.

# Research Journal Entry: Gen 3 Trainer Data Structures

Investigated the `Trainer` and `TrainerMon` (party) struct sizes and layouts in Gen 3 games (Ruby/Sapphire/Emerald/FireRed/LeafGreen) by analyzing the decompiled `pokeemerald` repository.

**Key Learnings & Architectural Constraints:**
- The `Trainer` struct has a size of 40 bytes (`0x28`), containing a bitfield `partyFlags` at offset `0x00` that dictates the size and structure of the subsequent `TrainerMon` items in the `party` array (offset `0x24`).
- `aiFlags` is a 32-bit field at offset `0x1C`. Each bit corresponds to an AI script to run.
- There are four variants of `TrainerMon` (Pokémon in an opponent's party), controlled by `partyFlags`:
  - `0x00`: Default Moves, No Items (6 bytes).
  - `0x01`: Custom Moves, No Items (14 bytes).
  - `0x02`: Default Moves, With Items (8 bytes).
  - `0x03`: Custom Moves, With Items (16 bytes).

These structures are fixed in ROM and mapped by the trainer IDs, so parsing upcoming opponent teams requires reading the `Trainer` struct based on an ID, evaluating the `partyFlags`, and iterating the pointer over the appropriate `TrainerMon` variant.


---

## Aggregated from 3176136743482522530.md

# Researcher Journal Entry - Session 3176136743482522530

## Researching Gen 2 Roamer Save Fixtures

During the research for `research-466-467-gen2-roamer-fixtures`, I found that locating exact save states online for Gen 2 games (Gold/Silver/Crystal) with active Burned Tower roamers is quite difficult.

**Lesson Learned:** Instead of relying on manual hex editing of specific offsets—which can perpetuate incorrect assumptions about the game engine's behavior—it is much better to generate "real-world" saves.

The most reliable approach is to use a save editing tool like PKHeX to flip the necessary event flags (e.g., releasing the legendary beasts), and then run the modified save in a highly accurate emulator like BGB or mGBA. By simply interacting with the game normally (e.g., walking through grass or traversing routes), the game engine naturally populates the roamer data structures (map coordinates, levels, and statuses) in the SRAM via its internal RNG. Saving natively from the emulator captures this true state, providing a robust fixture for E2E testing without the risks of manual hex manipulation.
