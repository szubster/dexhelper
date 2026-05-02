---
id: task-034-059-qa-orchestrator-preflight
type: TASK
title: "QA: Verify Orchestrator Preflight"
status: "ACTIVE"
owner_persona: qa
created_at: "2026-04-30"
updated_at: "2026-05-01"
depends_on: [".foundry/archive/tasks/task-034-058-implement-orchestrator-preflight.md"]
jules_session_id: "5374575547475380552"
parent: .foundry/stories/story-017-034-orchestrator-preflight-logic.md
tags: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Task: QA Orchestrator Preflight Logic

## Overview
Write tests to verify the pre-flight logic implemented in `.github/scripts/foundry-orchestrator.ts`.

## Acceptance Criteria
- [ ] Verify that if a target artifact already exists and is fully valid according to the schema, the orchestrator skips dispatch for the corresponding generation task.
- [ ] Verify that if a target artifact exists but is invalid, it is either flagged or handled correctly according to the implemented logic.
