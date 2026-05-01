---
id: epic-009-020-relax-node-engine
type: EPIC
title: "Relax Node engine requirement in package.json to >=22.0.0"
status: READY
owner_persona: "story_owner"
created_at: "2026-05-01"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/prds/prd-011-009-relax-node-engine.md"
tags: ["infrastructure"]
notes: ""
---

# Relax Node engine requirement in package.json to >=22.0.0

## Objective
Update the `engines.node` field in `package.json` from `>=24.0.0` to `>=22.0.0` to match the Foundry agents' execution environment, reducing PR rejections.

## Acceptance Criteria
- [ ] Update `engines.node` in `package.json` to `>=22.0.0`.
