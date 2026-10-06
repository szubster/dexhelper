import type React from 'react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { PokeblockProvider, usePokeblock } from '../../../contexts/pokeblock/PokeblockContext';
import type { InventoryBerry } from '../../../engine/gen3/contests/engine';
import { PokeblockRecommendationDisplay } from '../PokeblockRecommendationDisplay';

const TestHarnessWithState: React.FC<{
  inventory?: InventoryBerry[];
  targetCondition?: number;
}> = ({ inventory, targetCondition }) => {
  const actions = usePokeblock();

  // biome-ignore lint/correctness/useExhaustiveDependencies: test harness initial setup
  useEffect(() => {
    if (inventory) {
      actions.setInventory(inventory);
    }
    if (targetCondition !== undefined) {
      actions.setTargetCondition(targetCondition);
    }
    actions.calculateRecommendation();
  }, []);

  return <PokeblockRecommendationDisplay />;
};

describe('PokeblockRecommendationDisplay', () => {
  it('renders default state when no recommendation is calculated', async () => {
    await render(
      <PokeblockProvider>
        <PokeblockRecommendationDisplay />
      </PokeblockProvider>,
    );

    await expect.element(page.getByText('Recommendation Results')).toBeVisible();
    await expect
      .element(page.getByText('No recommendation calculated yet. Adjust settings and click calculate.'))
      .toBeVisible();
  });

  it('renders status POSSIBLE and recommended sequence when recommendation is found', async () => {
    const mockInventory: InventoryBerry[] = [
      { id: 'CHERI', count: 5, spicy: 10, dry: 0, sweet: 0, bitter: 0, sour: 0, feel: 10 },
    ];

    await render(
      <PokeblockProvider>
        <TestHarnessWithState inventory={mockInventory} targetCondition={10} />
      </PokeblockProvider>,
    );

    await expect.element(page.getByText('STATUS: POSSIBLE')).toBeVisible();
    await expect.element(page.getByText('RECOMMENDED SEQUENCE')).toBeVisible();
    await expect.element(page.getByText('Step 1: Blend CHERI')).toBeVisible();
    await expect.element(page.getByText('Final Condition: 10 / 255')).toBeVisible();
  });

  it('renders status NOT POSSIBLE and empty blend message when recommendation fails', async () => {
    const emptyInventory: InventoryBerry[] = [];

    await render(
      <PokeblockProvider>
        <TestHarnessWithState inventory={emptyInventory} targetCondition={255} />
      </PokeblockProvider>,
    );

    await expect.element(page.getByText('STATUS: NOT POSSIBLE')).toBeVisible();
    await expect.element(page.getByText('No blends required or possible.')).toBeVisible();
  });
});
