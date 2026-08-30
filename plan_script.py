import json

plan_text = """1. Add explicit tests for `rejection_count` fallback behavior in `src/utils/dag/parser.test.ts`.
2. Verify the changes to `src/utils/dag/parser.test.ts` using `cat`.
3. Update `.foundry/tasks/task-473-494-extract-rejection-count-tests.md` to check off the acceptance criteria.
4. Run `pnpm lint`, `pnpm test`, and `xvfb-run -a pnpm test:e2e` to verify the codebase.
5. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
6. Submit the PR."""

with open('plan.json', 'w') as f:
    json.dump({"plan": plan_text}, f)
