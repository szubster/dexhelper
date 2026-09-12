import type { PaginationConfig, SyncPaginationGenerator, SyncPaginator } from './types.ts';

export class SyncGeneratorPaginator<T> implements SyncPaginator<T> {
  source: Iterable<T> | (() => Generator<T, void, unknown>);

  constructor(source: Iterable<T> | (() => Generator<T, void, unknown>)) {
    this.source = source;
  }

  *paginate(config: PaginationConfig): SyncPaginationGenerator<T> {
    const pageSize = config.pageSize;
    let items: T[] = [];

    // Explicit resource management setup using 'Symbol.dispose'
    let iterator: Iterator<T>;
    if (Symbol.iterator in this.source) {
      iterator = (this.source as Iterable<T>)[Symbol.iterator]();
    } else if (typeof this.source === 'function') {
      iterator = (this.source as () => Generator<T>)();
    } else {
      throw new Error('Invalid iterable source provided to SyncGeneratorPaginator.');
    }

    // Create an explicit resource object so that we can use 'using'
    const resource = {
      iterator,
      [Symbol.dispose]() {
        if (this.iterator.return) {
          this.iterator.return();
        }
      },
    };

    using _res = resource;

    while (true) {
      const result = resource.iterator.next();

      if (result.done) {
        if (items.length > 0) {
          yield {
            items,
            hasMore: false,
          };
        }
        break;
      }

      items.push(result.value);

      if (items.length === pageSize) {
        yield {
          items,
          hasMore: true,
        };
        items = [];
      }
    }
  }
}
