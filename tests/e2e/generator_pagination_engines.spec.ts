import { expect, test } from '@playwright/test';
import { AsyncGeneratorPaginator } from '../../src/utils/pagination/asyncPaginator';
import { SyncGeneratorPaginator } from '../../src/utils/pagination/syncPaginator';

test.describe('Generator Pagination Engines E2E Integration', () => {
  // Since pagination utilities are isolated, we can test their integration inside a Playwright test
  // running in node context.

  test('SyncGeneratorPaginator should correctly paginate a generator function', () => {
    function* numGenerator() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const paginator = new SyncGeneratorPaginator(numGenerator);
    const iterator = paginator.paginate({ pageSize: 2 });

    const firstPage = iterator.next();
    expect(firstPage.done).toBe(false);
    expect(firstPage.value).toEqual({ items: [1, 2], hasMore: true });

    const secondPage = iterator.next();
    expect(secondPage.done).toBe(false);
    expect(secondPage.value).toEqual({ items: [3, 4], hasMore: true });

    const thirdPage = iterator.next();
    expect(thirdPage.done).toBe(false);
    expect(thirdPage.value).toEqual({ items: [5], hasMore: false });

    const end = iterator.next();
    expect(end.done).toBe(true);
  });

  test('AsyncGeneratorPaginator should correctly paginate an async generator function', async () => {
    async function* asyncNumGenerator() {
      yield await Promise.resolve(1);
      yield await Promise.resolve(2);
      yield await Promise.resolve(3);
      yield await Promise.resolve(4);
      yield await Promise.resolve(5);
    }

    const paginator = new AsyncGeneratorPaginator(asyncNumGenerator);
    const iterator = paginator.paginate({ pageSize: 2 });

    const firstPage = await iterator.next();
    expect(firstPage.done).toBe(false);
    expect(firstPage.value).toEqual({ items: [1, 2], hasMore: true });

    const secondPage = await iterator.next();
    expect(secondPage.done).toBe(false);
    expect(secondPage.value).toEqual({ items: [3, 4], hasMore: true });

    const thirdPage = await iterator.next();
    expect(thirdPage.done).toBe(false);
    expect(thirdPage.value).toEqual({ items: [5], hasMore: false });

    const end = await iterator.next();
    expect(end.done).toBe(true);
  });

  test('SyncGeneratorPaginator should handle empty generator', () => {
    function* emptyGenerator() {
      // no-op
    }

    const paginator = new SyncGeneratorPaginator(emptyGenerator);
    const iterator = paginator.paginate({ pageSize: 2 });

    const end = iterator.next();
    expect(end.done).toBe(true);
  });

  test('AsyncGeneratorPaginator should handle empty async generator', async () => {
    async function* emptyAsyncGenerator() {
      // no-op
    }

    const paginator = new AsyncGeneratorPaginator(emptyAsyncGenerator);
    const iterator = paginator.paginate({ pageSize: 2 });

    const end = await iterator.next();
    expect(end.done).toBe(true);
  });

  test('SyncGeneratorPaginator should paginate generator yielding objects correctly', () => {
    function* objectGenerator() {
      yield { id: 1, name: 'Bulbasaur' };
      yield { id: 2, name: 'Ivysaur' };
      yield { id: 3, name: 'Venusaur' };
    }

    const paginator = new SyncGeneratorPaginator(objectGenerator);
    const iterator = paginator.paginate({ pageSize: 2 });

    const page1 = iterator.next();
    expect(page1.value).toEqual({
      items: [
        { id: 1, name: 'Bulbasaur' },
        { id: 2, name: 'Ivysaur' },
      ],
      hasMore: true,
    });

    const page2 = iterator.next();
    expect(page2.value).toEqual({
      items: [{ id: 3, name: 'Venusaur' }],
      hasMore: false,
    });
  });
});
