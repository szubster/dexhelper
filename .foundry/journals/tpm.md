# TPM Journal

No critical learnings logged yet.


## 2026-06-22
**Architectural Constraint:** The TPM must never overwrite active journals, but should identify and explicitly remove short transient status logs (e.g. system failures or state transitions) that expand context windows without providing value. The context paragraphs explaining the *reasoning* must be carefully preserved.