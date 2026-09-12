import { describe, expect, it } from 'vitest';
import { AsyncGeneratorPaginator } from './asyncPaginator.ts';

describe('AsyncGeneratorPaginator', () => {
  it('should paginate an async iterable source', async () => {
    async function* sourceGen() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const paginator = new AsyncGeneratorPaginator(sourceGen);
    const iterator = paginator.paginate({ pageSize: 2 });

    let result = await iterator.next();
    expect(result.value).toEqual({ items: [1, 2], hasMore: true });

    result = await iterator.next();
    expect(result.value).toEqual({ items: [3, 4], hasMore: true });

    result = await iterator.next();
    expect(result.value).toEqual({ items: [5], hasMore: false });

    result = await iterator.next();
    expect(result.done).toBe(true);
  });
});
