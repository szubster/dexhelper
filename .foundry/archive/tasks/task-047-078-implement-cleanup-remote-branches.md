---
id: task-047-078-implement-cleanup-remote-branches
type: TASK
title: Implement Remote Branch Cleanup
status: COMPLETED
owner_persona: coder
created_at: '2026-05-10'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-030-047-branch-cleanup-mechanism
tags:
  - branch-cleanup
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

**QA REJECTION:** Validation failed because the `coder` did not implement the `cleanupRemoteBranches` function in `.github/scripts/foundry-heartbeat.ts` nor did they write the required tests in `.github/scripts/foundry-heartbeat.test.ts`.

# Implement Remote Branch Cleanup

## Context
This task implements the branch cleanup mechanism defined in `story-030-047-branch-cleanup-mechanism`. We previously implemented `identifyBranchesForCleanup` to determine which branches are safe to delete. We now need to use this logic to actually delete the branches on the remote repository.

## Requirements
- In `.github/scripts/foundry-heartbeat.ts`, create a new function `cleanupRemoteBranches(repoRoot: string, repoFullName: string, githubToken: string)`.
- Use the GitHub API (`GET /repos/{owner}/{repo}/pulls?state=open`) to fetch open PR head refs.
- Use the Git CLI (`git ls-remote --heads origin`) or GitHub API (`GET /repos/{owner}/{repo}/git/matching-refs/heads/`) to fetch all remote branch names.
- Call the existing `identifyBranchesForCleanup` function.
- Iterate over the branches to delete:
  - If `DRY_RUN` is true, log the intention to delete.
  - If `DRY_RUN` is false, delete the branch (e.g. using `git push origin --delete <branch>` or GitHub API `DELETE {branch}`).
  - Log the deleted branches to the TPM journal using the existing `logToJournal` function.
- Call `cleanupRemoteBranches` at the end of the `main()` function in `foundry-heartbeat.ts`.
- Write tests in `.github/scripts/foundry-heartbeat.test.ts` to verify the new logic, ensuring `DRY_RUN` mode is respected and actual deletion API calls are mocked appropriately.

## Acceptance Criteria
- [x] `cleanupRemoteBranches` is implemented and called in `main()`.
- [x] Remote branches associated with FAILED or CANCELLED task nodes are successfully deleted when `DRY_RUN` is false.
- [x] The TPM journal records branch deletions.
- [x] Comprehensive tests cover branch deletion and dry-run functionality.
