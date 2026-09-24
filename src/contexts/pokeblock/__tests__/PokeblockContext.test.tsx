import type React from 'react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import type { InventoryBerry } from '../../../engine/gen3/contests/engine';
import { PokeblockProvider, usePokeblock } from '../PokeblockContext';

const TestComponent: React.FC = () => {
  const {
    inventory,
    setInventory,
    setTargetCondition,
    calculateRecommendation,
    recommendationResult,
    targetCondition,
  } = usePokeblock();

  useEffect(() => {
    const cheri: InventoryBerry = {
      id: 'cheri',
      count: 10,
      spicy: 10,
      dry: 0,
      sweet: 0,
      bitter: 0,
      sour: 0,
      feel: 20,
    };
    setInventory([cheri]);
    setTargetCondition(30);
  }, [setInventory, setTargetCondition]);

  return (
    <div>
      <div data-testid="target-condition">{targetCondition}</div>
      <div data-testid="inventory-length">{inventory.length}</div>
      <div data-testid="is-possible">{recommendationResult?.isPossible?.toString() ?? 'null'}</div>
      <button type="button" onClick={() => calculateRecommendation()}>
        Calculate
      </button>
    </div>
  );
};

describe('PokeblockContext', () => {
  it('initializes and updates state, then calculates recommendation', async () => {
    expect.assertions(3);

    await render(
      <PokeblockProvider>
        <TestComponent />
      </PokeblockProvider>,
    );

    await expect.element(page.getByTestId('target-condition')).toHaveTextContent('30');
    await expect.element(page.getByTestId('inventory-length')).toHaveTextContent('1');

    await page.getByRole('button', { name: 'Calculate' }).click();

    await expect.element(page.getByTestId('is-possible')).toHaveTextContent('true');
  });
});
