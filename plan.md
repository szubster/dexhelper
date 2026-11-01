1. Copy `src/components/HardwareScrews.tsx` to `packages/ui/src/components/HardwareScrews.tsx` using `cp src/components/HardwareScrews.tsx packages/ui/src/components/HardwareScrews.tsx`.
2. Verify the copy operation by reading the newly created file using `cat packages/ui/src/components/HardwareScrews.tsx`.
3. Export `HardwareScrews` by appending `export * from './HardwareScrews';` to `packages/ui/src/components/index.ts` using `echo "export * from './HardwareScrews';" >> packages/ui/src/components/index.ts`.
4. Verify the export addition using `cat packages/ui/src/components/index.ts`.
5. Replace `src/components/HardwareScrews.tsx` with a re-export from `@dexhelper/ui` using `echo "export { HardwareScrews } from '@dexhelper/ui';" > src/components/HardwareScrews.tsx`.
6. Verify the replacement by reading the file using `cat src/components/HardwareScrews.tsx`.
7. Copy `src/components/TacticalSegmentedControl.tsx` to `packages/ui/src/components/TacticalSegmentedControl.tsx` using `cp src/components/TacticalSegmentedControl.tsx packages/ui/src/components/TacticalSegmentedControl.tsx`.
8. Update the `CornerCrosshairs` import in `packages/ui/src/components/TacticalSegmentedControl.tsx` from `@dexhelper/ui` to `./CornerCrosshairs` using `sed -i "s|import { CornerCrosshairs } from '@dexhelper/ui';|import { CornerCrosshairs } from './CornerCrosshairs';|" packages/ui/src/components/TacticalSegmentedControl.tsx`.
9. Verify the import update using `cat packages/ui/src/components/TacticalSegmentedControl.tsx`.
10. Export `TacticalSegmentedControl` by appending `export * from './TacticalSegmentedControl';` to `packages/ui/src/components/index.ts` using `echo "export * from './TacticalSegmentedControl';" >> packages/ui/src/components/index.ts`.
11. Verify the export addition using `cat packages/ui/src/components/index.ts`.
12. Replace `src/components/TacticalSegmentedControl.tsx` with a re-export of `TacticalSegmentedControl`, `tacticalSegmentedItemVariants`, `SegmentedControlItem`, and `TacticalSegmentedControlProps` from `@dexhelper/ui` using `echo "export { TacticalSegmentedControl, tacticalSegmentedItemVariants, type SegmentedControlItem, type TacticalSegmentedControlProps } from '@dexhelper/ui';" > src/components/TacticalSegmentedControl.tsx`.
13. Verify the replacement by reading the file using `cat src/components/TacticalSegmentedControl.tsx`.
14. Move the test file using `mv src/components/__tests__/TacticalSegmentedControl.test.tsx packages/ui/src/components/__tests__/TacticalSegmentedControl.test.tsx`.
15. Verify the test file move by listing the directory contents using `ls packages/ui/src/components/__tests__/`.
16. Run `pnpm check:fix && pnpm lint && pnpm test` to verify changes at the workspace root.
17. Run `xvfb-run -a pnpm test:e2e tests/e2e/tactical-complex.spec.ts tests/e2e/tactical-utilities.spec.ts` to execute Playwright E2E tests for complex UI components.
18. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
19. Use the `submit` tool to finalize the session and open the Pull Request.
