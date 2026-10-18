import { expect, test } from '@playwright/test';
import { AsyncGeneratorPaginator, SyncGeneratorPaginator } from '../../src/utils/pagination/index.ts';

test.describe('Generator Pagination Engines Integration', () => {
  test('synchronous generator pagination yields correct pages with limits and initialCursor', async () => {
    function* numberGenerator() {
      for (let i = 1; i <= 5; i++) {
        yield i;
      }
    }

    const paginator = new SyncGeneratorPaginator(numberGenerator);
    const pages = [];
    // Verify initialCursor (offset) and pageSize (limit) logic
    for (const page of paginator.paginate({ pageSize: 2, initialCursor: 1 })) {
      pages.push(page);
    }

    expect(pages).toEqual([
      { items: [1, 2], hasMore: true },
      { items: [3, 4], hasMore: true },
      { items: [5], hasMore: false },
    ]);
  });

  test('asynchronous generator pagination yields correct pages with limits and initialCursor', async () => {
    async function* asyncNumberGenerator() {
      for (let i = 1; i <= 5; i++) {
        yield i;
      }
    }

    const paginator = new AsyncGeneratorPaginator(asyncNumberGenerator);
    const pages = [];
    for await (const page of paginator.paginate({ pageSize: 2, initialCursor: 1 })) {
      pages.push(page);
    }

    expect(pages).toEqual([
      { items: [1, 2], hasMore: true },
      { items: [3, 4], hasMore: true },
      { items: [5], hasMore: false },
    ]);
  });
});
