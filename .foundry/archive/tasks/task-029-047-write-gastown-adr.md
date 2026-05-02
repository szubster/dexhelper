---
id: task-029-047-write-gastown-adr
type: TASK
title: "Write Gastown Migration ADR"
status: "COMPLETED"
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-28"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/archive/stories/story-012-029-document-gastown-migration-decision.md
tags:
  - foundry-v2
  - architecture
  - orchestration
rejection_count: 0
---

# Write Gastown Migration ADR

## Details
Write `.foundry/docs/adrs/003-gastown-migration-decision.md` to document the Gastown migration decision. It must synthesize the findings from Cloudflare Workers evaluation, D1 vs KV comparison, and the sync mechanism design.

### Required Content:
1. Summarize the benefits and trade-offs of migrating to a Cloudflare Worker for orchestration.
2. Detail the D1 relational schema and the webhook-based sync mechanism.
3. Propose a final "go" decision.
4. Draft a high-level migration plan.

### Intelligent Verification Protocol
This is a documentation task (low risk). The `coder` is designated to self-verify by checking the ADR format and document the verification in their task journal.

## Acceptance Criteria
- [x] Create `.foundry/docs/adrs/003-gastown-migration-decision.md`.
- [x] Document Cloudflare Worker benefits (reliable sub-minute scheduling, atomic transitions, external reachability).
- [x] Document the decision to use D1 over KV for strict consistency and complex state queries.
- [x] Detail the D1 schema (`nodes`, `dependencies`, `tags`) and webhook sync mechanism (Git push -> Webhook -> Worker -> Diff -> Fetch -> D1).
- [x] Include the "go" decision and high-level migration plan.
- [x] Document self-verification in `.jules/coder.md`.
