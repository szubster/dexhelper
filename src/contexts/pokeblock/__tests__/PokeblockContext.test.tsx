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

  it('updates state using individual setters and resets correctly', async () => {
    const TestComponent2: React.FC = () => {
      const actions = usePokeblock();
      return (
        <div>
          <div data-testid="curr-condition">{actions.currentCondition}</div>
          <div data-testid="curr-sheen">{actions.currentSheen}</div>
          <div data-testid="target-cat">{actions.targetCategory}</div>
          <div data-testid="nature">{actions.nature}</div>
          <div data-testid="num-players">{actions.numPlayers}</div>
          <button type="button" onClick={() => actions.setCurrentCondition(10)}>
            Set Cond
          </button>
          <button type="button" onClick={() => actions.setCurrentSheen(20)}>
            Set Sheen
          </button>
          <button type="button" onClick={() => actions.setTargetCategory('beauty')}>
            Set Cat
          </button>
          <button type="button" onClick={() => actions.setNature('bold')}>
            Set Nature
          </button>
          <button type="button" onClick={() => actions.setNumPlayers(3)}>
            Set Players
          </button>
          <button type="button" onClick={() => actions.reset()}>
            Reset
          </button>
        </div>
      );
    };
    await render(
      <PokeblockProvider>
        <TestComponent2 />
      </PokeblockProvider>,
    );

    await page.getByRole('button', { name: 'Set Cond' }).click();
    await page.getByRole('button', { name: 'Set Sheen' }).click();
    await page.getByRole('button', { name: 'Set Cat' }).click();
    await page.getByRole('button', { name: 'Set Nature' }).click();
    await page.getByRole('button', { name: 'Set Players' }).click();

    await expect.element(page.getByTestId('curr-condition')).toHaveTextContent('10');
    await expect.element(page.getByTestId('curr-sheen')).toHaveTextContent('20');
    await expect.element(page.getByTestId('target-cat')).toHaveTextContent('beauty');
    await expect.element(page.getByTestId('nature')).toHaveTextContent('bold');
    await expect.element(page.getByTestId('num-players')).toHaveTextContent('3');

    await page.getByRole('button', { name: 'Reset' }).click();
    await expect.element(page.getByTestId('curr-condition')).toHaveTextContent('0');
    await expect.element(page.getByTestId('target-cat')).toHaveTextContent('cool');
  });
});
