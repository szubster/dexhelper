---
id: epic-019-030-automated-branch-cleanup
type: EPIC
title: Automated Branch Cleanup Implementation
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-019-019-automated-branch-cleanup
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Automated Branch Cleanup Implementation

## Epic Context
This Epic implements the requirements defined in `prd-019-019-automated-branch-cleanup` to clean up old Git branches left behind by the "Resurrection Loop" when task nodes are marked `FAILED` or `CANCELLED`.

## Requirements Breakdown

1. **Branch Identification Logic**:
   - Define the rules to safely identify branches that are associated with `FAILED` or `CANCELLED` task nodes.
   - We must ensure we do not delete branches for active, pending, or recently completed nodes, or branches currently undergoing human review.

2. **Cleanup Mechanism Integration**:
   - Integrate the branch deletion logic into the existing `foundry-heartbeat.ts` script, or consider spinning up a new periodic workflow specifically for cleanup.
   - The mechanism needs the ability to execute remote branch deletion (`git push origin --delete <branch>`) on the repository.

3. **Safety and Dry-Run**:
   - Implement dry-run capabilities first to verify the identification logic without destroying data.
   - Ensure logging is present for all branch deletion operations for auditability.

## Acceptance Criteria
- [x] Logic exists to successfully identify branches corresponding to `FAILED` or `CANCELLED` Foundry nodes.
- [x] A mechanism is implemented (via heartbeat or dedicated cron) to automatically delete these branches from the remote repository.
- [x] Safety checks prevent deletion of `main`, active PR branches, or branches associated with `PENDING`, `READY`, `ACTIVE`, or `COMPLETED` nodes.
- [x] Tests verify the branch identification and deletion orchestration logic (with mocked Git/GitHub API calls).

Target artifact: [.foundry/stories/story-030-046-branch-identification.md](.foundry/stories/story-030-046-branch-identification.md)

Target artifact: [.foundry/archive/.foundry/archive/stories/story-030-047-branch-cleanup-mechanism.md](.foundry/archive/.foundry/archive/stories/story-030-047-branch-cleanup-mechanism.md)
