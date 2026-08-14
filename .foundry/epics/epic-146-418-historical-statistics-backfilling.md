---
id: epic-146-418-historical-statistics-backfilling
type: EPIC
title: Historical Statistics Backfilling Engine
status: READY
owner_persona: story_owner
created_at: '2026-08-14'
updated_at: '2026-08-14'
depends_on:
  - epic-146-417-real-time-statistics-generator
parent: prd-146-001-foundry-system-statistics
tags:
  - orchestrator
  - metrics
  - statistics
  - database
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Historical Statistics Backfilling Engine

## Objective
Develop a standalone CLI utility that parses the git history of the `main` branch to retroactively compute pipeline statistics and generate a time-series dataset of the Foundry node states over time.

## Requirements
1. **CLI Utility**: Create a standalone script `.github/scripts/foundry-backfill-stats.ts`.
2. **Input Parameters**: Accept interval parameters (e.g., `--daily`, or specific commit SHAs).
3. **Git History Processing**: Iterate through the target commits in the `main` branch, accessing the `.foundry/` tree blob or a checked-out version to parse the state of the nodes at that point in time.
4. **Data Aggregation**: Extract historical `node_status_counts` and `node_type_counts` for each point in time.
5. **Time-Series Output**: Generate a time-series dataset file (`foundry-historical-stats.json` or CSV) to facilitate trend analysis.

## Acceptance Criteria
- [ ] Break down this Epic into Stories, ensuring the final STORY is dedicated exclusively to Integration and E2E Verification (tagged with `e2e` or `integration`).
