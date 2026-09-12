import type { AsyncPaginationGenerator, AsyncPaginator, PaginationConfig } from './types.ts';

export class AsyncGeneratorPaginator<T> implements AsyncPaginator<T> {
  source: AsyncIterable<T> | (() => AsyncGenerator<T, void, unknown>);

  constructor(source: AsyncIterable<T> | (() => AsyncGenerator<T, void, unknown>)) {
    this.source = source;
  }

  async *paginate(config: PaginationConfig): AsyncPaginationGenerator<T> {
    const pageSize = config.pageSize;
    let items: T[] = [];

    // Explicit resource management setup using 'Symbol.asyncDispose'
    let iterator: AsyncIterator<T>;
    if (Symbol.asyncIterator in this.source) {
      iterator = (this.source as AsyncIterable<T>)[Symbol.asyncIterator]();
    } else if (typeof this.source === 'function') {
      iterator = (this.source as () => AsyncGenerator<T>)();
    } else {
      throw new Error('Invalid async iterable source provided to AsyncGeneratorPaginator.');
    }

    // Create an explicit resource object so that we can use 'using'
    const resource = {
      iterator,
      async [Symbol.asyncDispose]() {
        if (this.iterator.return) {
          await this.iterator.return();
        }
      },
    };

    await using _res = resource;

    while (true) {
      const result = await resource.iterator.next();

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
