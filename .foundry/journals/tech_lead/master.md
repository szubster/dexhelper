

---

# Tech Lead Journal

## Gen 3 Trainer Card E2E Story Breakdown
- Drafted the QA task for the Gen 3 Trainer Card E2E story (task-359-441-gen3-trainer-card-parsing-e2e-qa) to complement the implementation task (task-359-440-gen3-trainer-card-parsing-e2e-impl).
- The implementation task (task-359-440-gen3-trainer-card-parsing-e2e-impl) is responsible for creating the Playwright E2E tests for verifying Trainer Card data parsing and integration.
- The QA task (task-359-441-gen3-trainer-card-parsing-e2e-qa) depends on the implementation task and will ensure the Playwright E2E tests are robust and accurately reflect the extracted data.
- Appended the QA task as an unchecked task in the story's acceptance criteria.


---

# Late Binding for Kurt Apricorn Offsets

While working on `story-404-477-kurt-apricorn-offset-and-constants`, I found that determining the exact save file memory offsets for `wKurtApricornCount` and `wKurtApricornItems` was difficult because they are defined inside a `SECTION UNION "Miscellaneous WRAM 1", WRAMX` block in the pokecrystal source. Without the compiled symbol file (`pokecrystal.sym`) or a clear SRAM mapping in this specific union block, I couldn't confidently define the offsets for the blueprint.

To resolve this, I utilized the Late Binding pattern to suspend the current task:
1. Created a new research node `research-404-495-kurt-apricorn-offsets` with `parent: story-404-477-kurt-apricorn-offset-and-constants`.
2. Appended the new research node as an unchecked task in the Markdown body of `story-404-477-kurt-apricorn-offset-and-constants`.
3. Updated the status of `story-404-477-kurt-apricorn-offset-and-constants` to `FAILED` with a `rejection_reason` indicating it is suspended pending research.
