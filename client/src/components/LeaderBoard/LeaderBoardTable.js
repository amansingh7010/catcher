import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import './LeaderBoardTable.css';
import Button from '../UI/Button/Button';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('rank', {
    header: () => 'Rank',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: () => 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('score', {
    header: () => 'Score',
    cell: (info) => info.getValue(),
  }),
];

const LeaderBoardTable = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <Button
          title="<"
          className="pagination-button"
          clickHandler={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{
            fontSize: '15pt',
            padding: '0.3rem',
            width: '2vw',
            backgroundColor: '#ffd633',
          }}
        />
        {table.getPageCount() > 1 && (
          <span className="pagination-text">
            <div style={{ marginRight: '0.5rem' }}>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
        )}
        <Button
          title=">"
          className="pagination-button"
          clickHandler={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            fontSize: '15pt',
            padding: '0.3rem',
            width: '2vw',
            backgroundColor: '#ffd633',
          }}
        />
      </div>
    </div>
  );
};

export default LeaderBoardTable;
