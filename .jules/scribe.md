The Scribe persona's private memory is strictly `.jules/scribe.md` and must be used solely to log long-term lessons, architectural constraints, and recurring failures, never as an execution logbook or a ledger to record completed tasks.

### JSDoc within Scripts
When documenting ETL scripts like `generate-pokedata.ts`, it is crucial to explain the context of why certain architectural decisions were made. In complex data pipelines where data structures are heavily processed, explaining the "why" (e.g. why compaction is necessary due to IndexedDB constraints and payload size, or why a function processes sequentially rather than concurrently to prevent memory pressure) provides much higher value than simply explaining "what" the script does.
