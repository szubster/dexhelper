1. **Analyze Failure:** The CI failure is a `lint` failure: `src/contexts/__tests__/Gen3BattleFrontierContext.test.tsx:9:16: Missing type parameters on mock function call`.
2. **Consult Core Policies:** "When testing callback props in Vitest, explicit generic typing is required on `vi.fn()` mocks (e.g. `vi.fn<(type: string) => void>()`) to satisfy `vitest(require-mock-type-parameters)`."
3. **Plan:**
   - I will update `vi.mock('../../store', () => ({ useStore: vi.fn() }));` in `src/contexts/__tests__/Gen3BattleFrontierContext.test.tsx` to use `vi.fn<any>()` (Wait, `any` is prohibited). I will use `vi.fn<() => unknown>()`. Or `vi.fn<typeof useStore>()`.
   - I will verify the fix by running `pnpm lint` and `pnpm test`.
   - I will submit the PR to fix the lint issue.
