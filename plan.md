1. **Fix broken relative path in `story-010-028-verify-jest-tests.md`**
   - The link to `.foundry/archive/tasks/task-028-046-verify-jest-rules-resolution.md` currently uses `../../.foundry/archive/tasks/task-028-046-verify-jest-rules-resolution.md`, which resolves incorrectly.
   - Run `sed -i 's|\[.foundry/archive/tasks/task-028-046-verify-jest-rules-resolution.md\](../../.foundry/archive/tasks/task-028-046-verify-jest-rules-resolution.md)|\[.foundry/archive/tasks/task-028-046-verify-jest-rules-resolution.md\](../tasks/task-028-046-verify-jest-rules-resolution.md)|g' .foundry/archive/stories/story-010-028-verify-jest-tests.md` to fix the Markdown link.

2. **Verify link validity**
   - Run `node --experimental-strip-types scripts/check-links.ts .foundry/` to ensure no links are broken.

3. **Complete pre commit steps**
   - Complete pre commit steps to ensure proper testing, verification, review, and reflection are done.

4. **Submit PR**
   - Use the `plan_step_complete` tool to finalize the session.
