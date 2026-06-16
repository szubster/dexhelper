---
id: task-128-182-move-data-extraction-qa
type: TASK
title: QA Move Data Extraction
status: PENDING
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-16'
depends_on:
  - task-128-181-move-data-extraction-impl
jules_session_id: null
pr_number: null
parent: story-086-128-move-data-extraction
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: QA Move Data Extraction

## Background
The coder has implemented move data extraction in `scripts/generate-pokedata.ts` according to ADR 025. This task is to verify that the implementation is correct and the generated `moves.jsonl` output meets the required schema.

## Verification Steps
1.  **Review the Code:** Check the changes in `scripts/generate-pokedata.ts` to ensure it parses the `move` API data correctly.
2.  **Verify Schema Compliance:** Verify that the logic correctly maps properties to `id`, `name`, `type`, `p` (power), `acc` (accuracy), `pp`, `dmg_class` (1=phys, 2=spec, 3=status), and `effect`.
3.  **Verify Compaction:** Ensure that default values like accuracy=100 or power=0/null are correctly omitted from the output.
4.  **Run the Generator:** Execute the script and inspect `data/db/moves.jsonl` to confirm the output is as expected.

## Critical Reminders
- If you reject the implementation, you MUST update the target task's (`task-128-181-move-data-extraction-impl`) YAML frontmatter to `status: FAILED`, provide a `rejection_reason`, increment `rejection_count`, and leave its acceptance criteria unchecked. You MUST NOT modify your own task's YAML frontmatter (it remains ACTIVE) and must document the failure in your own markdown body.
- If the implementation is verified, submit an empty PR to transition your own task to COMPLETED, and ensure you check off your own acceptance criteria first.

## Acceptance Criteria
- [ ] Code changes in `scripts/generate-pokedata.ts` accurately implement the extraction logic.
- [ ] The generated data structure strictly follows the ADR 025 schema constraints.
- [ ] Compaction logic effectively omits default/empty values to minimize payload size.
- [ ] The generated `moves.jsonl` file is successfully created and verified.
