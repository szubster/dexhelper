# Master Journal: Researcher

## Session: 12219787187610158486
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

## Session: 2026-07-31-00-00-00
# Research Session: 2026-07-31-00-00-00
Target Node: `research-050-329-investigate-zombie-gc-failure`

## Findings
I investigated the failure of `epic-050-090-zombie-node-remediation-and-gc`. The auditor's journal revealed a programmatic orchestrator safeguard that requires macro nodes (like EPICs) to have at least one child STORY tagged with `e2e` or `integration` before they can be marked `COMPLETED`.
Because the previous epic's stories did not have these tags, verification failed repeatedly, leading to the epic hitting its maximum rejection count and being cancelled.

## Actions
I have documented these findings in the research node and outlined the path forward for the replacement epics (`epic-050-330` and `epic-050-331`), ensuring they incorporate these required tags in their child stories.

## Session: 5532047153809885056
# Session 5532047153809885056

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

## Session: 6535908287339075091
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

## Session: 7509224859674163249
# Session 7509224859674163249

## Save File Parsing - Magic Numbers
When reviewing the Hall of Fame parsing implementation, it was rejected for using inline magic numbers (e.g. `4` for bytes per stat, and `8` for bits per byte). The "No Magic Numbers" architectural rule requires explicitly defining module-level constants (like `BYTES_PER_GAME_STAT` and `BITS_PER_BYTE`). I have documented these specific constants in `.foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md` to prevent future implementers from repeating this violation during offset and bitwise calculations.

## Session: 9973392608168783559
# Research Journal: Investigate Pokemon Types Data Failure

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

