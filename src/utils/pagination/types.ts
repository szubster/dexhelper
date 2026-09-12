/**
 * Types for generator-based pagination engines (ADR 154).
 */

export interface PaginationResult<T> {
  items: T[];
  totalCount?: number;
  hasMore: boolean;
  nextCursor?: string | number;
}

export interface PaginationConfig {
  pageSize: number;
  initialCursor?: string | number;
}

export type SyncPaginationGenerator<T> = Generator<PaginationResult<T>, void, void>;

export type AsyncPaginationGenerator<T> = AsyncGenerator<PaginationResult<T>, void, void>;

export interface SyncPaginator<T> {
  paginate(config: PaginationConfig): SyncPaginationGenerator<T>;
}

export interface AsyncPaginator<T> {
  paginate(config: PaginationConfig): AsyncPaginationGenerator<T>;
}
