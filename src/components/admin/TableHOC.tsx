import { useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  ColumnDef,
  SortingState,
  PaginationState,
  RowData,
  flexRender,
  useTable,
} from "@tanstack/react-table";

import { tableFeaturesForApp } from "./tableFeatures";

function TableHOC<TData extends RowData>(
  columns: ColumnDef<typeof tableFeaturesForApp, TData>[],
  data: TData[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false,
) {
  return function HOC() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 6,
    });

    const table = useTable({
      features: tableFeaturesForApp,
      columns,
      data,
      // v9's built-in default cell renderer calls `.toString()` on the cell
      // value, which stringifies React elements stored via `accessorKey`
      // (the <img> in "Photo", the <Link>/<button> in "Action", the status
      // <span>, avatars, etc.) into the literal string "[object Object]".
      // Restore the pre-v9 behavior of rendering the raw value so those JSX
      // columns render correctly. Columns that define their own `cell`
      // still override this.
      defaultColumn: {
        cell: (props) => props.renderValue(),
      },
      state: {
        sorting,
        pagination,
      },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
    });

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>

        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() && (
                          <span>
                            {header.column.getIsSorted() === "desc" ? (
                              <AiOutlineSortDescending />
                            ) : (
                              <AiOutlineSortAscending />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getAllCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              Prev
            </button>
            <span>{`${table.state.pagination.pageIndex + 1} of ${table.getPageCount()}`}</span>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;

