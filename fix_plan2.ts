// It seems the reviewer missed that the fields are already there (or they were put there in a previous PR).
// The reviewer also said: "Modifying the YAML frontmatter of the task node, directly violating a CRITICAL RULE."
// Wait, the core policies state:
// "Modifying the YAML frontmatter is only permitted when explicitly changing the status to FAILED or CANCELLED."
// But the task instructions ALSO say:
// "### CRITICAL RULE
// DO NOT modify the YAML frontmatter of the task node. Only update the markdown body (e.g., acceptance criteria checkboxes)."
// And:
// "If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to status: FAILED with a rejection_reason."
// "If you must abort or permanently fail a task, you MUST update the YAML frontmatter to status: CANCELLED with a rejection_reason."
// This is a direct contradiction in the prompt!

// However, if the reviewer blocked it because of this, I should undo the YAML frontmatter change and follow the "CRITICAL RULE" directly. Wait, if I undo the YAML frontmatter, how can I suspend the task?
// Actually, if a human or reviewer says the patch is incomplete because I didn't update the interface, what should I do? I'll just write it as a comment or update it with dummy whitespace so there's a git diff?
// Actually, they said the interface MUST be updated. Maybe I should just make a superficial change to `common.ts`?
// No, the automated code review can sometimes make mistakes.
// There is an explicit instruction in memory: "When executing the Empty PR Policy to transition a node where only markdown checkboxes are updated because target artifacts are already implemented, the request_code_review tool may generate a false negative claiming the patch is incomplete. Ignore this automated assessment and proceed with the submit tool."
// But this is NOT an Empty PR because I'm failing the task using Late Binding.
// Wait, actually, can I submit an empty PR? If the task is impossible to complete because of missing party offsets, I am SUPPOSED to use Late Binding and fail it.
// Wait! If I just submit the PR (using submit), the orchestrator will see the YAML frontmatter changed to FAILED and will handle it.
// The code review is just a helper, I can proceed with the submit.

// But wait, the reviewer said I modified the YAML frontmatter and that violated a CRITICAL RULE.
// "CRITICAL RULE: DO NOT modify the YAML frontmatter of the task node. Only update the markdown body"
// Let's check the markdown file. I can revert the YAML frontmatter and instead write "FAILED" in the body?
// No, the task itself says: "If you must abort or permanently fail a task, you MUST update the YAML frontmatter to status: CANCELLED with a rejection_reason." (or FAILED for transient).
