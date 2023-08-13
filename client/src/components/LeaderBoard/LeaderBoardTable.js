import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './LeaderBoardTable.css';
import Button from '../UI/Button/Button';

const PAGE_SIZE = 10;

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
  const selectedPlayerId = useSelector((state) => state.player.value);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
  });

  // Auto select pageIndex for selected player
  useEffect(() => {
    if (selectedPlayerId) {
      let pageNum = -1;
      for (const index in data) {
        if (index % PAGE_SIZE === 0) pageNum++;
        if (data[index].id === selectedPlayerId) {
          table.setPageIndex(pageNum);
        }
      }
    }
  }, [data, selectedPlayerId, table]);

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
          {table.getRowModel().rows.map((row) => {
            const highlightClass =
              row.id === '0'
                ? 'gold'
                : row.id === '1'
                ? 'silver'
                : row.id === '2'
                ? 'bronze'
                : '';

            return (
              <tr
                key={row.id}
                className={
                  selectedPlayerId === row.original.id
                    ? highlightClass.concat(' highlight-player')
                    : highlightClass
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {table.getPageCount() > 1 && (
        <div className="pagination">
          <Button
            title="<<"
            className="pagination-button"
            clickHandler={() => table.setPageIndex(0)}
            disabled={table.getState().pagination.pageIndex === 0}
            style={{
              fontSize: '15pt',
              padding: '0.3rem',
              width: '2vw',
              backgroundColor: '#ffd633',
            }}
          />
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
          <span className="pagination-text">
            <div style={{ marginRight: '0.5rem' }}>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
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
          <Button
            title=">>"
            className="pagination-button"
            clickHandler={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            style={{
              fontSize: '15pt',
              padding: '0.3rem',
              width: '2vw',
              backgroundColor: '#ffd633',
            }}
          />
        </div>
      )}
    </div>
  );
};

LeaderBoardTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default LeaderBoardTable;
