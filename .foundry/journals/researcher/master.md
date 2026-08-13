# Session Log

I investigated the permanent failure of `epic-120-338-implement-conflictless-journals`. The epic reached the max rejection count because it failed to comply with the Orchestrator Safeguard. Specifically, every EPIC must have at least one child STORY node dedicated to Integration and E2E Verification (tagged with `e2e` or `integration`) before it can transition to COMPLETED. Since `epic-120-338-implement-conflictless-journals` only had regular implementation stories without an E2E story, the orchestrator repeatedly rejected its completion attempt.

The replacement epic (`epic-335-401-implement-conflictless-journals-retry`) must ensure an E2E story is created to satisfy this constraint.

## Learnings
When an Epic repeatedly fails during empty PR submissions despite all child stories being marked as COMPLETED, it is highly likely a violation of the Orchestrator Safeguard (E2E/Integration Requirement). The Epic Planner or Story Owner must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Failure to do so results in max rejection counts.

Furthermore, QA rejections regarding ADR 028 (magic numbers) must be carefully verified to ensure the implementation extracts all memory offsets into module-level constants.

# Session 3298853694244425673

- Explored knowledge base files to find the memory offsets and bit positions for Gen 3 Move Tutors.
- Discovered the data in `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`.
- Formatted the required data into tables and updated the active `RESEARCH` node `.foundry/research/research-055-405-gen3-move-tutor-offsets.md`.

#

# Session 2026-08-04

Identified that the DAG Orchestrator enforces a strict E2E safeguard. Any EPIC whose child nodes complete without having spawned at least one STORY tagged with `e2e` or `integration` will be automatically rejected and permanently failed. All generative personas must explicitly ensure they fulfill this criteria during the breakdown phase to avoid repeating this impossible loop failure.

# Session YYYY-MM-DD-HH-MM-SS
When executing as the Researcher persona, log your session details to your private journal at `.foundry/journals/researcher/<session_id>.md` (or `YYYY-MM-DD-HH-MM-SS.md`), and explicitly read `.foundry/docs/knowledge_base/agents/core_policies.md` at session start.
The root cause of the permanent failure (Max rejection count reached) for the Gen 3 Secret Base Parsing epic was the missing Orchestrator Safeguard (E2E/Integration Requirement). The Epic did not generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Consequently, the Orchestrator repeatedly rejected the Epic until it reached the maximum rejection count. Always ensure generative personas explicitly spawn an E2E/Integration STORY when breaking down an Epic.

## Learnings
* **Testing against live repository data**: E2E tests targeting features that rely on repository metadata (like the Foundry DAG Dashboard reading `foundry.json`) should NOT rely on live repository state. In clean environments or CI, nodes with specific states (e.g., permanent failures) may not exist, causing non-deterministic timeouts.
* **Resolution**: Such tests must use Playwright's `page.route` to mock the `**/data/foundry.json` response, providing a deterministic dataset containing the exact edge cases the UI expects.
* **YAML Frontmatter Integrity**: When successfully completing a node (including RESEARCH nodes), never modify the YAML frontmatter (e.g., changing status to READY or clearing `jules_session_id`). Modifying the frontmatter breaks the Orchestrator's state machine. Only update the markdown body.

# Session 14294444319199255346

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

# Research Journal - Gen 3 Trainer Card Contest Star

**Session ID:** 9486604902122696726

## Findings
I investigated how the "Contest Master Rank" star is awarded on the Gen 3 Trainer Card. The initial assumption might be to scan PC boxes or the party for Pokémon with the Contest Master ribbon.

However, `pokeemerald`'s source code (`src/trainer_card.c`) reveals that this requirement is satisfied by the function `CountPlayerMuseumPaintings() >= CONTEST_CATEGORIES_COUNT`.

The function `CountPlayerMuseumPaintings` checks the `contestWinners` array located in `SaveBlock1` (offset `0x2e90` in Emerald). Specifically, it checks the last 5 elements of this 13-element array, starting at index 8 (`MUSEUM_CONTEST_WINNERS_START`).

For each of these 5 slots, if the `species` field (a `u16` at offset `0x08` within the 32-byte `ContestWinner` struct) is non-zero, it means a painting for that category (Cool, Beauty, Cute, Smart, Tough) is on display in the Lilycove Museum.

## Architectural Constraints / Guidelines
- When implementing Trainer Card validation for the Contest Star, **do not** scan PC boxes for ribbons.
- You must parse the `contestWinners` array at the end of `SaveBlock1` (Emerald offset `0x2e90`), specifically checking the `species` ID of indices 8 through 12.
- A new ADR/KB document `.foundry/docs/knowledge_base/gen3_contest_museum_offsets.md` was created to document the exact byte offsets.
