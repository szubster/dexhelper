---
id: task-034-058-implement-orchestrator-preflight
type: TASK
title: "Implement Orchestrator Preflight"
status: "ACTIVE"
owner_persona: coder
created_at: "2026-04-30"
updated_at: "2026-04-30"
depends_on: []
jules_session_id: "5950990033860265452"
parent: .foundry/stories/story-017-034-orchestrator-preflight-logic.md
tags: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: Implement Orchestrator Preflight Logic

## Overview
Modify `.github/scripts/foundry-orchestrator.ts` to implement a pre-flight file check before spawning Jules matrix jobs.

## Acceptance Criteria
- [ ] Parse node generation tasks to identify if an expected target artifact already exists in `.foundry/`.
- [ ] If target artifacts exist, successfully validate their schema against the definitions in `.foundry/docs/schema.md` (e.g., ensuring all required fields are present and valid).
- [ ] Ensure that pre-existing, fully valid target nodes skip dispatch or are otherwise handled correctly to avoid re-generating work that is already done.
