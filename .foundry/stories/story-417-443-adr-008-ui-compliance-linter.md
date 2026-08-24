---
id: story-417-443-adr-008-ui-compliance-linter
type: STORY
title: Enforce ADR 008 UI Constraints via Linter
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-23T00:00:00.000Z'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: '8820549905057303773'
pr_number: null
parent: epic-142-417-automated-adr-compliance-linter
tags:
  - foundry
  - orchestrator
  - compliance
  - adr
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce ADR 008 UI Constraints via Linter

## Problem Definition
ADR 008 defines strict UI constraints for the "tactical hardware/snooping" aesthetic, specifically requiring sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). It explicitly forbids `rounded-t`, `rounded-b`, `rounded-sm`, etc. Currently, these are not statically enforced.

## Proposed Solution
Create a static analysis script (`scripts/verify-adr-compliance.ts`) that specifically parses `.tsx` files to enforce the ADR 008 constraints.
- It should check for forbidden classes (`rounded-t`, `rounded-b`, `rounded-sm`, etc.) and throw an error or flag them.
- Ensure the script is lightweight and easy to integrate into the existing CI pipeline.

## Acceptance Criteria
- [ ] Break down this story into actionable engineering tasks.
