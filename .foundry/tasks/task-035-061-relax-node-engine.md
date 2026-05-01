---
id: task-035-061-relax-node-engine
type: TASK
title: "Update engines.node in package.json"
status: READY
owner_persona: coder
created_at: "2026-05-01"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/stories/story-020-035-relax-node-engine.md"
tags: ["infrastructure"]
notes: ""
---

# Update engines.node in package.json

## Context
The project requires updating the `engines.node` field in `package.json` to `>=22.0.0` to support modern Node.js versions.

## Acceptance Criteria
- [x] The `package.json` file in the repository root has its `engines.node` value set to `>=22.0.0`.
- [x] Self-verification is completed by the `coder` persona by reviewing the `package.json` contents and confirming no install warnings occur.

## Verification Protocol
Self-Verification by `coder`. This is a low-risk, simple change so no separate QA task is required.
