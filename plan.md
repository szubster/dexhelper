1. Use `cat << 'EOF' > src/components/safari-zone/SafariAreaMap.tsx` with the following content:
```tsx
import { TacticalBadge } from '@dexhelper/ui';
import React from 'react';
import { Gen1SafariZone } from '../../engine/data/gen1/safariZone';
import { HoennSafariZone, KantoSafariZoneGen3 } from '../../engine/data/gen3/safariZone';
import type { SafariArea } from '../../engine/data/shared/safariZoneTypes';
import { TacticalCard } from '../TacticalCard';
import { TacticalPanel } from '../TacticalPanel';
import type { useSafariZoneSelection } from './useSafariZoneSelection';

interface Props {
  selection: ReturnType<typeof useSafariZoneSelection>;
}

export function SafariAreaMap({ selection }: Props) {
  const { version, availableAreas, targetPokemon } = selection;

  const allAreas = React.useMemo(() => {
    if (['red', 'blue', 'yellow'].includes(version)) {
      return Gen1SafariZone;
    }
    if (['ruby', 'sapphire', 'emerald'].includes(version)) {
      return HoennSafariZone;
    }
    if (['firered', 'leafgreen'].includes(version)) {
      return KantoSafariZoneGen3;
    }
    return [];
  }, [version]);

  const availableAreaNames = new Set(availableAreas.map((a) => a.name));

  return (
    <TacticalPanel className="flex flex-col gap-4 p-4" variant="default">
      <div className="flex items-center justify-between border-b border-dashed border-zinc-800 pb-2">
        <h2 className="font-mono text-lg font-bold tracking-tight text-white uppercase">AREA MAP</h2>
        <TacticalBadge variant={targetPokemon !== null ? 'emerald' : 'zinc'}>
          [ {availableAreas.length} AREAS ]
        </TacticalBadge>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {allAreas.map((area) => {
          const isAvailable = availableAreaNames.has(area.name);
          return (
            <TacticalCard
              key={area.name}
              variant={isAvailable ? 'emerald' : 'default'}
              className={`p-3 ${!isAvailable && targetPokemon !== null ? 'opacity-30' : ''}`}
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                <span className="font-mono text-xs font-bold text-white uppercase">
                  {area.name.replace(/-/g, ' ')}
                </span>
              </div>
            </TacticalCard>
          );
        })}
      </div>
    </TacticalPanel>
  );
}
```
2. Run `cat src/components/safari-zone/SafariAreaMap.tsx` to verify the file was created correctly.
3. Use `sed` to update `src/routes/safari-zone.tsx` to import and insert `SafariAreaMap`:
```bash
sed -i 's/const SafariTargetSelection = React.lazy(() =>/const SafariAreaMap = React.lazy(() => import('\''..\/components\/safari-zone\/SafariAreaMap'\'').then((m) => ({ default: m.SafariAreaMap })));\nconst SafariTargetSelection = React.lazy(() =>/' src/routes/safari-zone.tsx
sed -i 's/<SafariTargetSelection selection={selection} \/>/<SafariTargetSelection selection={selection} \/>\n            <React.Suspense fallback={<div>Loading map...<\/div>}>\n              <SafariAreaMap selection={selection} \/>\n            <\/React.Suspense>/' src/routes/safari-zone.tsx
```
4. Run `cat src/routes/safari-zone.tsx` to verify the modifications.
5. Use `cat << 'EOF' > src/components/safari-zone/__tests__/SafariAreaMap.test.tsx` with the following content:
```tsx
import { page } from 'vitest/browser';
import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { SafariAreaMap } from '../SafariAreaMap';

test('renders SafariAreaMap with provided areas', async () => {
  const selection = {
    version: 'leafgreen' as any,
    setVersion: () => {},
    targetPokemon: 123,
    setTargetPokemon: () => {},
    availableAreas: [{ name: 'kanto-safari-zone-area-2-north', encounters: {} }],
  };

  await render(<SafariAreaMap selection={selection} />);

  await expect.element(page.getByText('AREA MAP')).toBeVisible();
  await expect.element(page.getByText('kanto safari zone area 2 north', { exact: false })).toBeVisible();
});
```
6. Run `cat src/components/safari-zone/__tests__/SafariAreaMap.test.tsx` to verify the test file.
7. Run `pnpm lint`, `pnpm test`, and `xvfb-run -a pnpm test:e2e` to ensure changes are correct and have not introduced regressions.
8. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
9. Use the `submit` tool to finalize the session and open the Pull Request.
