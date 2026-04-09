---
trigger: always_on
---

# Git Operations & Session Workflow

This mandatory rule defines the standard operational procedure for robust version control and state management using Git and the GitHub CLI (`gh`).

## 1. Task Lifecycle: Syncing and Branching
Before initiating any development task:
- **Always start with the freshest `main`**:
  ```bash
  git checkout main && git pull origin main
  ```
- **Consistent Branching**: Create a topic branch following the `[type]/[description]` pattern.
  - Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
  - Example: `feat/unified-e2e-suite`

## 2. In-Session State Management
- **Persistence via Artifacts**: At the beginning of a task, create a `task.md` artifact in the current conversation to track progress.
  - Update it periodically as tasks are completed.
- **Atomic Conventional Commits**: Make commits frequently at logical checkpoints.
  - Pattern: `[type]: [short summary]`
  - Reference [Conventional Commits](https://www.conventionalcommits.org/).

## 3. GitHub CLI (`gh`) Integration
- **Interaction with Remote**: Use `gh` for PR management.
- **PR Creation**: When ready for review or completion:
  ```bash
  git push -u origin [your-branch-name]
  gh pr create --title "[type]: [A clear title]" --body "[Detailed summary of changes]"
  ```
  - Use `--draft` if the task is still a work-in-progress.

## 4. Finalization & Handover
- **Handover**: Always explicitly inform the USER that the Pull Request is open and ready.
- **USER Action**: The workflow expects the USER to perform the final "Merge" in the GitHub web UI once they are satisfied with the PR review.
- **Post-Merge Cleanup**: (Optional) After the branch is merged, sync `main` and delete the local feature branch if authorized.

## 5. Continuity Rules
- All code **MUST** pass relevant tests (per `testing_rules.md`) before a standard PR is opened.
- If a session is interrupted, ensure the current state is pushed and documented.
