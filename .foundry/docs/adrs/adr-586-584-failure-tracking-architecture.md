---
id: adr-586-584-failure-tracking-architecture
type: ADR
title: Technical Architecture for Failure Tracking
status: ACTIVE
owner_persona: architect
created_at: '2026-10-08'
updated_at: '2026-10-09'
depends_on: []
jules_session_id: '13375914325660456299'
pr_number: null
parent: prd-535-586-false-permanent-failure-detection
priority: 80
confidence_score: 100
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Technical Architecture for Failure Tracking

## Context
Need to define the technical architecture for the new failure tracking to differentiate between system crashes and domain rejections.


## Architecture

1. **system_failure_count**: A new YAML frontmatter field `system_failure_count` will be added to `.foundry` nodes.
2. **Type and Validation**: It will be defined in `.github/scripts/schema.ts` as `z.number().int().optional()`.
3. **Schema Updates**: The `.foundry/docs/schema.md` will be updated to include the new counter in the YAML frontmatter schema definition and Field Reference table.
4. **Orchestrator Parsing**: The orchestrator will parse termination states to distinguish system/infrastructure failures from human/agent QA domain rejections, incrementing `system_failure_count` when appropriate.
