---
id: epic-142-417-automated-adr-compliance-linter
type: EPIC
title: Automated ADR Compliance Linter Script
status: ACTIVE
owner_persona: story_owner
created_at: '2025-01-01T00:00:00.000Z'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '13806017638855668589'
pr_number: null
parent: prd-142-342-automated-adr-compliance-linter
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

# Automated ADR Compliance Linter Script

## Problem Definition
As the system scales and more Architectural Decision Records (ADRs) are introduced, enforcing these guidelines relies heavily on expensive QA LLM tokens. We need an automated static analysis linter script (e.g., `scripts/verify-adr-compliance.ts`) that enforces concrete violations of ADRs before code is sent to the QA persona.

## Proposed Solution
Develop a static analysis linter script (`scripts/verify-adr-compliance.ts`) using tools like Biome/Oxlint logic (or plain TS logic if easier, since they are already present) to:
1.  **Enforce ADR 008 (UI Constraints):** Check for tactical hardware aesthetics. Verify the usage of sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (e.g., `font-mono`) and strictly flag invalid classes (like `rounded-t`, `rounded-b`, `rounded-sm`) in `.tsx` files.
2.  **Enforce ADR 013 (Component State):** Ensure React context is used for lifting state to share between the Kanban Board and React Flow visualizations in relevant dashboard views.

## Acceptance Criteria
- [x] Break down this epic into stories.
- [x] Ensure a final STORY is generated that is dedicated exclusively to Integration and E2E Verification.
- [ ] story-417-443-adr-008-ui-compliance-linter
- [ ] story-417-444-adr-013-state-compliance-linter
- [ ] story-417-445-linter-integration-e2e
