1. Create tests/e2e/save-state-read-write.spec.ts file to test the historyDb API
2. The tests should navigate to the app, insert some test data using `writeSaveState` via page.evaluate, and then use `getMostRecentSave` and `getPreviousSave` via page.evaluate to ensure the API works in the browser environment (mocking/accessing IndexedDB).
3. The tests will fulfill the acceptance criteria from task-433-489-save-state-read-write-api-e2e-impl.md.
4. Update task-433-489-save-state-read-write-api-e2e-impl.md checkboxes.
5. Complete pre-commit steps.
6. Submit PR.
