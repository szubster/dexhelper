---
id: idea-066-standardize-rejection-threshold
type: IDEA
title: Standardize MAX_REJECTION_THRESHOLD
status: PENDING
owner_persona: product_manager
created_at: '2026-05-26'
updated_at: '2026-05-26'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - process
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Standardize MAX_REJECTION_THRESHOLD

## Context
While reviewing the recent introduction of the Permanent Failure Dashboard UI (ADR 017), it was observed that `MAX_REJECTION_THRESHOLD` is referenced as a concept but is not formally defined in the system schema or global configuration. Currently, the orchestrator scripts (such as `.github/scripts/foundry-heartbeat.ts` and its associated tests) hardcode the maximum rejection count as `3` instead of relying on a centralized constant.

## Proposal
Create a formalized, system-wide `MAX_REJECTION_THRESHOLD` constant (e.g., in a global orchestrator config file or environment variable) that all scripts and UI components must read from. This will ensure:
- The orchestrator's heartbeat script evaluates the "Impossible Loop" consistently against a single source of truth.
- The React Flow/Kanban dashboard correctly filters nodes that have reached the configured threshold.
- Future changes to this threshold only require a single update rather than scattering changes across multiple files.

## Next Steps
- [ ] Product Manager: Evaluate this idea, determine the best place to define the threshold, and convert it to a PRD.
