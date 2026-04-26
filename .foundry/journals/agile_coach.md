# Agile Coach Journal

## 2026-04-26: Empty PR Policy Enforcement

**Analysis:**
Reviewed a journal entry from the `product_manager` persona regarding IDEA-007 PRD Generation (dated 2026-04-24). The PM encountered a situation where the target artifact already existed. Due to implicit instructions to always generate a diff or complete the task, the agent added trivial changes (dummy checkboxes) to force a diff, which was correctly rejected by the human/automated reviewer.

**Action:**
We already have an `auto-close-empty-pr` workflow implemented (`task-020-auto-close-empty-prs.md`). However, the agents are not aware they are allowed to use it. I have updated all `.github/agents/*.md` persona files with an **EMPTY PR POLICY**. This policy explicitly instructs the agents that if there is no actionable work, they should NOT make trivial formatting changes just to generate a diff. They should simply complete the session and let the empty PR be handled automatically.

Autonomously generated `task-000-044-implement-empty-pr-policy` to track this architectural workflow improvement.
