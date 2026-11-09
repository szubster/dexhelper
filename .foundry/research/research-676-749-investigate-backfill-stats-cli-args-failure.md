---
id: research-676-749-investigate-backfill-stats-cli-args-failure
type: RESEARCH
title: Investigate CLI Args Parser Failure
status: READY
owner_persona: researcher
created_at: '2026-11-09'
updated_at: '2026-11-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-418-676-historical-stats-git-parser
tags:
  - CLI
  - node
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 80
---

# Investigate CLI Args Parser Failure

## Context
The CLI script `.github/scripts/foundry-backfill-stats.ts` failed during execution because `util.parseArgs` did not correctly parse the `--daily` flag and other required arguments.

## Objectives
- Investigate the correct `util.parseArgs` configuration for extracting string and boolean flags.
- Provide a working code snippet or configuration object for the `coder` persona to use in the replacement task.

## Acceptance Criteria
- [ ] Document the correct `parseArgs` configuration.
- [ ] Store findings in `.foundry/docs/knowledge_base/` or append them to the journal.
