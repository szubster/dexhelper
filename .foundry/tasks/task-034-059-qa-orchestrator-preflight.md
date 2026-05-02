---
id: task-034-059-qa-orchestrator-preflight
type: TASK
title: "QA: Verify Orchestrator Preflight"
status: "COMPLETED"
owner_persona: qa
created_at: "2026-04-30"
updated_at: "2026-05-02"
depends_on: [".foundry/tasks/task-034-058-implement-orchestrator-preflight.md"]
jules_session_id: null
parent: .foundry/stories/story-017-034-orchestrator-preflight-logic.md
tags: []
rejection_count: 2
rejection_reason: ""
notes: ""
---

# Task: QA Orchestrator Preflight Logic

## Overview
Write tests to verify the pre-flight logic implemented in `.github/scripts/foundry-orchestrator.ts`.

## Acceptance Criteria
- [x] Verify that if a target artifact already exists and is fully valid according to the schema, the orchestrator skips dispatch for the corresponding generation task.
- [x] Verify that if a target artifact exists but is invalid, it is either flagged or handled correctly according to the implemented logic.
