# Semantic Evaluator API Key Rules

- When interacting with or testing the LLM-based `evaluateSemanticCondition` logic in `src/engine/semantic/evaluator.ts`, you MUST use the `GEMINI_API_KEY` environment variable. Do not use or reference `JULES_API_KEY` for LLM tasks.
- The Semantic Evaluator tests include a live API integration test in `src/engine/semantic/evaluator.test.ts`. To prevent exhausting API quotas, this test is guarded and only executes when `RUN_LLM_INTEGRATION_TESTS=true` is set in the environment.
- CI workflows use `tj-actions/changed-files` to determine if semantic engine files were modified. If modified, the CI explicitly sets `RUN_LLM_INTEGRATION_TESTS=true` to execute the integration test; otherwise, it is skipped.
