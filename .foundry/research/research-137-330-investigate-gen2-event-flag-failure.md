---
id: research-137-330-investigate-gen2-event-flag-failure
type: RESEARCH
title: Investigate Gen 2 Event Flag Parsing Failure
status: COMPLETED
owner_persona: researcher
created_at: '2026-07-18'
updated_at: '2026-07-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-106-137-gen2-static-encounters
tags:
  - gen2
  - backend
  - failure-investigation
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 2 Event Flag Parsing Failure

Investigate the root cause of the permanent failure in `story-137-294-gen2-event-flag-parsing`.

## Findings
The root cause of the failure in `story-137-294-gen2-event-flag-parsing` and its associated tasks is that the developer implemented incorrect bit offsets by assuming the line numbers in `pokecrystal`'s `constants/event_flags.asm` corresponded to the constant values (e.g. `EVENT_FOUGHT_SUDOWOODO` is on line 51, so they used 51).

This is fundamentally flawed because the assembly file utilizes directives like `const_skip`, `const_def`, and `const_next` to dynamically advance the constant counter, meaning line numbers do not map to the true integer values.

I have parsed the assembly file and evaluated the directives correctly. The true parsed bit values for the required static encounters are:
- `EVENT_FOUGHT_SUDOWOODO` = 42
- `EVENT_FOUGHT_HO_OH` = 791
- `EVENT_FOUGHT_LUGIA` = 792
- `EVENT_FOUGHT_SNORLAX` = 1872
- `EVENT_LAKE_OF_RAGE_RED_GYARADOS` = 1873

These have been documented in the knowledge base at `.foundry/docs/knowledge_base/engine/save_parsing/gen2_event_flags.md`. Future blueprints should mandate these values.

## Acceptance Criteria
- [x] Root cause identified and documented.
