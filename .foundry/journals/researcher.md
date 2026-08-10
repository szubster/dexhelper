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

## Session: 2026-07-29-investigate-sorting-failure
---
trigger: `story-136-295-sorting-standard-strategies`
---
Founding issue: The task failed because it asks to sort by type, and `PokemonMetadata` doesn't have type info.

# Research Session: 2026-07-31-00-00-00
Target Node: `research-050-329-investigate-zombie-gc-failure`

## Findings
I investigated the failure of `epic-050-090-zombie-node-remediation-and-gc`. The auditor's journal revealed a programmatic orchestrator safeguard that requires macro nodes (like EPICs) to have at least one child STORY tagged with `e2e` or `integration` before they can be marked `COMPLETED`.
Because the previous epic's stories did not have these tags, verification failed repeatedly, leading to the epic hitting its maximum rejection count and being cancelled.

## Actions
I have documented these findings in the research node and outlined the path forward for the replacement epics (`epic-050-330` and `epic-050-331`), ensuring they incorporate these required tags in their child stories.

## Findings
I investigated the exact memory offsets and bit layouts for `wSwarmFlags`, `wDailyPhoneItemFlags`, and `wDailyPhoneTimeOfDayFlags` across Gen 2 Gold/Silver and Crystal versions.

For Gold/Silver, these specific memory arrays do not exist. Instead:
- Swarms are handled via `wSwarmMapGroup` (`0xDD17`), `wSwarmMapNumber` (`0xDD18`), and `wFishingSwarmFlag` (`0xDD19`), along with `DAILYFLAGS1_SWARM_F` in `wDailyFlags1` (`0xD968`).
- Item giving and daily call flags are just standard event flags stored in `wEventFlags` (`0xD7B7`).

For Crystal, the explicit offsets (within WRAM Bank 1) are:
- `wSwarmFlags`: `0xDC20` (1 byte)
- `wDailyPhoneItemFlags`: `0xDC50` (4 bytes)
- `wDailyPhoneTimeOfDayFlags`: `0xDC54` (4 bytes)

I have updated `.foundry/docs/knowledge_base/engine/save_parsing/gen2_phone_mechanics.md` with this context.

# Research Journal: Gen 3 PC Box Offsets Root Cause
Session: 6535908287339075091

## Goal
Investigate the root cause of the previous failure related to Gen 3 PC Box extraction (`task-273-327-living-dex-pc-mapping-impl`) and the missing offsets, and research the exact memory structure of PC Boxes in Gen 3 saves.

## Root Cause Analysis
The task `task-273-327-living-dex-pc-mapping-impl` permanently failed because it was missing information regarding Gen 3 save parsing, specifically PC Box offsets.
The previous research task (`research-327-385-gen3-pc-box-offsets`) was cancelled due to a cascading cancellation from its parent task (`task-273-327-living-dex-pc-mapping-impl`), which hit max rejections (3) because the implementation could not proceed without the missing offsets. This led to an 'impossible loop' where the implementation couldn't complete without the research, but the research was tied as a dependency that got cancelled when the parent failed. The late-bound node (`research-273-393-gen3-pc-box-offsets-root-cause`) was correctly spawned to break this loop by gathering the necessary context.

## Findings
I have successfully retrieved the missing Gen 3 PC Box memory structure from Bulbapedia:
- **PC Buffer**: Spans logical sections 5 through 13. Sections 5-12 contain 3968 bytes, section 13 contains 2000 bytes. Total PC buffer size is 33,744 bytes.
- **Current Box**: Offset `0x0000` (4 bytes).
- **Pokémon List**: Starts at `0x0004` (33,600 bytes) covering 420 Pokémon (14 boxes * 30 Pokémon per box).
- **Box Names**: Offset `0x8344` (126 bytes).
- **Box Wallpapers**: Offset `0x83C2` (14 bytes).

Furthermore, the data structure for Pokémon stored in the PC is only **80 bytes** long per record (compared to 100 bytes for party Pokémon). The data block from offset `0x20` to `0x50` contains the encrypted substructures. Information beyond the first 80 bytes (like status conditions) is regenerated upon withdrawing a Pokémon.

These findings have been documented in `.foundry/docs/knowledge_base/engine/save_parsing/gen3_pc_box_offsets.md`.

## Save File Parsing - Magic Numbers
When reviewing the Hall of Fame parsing implementation, it was rejected for using inline magic numbers (e.g. `4` for bytes per stat, and `8` for bits per byte). The "No Magic Numbers" architectural rule requires explicitly defining module-level constants (like `BYTES_PER_GAME_STAT` and `BITS_PER_BYTE`). I have documented these specific constants in `.foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md` to prevent future implementers from repeating this violation during offset and bitwise calculations.

