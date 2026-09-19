---
id: idea-526-automated-session-transcript-linter
title: Automated Session Transcript Linter for Autonomous Policy Violations
type: IDEA
status: READY
owner_persona: product_manager
created_at: 2026-09-19T04:15:00.000Z
updated_at: 2026-09-19T04:15:00.000Z
tags:
  - governance
  - autonomous-policy
  - workflow
  - ci
depends_on: []
---

# Idea: Automated Session Transcript Linter for Autonomous Policy Violations

## Context
Analysis of past persona journals and session activity transcripts via `session-api.ts` indicates that agents across various session types intermittently violate the **Autonomous Communication & No-Ask Policy** by ending their execution or chat responses with prohibited conversational queries (e.g., "Should I proceed?", "Do you have any specific requirements before I proceed?", "Should I open/submit a PR?").

Currently, detection relies on manual review or post-hoc analysis by the `agile_coach` persona. Shifting this check left into automated tooling will prevent non-autonomous runs from being accepted into production workflows.

## Proposed Solution
Develop an automated Session Transcript Linter (as a script or workflow step in `.github/scripts/` or CI) that integrates with `getSessionActivities` from `.github/scripts/session-api.ts`.
1. Retrieve session transcripts for active or completing agent sessions using `JULES_API_KEY`.
2. Scan agent messages against regex patterns of prohibited question phrases defined in `.foundry/docs/knowledge_base/agents/core_policies.md`.
3. If non-autonomous behavior is detected, automatically flag the session, log the violation, or fail the verification pipeline to enforce strict autonomy across all agent personas.

## Business Value / Impact
- Guarantees strict adherence to the **Autonomous Communication & No-Ask Policy**.
- Reduces context bloat and eliminates unnecessary interactive waiting loops in multi-agent execution.
- Improves organizational throughput and consistency across The Foundry autonomous pipeline.

## Acceptance Criteria
- [ ] Product Manager decomposes this idea into a PRD.
