import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-react';
import { RibbonFilterProvider, useRibbonFilter } from './RibbonFilterContext';

describe('RibbonFilterContext', () => {
  it('should initialize with default state', async () => {
    function TestComponent() {
      const { state } = useRibbonFilter();
      return (
        <div>
          <div title="category">{state.filterCategory}</div>
          <div title="sort">{state.sortBy}</div>
        </div>
      );
    }

    await render(
      <RibbonFilterProvider>
        <TestComponent />
      </RibbonFilterProvider>,
    );

    await expect.element(page.getByTitle('category')).toHaveTextContent('all');
    await expect.element(page.getByTitle('sort')).toHaveTextContent('id');
  });

  it('should update filterCategory when SET_FILTER_CATEGORY action is dispatched', async () => {
    function TestComponent() {
      const { state, dispatch } = useRibbonFilter();
      return (
        <div>
          <div title="category">{state.filterCategory}</div>
          <button type="button" onClick={() => dispatch({ type: 'SET_FILTER_CATEGORY', payload: 'missing' })}>
            Set Missing
          </button>
        </div>
      );
    }

    await render(
      <RibbonFilterProvider>
        <TestComponent />
      </RibbonFilterProvider>,
    );

    await page.getByText('Set Missing').click();
    await expect.element(page.getByTitle('category')).toHaveTextContent('missing');
  });

  it('should update sortBy when SET_SORT_BY action is dispatched', async () => {
    function TestComponent() {
      const { state, dispatch } = useRibbonFilter();
      return (
        <div>
          <div title="sort">{state.sortBy}</div>
          <button type="button" onClick={() => dispatch({ type: 'SET_SORT_BY', payload: 'missingCount' })}>
            Set Sort
          </button>
        </div>
      );
    }

    await render(
      <RibbonFilterProvider>
        <TestComponent />
      </RibbonFilterProvider>,
    );

    await page.getByText('Set Sort').click();
    await expect.element(page.getByTitle('sort')).toHaveTextContent('missingCount');
  });
});