## Goal
Investigate why `task-333-363-pokemon-types-data-impl` was rejected due to a sorting issue in `generate-pokedata.ts`.

## Findings
The QA persona rejected the task because the implementation "fails to sort by slot before mapping, violating the specific acceptance criterion: 'sorts by slot (if applicable)'."

When reviewing how PokeAPI returns types (e.g., for Bulbasaur at `https://pokeapi.co/api/v2/pokemon/1`), it returns an array of objects:
```json
[
  {
    "slot": 1,
    "type": {
      "name": "grass",
      "url": "https://pokeapi.co/api/v2/type/12/"
    }
  },
  {
    "slot": 2,
    "type": {
      "name": "poison",
      "url": "https://pokeapi.co/api/v2/type/4/"
    }
  }
]
```
The `generate-pokedata.ts` script in the rejected implementation was likely simply doing:
`pData.types?.map((t: any) => POKEMON_TYPE_MAP[t.type.name] || 0) || []`

To satisfy the acceptance criteria and ensure types are ordered correctly (primary type first), it must sort the array by the `slot` property before mapping:
`pData.types?.sort((a: any, b: any) => a.slot - b.slot).map((t: any) => POKEMON_TYPE_MAP[t.type.name] || 0) || []`


## Session from 2026-08-04.md
Session 2026-08-04: Investigated Gen 3 trainer flag offsets and saved to .foundry/docs/knowledge_base/gen3_trainer_flags_offsets.md

## Session from 3239184284682901692.md
# Session 3239184284682901692

- Completed research-099-396-investigate-indexeddb-schema-failure.
- Root Cause: Coder misused Empty PR Policy by failing to verify DB schema matched Section 14 of docs/schema.md.
- Solution: Enforce strict schema validation in Acceptance Criteria for retry tasks.


### Session: YYYY-MM-DD-HH-MM-SS.md
## Session 2026-08-04

Identified that the DAG Orchestrator enforces a strict E2E safeguard. Any EPIC whose child nodes complete without having spawned at least one STORY tagged with `e2e` or `integration` will be automatically rejected and permanently failed. All generative personas must explicitly ensure they fulfill this criteria during the breakdown phase to avoid repeating this impossible loop failure.
# Session YYYY-MM-DD-HH-MM-SS
When executing as the Researcher persona, log your session details to your private journal at `.foundry/journals/researcher/<session_id>.md` (or `YYYY-MM-DD-HH-MM-SS.md`), and explicitly read `.foundry/docs/knowledge_base/agents/core_policies.md` at session start.
The root cause of the permanent failure (Max rejection count reached) for the Gen 3 Secret Base Parsing epic was the missing Orchestrator Safeguard (E2E/Integration Requirement). The Epic did not generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Consequently, the Orchestrator repeatedly rejected the Epic until it reached the maximum rejection count. Always ensure generative personas explicitly spawn an E2E/Integration STORY when breaking down an Epic.


### Session: 18338464510116993461.md
# Session 18338464510116993461

## Learnings
When an Epic repeatedly fails during empty PR submissions despite all child stories being marked as COMPLETED, it is highly likely a violation of the Orchestrator Safeguard (E2E/Integration Requirement). The Epic Planner or Story Owner must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Failure to do so results in max rejection counts.

Furthermore, QA rejections regarding ADR 028 (magic numbers) must be carefully verified to ensure the implementation extracts all memory offsets into module-level constants.


### Session: 17353405569114618226.md
# Session Log

I investigated the permanent failure of `epic-120-338-implement-conflictless-journals`. The epic reached the max rejection count because it failed to comply with the Orchestrator Safeguard. Specifically, every EPIC must have at least one child STORY node dedicated to Integration and E2E Verification (tagged with `e2e` or `integration`) before it can transition to COMPLETED. Since `epic-120-338-implement-conflictless-journals` only had regular implementation stories without an E2E story, the orchestrator repeatedly rejected its completion attempt.

The replacement epic (`epic-335-401-implement-conflictless-journals-retry`) must ensure an E2E story is created to satisfy this constraint.


### Session: 3298853694244425673.md
# Session 3298853694244425673

- Explored knowledge base files to find the memory offsets and bit positions for Gen 3 Move Tutors.
- Discovered the data in `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`.
- Formatted the required data into tables and updated the active `RESEARCH` node `.foundry/research/research-055-405-gen3-move-tutor-offsets.md`.
- Removed scratchpad script file `test_script.py` which was accidentally created and flagged during code review.
- Ran system verification test commands. E2E tests command `xvfb-run -a pnpm test:e2e` resulted in Playwright timing out and failing to find generic `chromium` project. Found that Playwright uses explicit test projects in this repository: `setup`, `Desktop FullHD`, `Desktop 1440p`, `Mobile Pixel 9`.
