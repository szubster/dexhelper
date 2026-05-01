---
id: story-017-034-orchestrator-preflight-logic
type: STORY
title: "Implement Pre-flight Logic in Orchestrator"
status: "COMPLETED"
owner_persona: tech_lead
created_at: "2026-04-29"
updated_at: "2026-04-30"
depends_on: []
jules_session_id: null
parent: .foundry/epics/epic-008-017-orchestrator-preflight-checks.md
tags: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Story: Implement Pre-flight Logic in Orchestrator

## Overview
Modify `foundry-orchestrator.ts` to implement a pre-flight file check before spawning Jules matrix jobs. This check ensures that explicitly spawned target files are detected and validated before dispatching a session.

## Requirements
- Parse the YAML frontmatter to identify expected output artifacts for node generation tasks.
- Check if target artifacts already exist in the `.foundry/` directory.
- If target artifacts exist, successfully validate their schema against the definitions in `.foundry/docs/schema.md`.

## Tasks
- [x] Create coder task: .foundry/tasks/task-034-058-implement-orchestrator-preflight.md
- [x] Create qa task: .foundry/tasks/task-034-059-qa-orchestrator-preflight.md
