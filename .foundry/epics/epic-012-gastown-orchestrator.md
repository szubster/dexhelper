---
id: epic-012-gastown-orchestrator
type: EPIC
title: "Gastown Cloudflare Worker Migration Evaluation"
status: "PENDING"
owner_persona: story_owner
created_at: "2026-04-23"
updated_at: "2026-04-26"
depends_on:
  - .foundry/epics/epic-011-wait-and-wake-protocol.md
jules_session_id: null
parent: ".foundry/prds/prd-002-late-binding-orchestrator.md"
tags:
  - foundry-v2
  - architecture
  - orchestration
---

# Gastown Cloudflare Worker Migration Evaluation

## Details
Assess the viability and benefits of extracting the `foundry-orchestrator.ts` logic into a Cloudflare Worker ("Gastown") to improve reliability, atomic state tracking, and security boundaries.

## Prerequisites
- Completion of `epic-011-wait-and-wake-protocol`.
- Review `.foundry/docs/knowledge_base/foundry/orchestrator/cloudflare_workers_evaluation.md`.

## High-level Acceptance Criteria
- [x] Evaluate Cloudflare D1 (SQL) or KV for persisting node states.
- [x] Design a sync mechanism (polling GitHub or receiving Webhooks) to keep the markdown file state synced with the internal database.
- [ ] Ensure the "Unreachable State Constraint" is maintained (Jules cannot access the Orchestrator DB).
- [ ] Document the findings and propose a final architecture decision on whether to proceed with the migration.

## Child Nodes
- [story-012-026-evaluate-cloudflare-storage](.foundry/stories/story-012-026-evaluate-cloudflare-storage.md)
- [story-012-027-design-sync-mechanism](.foundry/stories/story-012-027-design-sync-mechanism.md)
