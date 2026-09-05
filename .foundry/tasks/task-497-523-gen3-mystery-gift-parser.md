---
id: task-497-523-gen3-mystery-gift-parser
type: TASK
title: Implement Gen 3 Mystery Gift Data Parser
status: READY
owner_persona: coder
created_at: '2026-09-02'
updated_at: '2026-09-05'
depends_on:
  - task-497-521-gen3-mystery-gift-state
jules_session_id: null
pr_number: null
parent: story-405-497-gen3-e-reader-dashboard-state
tags:
  - gen3
  - parser
research_references:
  - .foundry/docs/knowledge_base/gen3_mystery_gift_event_flags.md
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Implement Gen 3 Mystery Gift Data Parser

## Objective
Implement the logic to extract Mystery Gift event flags and ship enablement flags from Gen 3 save files.

## Scope
1. Implement extraction logic to parse `FLAG_RECEIVED_AURORA_TICKET`, `FLAG_RECEIVED_MYSTIC_TICKET`, `FLAG_RECEIVED_OLD_SEA_MAP`, and `FLAG_ENABLE_SHIP_*` flags based on the memory offsets documented in `.foundry/docs/knowledge_base/gen3_mystery_gift_event_flags.md`.
2. Map the extracted raw boolean values into the new `Gen3MysteryGift` interface format (implemented in the prerequisite task).
3. Integrate this extraction into the main Gen 3 save parsing pipeline (e.g. `src/engine/saveParser/parsers/common.ts` or appropriate parser module).

## Constraints & Architecture
- Ensure extraction explicitly handles differences between Emerald/Ruby/Sapphire and FireRed/LeafGreen.
- Do not write unit tests in this task. They will be handled in a separate task.

## Acceptance Criteria
- [ ] Extraction logic is implemented and maps correctly to `Gen3MysteryGift`.
- [ ] Build completes without errors.
