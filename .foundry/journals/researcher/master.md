## Entry from 17353405569114618226.md

# Session Log

I investigated the permanent failure of `epic-120-338-implement-conflictless-journals`. The epic reached the max rejection count because it failed to comply with the Orchestrator Safeguard. Specifically, every EPIC must have at least one child STORY node dedicated to Integration and E2E Verification (tagged with `e2e` or `integration`) before it can transition to COMPLETED. Since `epic-120-338-implement-conflictless-journals` only had regular implementation stories without an E2E story, the orchestrator repeatedly rejected its completion attempt.

The replacement epic (`epic-335-401-implement-conflictless-journals-retry`) must ensure an E2E story is created to satisfy this constraint.

## Entry from 18338464510116993461.md

# Session 18338464510116993461

## Learnings
When an Epic repeatedly fails during empty PR submissions despite all child stories being marked as COMPLETED, it is highly likely a violation of the Orchestrator Safeguard (E2E/Integration Requirement). The Epic Planner or Story Owner must ensure every EPIC generates a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Failure to do so results in max rejection counts.

Furthermore, QA rejections regarding ADR 028 (magic numbers) must be carefully verified to ensure the implementation extracts all memory offsets into module-level constants.

## Entry from 3298853694244425673.md

# Session 3298853694244425673

- Explored knowledge base files to find the memory offsets and bit positions for Gen 3 Move Tutors.
- Discovered the data in `.foundry/docs/knowledge_base/gen3_move_tutor_offsets.md`.
- Formatted the required data into tables and updated the active `RESEARCH` node `.foundry/research/research-055-405-gen3-move-tutor-offsets.md`.
- Removed scratchpad script file `test_script.py` which was accidentally created and flagged during code review.
- Ran system verification test commands. E2E tests command `xvfb-run -a pnpm test:e2e` resulted in Playwright timing out and failing to find generic `chromium` project. Found that Playwright uses explicit test projects in this repository: `setup`, `Desktop FullHD`, `Desktop 1440p`, `Mobile Pixel 9`.

## From YYYY-MM-DD-HH-MM-SS.md

#

# Session 2026-08-04

Identified that the DAG Orchestrator enforces a strict E2E safeguard. Any EPIC whose child nodes complete without having spawned at least one STORY tagged with `e2e` or `integration` will be automatically rejected and permanently failed. All generative personas must explicitly ensure they fulfill this criteria during the breakdown phase to avoid repeating this impossible loop failure.

# Session YYYY-MM-DD-HH-MM-SS
When executing as the Researcher persona, log your session details to your private journal at `.foundry/journals/researcher/<session_id>.md` (or `YYYY-MM-DD-HH-MM-SS.md`), and explicitly read `.foundry/docs/knowledge_base/agents/core_policies.md` at session start.
The root cause of the permanent failure (Max rejection count reached) for the Gen 3 Secret Base Parsing epic was the missing Orchestrator Safeguard (E2E/Integration Requirement). The Epic did not generate a final STORY dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`). Consequently, the Orchestrator repeatedly rejected the Epic until it reached the maximum rejection count. Always ensure generative personas explicitly spawn an E2E/Integration STORY when breaking down an Epic.

## From 7961952418459437431.md

# Session 7961952418459437431

## Learnings
* **Testing against live repository data**: E2E tests targeting features that rely on repository metadata (like the Foundry DAG Dashboard reading `foundry.json`) should NOT rely on live repository state. In clean environments or CI, nodes with specific states (e.g., permanent failures) may not exist, causing non-deterministic timeouts.
* **Resolution**: Such tests must use Playwright's `page.route` to mock the `**/data/foundry.json` response, providing a deterministic dataset containing the exact edge cases the UI expects.
* **YAML Frontmatter Integrity**: When successfully completing a node (including RESEARCH nodes), never modify the YAML frontmatter (e.g., changing status to READY or clearing `jules_session_id`). Modifying the frontmatter breaks the Orchestrator's state machine. Only update the markdown body.
