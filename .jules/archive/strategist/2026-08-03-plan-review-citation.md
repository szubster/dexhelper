## 2026-08-03 - [Accepted] - Prompt improvement - Plan Review Citation Rule
**Type:** Prompt improvement
**Outcome:** Merged
**Why:** Agents were using `request_plan_review` with business logic, formulas, or constants in their plans, but were not citing where those requirements came from (e.g., `.foundry/docs/...`). Reviewers, without context of the project documents, were incorrectly rejecting these correct plans as AI "hallucinations".
**Pattern:** Codify system memory constraints into `core_policies.md` to prevent plan reviewers from incorrectly rejecting valid execution plans, by mandating explicit file path citations for business logic to prove groundedness.
