---
id: epic-008-017-orchestrator-preflight-checks
type: EPIC
title: "Orchestrator Pre-flight Generation Validation"
status: READY
owner_persona: story_owner
created_at: "2026-04-29"
updated_at: "2026-04-29"
depends_on: []
jules_session_id: null
parent: .foundry/prds/prd-010-008-idempotent-node-generation.md
tags: ["orchestrator", "generation", "efficiency"]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Orchestrator Pre-flight Generation Validation

## Overview
Introduce logic to `foundry-orchestrator.ts` to detect explicitly spawned target files before dispatching a session.

## Requirements
- Define what constitutes a "completely formed" artifact (e.g., schema validation).
- Implement a pre-flight file check before spawning Jules matrix jobs.
- Target artifacts must be checked for existence and valid schema in the `.foundry/` directory.

## Acceptance Criteria
- [ ] Orchestrator parses expected outputs for node generation tasks.
- [ ] Orchestrator successfully validates the schema of pre-existing target nodes.
