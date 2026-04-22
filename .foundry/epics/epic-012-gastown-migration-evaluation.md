---
id: "epic-012-gastown-migration-evaluation"
type: "EPIC"
title: "Epic: Gastown Worker Migration Evaluation"
status: "PENDING"
owner_persona: "story_owner"
created_at: "2026-04-22"
updated_at: "2026-04-22"
depends_on:
  - .foundry/epics/epic-011-wait-wake-orchestration.md
jules_session_id: null
parent: ".foundry/prds/prd-002-late-binding-orchestrator.md"
tags: ["v2-architecture", "orchestration", "gastown-migration"]
---

# Epic: Gastown Worker Migration Evaluation

## Overview
This Epic involves a deep evaluation of migrating the Foundry orchestrator from GitHub Actions to an external Cloudflare Worker service ("Gastown"). The evaluation will determine if the increased state management and reliability benefits outweigh the added system complexity.

## Prerequisites
- Implementation of Wait & Wake Orchestration Protocol (`.foundry/epics/epic-011-wait-wake-orchestration.md`)
- Approval of PRD-002: Late Binding Epics & Recursive Orchestration (`.foundry/prds/prd-002-late-binding-orchestrator.md`)

## Acceptance Criteria
- [ ] Research and document a proof-of-concept for the Gastown Worker utilizing Cloudflare D1 (SQL) or KV to persist node states.
- [ ] Propose and document a state synchronization mechanism (polling GitHub vs Webhooks) ensuring consistency with the markdown file states.
- [ ] Define the security boundaries ensuring agents (Jules) cannot access the Orchestrator DB or hallucinate markdown states.
- [ ] Produce an Architecture Decision Record (ADR) recommending whether to proceed with the Gastown migration or improve GitHub Actions natively.
