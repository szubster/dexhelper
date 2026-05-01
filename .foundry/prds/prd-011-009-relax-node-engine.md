---
id: prd-011-009-relax-node-engine
type: PRD
title: "Relax Node engine requirement in package.json to >=22.0.0"
status: READY
owner_persona: "epic_planner"
created_at: "2026-05-01"
updated_at: "2026-05-01"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/ideas/idea-011-relax-node-engine.md"
tags: ["infrastructure"]
notes: ""
---

# Relax Node engine requirement in package.json to >=22.0.0

## Context and Observation
The `task-016-041-update-package-json-lint` suffered 6 rejections because agents encountered an environment mismatch. The `package.json` currently requires Node `>=24.0.0`, but the standard agent and CI environments run Node 22. This mismatch causes `pnpm install` to fail unless specifically bypassed (`pnpm config set engine-strict false`). When dependencies fail to install, agents cannot run essential linting and formatting tools (like `oxlint` and `biome`), leading to unverified code submissions and repeated rejections.

## Proposed Change
We should relax the `engines.node` field in `package.json` from `>=24.0.0` to `>=22.0.0` to natively match the execution environment of the Foundry agents. This will prevent friction and reduce PR rejections without requiring manual troubleshooting overrides in the agent prompts.

## Acceptance Criteria
- [x] Update `engines.node` in `package.json` to `>=22.0.0`.

- **Child Epic**: [.foundry/epics/epic-009-020-relax-node-engine.md](.foundry/epics/epic-009-020-relax-node-engine.md)
