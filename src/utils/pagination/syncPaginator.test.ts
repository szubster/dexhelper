import { describe, expect, it } from 'vitest';
import { SyncGeneratorPaginator } from './syncPaginator.ts';

describe('SyncGeneratorPaginator', () => {
  it('should paginate an iterable source', () => {
    function* sourceGen() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const paginator = new SyncGeneratorPaginator(sourceGen);
    const iterator = paginator.paginate({ pageSize: 2 });

    let result = iterator.next();
    expect(result.value).toEqual({ items: [1, 2], hasMore: true });

    result = iterator.next();
    expect(result.value).toEqual({ items: [3, 4], hasMore: true });

    result = iterator.next();
    expect(result.value).toEqual({ items: [5], hasMore: false });

    result = iterator.next();
    expect(result.done).toBe(true);
  });
});
