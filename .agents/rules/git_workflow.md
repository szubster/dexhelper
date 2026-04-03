# Git Operations & Session Workflow

This mandatory rule defines the standard operational procedure for robust version control and state management using Git and the GitHub CLI.

## 1. Task Lifecycle: Syncing and Branching
Before initiating any development task:
- **Always start with the freshest `main`**:
  ```powershell
  git checkout main; git pull origin main
  ```
- **Consistent Branching**: Create a topic branch following the `[type]/[description]` pattern.
  - Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
  - Example: `feat/gh-workflow-integration`

## 2. In-Session State Management
- **Persistence via Artifacts**: At the beginning of a task, create a `session_log.md` artifact in the current conversation to track progress.
  - Path: `C:\Users\szubs\.gemini\antigravity\brain\5911d351-84fd-4509-9792-b6987e7586cd\artifacts\session_log.md` (Update the UUID to the current Conversation ID)
  - Header: `Branch: [your-branch-name]`
  - List major steps/objectives.
  - Update it periodically as tasks are completed.
- **Atomic Conventional Commits**: Make commits frequently at logical checkpoints.
  - Pattern: `[type]: [short summary]`
  - Reference [Conventional Commits](https://www.conventionalcommits.org/).

## 3. GitHub CLI (`gh`) Integration
- **Interaction with Remote**: Use `gh` for PR management.
- **PR Creation**: When ready for review or completion:
  ```powershell
  git push -u origin [your-new-branch]
  gh pr create --title "[type]: [A clear title]" --body "[Detailed summary of changes]"
  ```
  - Use `--draft` if the task is still a work-in-progress.
- **Workflow State**: After creating a PR, link the URL in the `session_log.md` artifact.

## 4. Finalization & Handover
- **Click-to-Merge**: Always explicitly inform the USER that the Pull Request is open and ready.
- **USER Action**: The workflow expects the USER to perform the final "Merge" in the GitHub web UI once they are satisfied with the PR review.
- **Post-Merge Cleanup**: (Optional) After the branch is merged, sync `main` and delete the local feature branch if authorized.

## 5. Continuity Rules
- All code **MUST** pass relevant tests (per `testing_rules.md`) before a standard PR is opened.
- If a session is interrupted, ensure the current state is pushed and documented in `session_log.md`.
