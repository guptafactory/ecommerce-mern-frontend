import {
  ColumnDef,
  RowData,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  tableFeatures,
} from "@tanstack/react-table";

/**
 * Shared TanStack Table feature set for all admin/user tables.
 *
 * Enables row sorting and client-side pagination with the v9 feature-based
 * API. Defined once at module scope (as recommended by the library) so the
 * feature identity stays stable across renders and can be reused by every
 * `useTable` call through `TableHOC`.
 */
export const tableFeaturesForApp = tableFeatures({
  rowSortingFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    basic: sortFn_basic,
  },
});

/**
 * Convenience column-definition type with the shared feature set pre-bound, so
 * table columns only need to specify their row/data type:
 * `const columns: AppColumnDef<MyRow>[] = [...]`.
 */
export type AppColumnDef<TData extends RowData> = ColumnDef<
  typeof tableFeaturesForApp,
  TData
>;

